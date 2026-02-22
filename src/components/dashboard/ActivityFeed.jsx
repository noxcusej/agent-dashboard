import { Activity, MessageSquare, Play, CheckCircle, XCircle, UserPlus } from 'lucide-react'
import Card from '../ui/Card.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import { timeAgo } from '../../lib/utils.js'
import { useActivityStore } from '../../stores/useActivityStore.js'

const typeIcons = {
  agent_hired: UserPlus,
  chat: MessageSquare,
  task_created: Play,
  task_started: Play,
  task_completed: CheckCircle,
  task_failed: XCircle,
}

const typeColors = {
  agent_hired: 'text-blue-400',
  chat: 'text-purple-400',
  task_created: 'text-gray-400',
  task_started: 'text-yellow-400',
  task_completed: 'text-green-400',
  task_failed: 'text-red-400',
}

export default function ActivityFeed() {
  const activities = useActivityStore((s) => s.getRecentActivities(15))

  return (
    <Card>
      <h3 className="font-semibold mb-3 flex items-center gap-2">
        <Activity size={16} className="text-[var(--text-muted)]" />
        Activity Feed
      </h3>
      {activities.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)] py-4 text-center">No activity yet</p>
      ) : (
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {activities.map((activity) => {
            const Icon = typeIcons[activity.type] || Activity
            const color = typeColors[activity.type] || 'text-gray-400'
            return (
              <div key={activity.id} className="flex items-start gap-2.5 py-1.5">
                <Icon size={14} className={`mt-0.5 flex-shrink-0 ${color}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">
                    <span className="font-medium">{activity.agentName}</span>{' '}
                    <span className="text-[var(--text-secondary)]">{activity.description}</span>
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">{timeAgo(activity.timestamp)}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </Card>
  )
}
