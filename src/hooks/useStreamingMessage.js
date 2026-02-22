import { useState, useCallback, useRef } from 'react'
import { streamMessage } from '../services/claude.js'
import { useSettingsStore } from '../stores/useSettingsStore.js'

export function useStreamingMessage() {
  const [isStreaming, setIsStreaming] = useState(false)
  const [streamedText, setStreamedText] = useState('')
  const [usage, setUsage] = useState(null)
  const abortRef = useRef(false)

  const startStream = useCallback(async ({ model, systemPrompt, messages }) => {
    const apiKey = useSettingsStore.getState().apiKey
    if (!apiKey) throw new Error('No API key configured')

    setIsStreaming(true)
    setStreamedText('')
    setUsage(null)
    abortRef.current = false

    let fullText = ''

    try {
      const stream = streamMessage({ apiKey, model, systemPrompt, messages })

      for await (const event of stream) {
        if (abortRef.current) break

        if (event.type === 'text') {
          fullText += event.text
          setStreamedText(fullText)
        } else if (event.type === 'done') {
          setUsage(event.usage)
        }
      }
    } finally {
      setIsStreaming(false)
    }

    return fullText
  }, [])

  const stopStream = useCallback(() => {
    abortRef.current = true
  }, [])

  return { isStreaming, streamedText, usage, startStream, stopStream }
}
