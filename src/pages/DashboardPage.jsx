import { useState } from 'react'
import TopBar from '../components/layout/TopBar.jsx'
import StatsGrid from '../components/dashboard/StatsGrid.jsx'
import ActivityFeed from '../components/dashboard/ActivityFeed.jsx'
import ActiveTasks from '../components/dashboard/ActiveTasks.jsx'
import TeamOverview from '../components/dashboard/TeamOverview.jsx'
import HireAgentModal from '../components/agents/HireAgentModal.jsx'
import { useAgentStore } from '../stores/useAgentStore.js'
import { useActivityStore } from '../stores/useActivityStore.js'
import { useSettingsStore } from '../stores/useSettingsStore.js'
import { useNavigate } from 'react-router-dom'

export default function DashboardPage() {
  const [hireOpen, setHireOpen] = useState(false)
  const addAgent = useAgentStore((s) => s.addAgent)
  const addActivity = useActivityStore((s) => s.addActivity)
  const hasApiKey = useSettingsStore((s) => !!s.apiKey)
  const navigate = useNavigate()

  const handleHire = (data) => {
    const agent = addAgent(data)
    addActivity('agent_hired', agent.id, agent.name, 'Joined the team')
  }

  return (
    <div>
      <TopBar title="Dashboard" />
      <div className="p-6 space-y-6">
        {!hasApiKey && (
          <div className="bg-yellow-500/10 border border-yellow-500/25 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-yellow-400">API Key Required</p>
              <p className="text-xs text-[var(--text-muted)]">Add your Anthropic API key to start chatting with agents.</p>
            </div>
            <button
              onClick={() => navigate('/settings')}
              className="text-sm text-yellow-400 hover:text-yellow-300 font-medium cursor-pointer"
            >
              Go to Settings
            </button>
          </div>
        )}

        <StatsGrid />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ActiveTasks />
            <ActivityFeed />
          </div>
          <div>
            <TeamOverview onHire={() => setHireOpen(true)} />
          </div>
        </div>

        <HireAgentModal open={hireOpen} onClose={() => setHireOpen(false)} onHire={handleHire} />
      </div>
    </div>
  )
}
