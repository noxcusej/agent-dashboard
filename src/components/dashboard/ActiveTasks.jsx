import { useNavigate } from 'react-router-dom'
import { ListTodo } from 'lucide-react'
import Card from '../ui/Card.jsx'
import Badge from '../ui/Badge.jsx'
import Spinner from '../ui/Spinner.jsx'
import { useTaskStore } from '../../stores/useTaskStore.js'
import { useAgentStore } from '../../stores/useAgentStore.js'
import { timeAgo } from '../../lib/utils.js'

export default function ActiveTasks() {
  const navigate = useNavigate()
  const tasks = useTaskStore((s) => s.tasks)
  const activeTasks = tasks.filter((t) => t.status === 'running' || t.status === 'pending').slice(0, 5)

  return (
    <Card>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold flex items-center gap-2">
          <ListTodo size={16} className="text-[var(--text-muted)]" />
          Active Tasks
        </h3>
        {tasks.length > 0 && (
          <button
            onClick={() => navigate('/tasks')}
            className="text-xs text-blue-400 hover:text-blue-300 cursor-pointer"
          >
            View all
          </button>
        )}
      </div>
      {activeTasks.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)] py-4 text-center">No active tasks</p>
      ) : (
        <div className="space-y-2">
          {activeTasks.map((task) => (
            <ActiveTaskRow key={task.id} task={task} />
          ))}
        </div>
      )}
    </Card>
  )
}

function ActiveTaskRow({ task }) {
  const agent = useAgentStore((s) => s.getAgent(task.agentId))
  return (
    <div className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-[var(--bg-elevated)] transition-colors">
      <span className="text-sm">{agent?.emoji || '🤖'}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{task.title}</p>
        <p className="text-xs text-[var(--text-muted)]">{agent?.name || 'Unknown'}</p>
      </div>
      <Badge color={task.status === 'running' ? 'yellow' : 'gray'}>
        {task.status === 'running' && <Spinner size={10} />}
        {task.status}
      </Badge>
    </div>
  )
}
