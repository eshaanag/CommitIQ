import CommitHealthRadar from '../components/CommitHealthRadar'

export default function HealthRadarPage() {
  return (
    <main className="relative z-10 max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <CommitHealthRadar repoName="CommitIQ" timeRange="30d" />
    </main>
  )
}
