import { streamMessage } from './claude.js'
import { useSettingsStore } from '../stores/useSettingsStore.js'
import { useAgentStore } from '../stores/useAgentStore.js'
import { useTaskStore } from '../stores/useTaskStore.js'
import { useActivityStore } from '../stores/useActivityStore.js'

export async function runTask(task, agent, onStream) {
  const apiKey = useSettingsStore.getState().apiKey
  if (!apiKey) throw new Error('No API key configured')

  useAgentStore.getState().setAgentStatus(agent.id, 'busy')
  useTaskStore.getState().updateTask(task.id, { status: 'running' })
  useActivityStore.getState().addActivity(
    'task_started',
    agent.id,
    agent.name,
    `Started task: ${task.title}`
  )

  let result = ''
  let usage = null

  try {
    const messages = [
      {
        role: 'user',
        content: `## Task: ${task.title}\n\n${task.description}`,
      },
    ]

    const stream = streamMessage({
      apiKey,
      model: agent.model,
      systemPrompt: agent.systemPrompt,
      messages,
    })

    for await (const event of stream) {
      if (event.type === 'text') {
        result += event.text
        onStream?.(result)
      } else if (event.type === 'done') {
        usage = event.usage
      }
    }

    useTaskStore.getState().updateTask(task.id, {
      status: 'completed',
      result,
      tokenUsage: usage,
      completedAt: Date.now(),
    })
    useActivityStore.getState().addActivity(
      'task_completed',
      agent.id,
      agent.name,
      `Completed task: ${task.title}`
    )
  } catch (error) {
    useTaskStore.getState().updateTask(task.id, {
      status: 'failed',
      result: `Error: ${error.message}`,
      completedAt: Date.now(),
    })
    useActivityStore.getState().addActivity(
      'task_failed',
      agent.id,
      agent.name,
      `Failed task: ${task.title} — ${error.message}`
    )
  } finally {
    useAgentStore.getState().setAgentStatus(agent.id, 'idle')
  }

  return result
}
