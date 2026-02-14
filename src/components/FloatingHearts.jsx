import React, { useEffect, useState } from 'react'
import './FloatingHearts.css'

/**
 * 💕 FloatingHearts Component
 * Creates beautiful floating heart animations across the entire background.
 * Hearts spawn continuously and float upward with gentle swaying.
 */
const HEART_EMOJIS = ['💖', '💕', '💗', '💓', '❤️', '💘', '💝', '🩷', '🌸', '✨']

function FloatingHearts() {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    // Create initial batch of hearts
    const initial = Array.from({ length: 15 }, (_, i) => createHeart(i))
    setHearts(initial)

    // Continuously spawn new hearts
    let id = 15
    const interval = setInterval(() => {
      setHearts(prev => {
        // Remove old hearts (keep max 30 for performance)
        const filtered = prev.length > 30 ? prev.slice(-25) : prev
        return [...filtered, createHeart(id++)]
      })
    }, 1800)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="floating-hearts-container" aria-hidden="true">
      {hearts.map(heart => (
        <span
          key={heart.id}
          className="floating-heart"
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
}

/** Generate a heart with randomized properties */
function createHeart(id) {
  return {
    id,
    left: `${Math.random() * 100}%`,
    duration: `${8 + Math.random() * 12}s`,
    delay: `${Math.random() * 5}s`,
    size: `${1 + Math.random() * 1.8}rem`,
    opacity: 0.3 + Math.random() * 0.5,
    emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
  }
}

export default FloatingHearts
