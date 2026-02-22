import { useState } from 'react'
import Button from '../ui/Button.jsx'
import Input, { Textarea, Select } from '../ui/Input.jsx'
import { MODELS } from '../../lib/models.js'
import { useAgentStore } from '../../stores/useAgentStore.js'

export default function AgentConfigForm({ agent }) {
  const updateAgent = useAgentStore((s) => s.updateAgent)
  const [form, setForm] = useState({
    name: agent.name,
    role: agent.role,
    emoji: agent.emoji,
    systemPrompt: agent.systemPrompt,
    skills: agent.skills.join(', '),
    model: agent.model,
  })
  const [saved, setSaved] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    updateAgent(agent.id, {
      ...form,
      skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <form onSubmit={handleSave} className="space-y-4">
      <div className="grid grid-cols-[auto_1fr] gap-3">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-[var(--text-secondary)]">Emoji</label>
          <input
            value={form.emoji}
            onChange={(e) => setForm({ ...form, emoji: e.target.value })}
            className="w-14 h-10 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg text-center text-xl focus:outline-none focus:border-blue-500"
          />
        </div>
        <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>
      <Input label="Role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} />
      <Select label="Model" value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })}>
        {MODELS.map((m) => (
          <option key={m.id} value={m.id}>{m.label}</option>
        ))}
      </Select>
      <Input
        label="Skills (comma-separated)"
        value={form.skills}
        onChange={(e) => setForm({ ...form, skills: e.target.value })}
      />
      <Textarea
        label="System Prompt"
        value={form.systemPrompt}
        onChange={(e) => setForm({ ...form, systemPrompt: e.target.value })}
        rows={6}
      />
      <Button type="submit">
        {saved ? 'Saved!' : 'Save Configuration'}
      </Button>
    </form>
  )
}
