import { useState } from 'react'
import { Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react'
import Button from '../ui/Button.jsx'
import Input, { Select } from '../ui/Input.jsx'
import Card from '../ui/Card.jsx'
import Spinner from '../ui/Spinner.jsx'
import { useSettingsStore } from '../../stores/useSettingsStore.js'
import { MODELS } from '../../lib/models.js'
import { testConnection } from '../../services/claude.js'

export default function ApiKeyForm() {
  const { apiKey, defaultModel, setApiKey, setDefaultModel } = useSettingsStore()
  const [inputKey, setInputKey] = useState(apiKey)
  const [showKey, setShowKey] = useState(false)
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState(null)

  const handleSave = () => {
    setApiKey(inputKey)
    setTestResult(null)
  }

  const handleTest = async () => {
    setTesting(true)
    setTestResult(null)
    const result = await testConnection(inputKey)
    setTestResult(result)
    setTesting(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <h3 className="font-semibold mb-4">API Configuration</h3>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-[var(--text-secondary)]">Anthropic API Key</label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input
                  type={showKey ? 'text' : 'password'}
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  placeholder="sk-ant-..."
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 pr-10 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-500 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] cursor-pointer"
                >
                  {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <Button onClick={handleSave} disabled={!inputKey.trim()}>Save</Button>
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              Your API key is stored locally in your browser only. Never shared.
            </p>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button variant="secondary" onClick={handleTest} disabled={!inputKey.trim() || testing}>
              {testing ? <><Spinner size={14} /> Testing...</> : 'Test Connection'}
            </Button>
            {testResult && (
              <div className={`flex items-center gap-1.5 text-sm ${testResult.success ? 'text-green-400' : 'text-red-400'}`}>
                {testResult.success ? <CheckCircle size={16} /> : <XCircle size={16} />}
                {testResult.success ? 'Connection successful!' : testResult.error}
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold mb-4">Default Model</h3>
        <Select
          value={defaultModel}
          onChange={(e) => setDefaultModel(e.target.value)}
        >
          {MODELS.map((m) => (
            <option key={m.id} value={m.id}>{m.label} — {m.description}</option>
          ))}
        </Select>
        <p className="text-xs text-[var(--text-muted)] mt-2">
          Used as the default when hiring new agents.
        </p>
      </Card>
    </div>
  )
}
