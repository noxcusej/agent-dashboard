import { classNames } from '../../lib/utils.js'

export default function Card({ children, className, hover, onClick, ...props }) {
  return (
    <div
      className={classNames(
        'bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-5',
        hover && 'hover:border-[var(--border-light)] transition-colors cursor-pointer',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  )
}
