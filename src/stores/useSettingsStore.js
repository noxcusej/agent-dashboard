import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useSettingsStore = create(
  persist(
    (set, get) => ({
      apiKey: '',
      defaultModel: 'claude-sonnet-4-6',
      setApiKey: (key) => set({ apiKey: key }),
      setDefaultModel: (model) => set({ defaultModel: model }),
      hasApiKey: () => !!get().apiKey,
    }),
    { name: 'agent-dashboard-settings' }
  )
)
