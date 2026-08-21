import { a as e, i as t, t as n } from './index-4N9WolXG.js';
import { a as r, d as i, o as a, r as o } from './api-O1fETKMF.js';
import { n as s, t as c } from './ThemeToggle-DHlVmop0.js';
import {
  _ as l,
  c as u,
  g as d,
  l as f,
  o as p,
  r as m,
  u as h,
  x as g,
  y as _,
} from './utils-DWSjchQ-.js';
import { n as v, t as y } from './sparkles-B1Azk1yP.js';
var b = v(`ArrowLeft`, [
    [`path`, { d: `m12 19-7-7 7-7`, key: `1l729n` }],
    [`path`, { d: `M19 12H5`, key: `x3x0zl` }],
  ]),
  x = v(`User`, [
    [`path`, { d: `M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2`, key: `975kel` }],
    [`circle`, { cx: `12`, cy: `7`, r: `4`, key: `17ys0d` }],
  ]),
  S = n();
function C({ label: e, value: t }) {
  return (0, S.jsxs)(`div`, {
    className: `bg-base border border-border rounded-panel p-3`,
    children: [
      (0, S.jsx)(`div`, {
        className: `text-muted text-xs uppercase tracking-wider font-semibold`,
        children: e,
      }),
      (0, S.jsx)(`div`, {
        className: `font-mono text-mono-lg text-primary font-bold mt-1`,
        children: t,
      }),
    ],
  });
}
function w({ repoId: e, commitSha: t, previousSha: n }) {
  let i = s(n ? [`graph-diff`, e, n, t] : null, () => r(e, n, t));
  if (!n) return null;
  if (i.isLoading)
    return (0, S.jsx)(`div`, {
      className: `bg-surface border border-border rounded-panel p-5 shadow-panel text-muted`,
      children: `Loading structural diff...`,
    });
  if (i.error || !i.data)
    return (0, S.jsx)(`div`, {
      className: `bg-surface border border-border rounded-panel p-5 shadow-panel text-health-critical`,
      children: `Could not load structural diff.`,
    });
  let a = i.data;
  return (0, S.jsxs)(`section`, {
    className: `bg-surface border border-border rounded-panel p-5 shadow-panel`,
    children: [
      (0, S.jsx)(`h2`, {
        className: `font-head text-h2 text-primary mb-4`,
        children: `Structural Change vs Previous Commit`,
      }),
      (0, S.jsxs)(`div`, {
        className: `grid grid-cols-2 md:grid-cols-5 gap-3 mb-5`,
        children: [
          (0, S.jsx)(C, { label: `Files Added`, value: a.summary.files_added }),
          (0, S.jsx)(C, { label: `Files Removed`, value: a.summary.files_removed }),
          (0, S.jsx)(C, { label: `Files Changed`, value: a.summary.files_changed }),
          (0, S.jsx)(C, { label: `Edges Added`, value: a.summary.edges_added }),
          (0, S.jsx)(C, { label: `Edges Removed`, value: a.summary.edges_removed }),
        ],
      }),
      a.nodes_changed.length > 0
        ? (0, S.jsxs)(`div`, {
            children: [
              (0, S.jsx)(`p`, {
                className: `text-xs text-muted mb-2 uppercase tracking-wider font-semibold`,
                children: `Biggest Complexity Shifts`,
              }),
              (0, S.jsx)(`div`, {
                className: `space-y-2`,
                children: a.nodes_changed.slice(0, 5).map((e) =>
                  (0, S.jsxs)(
                    `div`,
                    {
                      className: `flex items-center justify-between gap-4 text-small border-b border-border/60 pb-2 last:border-b-0`,
                      children: [
                        (0, S.jsx)(`span`, {
                          className: `text-secondary truncate font-mono`,
                          children: e.file,
                        }),
                        (0, S.jsxs)(`span`, {
                          className:
                            e.delta_pct > 0
                              ? `text-health-critical font-mono`
                              : `text-health-good font-mono`,
                          children: [e.delta_pct > 0 ? `+` : ``, e.delta_pct, `%`],
                        }),
                      ],
                    },
                    e.file
                  )
                ),
              }),
            ],
          })
        : (0, S.jsx)(`p`, {
            className: `text-small text-muted`,
            children: `No file complexity changed by more than 10%.`,
          }),
    ],
  });
}
function T() {
  let { repoSlug: n, sha: r } = e(),
    v = t(),
    C = s(n ? [`repo`, n] : null, () => i(n)),
    T = C.data,
    E = s(T && r ? [`commit-detail`, T.id, r] : null, () => o(T.id, r)),
    D = s(T ? [`timeline`, T.id] : null, () => a(T.id));
  if (C.isLoading || E.isLoading)
    return (0, S.jsxs)(`div`, {
      className: `min-h-screen bg-transparent flex flex-col items-center justify-center gap-4 text-slate-300`,
      children: [
        (0, S.jsx)(y, { className: `w-8 h-8 text-purple-400 animate-spin` }),
        (0, S.jsx)(`span`, {
          className: `text-sm font-medium animate-pulse`,
          children: `Decompressing repository snapshot details...`,
        }),
      ],
    });
  if (C.error || E.error || !T || !E.data)
    return (0, S.jsxs)(`div`, {
      className: `min-h-screen bg-transparent flex flex-col items-center justify-center gap-4 text-rose-400`,
      children: [
        (0, S.jsx)(`span`, { className: `w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping` }),
        (0, S.jsx)(`span`, {
          className: `text-sm font-semibold`,
          children: `Failed to fetch commit metadata snapshot.`,
        }),
        (0, S.jsx)(`button`, {
          onClick: () => v(`/dashboard/${n}`),
          className: `text-xs bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-full px-4 py-2 transition-all mt-2`,
          children: `Return to Dashboard`,
        }),
      ],
    });
  let O = E.data,
    k = O.snapshot,
    A = p(k.health_score),
    j = D.data || [],
    M = j.findIndex((e) => e.sha === O.commit.sha),
    N = M > 0 ? j[M - 1].sha : null,
    P = Math.min(Math.max(k.churn_rate * 100, 0), 100);
  return (0, S.jsxs)(`div`, {
    className: `min-h-screen bg-transparent relative z-10 font-body pb-12 pt-[88px]`,
    children: [
      (0, S.jsx)(`div`, {
        className: `w-full fixed top-0 left-0 right-0 z-50 select-none pointer-events-none px-4 sm:px-6 pt-4`,
        children: (0, S.jsxs)(`nav`, {
          className: `glass-panel rounded-full h-16 px-6 flex items-center justify-between shadow-2xl pointer-events-auto`,
          children: [
            (0, S.jsxs)(`button`, {
              onClick: () => v(`/dashboard/${n}`),
              className: `text-xs font-bold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2.5 transition-all flex items-center gap-2 pointer-events-auto`,
              children: [
                (0, S.jsx)(b, { className: `w-4 h-4 text-purple-400` }),
                `Return to `,
                T.name,
                ` Dashboard`,
              ],
            }),
            (0, S.jsx)(c, {}),
          ],
        }),
      }),
      (0, S.jsxs)(`main`, {
        className: `max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-8`,
        children: [
          (0, S.jsxs)(`section`, {
            className: `glass-panel rounded-[28px] p-6 shadow-2xl relative border border-white/10 overflow-hidden`,
            children: [
              (0, S.jsx)(`div`, {
                className: `absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[60px] pointer-events-none`,
              }),
              (0, S.jsxs)(`div`, {
                className: `flex items-center gap-2 bg-purple-500/10 border border-purple-500/15 px-3 py-1 rounded-full w-fit`,
                children: [
                  (0, S.jsx)(d, { className: `w-3.5 h-3.5 text-purple-300` }),
                  (0, S.jsx)(`span`, {
                    className: `font-mono text-[10px] font-bold text-purple-300 select-all leading-none`,
                    children: O.commit.sha,
                  }),
                ],
              }),
              (0, S.jsx)(`h1`, {
                className: `font-head text-[22px] sm:text-[26px] font-bold text-white tracking-tight mt-3 break-words leading-snug`,
                children: m(O.commit.message),
              }),
              (0, S.jsxs)(`div`, {
                className: `flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 pt-4 border-t border-white/5 text-xs text-slate-400 font-medium`,
                children: [
                  (0, S.jsxs)(`span`, {
                    className: `flex items-center gap-1.5`,
                    children: [
                      (0, S.jsx)(x, { className: `w-4 h-4 text-purple-400` }),
                      O.commit.author_name || `Unknown Author`,
                    ],
                  }),
                  (0, S.jsxs)(`span`, {
                    className: `flex items-center gap-1.5`,
                    children: [
                      (0, S.jsx)(g, { className: `w-4 h-4 text-purple-400` }),
                      new Date(O.commit.committed_at).toLocaleDateString(void 0, {
                        dateStyle: `long`,
                      }),
                    ],
                  }),
                  (0, S.jsxs)(`div`, {
                    className: `flex items-center gap-2 ml-auto`,
                    children: [
                      (0, S.jsx)(`span`, {
                        className: `text-slate-500 font-mono text-[10px]`,
                        children: `HEALTH METRIC:`,
                      }),
                      (0, S.jsx)(`span`, {
                        style: { color: A },
                        className: `font-mono text-base font-extrabold select-all`,
                        children: k.health_score.toFixed(1),
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          (0, S.jsx)(`section`, {
            className: `grid grid-cols-2 md:grid-cols-5 gap-4`,
            children: [
              {
                label: `Avg Complexity`,
                value: k.avg_complexity === 0 ? `-` : k.avg_complexity.toFixed(1),
                unit: k.avg_complexity === 0 ? `no code files changed` : `cyclomatic score`,
                icon: (0, S.jsx)(_, { className: `w-4 h-4 text-rose-400` }),
              },
              {
                label: `Max Complexity`,
                value: k.max_complexity.toFixed(1),
                unit: `single file limit`,
                icon: (0, S.jsx)(_, { className: `w-4 h-4 text-orange-400` }),
              },
              {
                label: `Commit Churn`,
                value: `${P.toFixed(0)}%`,
                unit: `${k.insertions || 0} + / ${k.deletions || 0} -`,
                icon: (0, S.jsx)(l, { className: `w-4 h-4 text-sky-400` }),
              },
              {
                label: `Bus Factor`,
                value: String(k.bus_factor_min),
                unit: `contributor pool`,
                icon: (0, S.jsx)(h, { className: `w-4 h-4 text-emerald-400` }),
              },
              {
                label: `Semantic Drift`,
                value: `${(k.subscores?.semantic_drift ?? k.semantic_health_score ?? 100).toFixed(0)}`,
                unit:
                  k.semantic_drift_method === `graphcodebert`
                    ? `GraphCodeBERT`
                    : `offline semantic`,
                icon: (0, S.jsx)(y, { className: `w-4 h-4 text-purple-400` }),
              },
            ].map((e) =>
              (0, S.jsxs)(
                `div`,
                {
                  className: `glass-panel rounded-[24px] p-5 shadow-2xl border border-white/10 hover:border-white/15 transition-all flex flex-col justify-between`,
                  children: [
                    (0, S.jsxs)(`div`, {
                      className: `flex items-center justify-between text-slate-400 mb-2`,
                      children: [
                        (0, S.jsx)(`span`, {
                          className: `font-head text-[10px] font-semibold uppercase tracking-wider`,
                          children: e.label,
                        }),
                        e.icon,
                      ],
                    }),
                    (0, S.jsx)(`div`, {
                      className: `font-head text-[32px] font-extralight text-white tracking-tight Outfit my-1`,
                      children: e.value,
                    }),
                    (0, S.jsx)(`div`, {
                      className: `text-slate-500 text-[10px] font-medium font-mono uppercase tracking-tight`,
                      children: e.unit,
                    }),
                  ],
                },
                e.label
              )
            ),
          }),
          (0, S.jsx)(f, { graphData: O.graph, selectedSha: O.commit.sha }),
          (0, S.jsx)(w, { repoId: T.id, commitSha: O.commit.sha, previousSha: N }),
          (0, S.jsx)(u, { repoId: T.id, commitSha: O.commit.sha }),
        ],
      }),
    ],
  });
}
export { T as default };
