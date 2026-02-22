import { useNavigate } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import Card from '../ui/Card.jsx'
import Badge from '../ui/Badge.jsx'
import Button from '../ui/Button.jsx'
import { useAgentStore } from '../../stores/useAgentStore.js'

const statusColors = { idle: 'gray', active: 'green', busy: 'yellow' }

export default function TeamOverview({ onHire }) {
  const navigate = useNavigate()
  const agents = useAgentStore((s) => s.agents)

  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Your Team</h3>
        <Button size="sm" onClick={onHire}>
          <UserPlus size={14} />
          Hire
        </Button>
      </div>
      {agents.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)] py-4 text-center">No agents hired yet</p>
      ) : (
        <div className="space-y-1.5">
          {agents.slice(0, 6).map((agent) => (
            <button
              key={agent.id}
              onClick={() => navigate(`/agents/${agent.id}`)}
              className="w-full flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-[var(--bg-elevated)] transition-colors text-left cursor-pointer"
            >
              <span className="text-lg">{agent.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{agent.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{agent.role}</p>
              </div>
              <Badge color={statusColors[agent.status]}>{agent.status}</Badge>
            </button>
          ))}
        </div>
      )}
    </Card>
  )
}
