import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { generateId } from '../lib/utils.js'

export const useActivityStore = create(
  persist(
    (set, get) => ({
      activities: [],

      addActivity: (type, agentId, agentName, description) => {
        const activity = {
          id: generateId(),
          type,
          agentId,
          agentName,
          description,
          timestamp: Date.now(),
        }
        set((s) => ({
          activities: [activity, ...s.activities].slice(0, 100),
        }))
      },

      getRecentActivities: (limit = 20) => get().activities.slice(0, limit),

      clearActivities: () => set({ activities: [] }),
    }),
    { name: 'agent-dashboard-activity' }
  )
)
