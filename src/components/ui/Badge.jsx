import { classNames } from '../../lib/utils.js'

const colorMap = {
  blue: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
  green: 'bg-green-500/15 text-green-400 border-green-500/25',
  yellow: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
  red: 'bg-red-500/15 text-red-400 border-red-500/25',
  purple: 'bg-purple-500/15 text-purple-400 border-purple-500/25',
  gray: 'bg-gray-500/15 text-gray-400 border-gray-500/25',
}

export default function Badge({ children, color = 'gray', className }) {
  return (
    <span
      className={classNames(
        'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border',
        colorMap[color],
        className
      )}
    >
      {children}
    </span>
  )
}
