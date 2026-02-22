import { useCallback } from 'react'
import { useConversationStore } from '../stores/useConversationStore.js'
import { useAgentStore } from '../stores/useAgentStore.js'
import { useActivityStore } from '../stores/useActivityStore.js'
import { useStreamingMessage } from './useStreamingMessage.js'

export function useAgentChat(agentId) {
  const messages = useConversationStore((s) => s.getMessages(agentId))
  const addMessage = useConversationStore((s) => s.addMessage)
  const updateLastAssistantMessage = useConversationStore((s) => s.updateLastAssistantMessage)
  const clearConversation = useConversationStore((s) => s.clearConversation)
  const agent = useAgentStore((s) => s.getAgent(agentId))
  const setAgentStatus = useAgentStore((s) => s.setAgentStatus)
  const addActivity = useActivityStore((s) => s.addActivity)

  const { isStreaming, streamedText, startStream, stopStream } = useStreamingMessage()

  const sendMessage = useCallback(
    async (content) => {
      if (!agent) return

      addMessage(agentId, 'user', content)
      addMessage(agentId, 'assistant', '')
      setAgentStatus(agentId, 'active')

      const allMessages = [
        ...useConversationStore.getState().getMessages(agentId).filter((m) => m.content),
        { role: 'user', content },
      ]

      try {
        const fullText = await startStream({
          model: agent.model,
          systemPrompt: agent.systemPrompt,
          messages: allMessages,
        })
        updateLastAssistantMessage(agentId, fullText)
        addActivity('chat', agentId, agent.name, 'Responded to message')
      } catch (error) {
        updateLastAssistantMessage(agentId, `Error: ${error.message}`)
      } finally {
        setAgentStatus(agentId, 'idle')
      }
    },
    [agent, agentId, addMessage, updateLastAssistantMessage, setAgentStatus, addActivity, startStream]
  )

  return {
    messages,
    isStreaming,
    streamedText,
    sendMessage,
    stopStream,
    clearConversation: () => clearConversation(agentId),
  }
}
