import { Users, ListTodo, CheckCircle, Zap } from 'lucide-react'
import Card from '../ui/Card.jsx'
import { useAgentStore } from '../../stores/useAgentStore.js'
import { useTaskStore } from '../../stores/useTaskStore.js'

export default function StatsGrid() {
  const agents = useAgentStore((s) => s.agents)
  const tasks = useTaskStore((s) => s.tasks)

  const stats = [
    {
      label: 'Total Agents',
      value: agents.length,
      icon: Users,
      color: 'text-blue-400',
      bg: 'bg-blue-500/15',
    },
    {
      label: 'Active Agents',
      value: agents.filter((a) => a.status !== 'idle').length,
      icon: Zap,
      color: 'text-green-400',
      bg: 'bg-green-500/15',
    },
    {
      label: 'Total Tasks',
      value: tasks.length,
      icon: ListTodo,
      color: 'text-purple-400',
      bg: 'bg-purple-500/15',
    },
    {
      label: 'Completed',
      value: tasks.filter((t) => t.status === 'completed').length,
      icon: CheckCircle,
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/15',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${stat.bg}`}>
              <stat.icon size={20} className={stat.color} />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
