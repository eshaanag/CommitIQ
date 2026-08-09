import { useCallback, useState, useEffect, useRef, useMemo } from 'react'
import ForceGraph2D, { type ForceGraphMethods } from 'react-force-graph-2d'
import { forceCollide } from 'd3-force'
import {
  Play,
  Pause,
  Search,
  Filter,
  AlertTriangle,
  ShieldCheck,
  Activity,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Layers,
  Compass,
  Info,
  ChevronRight,
  ChevronDown,
  TrendingUp,
  GitCommit,
  FolderTree,
  Flame,
  FileText,
  Folder,
} from 'lucide-react'
import type { ForceGraphLink, ForceGraphNode, GraphExplorerProps } from '../types'

interface TreeNode {
  name: string
  fullPath?: string
  nodeId?: string
  children: TreeNode[]
  isFolder: boolean
}

type NodeSizeMetric = 'loc' | 'churn' | 'coupling' | 'instability' | 'equal'

type RenderNode = ForceGraphNode & {
  module: string
  is_entry_point: boolean
  churn?: number
  x?: number
  y?: number
}

type NodeRef = string | number | { id?: string | number }

type GraphLinkRef = Omit<ForceGraphLink, 'source' | 'target'> & {
  source: NodeRef
  target: NodeRef
}

const HEALTH_COLORS_RGB: Record<string, string> = {
  green: '52, 211, 153',
  yellow: '251, 191, 36',
  orange: '251, 146, 60',
  red: '248, 113, 113',
  neutral: '156, 163, 175',
}

const NODE_SIZE_METRICS = new Set<NodeSizeMetric>([
  'loc',
  'churn',
  'coupling',
  'instability',
  'equal',
])

function isNodeSizeMetric(value: string): value is NodeSizeMetric {
  return NODE_SIZE_METRICS.has(value as NodeSizeMetric)
}

const getNodeId = (node: unknown): string => {
  if (!node) return ''
  if (typeof node === 'object' && 'id' in node) {
    const id = (node as { id?: string | number }).id
    return id === undefined ? '' : String(id)
  }
  return String(node)
}

export function GraphExplorer({
  graphData,
  selectedSha,
  commits = [],
  onSelectCommit,
}: GraphExplorerProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchFocused, setSearchFocused] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true)
  const [leftSidebarTab, setLeftSidebarTab] = useState<'filters' | 'tree'>('filters')
  const [collapsedFolders, setCollapsedFolders] = useState<Set<string>>(new Set())
  const [nodeSizeMetric, setNodeSizeMetric] = useState<NodeSizeMetric>('loc')

  const [showImports, setShowImports] = useState(true)
  const [showCoChange, setShowCoChange] = useState(true)
  const [selectedModule, setSelectedModule] = useState<string>('all')
  const [selectedRisk, setSelectedRisk] = useState<string>('all')

  const [highlightCyclic, setHighlightCyclic] = useState(false)
  const [highlightHotspots, setHighlightHotspots] = useState(false)
  const [highlightStability, setHighlightStability] = useState(false)

  const [isPlaying, setIsPlaying] = useState(false)
  const [playSpeed, setPlaySpeed] = useState(1500)
  const playIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Force a canvas redraw when root theme classes change.
  const [, setThemeRevision] = useState(0)

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setThemeRevision((revision) => revision + 1)
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const graphRef = useRef<ForceGraphMethods | undefined>(undefined)
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 })

  useEffect(() => {
    if (!containerRef.current) return
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        if (width > 0 && height > 0) {
          setDimensions({ width, height })
        }
      }
    })
    resizeObserver.observe(containerRef.current)
    return () => resizeObserver.disconnect()
  }, [])

  // Auto-collapse sidebars on small containers to avoid squeezed layout when transitioning
  const lastWidthRef = useRef<number | null>(null)
  useEffect(() => {
    if (dimensions.width > 0) {
      const prevWidth = lastWidthRef.current
      if (prevWidth !== null) {
        if (prevWidth >= 768 && dimensions.width < 768) {
          setIsLeftSidebarOpen(false)
          setIsSidebarOpen(false)
        }
      } else {
        if (dimensions.width < 768) {
          setIsLeftSidebarOpen(false)
          setIsSidebarOpen(false)
        }
      }
      lastWidthRef.current = dimensions.width
    }
  }, [dimensions.width])

  // Dynamic added/removed node tracking to visualize temporal evolution
  const [addedNodeIds, setAddedNodeIds] = useState<Set<string>>(new Set())
  const prevNodesRef = useRef<string[]>([])

  useEffect(() => {
    if (graphData && graphData.nodes.length > 0) {
      if (prevNodesRef.current.length > 0) {
        const prevSet = new Set(prevNodesRef.current)
        const currentSet = new Set(graphData.nodes.map((n) => n.id))
        const newlyAdded = new Set<string>()

        currentSet.forEach((id) => {
          if (!prevSet.has(id)) newlyAdded.add(id)
        })
        setAddedNodeIds(newlyAdded)
      }
      prevNodesRef.current = graphData.nodes.map((n) => n.id)
    }
  }, [graphData])

  // Memoize nodes to preserve their coordinates (x, y, vx, vy)
  const nodes = useMemo<RenderNode[]>(() => {
    if (!graphData) return []
    return graphData.nodes.map((node) => ({
      id: node.id,
      name: node.module || node.file,
      file: node.file,
      module: node.module || 'Root',
      health_color: node.health_color,
      loc: node.loc,
      health: node.health,
      is_entry_point:
        node.is_entry_point ||
        node.file.includes('main') ||
        node.file.includes('index') ||
        node.file.includes('App'),
    }))
  }, [graphData])

  const links = useMemo<GraphLinkRef[]>(() => {
    if (!graphData) return []
    const filteredEdges = graphData.edges.filter(
      (edge) =>
        (showImports && edge.type === 'import') || (showCoChange && edge.type === 'co_change')
    )
    return filteredEdges.map((edge) => ({
      source: edge.source,
      target: edge.target,
      type: edge.type,
      weight: edge.weight,
    }))
  }, [graphData, showImports, showCoChange])

  // Helper key to track edge references safely
  const getEdgeKey = (link: unknown) => {
    const graphLink = link as GraphLinkRef
    const s = getNodeId(graphLink.source)
    const t = getNodeId(graphLink.target)
    return `${s}->${t}`
  }

  // Client-Side Cyclic Dependency Detection DFS
  const cyclicNodesAndEdges = useMemo(() => {
    if (!links.length || !nodes.length)
      return { nodes: new Set<string>(), edges: new Set<string>() }

    const importLinks = links.filter((l) => l.type === 'import')
    const adj = new Map<string, string[]>()
    importLinks.forEach((l) => {
      const s = getNodeId(l.source)
      const t = getNodeId(l.target)
      if (!adj.has(s)) adj.set(s, [])
      adj.get(s)!.push(t)
    })

    const visited = new Set<string>()
    const visiting = new Set<string>()
    const cyclicNodes = new Set<string>()
    const cyclicEdges = new Set<string>()

    const dfs = (node: string, parentPath: string[]) => {
      visiting.add(node)
      parentPath.push(node)
      const neighbors = adj.get(node) || []

      for (const next of neighbors) {
        if (visiting.has(next)) {
          const startIdx = parentPath.indexOf(next)
          if (startIdx !== -1) {
            const cyclePath = parentPath.slice(startIdx)
            cyclePath.forEach((n) => cyclicNodes.add(n))
            for (let i = 0; i < cyclePath.length; i++) {
              const u = cyclePath[i]
              const v = cyclePath[(i + 1) % cyclePath.length]
              cyclicEdges.add(`${u}->${v}`)
            }
          }
        } else if (!visited.has(next)) {
          dfs(next, parentPath)
        }
      }
      parentPath.pop()
      visiting.delete(node)
      visited.add(node)
    }

    nodes.forEach((n) => {
      if (!visited.has(n.id)) {
        dfs(n.id, [])
      }
    })

    return { nodes: cyclicNodes, edges: cyclicEdges }
  }, [nodes, links])

  const uniqueModules = useMemo(() => {
    const mods = new Set<string>()
    nodes.forEach((n) => {
      if (n.module) mods.add(n.module)
    })
    return Array.from(mods)
  }, [nodes])

  // Hotspot score map per file (0..100 normalized score calculated from complexity * churn & incoming coupling)
  const hotspotMetricsMap = useMemo(() => {
    const map = new Map<
      string,
      { score: number; colorClass: string; iconType: 'critical' | 'high' | 'medium' | 'low' }
    >()
    let maxMetric = 1
    const rawMetrics = new Map<string, number>()

    nodes.forEach((node) => {
      const locVal = node.loc || 10
      const healthRisk =
        node.health_color === 'red'
          ? 3
          : node.health_color === 'orange'
            ? 2
            : node.health_color === 'yellow'
              ? 1
              : 0.5
      const raw = locVal * healthRisk
      rawMetrics.set(node.id, raw)
      if (raw > maxMetric) maxMetric = raw
    })

    nodes.forEach((node) => {
      const raw = rawMetrics.get(node.id) || 0
      const score = Math.min(100, Math.round((raw / maxMetric) * 100))

      let colorClass = 'text-emerald-400 font-normal'
      let iconType: 'critical' | 'high' | 'medium' | 'low' = 'low'

      if (score > 75) {
        colorClass = 'text-rose-400 font-semibold'
        iconType = 'critical'
      } else if (score > 50) {
        colorClass = 'text-orange-400 font-semibold'
        iconType = 'high'
      } else if (score > 25) {
        colorClass = 'text-amber-300 font-medium'
        iconType = 'medium'
      }

      map.set(node.file, { score, colorClass, iconType })
      map.set(node.id, { score, colorClass, iconType })
    })

    return map
  }, [nodes])

  // Build hierarchical file tree structure from flat node paths
  const fileTree = useMemo<TreeNode[]>(() => {
    const root: TreeNode[] = []

    nodes.forEach((node) => {
      const pathParts = node.file.split('/').filter(Boolean)
      let currentLevel = root

      pathParts.forEach((part, index) => {
        const isLast = index === pathParts.length - 1
        let existing = currentLevel.find((item) => item.name === part && item.isFolder === !isLast)

        if (!existing) {
          existing = {
            name: part,
            fullPath: isLast ? node.file : undefined,
            nodeId: isLast ? node.id : undefined,
            children: [],
            isFolder: !isLast,
          }
          currentLevel.push(existing)
        }
        currentLevel = existing.children
      })
    })

    const sortNodes = (items: TreeNode[]) => {
      items.sort((a, b) => {
        if (a.isFolder && !b.isFolder) return -1
        if (!a.isFolder && b.isFolder) return 1
        return a.name.localeCompare(b.name)
      })
      items.forEach((item) => {
        if (item.children.length > 0) sortNodes(item.children)
      })
    }

    sortNodes(root)
    return root
  }, [nodes])

  const toggleFolder = useCallback((folderPath: string) => {
    setCollapsedFolders((prev) => {
      const next = new Set(prev)
      if (next.has(folderPath)) {
        next.delete(folderPath)
      } else {
        next.add(folderPath)
      }
      return next
    })
  }, [])

  const handleFocusNode = useCallback(
    (nodeId: string) => {
      const canvasNode = nodes.find((n) => n.id === nodeId)
      if (canvasNode && graphRef.current) {
        graphRef.current.centerAt(canvasNode.x, canvasNode.y, 800)
        graphRef.current.zoom(1.8, 800)
        setSelectedNodeId(nodeId)
        setIsSidebarOpen(true)
      }
    },
    [nodes]
  )

  const renderTreeNodes = useCallback(
    (items: TreeNode[], currentPath = ''): React.ReactNode => {
      return items.map((item) => {
        const pathKey = currentPath ? `${currentPath}/${item.name}` : item.name
        const isCollapsed = collapsedFolders.has(pathKey)

        if (item.isFolder) {
          return (
            <div key={pathKey} className="select-none my-0.5">
              <button
                type="button"
                onClick={() => toggleFolder(pathKey)}
                className="w-full flex items-center gap-1.5 py-1 px-1.5 rounded-lg hover:bg-white/5 text-slate-300 text-xs font-medium text-left transition-colors"
              >
                {isCollapsed ? (
                  <ChevronRight className="w-3 h-3 text-slate-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-3 h-3 text-slate-400 flex-shrink-0" />
                )}
                <Folder className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                <span className="truncate font-mono text-[11px]">{item.name}</span>
              </button>
              {!isCollapsed && (
                <div className="pl-3.5 border-l border-white/5 ml-2">
                  {renderTreeNodes(item.children, pathKey)}
                </div>
              )}
            </div>
          )
        }

        const hotspotInfo =
          item.fullPath || item.nodeId
            ? hotspotMetricsMap.get(item.fullPath!) || hotspotMetricsMap.get(item.nodeId!)
            : undefined

        const isSelected = item.nodeId === selectedNodeId

        return (
          <div key={pathKey} className="my-0.5">
            <button
              type="button"
              onClick={() => {
                if (item.nodeId) {
                  handleFocusNode(item.nodeId)
                }
              }}
              className={`w-full flex items-center justify-between gap-1.5 py-1 px-2 rounded-lg text-left transition-all ${
                isSelected
                  ? 'bg-purple-500/20 text-white border border-purple-500/40'
                  : 'hover:bg-white/5 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <FileText className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <span
                  className={`truncate font-mono text-[11px] ${hotspotInfo?.colorClass || 'text-slate-300'}`}
                >
                  {item.name}
                </span>
              </div>

              <div className="flex items-center gap-1 flex-shrink-0 ml-1">
                {hotspotInfo?.iconType === 'critical' && (
                  <span title={`Critical Hotspot (${hotspotInfo.score}/100)`}>
                    <AlertTriangle className="w-3 h-3 text-rose-400 animate-pulse" />
                  </span>
                )}
                {hotspotInfo?.iconType === 'high' && (
                  <span title={`High Risk Hotspot (${hotspotInfo.score}/100)`}>
                    <Flame className="w-3 h-3 text-orange-400" />
                  </span>
                )}
                {hotspotInfo && (
                  <span className={`text-[9px] font-mono font-bold ${hotspotInfo.colorClass}`}>
                    {hotspotInfo.score}
                  </span>
                )}
              </div>
            </button>
          </div>
        )
      })
    },
    [collapsedFolders, hotspotMetricsMap, selectedNodeId, toggleFolder, handleFocusNode]
  )

  // Dynamic Affinity/Efferent software coupling and Instability Metrics calculations
  const couplingMetrics = useMemo(() => {
    const afferent = new Map<string, number>()
    const efferent = new Map<string, number>()

    nodes.forEach((n) => {
      afferent.set(n.id, 0)
      efferent.set(n.id, 0)
    })

    links.forEach((l) => {
      const s = getNodeId(l.source)
      const t = getNodeId(l.target)

      if (l.type === 'import') {
        efferent.set(s, (efferent.get(s) || 0) + 1)
        afferent.set(t, (afferent.get(t) || 0) + 1)
      }
    })

    const instMap = new Map<string, number>()
    nodes.forEach((n) => {
      const ca = afferent.get(n.id) || 0
      const ce = efferent.get(n.id) || 0
      const denominator = ca + ce
      const inst = denominator === 0 ? 0.5 : ce / denominator
      instMap.set(n.id, inst)
    })

    return { afferent, efferent, instability: instMap }
  }, [nodes, links])

  const selectedNodeDetails = useMemo(() => {
    if (!selectedNodeId) return null
    const matched = nodes.find((n) => n.id === selectedNodeId)
    if (!matched) return null

    const importsList: string[] = []
    const importedByList: string[] = []

    links.forEach((l) => {
      const s = getNodeId(l.source)
      const t = getNodeId(l.target)
      if (l.type === 'import') {
        if (s === selectedNodeId) importsList.push(t)
        if (t === selectedNodeId) importedByList.push(s)
      }
    })

    const ca = couplingMetrics.afferent.get(selectedNodeId) || 0
    const ce = couplingMetrics.efferent.get(selectedNodeId) || 0
    const instability = couplingMetrics.instability.get(selectedNodeId) || 0.5
    const isCyclic = cyclicNodesAndEdges.nodes.has(selectedNodeId)

    return {
      ...matched,
      ca,
      ce,
      instability,
      isCyclic,
      imports: importsList,
      importedBy: importedByList,
    }
  }, [selectedNodeId, nodes, links, couplingMetrics, cyclicNodesAndEdges])

  const systemStability = useMemo(() => {
    if (nodes.length === 0) return 1.0
    let totalInstability = 0
    nodes.forEach((n) => {
      totalInstability += couplingMetrics.instability.get(n.id) || 0
    })
    return Math.max(0, Math.min(1, 1 - totalInstability / nodes.length))
  }, [nodes, couplingMetrics])

  const filteredGraphData = useMemo(() => {
    const matchingNodes = nodes.filter((n) => {
      if (selectedModule !== 'all' && n.module !== selectedModule) return false
      if (selectedRisk !== 'all' && n.health_color !== selectedRisk) return false
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return n.file.toLowerCase().includes(query) || n.module.toLowerCase().includes(query)
      }
      return true
    })

    const matchingNodeIds = new Set(matchingNodes.map((n) => n.id))

    const matchingLinks = links.filter((l) => {
      const s = getNodeId(l.source)
      const t = getNodeId(l.target)
      return matchingNodeIds.has(s) && matchingNodeIds.has(t)
    })

    return { nodes: matchingNodes, links: matchingLinks }
  }, [nodes, links, selectedModule, selectedRisk, searchQuery])

  const getNodeSize = useCallback(
    (node: RenderNode): number => {
      let base = 5
      if (nodeSizeMetric === 'loc') {
        base = Math.sqrt(Math.max(node.loc || 0, 10)) * 0.9 + 2.5
      } else if (nodeSizeMetric === 'churn') {
        base = Math.sqrt(Math.max(node.churn || 0, 0.05)) * 5.5 + 2.5
      } else if (nodeSizeMetric === 'coupling') {
        const afferent = couplingMetrics.afferent.get(node.id) || 0
        const efferent = couplingMetrics.efferent.get(node.id) || 0
        base = Math.sqrt(afferent + efferent) * 2.2 + 2.5
      } else if (nodeSizeMetric === 'instability') {
        base = (couplingMetrics.instability.get(node.id) || 0) * 6.5 + 2.5
      } else {
        base = 5.5
      }
      return Math.min(Math.max(base, 4.0), 16)
    },
    [nodeSizeMetric, couplingMetrics]
  )

  // D3 force-directed stable layout fit centering
  const refitPendingRef = useRef(true)

  useEffect(() => {
    if (graphRef.current) {
      const charge = graphRef.current.d3Force('charge')
      if (charge) charge.strength(-650)
      const link = graphRef.current.d3Force('link')
      if (link) link.distance(160)

      const collide = forceCollide<RenderNode>().radius((node) => getNodeSize(node) + 32)
      graphRef.current.d3Force('collide', collide)
    }
    refitPendingRef.current = true
  }, [nodes, showImports, showCoChange, selectedModule, selectedRisk, getNodeSize])

  useEffect(() => {
    refitPendingRef.current = true
    if (graphRef.current) {
      graphRef.current.d3ReheatSimulation()
      const timer = setTimeout(() => {
        if (graphRef.current) {
          graphRef.current.zoomToFit(400, 80)
        }
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [dimensions.width, dimensions.height])

  const handleEngineStop = useCallback(() => {
    if (refitPendingRef.current && graphRef.current && filteredGraphData.nodes.length > 0) {
      graphRef.current.zoomToFit(500, 70)
      refitPendingRef.current = false
    }
  }, [filteredGraphData])

  useEffect(() => {
    if (isPlaying && commits.length > 0 && onSelectCommit) {
      const currentIndex = commits.findIndex((c) => c.sha === selectedSha)
      playIntervalRef.current = setInterval(() => {
        const nextIndex = (currentIndex + 1) % commits.length
        onSelectCommit(commits[nextIndex])
      }, playSpeed)
    } else {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current)
    }

    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current)
    }
  }, [isPlaying, commits, selectedSha, playSpeed, onSelectCommit])

  const getNodeColor = useCallback(
    (node: RenderNode): string => {
      const focusNodeId = selectedNodeId || hoveredNode

      let isFocused = true
      if (focusNodeId) {
        isFocused =
          node.id === focusNodeId ||
          links.some((l) => {
            const s = getNodeId(l.source)
            const t = getNodeId(l.target)
            return (s === focusNodeId && t === node.id) || (t === focusNodeId && s === node.id)
          })
      }
      const baseOpacity = focusNodeId ? (isFocused ? 1.0 : 0.12) : 1.0

      if (highlightStability) {
        const instability = couplingMetrics.instability.get(node.id) || 0.5
        const red = Math.round(instability * 239)
        const green = Math.round((1 - instability) * 197)
        return `rgba(${red}, ${green}, 120, ${baseOpacity})`
      }

      const baseColor = HEALTH_COLORS_RGB[node.health_color] || HEALTH_COLORS_RGB.neutral
      return `rgba(${baseColor}, ${baseOpacity})`
    },
    [hoveredNode, selectedNodeId, links, highlightStability, couplingMetrics]
  )

  const drawNodeCanvas = useCallback(
    (node: RenderNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
      if (
        !node ||
        node.x === undefined ||
        node.y === undefined ||
        node.x === null ||
        node.y === null ||
        isNaN(node.x) ||
        isNaN(node.y) ||
        !isFinite(node.x) ||
        !isFinite(node.y)
      )
        return

      const size = getNodeSize(node)
      const color = getNodeColor(node)

      const isHotspot =
        highlightHotspots &&
        node.health_color === 'red' &&
        (couplingMetrics.afferent.get(node.id) || 0) > 2
      if (isHotspot) {
        const pulseTime = Date.now() / 300
        const radius = size + 4 + Math.sin(pulseTime) * 2
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI)
        ctx.fillStyle = 'rgba(239, 68, 68, 0.12)'
        ctx.fill()
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.35)'
        ctx.lineWidth = 1.0 / globalScale
        ctx.stroke()
      }

      const isAdded = addedNodeIds.has(node.id)
      if (isAdded) {
        const pulseTime = Date.now() / 200
        const radius = size + 5 + Math.sin(pulseTime) * 1.5
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI)
        ctx.fillStyle = 'rgba(52, 211, 153, 0.08)'
        ctx.fill()
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.5)'
        ctx.lineWidth = 1.5 / globalScale
        ctx.stroke()
      }

      const isCyclic = highlightCyclic && cyclicNodesAndEdges.nodes.has(node.id)
      if (isCyclic) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, size + 2, 0, 2 * Math.PI)
        ctx.strokeStyle = 'rgba(245, 158, 11, 0.65)'
        ctx.lineWidth = 2.0 / globalScale
        ctx.setLineDash([2.5, 2])
        ctx.stroke()
        ctx.setLineDash([])
      }

      ctx.save()
      ctx.beginPath()
      if (node.is_entry_point) {
        ctx.moveTo(node.x, node.y - size)
        ctx.lineTo(node.x + size, node.y)
        ctx.lineTo(node.x, node.y + size)
        ctx.lineTo(node.x - size, node.y)
        ctx.closePath()
      } else {
        ctx.arc(node.x, node.y, size, 0, 2 * Math.PI, false)
      }

      const gradient = ctx.createRadialGradient(
        node.x - size * 0.35,
        node.y - size * 0.35,
        size * 0.1,
        node.x,
        node.y,
        size
      )

      gradient.addColorStop(0, '#ffffff')
      gradient.addColorStop(0.15, color)
      gradient.addColorStop(0.85, color.replace(/[\d.]+\)$/, '0.9)'))
      gradient.addColorStop(1, color.replace(/[\d.]+\)$/, '0.7)'))

      ctx.fillStyle = gradient
      ctx.fill()

      const isHovered = hoveredNode === node.id
      const isSelected = selectedNodeId === node.id
      if (isHovered || isSelected) {
        ctx.shadowColor = isSelected ? '#A78BFA' : '#60A5FA'
        ctx.shadowBlur = 12 / globalScale
        ctx.lineWidth = isSelected ? 2.5 / globalScale : 1.5 / globalScale
        ctx.strokeStyle = isSelected ? '#C084FC' : '#93C5FD'
        ctx.stroke()
      } else {
        ctx.lineWidth = 0.85 / globalScale
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)'
        ctx.stroke()
      }
      ctx.restore()

      if (globalScale > 0.45) {
        const label = node.file.split('/').pop() || node.name
        const fontSize = Math.max(3.5, size * 0.6)
        ctx.font = `500 ${fontSize}px var(--font-mono, monospace)`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'

        const textWidth = ctx.measureText(label).width
        const isFocused = isHovered || isSelected

        const paddingX = 6
        const paddingY = 3.5
        const rectX = node.x - textWidth / 2 - paddingX
        const rectY = node.y + size + 5
        const rectW = textWidth + paddingX * 2
        const rectH = fontSize + paddingY * 2

        ctx.fillStyle = 'rgba(10, 11, 16, 0.72)'
        ctx.beginPath()
        if (typeof ctx.roundRect === 'function') {
          ctx.roundRect(rectX, rectY, rectW, rectH, 6)
        } else {
          ctx.rect(rectX, rectY, rectW, rectH)
        }
        ctx.fill()

        ctx.strokeStyle = isFocused ? 'rgba(167, 139, 250, 0.75)' : 'rgba(255, 255, 255, 0.08)'
        ctx.lineWidth = 0.65 / globalScale
        ctx.stroke()

        ctx.fillStyle = isFocused ? '#FFFFFF' : '#E2E8F0'
        ctx.fillText(label, node.x, rectY + rectH / 2 + 0.2)
      }
    },
    [
      getNodeSize,
      getNodeColor,
      hoveredNode,
      selectedNodeId,
      addedNodeIds,
      cyclicNodesAndEdges,
      highlightCyclic,
      highlightHotspots,
      couplingMetrics,
    ]
  )

  const drawBackgroundClusters = useCallback(
    (ctx: CanvasRenderingContext2D, globalScale: number) => {
      if (nodes.length === 0) return

      const moduleGroups = new Map<string, RenderNode[]>()
      nodes.forEach((node) => {
        const parts = node.file.split('/')
        const moduleName = parts.length > 1 ? parts[0] : 'core'
        if (!moduleGroups.has(moduleName)) {
          moduleGroups.set(moduleName, [])
        }
        moduleGroups.get(moduleName)!.push(node)
      })

      const clusterAccent = (mod: string): string => {
        const hash = mod.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
        const hues = [267, 190, 142, 35, 12, 335]
        const hue = hues[hash % hues.length]
        return `hsla(${hue}, 70%, 40%, 0.035)`
      }

      const clusterStroke = (mod: string): string => {
        const hash = mod.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
        const hues = [267, 190, 142, 35, 12, 335]
        const hue = hues[hash % hues.length]
        return `hsla(${hue}, 75%, 55%, 0.09)`
      }

      ctx.save()
      moduleGroups.forEach((groupNodes, moduleName) => {
        if (groupNodes.length < 2) return

        let minX = Infinity,
          minY = Infinity
        let maxX = -Infinity,
          maxY = -Infinity
        groupNodes.forEach((n) => {
          if (
            !n ||
            n.x === undefined ||
            n.y === undefined ||
            n.x === null ||
            n.y === null ||
            isNaN(n.x) ||
            isNaN(n.y) ||
            !isFinite(n.x) ||
            !isFinite(n.y)
          )
            return
          const size = getNodeSize(n)
          minX = Math.min(minX, n.x - size)
          minY = Math.min(minY, n.y - size)
          maxX = Math.max(maxX, n.x + size)
          maxY = Math.max(maxY, n.y + size)
        })

        if (minX === Infinity || !isFinite(minX) || isNaN(minX)) return

        const padding = 28
        const x = minX - padding
        const y = minY - padding
        const w = maxX - minX + padding * 2
        const h = maxY - minY + padding * 2

        ctx.beginPath()
        if (ctx.roundRect) {
          ctx.roundRect(x, y, w, h, 24)
        } else {
          ctx.rect(x, y, w, h)
        }

        ctx.fillStyle = clusterAccent(moduleName)
        ctx.fill()
        ctx.strokeStyle = clusterStroke(moduleName)
        ctx.lineWidth = 1.0 / globalScale
        ctx.stroke()

        const fontSize = Math.max(9, 12 / globalScale)
        ctx.font = `bold ${fontSize}px var(--font-sans, system-ui)`
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)'
        ctx.fillText(moduleName.toUpperCase(), x + 16, y + fontSize + 10)
      })
      ctx.restore()
    },
    [nodes, getNodeSize]
  )

  const toggleFullscreen = () => {
    if (!wrapperRef.current) return
    if (!document.fullscreenElement) {
      wrapperRef.current.requestFullscreen().then(() => setIsFullscreen(true))
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false))
    }
  }

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFsChange)
    return () => document.removeEventListener('fullscreenchange', handleFsChange)
  }, [])

  const handleZoom = (factor: number) => {
    if (graphRef.current) {
      graphRef.current.zoom(graphRef.current.zoom() * factor, 300)
    }
  }

  const handleResetZoom = () => {
    if (graphRef.current) {
      graphRef.current.zoomToFit(500, 70)
    }
  }

  const autocompleteSuggestions = useMemo(() => {
    if (!searchQuery) return []
    const q = searchQuery.toLowerCase()
    return nodes
      .filter((n) => n.file.toLowerCase().includes(q) || n.module.toLowerCase().includes(q))
      .slice(0, 5)
  }, [searchQuery, nodes])

  const activeCommitIndex = commits.findIndex((c) => c.sha === selectedSha)
  const driftRate = useMemo(() => {
    if (commits.length === 0 || activeCommitIndex === -1) return 0
    const startScore = commits[0].health_score
    const currentScore = commits[activeCommitIndex].health_score
    return currentScore - startScore
  }, [commits, activeCommitIndex])

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full overflow-hidden transition-all duration-300 ${
        isFullscreen
          ? 'fixed inset-0 z-50 h-screen w-screen rounded-none bg-[#07080d]'
          : 'glass-panel rounded-[32px]'
      }`}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-6 py-4 border-b border-white/5 bg-white/[0.02] backdrop-blur-xl relative z-30">
        <div>
          <div className="flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-purple-400" />
            <h2 className="font-head text-[18px] font-semibold text-white tracking-tight">
              Software Knowledge Graph
            </h2>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"></span>
            <p className="text-slate-400 text-xs font-mono truncate">
              COMMIT: {selectedSha?.slice(0, 8) || 'HEAD'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <div className="relative">
              <input
                type="text"
                placeholder="Search files/imports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                className="w-full pl-9 pr-8 py-2 text-xs bg-white/5 border border-white/10 rounded-full text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-colors font-mono"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {searchFocused && autocompleteSuggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 glass-panel-bright rounded-[20px] shadow-2xl z-50 py-1.5 max-h-60 overflow-y-auto border border-white/10">
                {autocompleteSuggestions.map((node) => (
                  <button
                    key={node.id}
                    onClick={() => handleFocusNode(node.id)}
                    className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-white/10 hover:text-white flex items-center justify-between border-b border-white/5 last:border-b-0 font-mono"
                  >
                    <span className="truncate pr-2">{node.file.split('/').pop()}</span>
                    <span className="text-slate-500 text-[10px] truncate max-w-[120px]">
                      {node.module}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
              title="Toggle Filters Panel"
              className={`p-2 border rounded-full transition-all duration-300 flex items-center justify-center ${
                isLeftSidebarOpen
                  ? 'border-purple-500/40 bg-purple-500/15 text-purple-300'
                  : 'border-white/10 text-slate-300 bg-white/5 hover:bg-white/12 hover:text-white'
              }`}
            >
              <Filter className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              title="Toggle Inspect HUD"
              className={`p-2 border rounded-full transition-all duration-300 flex items-center justify-center ${
                isSidebarOpen
                  ? 'border-purple-500/40 bg-purple-500/15 text-purple-300'
                  : 'border-white/10 text-slate-300 bg-white/5 hover:bg-white/12 hover:text-white'
              }`}
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="min-h-[580px] h-[calc(100%-80px)] relative overflow-hidden">
        {isLeftSidebarOpen && (
          <div className="absolute left-4 top-4 bottom-4 w-72 md:w-64 glass-panel rounded-[24px] p-5 flex-shrink-0 z-[45] flex flex-col justify-between overflow-y-auto max-h-[calc(100%-32px)] border border-white/10 shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-1.5 p-1 bg-white/5 rounded-xl w-full border border-white/5">
                  <button
                    type="button"
                    onClick={() => setLeftSidebarTab('filters')}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      leftSidebarTab === 'filters'
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Filter className="w-3.5 h-3.5" />
                    <span>Filters</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLeftSidebarTab('tree')}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      leftSidebarTab === 'tree'
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FolderTree className="w-3.5 h-3.5" />
                    <span>File Tree</span>
                  </button>
                </div>
              </div>

              {leftSidebarTab === 'filters' ? (
                <div className="space-y-5">
                  <div className="space-y-2.5">
                    <label className="text-xs text-slate-400 font-medium">Edges Display</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setShowImports(!showImports)}
                        className={`py-1.5 rounded-full text-[11px] border font-medium flex items-center justify-center gap-1.5 transition-all ${
                          showImports
                            ? 'border-blue-500/40 text-blue-300 bg-blue-500/15'
                            : 'border-white/10 text-slate-500 bg-white/5 hover:bg-white/8'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                        Imports
                      </button>
                      <button
                        onClick={() => setShowCoChange(!showCoChange)}
                        className={`py-1.5 rounded-full text-[11px] border font-medium flex items-center justify-center gap-1.5 transition-all ${
                          showCoChange
                            ? 'border-orange-500/40 text-orange-300 bg-orange-500/15'
                            : 'border-white/10 text-slate-500 bg-white/5 hover:bg-white/8'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                        Co-change
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-medium">Module Namespace</label>
                      <select
                        value={selectedModule}
                        onChange={(e) => setSelectedModule(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/45 cursor-pointer font-mono"
                      >
                        <option value="all">All Modules ({nodes.length})</option>
                        {uniqueModules.map((mod) => (
                          <option key={mod} value={mod} className="bg-[#181a24] text-white">
                            {mod}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-medium">
                        Complexity Hotspots
                      </label>
                      <select
                        value={selectedRisk}
                        onChange={(e) => setSelectedRisk(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/45 cursor-pointer"
                      >
                        <option value="all">All Risks</option>
                        <option value="green" className="bg-[#181a24] text-emerald-400">
                          Low Risk (Green)
                        </option>
                        <option value="yellow" className="bg-[#181a24] text-amber-300">
                          Moderate (Yellow)
                        </option>
                        <option value="orange" className="bg-[#181a24] text-orange-400">
                          High Risk (Orange)
                        </option>
                        <option value="red" className="bg-[#181a24] text-rose-400">
                          Critical (Red)
                        </option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-400 font-medium">Scale Nodes By</label>
                      <select
                        value={nodeSizeMetric}
                        onChange={(e) => {
                          const value = e.target.value
                          if (isNodeSizeMetric(value)) setNodeSizeMetric(value)
                        }}
                        className="w-full px-3 py-2 text-xs bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/45 cursor-pointer"
                      >
                        <option value="loc" className="bg-[#181a24]">
                          Complexity (LOC)
                        </option>
                        <option value="churn" className="bg-[#181a24]">
                          Commit Churn
                        </option>
                        <option value="coupling" className="bg-[#181a24]">
                          Coupling Degree
                        </option>
                        <option value="instability" className="bg-[#181a24]">
                          Instability Index
                        </option>
                        <option value="equal" className="bg-[#181a24]">
                          Uniform Size
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4 space-y-2">
                    <div className="flex items-center gap-2 text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
                      <Compass className="w-3.5 h-3.5 text-purple-400" />
                      <span>Observability Layer</span>
                    </div>

                    <button
                      onClick={() => setHighlightCyclic(!highlightCyclic)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border text-left transition-all duration-300 ${
                        highlightCyclic
                          ? 'border-amber-500/40 bg-amber-500/15 text-amber-300'
                          : 'border-white/5 bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-medium">Cyclic Loops</span>
                      </div>
                      {highlightCyclic && (
                        <span className="text-[10px] bg-amber-500 text-slate-950 font-mono px-2 py-0.5 rounded-full font-bold">
                          {cyclicNodesAndEdges.nodes.size}
                        </span>
                      )}
                    </button>

                    <button
                      onClick={() => setHighlightHotspots(!highlightHotspots)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border text-left transition-all duration-300 ${
                        highlightHotspots
                          ? 'border-red-500/40 bg-red-500/15 text-red-300'
                          : 'border-white/5 bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-red-400" />
                        <span className="text-xs font-medium">Highlight Hotspots</span>
                      </div>
                    </button>

                    <button
                      onClick={() => setHighlightStability(!highlightStability)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl border text-left transition-all duration-300 ${
                        highlightStability
                          ? 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300'
                          : 'border-white/5 bg-white/5 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-medium">Stability Mapping</span>
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
                    <div className="flex items-center gap-1.5">
                      <FolderTree className="w-3.5 h-3.5 text-purple-400" />
                      <span>Codebase File Tree</span>
                    </div>
                    {hotspotMetricsMap.size > 0 && (
                      <span className="text-[10px] text-rose-400 font-mono font-bold bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                        {hotspotMetricsMap.size} Hotspots
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Color-coded by hotspot risk score. Warning icons mark high-risk files. Click to
                    focus in graph.
                  </p>
                  <div className="space-y-0.5 max-h-[320px] overflow-y-auto pr-1 border border-white/5 rounded-xl p-2 bg-white/[0.01]">
                    {renderTreeNodes(fileTree)}
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-white/5 pt-4 space-y-2">
              <div className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold">
                {leftSidebarTab === 'tree' ? 'Hotspot Legend' : 'Hierarchy Legend'}
              </div>
              {leftSidebarTab === 'tree' ? (
                <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-[10px] text-slate-400 font-medium">
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3 h-3 text-rose-400" />
                    <span className="text-rose-400">Critical (&gt;75)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Flame className="w-3 h-3 text-orange-400" />
                    <span className="text-orange-400">High (&gt;50)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-amber-300">Medium (&gt;25)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-emerald-400">Low (&le;25)</span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-x-2 gap-y-2 text-[10px] text-slate-400 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 border border-purple-400 bg-purple-400/20 rotate-45 inline-block" />
                    <span>Entrypoint</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
                    <span>File Node</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <span className="w-4 h-0.5 border-t border-dashed border-amber-400 inline-block" />
                    <span>Import Cycle Link</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div ref={containerRef} className="absolute inset-0 bg-[#07080d]/40">
          <div className="absolute top-4 right-4 z-[45] flex flex-col gap-2.5 pointer-events-none items-end">
            <div className="glass-panel rounded-full px-5 py-3 shadow-2xl flex items-center gap-4 text-xs font-medium pointer-events-auto border border-white/10">
              <div className="flex flex-col">
                <span className="text-slate-400 text-[9px] uppercase tracking-wider font-semibold">
                  Active Files
                </span>
                <span className="text-white text-sm font-bold font-mono mt-0.5">
                  {nodes.length}
                </span>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-slate-400 text-[9px] uppercase tracking-wider font-semibold">
                  Dependency Cycles
                </span>
                <span
                  className={`text-sm font-bold font-mono mt-0.5 ${cyclicNodesAndEdges.nodes.size > 0 ? 'text-amber-400' : 'text-emerald-400'}`}
                >
                  {cyclicNodesAndEdges.nodes.size}
                </span>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div className="flex flex-col">
                <span className="text-slate-400 text-[9px] uppercase tracking-wider font-semibold">
                  Stability Score
                </span>
                <span className="text-emerald-400 text-sm font-bold font-mono mt-0.5">
                  {Math.round(systemStability * 100)}%
                </span>
              </div>
            </div>

            {(selectedNodeId || hoveredNode) && (
              <div className="glass-panel rounded-full px-4 py-2 shadow-2xl text-[10px] font-mono text-slate-300 flex items-center gap-2 pointer-events-auto border border-white/10 animate-float-slow">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-slate-400 font-sans font-semibold">Focusing:</span>
                <span className="truncate max-w-[150px] text-white">
                  {(() => {
                    const activeId = selectedNodeId || hoveredNode
                    const activeNode = nodes.find((n) => n.id === activeId)
                    return activeNode ? activeNode.file.split('/').pop() : activeId
                  })()}
                </span>
              </div>
            )}
          </div>

          <div className="absolute bottom-4 left-4 z-[45] flex items-center gap-1 bg-white/[0.04] backdrop-blur-xl border border-white/10 p-1.5 rounded-full shadow-2xl">
            <button
              onClick={() => handleZoom(1.3)}
              title="Zoom In"
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleZoom(1 / 1.3)}
              title="Zoom Out"
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              title="Reset Viewport fit"
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <span className="w-px h-4 bg-white/10" />
            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen View'}
              className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          <ForceGraph2D
            ref={graphRef}
            width={dimensions.width}
            height={dimensions.height}
            graphData={filteredGraphData}
            backgroundColor="rgba(10, 11, 16, 0.3)"
            nodeRelSize={1}
            nodeVal={getNodeSize}
            nodeColor={getNodeColor}
            nodeCanvasObject={drawNodeCanvas}
            onRenderFramePre={drawBackgroundClusters}
            linkColor={(link) => {
              const key = getEdgeKey(link)
              if (highlightCyclic && cyclicNodesAndEdges.edges.has(key))
                return 'rgba(245, 158, 11, 0.75)'
              const isImport = (link as ForceGraphLink).type === 'import'
              const focusNodeId = selectedNodeId || hoveredNode

              let edgeOpacity = 0.28
              if (focusNodeId) {
                const s = getNodeId(link.source)
                const t = getNodeId(link.target)
                const isEdgeFocused = s === focusNodeId || t === focusNodeId
                edgeOpacity = isEdgeFocused ? 0.85 : 0.03
              }

              return isImport
                ? `rgba(96, 165, 250, ${edgeOpacity})`
                : `rgba(249, 115, 22, ${edgeOpacity})`
            }}
            linkWidth={(link) => {
              const key = getEdgeKey(link)
              if (highlightCyclic && cyclicNodesAndEdges.edges.has(key)) return 3.0
              return 1.2 + Math.log((link as ForceGraphLink).weight || 1) * 0.6
            }}
            linkDirectionalParticles={(link: unknown) => {
              const graphLink = link as GraphLinkRef
              const key = getEdgeKey(graphLink)
              const focusNodeId = selectedNodeId || hoveredNode
              if (focusNodeId) {
                const s = getNodeId(graphLink.source)
                const t = getNodeId(graphLink.target)
                if (s !== focusNodeId && t !== focusNodeId) return 0
              }
              if (highlightCyclic && cyclicNodesAndEdges.edges.has(key)) return 6
              return graphLink.type === 'import' ? 3 : 0
            }}
            linkDirectionalParticleSpeed={(link: unknown) => {
              const graphLink = link as GraphLinkRef
              return 0.005 + Math.min(graphLink.weight || 1, 10) * 0.001
            }}
            linkDirectionalParticleWidth={(link: unknown) => {
              const graphLink = link as GraphLinkRef
              const key = getEdgeKey(graphLink)
              return highlightCyclic && cyclicNodesAndEdges.edges.has(key) ? 3.0 : 1.8
            }}
            linkDirectionalParticleColor={(link: unknown) => {
              const graphLink = link as GraphLinkRef
              const key = getEdgeKey(graphLink)
              if (highlightCyclic && cyclicNodesAndEdges.edges.has(key)) return '#F59E0B'
              return '#60A5FA'
            }}
            linkDirectionalArrowLength={(link: unknown) => {
              const graphLink = link as GraphLinkRef
              const focusNodeId = selectedNodeId || hoveredNode
              if (focusNodeId) {
                const s = getNodeId(graphLink.source)
                const t = getNodeId(graphLink.target)
                if (s !== focusNodeId && t !== focusNodeId) return 0
              }
              return graphLink.type === 'import' ? 4.5 : 0
            }}
            linkDirectionalArrowRelPos={1.0}
            onNodeHover={(node) => setHoveredNode((node as ForceGraphNode | null)?.id || null)}
            onNodeClick={(node) => {
              const nodeObj = node as ForceGraphNode
              if (selectedNodeId === nodeObj.id) {
                setSelectedNodeId(null)
              } else {
                setSelectedNodeId(nodeObj.id)
                setIsSidebarOpen(true)
              }
            }}
            enableZoomInteraction
            enablePanInteraction
            minZoom={0.12}
            maxZoom={2.4}
            cooldownTicks={160}
            d3AlphaDecay={0.018}
            d3VelocityDecay={0.28}
            onEngineStop={handleEngineStop}
          />
        </div>

        {isSidebarOpen && (
          <div className="absolute right-4 top-4 bottom-4 w-80 glass-panel rounded-[24px] flex flex-col flex-shrink-0 z-[45] overflow-y-auto max-h-[calc(100%-32px)] border border-white/10 shadow-2xl">
            {selectedNodeDetails ? (
              <div className="p-5 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <span className="text-slate-500 font-mono text-[9px] uppercase tracking-wider block">
                        {selectedNodeDetails.module}
                      </span>
                      <h4 className="font-head text-[16px] font-semibold text-white truncate mt-0.5">
                        {selectedNodeDetails.file.split('/').pop()}
                      </h4>
                      <p className="text-slate-500 font-mono text-[9px] break-all select-all mt-1 bg-white/5 p-1.5 rounded-lg border border-white/5">
                        {selectedNodeDetails.file}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedNodeId(null)
                        setIsSidebarOpen(false)
                      }}
                      className="text-slate-400 hover:text-white p-1 bg-white/5 rounded-full hover:bg-white/10 flex-shrink-0 transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  {selectedNodeDetails.isCyclic && (
                    <div className="bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-[16px] p-3 flex items-start gap-2.5">
                      <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-400 mt-0.5" />
                      <div className="text-[11px] leading-relaxed">
                        <span className="font-bold block mb-0.5">Circular Loop Node</span>
                        This component forms part of a bidirectional cycle. Modifying it may create
                        cascade side-effects.
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 border border-white/5 rounded-[16px] p-3">
                      <div className="text-slate-500 text-[9px] uppercase tracking-wider font-semibold">
                        Lines of Code
                      </div>
                      <div className="font-mono text-base font-bold mt-1 text-white">
                        {selectedNodeDetails.loc}
                      </div>
                    </div>
                    <div className="bg-white/5 border border-white/5 rounded-[16px] p-3">
                      <div className="text-slate-500 text-[9px] uppercase tracking-wider font-semibold">
                        Complexity Score
                      </div>
                      <div className="font-mono text-base font-bold mt-1 text-white">
                        {selectedNodeDetails.health.toFixed(1)}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 border border-white/5 rounded-[20px] p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-300">Coupling Profile</span>
                      <span className="font-mono text-xs font-bold text-purple-400">
                        I = {selectedNodeDetails.instability.toFixed(2)}
                      </span>
                    </div>

                    <div className="w-full bg-[#07080d] rounded-full h-1.5 relative overflow-hidden border border-white/5">
                      <div
                        style={{ width: `${selectedNodeDetails.instability * 100}%` }}
                        className="bg-gradient-to-r from-purple-500 to-indigo-400 h-full rounded-full transition-all duration-500"
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>Inbound (Ca): {selectedNodeDetails.ca}</span>
                      <span>Outbound (Ce): {selectedNodeDetails.ce}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {selectedNodeDetails.imports.length > 0 && (
                      <div className="space-y-1.5">
                        <div className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1">
                          <ChevronRight className="w-3.5 h-3.5 text-purple-400 rotate-90" />
                          <span>Outbound Dependencies ({selectedNodeDetails.imports.length})</span>
                        </div>
                        <div className="max-h-24 overflow-y-auto bg-white/[0.02] border border-white/5 rounded-xl divide-y divide-white/5">
                          {selectedNodeDetails.imports.map((fileId) => (
                            <button
                              key={fileId}
                              onClick={() => handleFocusNode(fileId)}
                              className="w-full text-left px-3 py-1.5 text-[11px] text-slate-400 hover:text-white hover:bg-white/5 font-mono truncate transition-all"
                            >
                              {fileId.split('/').pop()}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedNodeDetails.importedBy.length > 0 && (
                      <div className="space-y-1.5">
                        <div className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold flex items-center gap-1">
                          <ChevronRight className="w-3.5 h-3.5 text-purple-400 rotate-90" />
                          <span>Inbound Dependents ({selectedNodeDetails.importedBy.length})</span>
                        </div>
                        <div className="max-h-24 overflow-y-auto bg-white/[0.02] border border-white/5 rounded-xl divide-y divide-white/5">
                          {selectedNodeDetails.importedBy.map((fileId) => (
                            <button
                              key={fileId}
                              onClick={() => handleFocusNode(fileId)}
                              className="w-full text-left px-3 py-1.5 text-[11px] text-slate-400 hover:text-white hover:bg-white/5 font-mono truncate transition-all"
                            >
                              {fileId.split('/').pop()}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 font-mono border-t border-white/5 pt-4">
                  Select other nodes inside the spatial graph canvas to inspect their metrics.
                </div>
              </div>
            ) : (
              <div className="p-6 flex-1 flex flex-col items-center justify-center text-center text-slate-500 relative">
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="absolute right-4 top-4 text-slate-400 hover:text-white p-1 bg-white/5 rounded-full hover:bg-white/10 transition-colors"
                >
                  ✕
                </button>
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/5 flex items-center justify-center mb-4">
                  <Info className="w-5 h-5 text-slate-400" />
                </div>
                <h4 className="font-head text-[13px] font-semibold text-white mb-1.5">
                  Architectural Inspector
                </h4>
                <p className="text-[11px] leading-relaxed px-2 text-slate-400">
                  Click any software node on the map to display inbound afferent coupling, outbound
                  efferent references, cyclic loops, and file sizes.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {commits.length > 0 && onSelectCommit && (
        <div className="px-6 py-4 border-t border-white/5 bg-white/[0.02] backdrop-blur-xl relative z-30 flex flex-col md:flex-row items-center justify-between gap-4 select-none">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                isPlaying
                  ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-[0_0_15px_rgba(147,51,234,0.35)]'
                  : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
              }`}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-white" />
              ) : (
                <Play className="w-4 h-4 fill-white translate-x-0.5" />
              )}
            </button>
            <div className="flex items-center gap-1.5">
              <button
                disabled={activeCommitIndex <= 0}
                onClick={() => onSelectCommit(commits[activeCommitIndex - 1])}
                className="px-3 py-1.5 border border-white/5 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white rounded-full text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                ◀ Step
              </button>
              <button
                disabled={activeCommitIndex >= commits.length - 1}
                onClick={() => onSelectCommit(commits[activeCommitIndex + 1])}
                className="px-3 py-1.5 border border-white/5 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white rounded-full text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Step ▶
              </button>
            </div>

            <div className="flex items-center gap-1.5 pl-2">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Speed:
              </span>
              <select
                value={playSpeed}
                onChange={(e) => setPlaySpeed(Number(e.target.value))}
                className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-full text-slate-300 focus:outline-none cursor-pointer"
              >
                <option value={3000} className="bg-[#181a24]">
                  3s (Slow)
                </option>
                <option value={1500} className="bg-[#181a24]">
                  1.5s (Norm)
                </option>
                <option value={800} className="bg-[#181a24]">
                  0.8s (Fast)
                </option>
                <option value={400} className="bg-[#181a24]">
                  0.4s (Hyper)
                </option>
              </select>
            </div>
          </div>

          <div className="flex-grow w-full md:mx-6 flex items-center gap-4">
            <span className="text-[10px] text-slate-500 font-mono whitespace-nowrap">START</span>
            <div className="flex-grow relative flex items-center">
              <input
                type="range"
                min={0}
                max={commits.length - 1}
                value={activeCommitIndex !== -1 ? activeCommitIndex : 0}
                onChange={(e) => {
                  const targetIndex = Number(e.target.value)
                  onSelectCommit(commits[targetIndex])
                }}
                className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-purple-500 focus:outline-none"
              />
              <div
                style={{ left: `${(activeCommitIndex / (commits.length - 1)) * 100}%` }}
                className="absolute transform -translate-x-1/2 -top-6 text-[9px] font-mono bg-purple-600 text-white px-2 py-0.5 rounded-full shadow-lg whitespace-nowrap pointer-events-none border border-purple-400/20"
              >
                COMMIT #{activeCommitIndex + 1}
              </div>
            </div>
            <span className="text-[10px] text-slate-500 font-mono whitespace-nowrap">END</span>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0 w-full md:w-auto justify-end">
            <div className="bg-white/5 border border-white/5 rounded-full px-3 py-1.5 flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
              <div className="text-[10px] font-mono">
                <span className="text-slate-400">DRIFT:</span>{' '}
                <span
                  className={`font-bold ${
                    driftRate > 0
                      ? 'text-emerald-400'
                      : driftRate < 0
                        ? 'text-rose-400'
                        : 'text-slate-400'
                  }`}
                >
                  {driftRate > 0 ? '+' : ''}
                  {driftRate.toFixed(1)}
                </span>
              </div>
            </div>

            <div className="bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-1.5 flex items-center gap-2 text-purple-300 font-mono text-[11px]">
              <GitCommit className="w-3.5 h-3.5 text-purple-400" />
              <span>
                {activeCommitIndex + 1} / {commits.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
