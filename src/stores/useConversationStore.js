import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { generateId } from '../lib/utils.js'

export const useConversationStore = create(
  persist(
    (set, get) => ({
      conversations: {},

      getMessages: (agentId) => get().conversations[agentId] || [],

      addMessage: (agentId, role, content) => {
        const message = {
          id: generateId(),
          role,
          content,
          timestamp: Date.now(),
        }
        set((s) => ({
          conversations: {
            ...s.conversations,
            [agentId]: [...(s.conversations[agentId] || []), message],
          },
        }))
        return message
      },

      updateLastAssistantMessage: (agentId, content) =>
        set((s) => {
          const msgs = s.conversations[agentId] || []
          const lastIdx = msgs.findLastIndex((m) => m.role === 'assistant')
          if (lastIdx === -1) return s
          const updated = [...msgs]
          updated[lastIdx] = { ...updated[lastIdx], content }
          return { conversations: { ...s.conversations, [agentId]: updated } }
        }),

      clearConversation: (agentId) =>
        set((s) => {
          const copy = { ...s.conversations }
          delete copy[agentId]
          return { conversations: copy }
        }),

      deleteAgentConversations: (agentId) =>
        set((s) => {
          const copy = { ...s.conversations }
          delete copy[agentId]
          return { conversations: copy }
        }),
    }),
    { name: 'agent-dashboard-conversations' }
  )
)
