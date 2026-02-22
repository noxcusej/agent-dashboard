import { useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { ArrowLeft, MessageSquare, Settings, ListTodo } from 'lucide-react'
import TopBar from '../components/layout/TopBar.jsx'
import ChatPanel from '../components/chat/ChatPanel.jsx'
import AgentConfigForm from '../components/agents/AgentConfigForm.jsx'
import TaskAssignForm from '../components/tasks/TaskAssignForm.jsx'
import TaskList from '../components/tasks/TaskList.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import { useAgentStore } from '../stores/useAgentStore.js'
import { useTaskStore } from '../stores/useTaskStore.js'

const tabs = [
  { id: 'chat', label: 'Chat', icon: MessageSquare },
  { id: 'tasks', label: 'Tasks', icon: ListTodo },
  { id: 'config', label: 'Config', icon: Settings },
]

export default function AgentDetailPage() {
  const { agentId } = useParams()
  const navigate = useNavigate()
  const agent = useAgentStore((s) => s.getAgent(agentId))
  const agentTasks = useTaskStore((s) => s.getTasksForAgent(agentId))
  const [activeTab, setActiveTab] = useState('chat')
  const [, forceUpdate] = useState(0)

  if (!agent) return <Navigate to="/agents" replace />

  return (
    <div className="h-screen flex flex-col">
      <TopBar title={`${agent.emoji} ${agent.name}`} />

      <div className="flex items-center gap-3 px-6 py-3 border-b border-[var(--border)]">
        <Button variant="ghost" size="sm" onClick={() => navigate('/agents')}>
          <ArrowLeft size={16} />
        </Button>
        <div className="flex-1">
          <p className="text-sm text-[var(--text-muted)]">{agent.role}</p>
        </div>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeTab === tab.id
                ? 'bg-blue-600/15 text-blue-400'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-hidden">
        {activeTab === 'chat' && <ChatPanel agent={agent} />}
        {activeTab === 'tasks' && (
          <div className="p-6 overflow-y-auto h-full space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Assign New Task</h3>
              <TaskAssignForm agentId={agent.id} onSubmit={() => forceUpdate((n) => n + 1)} />
            </div>
            <div>
              <h3 className="font-semibold mb-3">Task History</h3>
              <TaskList tasks={agentTasks} onUpdate={() => forceUpdate((n) => n + 1)} />
            </div>
          </div>
        )}
        {activeTab === 'config' && (
          <div className="p-6 max-w-2xl overflow-y-auto h-full">
            <AgentConfigForm agent={agent} />
          </div>
        )}
      </div>
    </div>
  )
}
