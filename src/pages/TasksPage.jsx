import { useState } from 'react'
import { Plus } from 'lucide-react'
import TopBar from '../components/layout/TopBar.jsx'
import TaskList from '../components/tasks/TaskList.jsx'
import TaskAssignForm from '../components/tasks/TaskAssignForm.jsx'
import Modal from '../components/ui/Modal.jsx'
import Button from '../components/ui/Button.jsx'
import { useTaskStore } from '../stores/useTaskStore.js'

export default function TasksPage() {
  const tasks = useTaskStore((s) => s.tasks)
  const [createOpen, setCreateOpen] = useState(false)
  const [filter, setFilter] = useState('all')
  const [, forceUpdate] = useState(0)

  const filteredTasks = filter === 'all' ? tasks : tasks.filter((t) => t.status === filter)
  const sorted = [...filteredTasks].sort((a, b) => b.createdAt - a.createdAt)

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending' },
    { id: 'running', label: 'Running' },
    { id: 'completed', label: 'Completed' },
    { id: 'failed', label: 'Failed' },
  ]

  return (
    <div>
      <TopBar title="Tasks" />
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold">Tasks</h2>
            <p className="text-sm text-[var(--text-muted)]">{tasks.length} total tasks</p>
          </div>
          <Button onClick={() => setCreateOpen(true)}>
            <Plus size={16} />
            New Task
          </Button>
        </div>

        <div className="flex gap-2 mb-4">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                filter === f.id
                  ? 'bg-blue-600/15 text-blue-400'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--bg-elevated)]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <TaskList tasks={sorted} onUpdate={() => forceUpdate((n) => n + 1)} />

        <Modal open={createOpen} onClose={() => setCreateOpen(false)} title="New Task">
          <TaskAssignForm onSubmit={() => { setCreateOpen(false); forceUpdate((n) => n + 1) }} />
        </Modal>
      </div>
    </div>
  )
}
