import { useState, useRef } from 'react'
import { Send, Square } from 'lucide-react'

export default function ChatInput({ onSend, isStreaming, onStop, disabled }) {
  const [value, setValue] = useState('')
  const textareaRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!value.trim() || disabled) return
    onSend(value.trim())
    setValue('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleInput = (e) => {
    setValue(e.target.value)
    const el = e.target
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 160) + 'px'
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 p-4 border-t border-[var(--border)] bg-[var(--bg-card)]">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder={disabled ? 'Add API key in Settings first...' : 'Type a message...'}
        disabled={disabled}
        rows={1}
        className="flex-1 bg-[var(--bg-primary)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-blue-500 resize-none min-h-[40px] max-h-[160px]"
      />
      {isStreaming ? (
        <button
          type="button"
          onClick={onStop}
          className="p-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl transition-colors cursor-pointer"
        >
          <Square size={18} />
        </button>
      ) : (
        <button
          type="submit"
          disabled={!value.trim() || disabled}
          className="p-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl transition-colors cursor-pointer"
        >
          <Send size={18} />
        </button>
      )}
    </form>
  )
}
