import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { generateId } from '../lib/utils.js'

export const useAgentStore = create(
  persist(
    (set, get) => ({
      agents: [],

      addAgent: (agentData) => {
        const agent = {
          id: generateId(),
          name: agentData.name,
          role: agentData.role,
          emoji: agentData.emoji || '🤖',
          systemPrompt: agentData.systemPrompt,
          skills: agentData.skills || [],
          model: agentData.model || 'claude-sonnet-4-6',
          status: 'idle',
          createdAt: Date.now(),
        }
        set((s) => ({ agents: [...s.agents, agent] }))
        return agent
      },

      updateAgent: (id, updates) =>
        set((s) => ({
          agents: s.agents.map((a) => (a.id === id ? { ...a, ...updates } : a)),
        })),

      removeAgent: (id) =>
        set((s) => ({ agents: s.agents.filter((a) => a.id !== id) })),

      getAgent: (id) => get().agents.find((a) => a.id === id),

      setAgentStatus: (id, status) =>
        set((s) => ({
          agents: s.agents.map((a) => (a.id === id ? { ...a, status } : a)),
        })),
    }),
    { name: 'agent-dashboard-agents' }
  )
)
