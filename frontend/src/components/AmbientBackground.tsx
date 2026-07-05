export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-base transition-colors duration-500 select-none pointer-events-none">
      <div
        className="absolute w-[500px] h-[500px] rounded-full bg-purple-600/10 dark:bg-purple-600/15 blur-[120px] animate-float-slow transition-colors duration-500"
        style={{ top: '10%', left: '15%' }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 blur-[140px] animate-float-medium transition-colors duration-500"
        style={{ bottom: '15%', right: '10%' }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-[110px] animate-float-slow transition-colors duration-500"
        style={{ top: '40%', right: '25%' }}
      />
      <div
        className="absolute w-[450px] h-[450px] rounded-full bg-emerald-500/3 dark:bg-emerald-500/5 blur-[100px] animate-float-medium transition-colors duration-500"
        style={{ bottom: '5%', left: '20%' }}
      />

      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.015] transition-opacity duration-500"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="absolute inset-0 bg-radial-gradient-vignette opacity-20 pointer-events-none" />
    </div>
  )
}
