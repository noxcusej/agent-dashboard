import { useState } from 'react'
import Button from '../ui/Button.jsx'
import Input, { Textarea, Select } from '../ui/Input.jsx'
import { useAgentStore } from '../../stores/useAgentStore.js'
import { useTaskStore } from '../../stores/useTaskStore.js'
import { useActivityStore } from '../../stores/useActivityStore.js'

export default function TaskAssignForm({ agentId, onSubmit }) {
  const agents = useAgentStore((s) => s.agents)
  const addTask = useTaskStore((s) => s.addTask)
  const addActivity = useActivityStore((s) => s.addActivity)
  const [form, setForm] = useState({
    agentId: agentId || '',
    title: '',
    description: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.agentId) return
    const agent = agents.find((a) => a.id === form.agentId)
    const task = addTask(form)
    addActivity('task_created', form.agentId, agent?.name || 'Unknown', `Created task: ${form.title}`)
    onSubmit?.(task)
    setForm({ agentId: agentId || '', title: '', description: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!agentId && (
        <Select
          label="Assign to Agent"
          value={form.agentId}
          onChange={(e) => setForm({ ...form, agentId: e.target.value })}
          required
        >
          <option value="">Select an agent...</option>
          {agents.map((a) => (
            <option key={a.id} value={a.id}>{a.emoji} {a.name}</option>
          ))}
        </Select>
      )}
      <Input
        label="Task Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="e.g. Research competitive landscape"
        required
      />
      <Textarea
        label="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="Provide detailed instructions for the agent..."
        rows={4}
      />
      <Button type="submit">Assign Task</Button>
    </form>
  )
}
