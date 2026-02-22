import { nanoid } from 'nanoid'
import { formatDistanceToNow } from 'date-fns'

export function generateId() {
  return nanoid(12)
}

export function timeAgo(date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function truncate(str, len = 100) {
  if (!str) return ''
  return str.length > len ? str.slice(0, len) + '...' : str
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
