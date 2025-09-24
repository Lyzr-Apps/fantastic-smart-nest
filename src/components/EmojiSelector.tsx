import React from 'react'

interface EmojiSelectorProps {
  onEmojiSelect: (emoji: string) => void
  isLoading: boolean
}

const EMOTION_EMOJIS = [
  '😀', '😊', '😍', '🥰', '😭', '😢', '😡', '😤', '😰', '😨',
  '🤗', '🤔', '😴', '🥳', '😎', '🤪', '😬', '🙄', '😔', '🤐'
]

const EmojiSelector: React.FC<EmojiSelectorProps> = ({ onEmojiSelect, isLoading }) => {
  return (
    <div className="w-full max-w-4xl">
      <h2 className="text-2xl font-bold text-center mb-6" style={{ color: '#232323' }}>
        Choose an emotion to create your poem
      </h2>
      <div className="grid grid-cols-5 md:grid-cols-10 gap-4 p-6 rounded-xl shadow-lg"
           style={{ backgroundColor: '#FFFFFF' }}>
        {EMOTION_EMOJIS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onEmojiSelect(emoji)}
            disabled={isLoading}
            className="text-4xl p-4 rounded-lg transition-all duration-200 hover:scale-110 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: '#FAFAFB',
              border: '2px solid transparent'
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.borderColor = '#6C63FF'
                e.currentTarget.style.backgroundColor = '#6C63FF'
                e.currentTarget.style.transform = 'scale(1.1)'
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.borderColor = 'transparent'
                e.currentTarget.style.backgroundColor = '#FAFAFB'
                e.currentTarget.style.transform = 'scale(1)'
              }
            }}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  )
}

export default EmojiSelector