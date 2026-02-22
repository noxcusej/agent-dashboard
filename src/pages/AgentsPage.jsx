import { useState } from 'react'
import { UserPlus } from 'lucide-react'
import TopBar from '../components/layout/TopBar.jsx'
import AgentRoster from '../components/agents/AgentRoster.jsx'
import HireAgentModal from '../components/agents/HireAgentModal.jsx'
import Button from '../components/ui/Button.jsx'
import { useAgentStore } from '../stores/useAgentStore.js'
import { useActivityStore } from '../stores/useActivityStore.js'
import { useConversationStore } from '../stores/useConversationStore.js'
import { useTaskStore } from '../stores/useTaskStore.js'

export default function AgentsPage() {
  const [hireOpen, setHireOpen] = useState(false)
  const agents = useAgentStore((s) => s.agents)
  const addAgent = useAgentStore((s) => s.addAgent)
  const removeAgent = useAgentStore((s) => s.removeAgent)
  const addActivity = useActivityStore((s) => s.addActivity)
  const deleteConversations = useConversationStore((s) => s.deleteAgentConversations)
  const deleteTasks = useTaskStore((s) => s.deleteAgentTasks)

  const handleHire = (data) => {
    const agent = addAgent(data)
    addActivity('agent_hired', agent.id, agent.name, 'Joined the team')
  }

  const handleDelete = (id) => {
    const agent = agents.find((a) => a.id === id)
    if (agent && confirm(`Fire ${agent.name}? This will delete all their conversations and tasks.`)) {
      removeAgent(id)
      deleteConversations(id)
      deleteTasks(id)
    }
  }

  return (
    <div>
      <TopBar title="Agents" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">Agent Roster</h2>
            <p className="text-sm text-[var(--text-muted)]">Manage your AI team</p>
          </div>
          <Button onClick={() => setHireOpen(true)}>
            <UserPlus size={16} />
            Hire Agent
          </Button>
        </div>
        <AgentRoster agents={agents} onHire={() => setHireOpen(true)} onDelete={handleDelete} />
        <HireAgentModal open={hireOpen} onClose={() => setHireOpen(false)} onHire={handleHire} />
      </div>
    </div>
  )
}
