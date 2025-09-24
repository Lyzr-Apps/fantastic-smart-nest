import React, { useState } from 'react'
import EmojiSelector from './components/EmojiSelector'
import PoemDisplay from './components/PoemDisplay'
import { PoemData } from './types'

function App() {
  const [poem, setPoem] = useState<PoemData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleEmojiSelect = async (emoji: string) => {
    setIsLoading(true)
    try {
      const response = await fetch('https://agent-prod.studio.lyzr.ai/v3/inference/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'sk-default-obhGvAo6gG9YT9tu6ChjyXLqnw7TxSGY'
        },
        body: JSON.stringify({
          user_id: `user_${Date.now()}@emotion-app.com`,
          agent_id: '68d3c009d459921f338b3c43',
          session_id: `emotion_session_${Date.now()}`,
          message: `Convert this emoji into a detailed prompt: ${emoji}`
        })
      })

      const emotionData = await response.json()

      const poemResponse = await fetch('https://agent-prod.studio.lyzr.ai/v3/inference/chat/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'sk-default-obhGvAo6gG9YT9tu6ChjyXLqnw7TxSGY'
        },
        body: JSON.stringify({
          user_id: `user_${Date.now()}@poem-app.com`,
          agent_id: '68d3c01662b8f6a8c0799d16',
          session_id: `poem_session_${Date.now()}`,
          message: emotionData.prompt_data?.prompt_text || `Write a poem about ${emoji}`
        })
      })

      const poemData = await poemResponse.json()
      setPoem(poemData.poem_data)
    } catch (error) {
      console.error('Error generating poem:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAFAFB', color: '#232323' }}>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#6C63FF' }}>
            Emotion to Poetry
          </h1>
          <p className="text-lg" style={{ color: '#232323' }}>
            Choose an emoji and let AI create a beautiful poem for you
          </p>
        </div>

        <EmojiSelector onEmojiSelect={handleEmojiSelect} isLoading={isLoading} />

        {poem && (
          <PoemDisplay
            poem={poem}
            onRegenerate={() => handleEmojiSelect('🔄')}
          />
        )}
      </div>
    </div>
  )
}

export default App
