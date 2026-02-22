import { useState } from 'react'
import Modal from '../ui/Modal.jsx'
import Button from '../ui/Button.jsx'
import Input, { Textarea, Select } from '../ui/Input.jsx'
import { AGENT_TEMPLATES } from '../../lib/agentTemplates.js'
import { MODELS } from '../../lib/models.js'
import { useSettingsStore } from '../../stores/useSettingsStore.js'

export default function HireAgentModal({ open, onClose, onHire }) {
  const defaultModel = useSettingsStore((s) => s.defaultModel)
  const [mode, setMode] = useState('templates')
  const [form, setForm] = useState({
    name: '',
    role: '',
    emoji: '🤖',
    systemPrompt: '',
    skills: '',
    model: defaultModel,
  })

  const handleTemplateSelect = (template) => {
    setForm({
      name: template.name,
      role: template.role,
      emoji: template.emoji,
      systemPrompt: template.systemPrompt,
      skills: template.skills.join(', '),
      model: template.model,
    })
    setMode('custom')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name.trim()) return
    onHire({
      ...form,
      skills: form.skills.split(',').map((s) => s.trim()).filter(Boolean),
    })
    setForm({ name: '', role: '', emoji: '🤖', systemPrompt: '', skills: '', model: defaultModel })
    setMode('templates')
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title="Hire New Agent" wide>
      {mode === 'templates' ? (
        <div className="space-y-4">
          <p className="text-sm text-[var(--text-secondary)]">Quick-hire from a template, or create a custom agent.</p>
          <div className="grid grid-cols-2 gap-3">
            {AGENT_TEMPLATES.map((t) => (
              <button
                key={t.name}
                onClick={() => handleTemplateSelect(t)}
                className="flex items-start gap-3 p-3 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl hover:border-blue-500/50 transition-colors text-left cursor-pointer"
              >
                <span className="text-xl mt-0.5">{t.emoji}</span>
                <div>
                  <p className="font-medium text-sm">{t.name}</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{t.role}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="pt-2 border-t border-[var(--border)]">
            <Button variant="secondary" onClick={() => setMode('custom')} className="w-full">
              Create Custom Agent
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-[auto_1fr] gap-3">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[var(--text-secondary)]">Emoji</label>
              <input
                value={form.emoji}
                onChange={(e) => setForm({ ...form, emoji: e.target.value })}
                className="w-14 h-10 bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg text-center text-xl focus:outline-none focus:border-blue-500"
              />
            </div>
            <Input
              label="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Research Analyst"
              required
            />
          </div>
          <Input
            label="Role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            placeholder="e.g. Research & Analysis"
          />
          <Select
            label="Model"
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
          >
            {MODELS.map((m) => (
              <option key={m.id} value={m.id}>{m.label}</option>
            ))}
          </Select>
          <Input
            label="Skills (comma-separated)"
            value={form.skills}
            onChange={(e) => setForm({ ...form, skills: e.target.value })}
            placeholder="e.g. Research, Analysis, Writing"
          />
          <Textarea
            label="System Prompt"
            value={form.systemPrompt}
            onChange={(e) => setForm({ ...form, systemPrompt: e.target.value })}
            placeholder="Define the agent's personality and capabilities..."
            rows={5}
          />
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" type="button" onClick={() => setMode('templates')}>
              Back
            </Button>
            <Button type="submit" className="flex-1">
              Hire Agent
            </Button>
          </div>
        </form>
      )}
    </Modal>
  )
}
