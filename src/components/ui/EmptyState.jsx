export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {Icon && (
        <div className="mb-4 p-3 bg-[var(--bg-elevated)] rounded-xl text-[var(--text-muted)]">
          <Icon size={32} />
        </div>
      )}
      <h3 className="text-lg font-medium text-[var(--text-primary)] mb-1">{title}</h3>
      {description && <p className="text-sm text-[var(--text-muted)] max-w-sm mb-4">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  )
}
