import { useState } from 'react'
import { Play, CheckCircle, XCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Card from '../ui/Card.jsx'
import Badge from '../ui/Badge.jsx'
import Button from '../ui/Button.jsx'
import Spinner from '../ui/Spinner.jsx'
import { timeAgo } from '../../lib/utils.js'
import { useAgentStore } from '../../stores/useAgentStore.js'
import { runTask } from '../../services/agentRunner.js'
import { useSettingsStore } from '../../stores/useSettingsStore.js'

const statusConfig = {
  pending: { color: 'gray', icon: Clock, label: 'Pending' },
  running: { color: 'yellow', icon: null, label: 'Running' },
  completed: { color: 'green', icon: CheckCircle, label: 'Completed' },
  failed: { color: 'red', icon: XCircle, label: 'Failed' },
}

export default function TaskCard({ task, onUpdate }) {
  const agent = useAgentStore((s) => s.getAgent(task.agentId))
  const hasApiKey = useSettingsStore((s) => !!s.apiKey)
  const [expanded, setExpanded] = useState(false)
  const [streamResult, setStreamResult] = useState('')
  const status = statusConfig[task.status]

  const handleRun = async () => {
    if (!agent || !hasApiKey) return
    setExpanded(true)
    setStreamResult('')
    await runTask(task, agent, (text) => setStreamResult(text))
    onUpdate?.()
  }

  const result = task.status === 'running' ? streamResult : task.result

  return (
    <Card>
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            {agent && <span className="text-sm">{agent.emoji}</span>}
            <h3 className="font-medium text-sm">{task.title}</h3>
          </div>
          {task.description && (
            <p className="text-xs text-[var(--text-muted)] line-clamp-2">{task.description}</p>
          )}
        </div>
        <div className="flex items-center gap-2 ml-3">
          <Badge color={status.color}>
            {task.status === 'running' && <Spinner size={12} />}
            {status.label}
          </Badge>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
        <span className="text-xs text-[var(--text-muted)]">{timeAgo(task.createdAt)}</span>
        <div className="flex items-center gap-2">
          {task.status === 'pending' && (
            <Button size="sm" onClick={handleRun} disabled={!hasApiKey}>
              <Play size={12} /> Run
            </Button>
          )}
          {result && (
            <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)}>
              {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {expanded ? 'Collapse' : 'View Result'}
            </Button>
          )}
        </div>
      </div>

      {expanded && result && (
        <div className="mt-3 pt-3 border-t border-[var(--border)] prose-chat text-sm max-h-96 overflow-y-auto">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
          {task.tokenUsage && (
            <div className="mt-2 pt-2 border-t border-[var(--border)] text-xs text-[var(--text-muted)]">
              Tokens: {task.tokenUsage.inputTokens} in / {task.tokenUsage.outputTokens} out
            </div>
          )}
        </div>
      )}
    </Card>
  )
}
