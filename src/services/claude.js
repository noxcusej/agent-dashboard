import Anthropic from '@anthropic-ai/sdk'

let client = null

export function getClient(apiKey) {
  if (!client || client._apiKey !== apiKey) {
    client = new Anthropic({
      apiKey,
      dangerouslyAllowBrowser: true,
    })
    client._apiKey = apiKey
  }
  return client
}

export async function* streamMessage({ apiKey, model, systemPrompt, messages }) {
  const client = getClient(apiKey)

  const stream = await client.messages.stream({
    model,
    max_tokens: 4096,
    system: systemPrompt,
    messages: messages.map((m) => ({
      role: m.role,
      content: m.content,
    })),
  })

  for await (const event of stream) {
    if (event.type === 'content_block_delta' && event.delta?.text) {
      yield { type: 'text', text: event.delta.text }
    }
  }

  const finalMessage = await stream.finalMessage()
  yield {
    type: 'done',
    usage: {
      inputTokens: finalMessage.usage.input_tokens,
      outputTokens: finalMessage.usage.output_tokens,
    },
  }
}

export async function testConnection(apiKey) {
  try {
    const client = getClient(apiKey)
    await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 10,
      messages: [{ role: 'user', content: 'Hi' }],
    })
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}
