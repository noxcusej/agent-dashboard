import { Users } from 'lucide-react'
import AgentCard from './AgentCard.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import Button from '../ui/Button.jsx'

export default function AgentRoster({ agents, onHire, onDelete }) {
  if (agents.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No agents yet"
        description="Hire your first AI agent to get started. Choose from templates or create a custom agent."
        action={<Button onClick={onHire}>Hire Your First Agent</Button>}
      />
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {agents.map((agent) => (
        <AgentCard key={agent.id} agent={agent} onDelete={onDelete} />
      ))}
    </div>
  )
}
