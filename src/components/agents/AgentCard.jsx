import { useNavigate } from 'react-router-dom'
import { MessageSquare, MoreVertical, Trash2 } from 'lucide-react'
import Card from '../ui/Card.jsx'
import Badge from '../ui/Badge.jsx'

const statusColors = { idle: 'gray', active: 'green', busy: 'yellow' }

export default function AgentCard({ agent, onDelete }) {
  const navigate = useNavigate()

  return (
    <Card hover onClick={() => navigate(`/agents/${agent.id}`)} className="relative group">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{agent.emoji}</span>
          <div>
            <h3 className="font-semibold text-[var(--text-primary)]">{agent.name}</h3>
            <p className="text-xs text-[var(--text-muted)]">{agent.role}</p>
          </div>
        </div>
        <Badge color={statusColors[agent.status]}>{agent.status}</Badge>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {agent.skills.map((skill) => (
          <Badge key={skill} color="blue">{skill}</Badge>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
        <button
          onClick={(e) => { e.stopPropagation(); navigate(`/agents/${agent.id}`); }}
          className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
        >
          <MessageSquare size={14} />
          Chat
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete?.(agent.id); }}
          className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </Card>
  )
}
