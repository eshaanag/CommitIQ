import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import AmbientBackground from './components/AmbientBackground'

const LandingPage = lazy(() => import('./pages/LandingPage'))
const AnalyzePage = lazy(() => import('./pages/AnalyzePage'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const CommitDetailPage = lazy(() => import('./pages/CommitDetailPage'))
const DemoPage = lazy(() => import('./pages/DemoPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function RouteFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center text-slate-400">
      <div className="glass-panel rounded-full px-5 py-3 text-xs font-semibold">
        Loading workspace...
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="relative min-h-screen text-[var(--color-primary)] selection:bg-purple-500/30 selection:text-white">
        <AmbientBackground />
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/analyze" element={<AnalyzePage />} />
            <Route path="/dashboard/:repoSlug" element={<DashboardPage />} />
            <Route path="/dashboard/:repoSlug/commit/:sha" element={<CommitDetailPage />} />
            <Route path="/demo" element={<DemoPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <Analytics />
      </div>
    </BrowserRouter>
  )
}
