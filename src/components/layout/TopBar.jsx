import { useAgentStore } from '../../stores/useAgentStore.js'

export default function TopBar({ title }) {
  const agents = useAgentStore((s) => s.agents)
  const activeCount = agents.filter((a) => a.status !== 'idle').length

  return (
    <header className="h-14 border-b border-[var(--border)] bg-[var(--bg-card)]/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-10">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="flex items-center gap-3">
        {activeCount > 0 && (
          <div className="flex items-center gap-1.5 text-sm text-green-400">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            {activeCount} active
          </div>
        )}
        <span className="text-sm text-[var(--text-muted)]">
          {agents.length} agent{agents.length !== 1 ? 's' : ''}
        </span>
      </div>
    </header>
  )
}
