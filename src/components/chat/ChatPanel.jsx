import { useEffect, useRef } from 'react'
import { Trash2, MessageSquare } from 'lucide-react'
import ChatMessage from './ChatMessage.jsx'
import ChatInput from './ChatInput.jsx'
import EmptyState from '../ui/EmptyState.jsx'
import Button from '../ui/Button.jsx'
import { useAgentChat } from '../../hooks/useAgentChat.js'
import { useSettingsStore } from '../../stores/useSettingsStore.js'

export default function ChatPanel({ agent }) {
  const { messages, isStreaming, streamedText, sendMessage, stopStream, clearConversation } =
    useAgentChat(agent.id)
  const hasApiKey = useSettingsStore((s) => !!s.apiKey)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, streamedText])

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
        <div className="flex items-center gap-2">
          <span className="text-lg">{agent.emoji}</span>
          <span className="font-medium text-sm">Chat with {agent.name}</span>
        </div>
        {messages.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearConversation}>
            <Trash2 size={14} />
            Clear
          </Button>
        )}
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <EmptyState
            icon={MessageSquare}
            title="Start a conversation"
            description={`Send a message to ${agent.name}. They'll respond using their configured role and expertise.`}
          />
        ) : (
          messages.map((msg, i) => {
            const isLast = i === messages.length - 1 && msg.role === 'assistant'
            return (
              <ChatMessage
                key={msg.id}
                message={msg}
                agentEmoji={agent.emoji}
                isStreaming={isLast && isStreaming}
                streamedText={isLast && isStreaming ? streamedText : undefined}
              />
            )
          })
        )}
      </div>

      <ChatInput
        onSend={sendMessage}
        isStreaming={isStreaming}
        onStop={stopStream}
        disabled={!hasApiKey}
      />
    </div>
  )
}
