import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { timeAgo } from '../../lib/utils.js'

export default function ChatMessage({ message, agentEmoji, isStreaming, streamedText }) {
  const isUser = message.role === 'user'
  const content = isStreaming ? streamedText : message.content

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm ${
        isUser ? 'bg-blue-600' : 'bg-[var(--bg-elevated)]'
      }`}>
        {isUser ? '👤' : agentEmoji}
      </div>
      <div className={`max-w-[80%] ${isUser ? 'text-right' : ''}`}>
        <div className={`rounded-xl px-4 py-2.5 ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-[var(--bg-elevated)] border border-[var(--border)]'
        }`}>
          {isUser ? (
            <p className="text-sm whitespace-pre-wrap">{content}</p>
          ) : content ? (
            <div className="prose-chat text-sm">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
          ) : (
            <StreamingDots />
          )}
        </div>
        {message.timestamp && (
          <p className="text-xs text-[var(--text-muted)] mt-1 px-1">
            {timeAgo(message.timestamp)}
          </p>
        )}
      </div>
    </div>
  )
}

function StreamingDots() {
  return (
    <div className="flex gap-1 py-1">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 bg-[var(--text-muted)] rounded-full"
          style={{ animation: `pulse-dot 1.2s ease-in-out ${i * 0.2}s infinite` }}
        />
      ))}
    </div>
  )
}
