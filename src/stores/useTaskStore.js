import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { generateId } from '../lib/utils.js'

export const useTaskStore = create(
  persist(
    (set, get) => ({
      tasks: [],

      addTask: (taskData) => {
        const task = {
          id: generateId(),
          agentId: taskData.agentId,
          title: taskData.title,
          description: taskData.description,
          status: 'pending',
          result: '',
          tokenUsage: null,
          createdAt: Date.now(),
          completedAt: null,
        }
        set((s) => ({ tasks: [...s.tasks, task] }))
        return task
      },

      updateTask: (id, updates) =>
        set((s) => ({
          tasks: s.tasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),

      getTasksForAgent: (agentId) => get().tasks.filter((t) => t.agentId === agentId),

      getTask: (id) => get().tasks.find((t) => t.id === id),

      removeTask: (id) =>
        set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),

      deleteAgentTasks: (agentId) =>
        set((s) => ({ tasks: s.tasks.filter((t) => t.agentId !== agentId) })),
    }),
    { name: 'agent-dashboard-tasks' }
  )
)
