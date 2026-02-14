import React, { useEffect, useState, memo } from 'react'
import './FloatingHearts.css'

/**
 * 💕 FloatingHearts Component – ENHANCED
 * Creates beautiful floating heart animations across the entire background.
 * Bubu Mode 🧸: Adds teddy, chick, and extra cute emoji bubbles.
 */
const HEART_EMOJIS = ['💖', '💕', '💗', '💓', '❤️', '💘', '💝', '🩷', '🌸', '✨']
const BUBU_EMOJIS = ['🧸', '🐣', '🥹', '💖', '💕', '💘', '😘', '🌸', '🧸', '🐣']

const FloatingHearts = memo(function FloatingHearts({ bubuMode = false }) {
  const [hearts, setHearts] = useState([])

  // Pick emoji set based on bubu mode
  const emojiSet = bubuMode ? BUBU_EMOJIS : HEART_EMOJIS
  // More particles in bubu mode
  const spawnRate = bubuMode ? 1200 : 1800
  const maxCount = bubuMode ? 40 : 30

  useEffect(() => {
    // Create initial batch of hearts
    const initial = Array.from({ length: 15 }, (_, i) => createHeart(i, emojiSet))
    setHearts(initial)

    // Continuously spawn new hearts
    let id = 15
    const interval = setInterval(() => {
      setHearts(prev => {
        // Remove old hearts (keep max for performance)
        const filtered = prev.length > maxCount ? prev.slice(-25) : prev
        return [...filtered, createHeart(id++, emojiSet)]
      })
    }, spawnRate)

    return () => clearInterval(interval)
  }, [bubuMode]) // Re-initialize when bubu mode toggles

  return (
    <div className="floating-hearts-container" aria-hidden="true">
      {hearts.map(heart => (
        <span
          key={heart.id}
          className={`floating-heart ${bubuMode ? 'bubu-float' : ''}`}
          style={{
            left: heart.left,
            animationDuration: heart.duration,
            animationDelay: heart.delay,
            fontSize: heart.size,
            opacity: heart.opacity,
          }}
        >
          {heart.emoji}
        </span>
      ))}
    </div>
  )
})

/** Generate a heart with randomized properties */
function createHeart(id, emojiSet) {
  return {
    id,
    left: `${Math.random() * 100}%`,
    duration: `${8 + Math.random() * 12}s`,
    delay: `${Math.random() * 5}s`,
    size: `${1 + Math.random() * 1.8}rem`,
    opacity: 0.3 + Math.random() * 0.5,
    emoji: emojiSet[Math.floor(Math.random() * emojiSet.length)],
  }
}

export default FloatingHearts
