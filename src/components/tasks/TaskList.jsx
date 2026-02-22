import { ListTodo } from 'lucide-react'
import TaskCard from './TaskCard.jsx'
import EmptyState from '../ui/EmptyState.jsx'

export default function TaskList({ tasks, onUpdate }) {
  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={ListTodo}
        title="No tasks yet"
        description="Assign a task to an agent to get started."
      />
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onUpdate={onUpdate} />
      ))}
    </div>
  )
}
