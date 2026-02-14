import React, { useEffect, useState } from 'react'
import './Confetti.css'

/**
 * 🎉 Confetti Component
 * Renders a burst of heart-shaped confetti particles
 * when Nisha clicks YES!
 */

const CONFETTI_ITEMS = ['💖', '💕', '🎉', '💗', '❤️', '🩷', '🎊', '✨', '💘', '🌹', '🥰', '💝']

function Confetti() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Create a burst of 50 confetti particles
    const items = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      emoji: CONFETTI_ITEMS[Math.floor(Math.random() * CONFETTI_ITEMS.length)],
      left: `${40 + (Math.random() - 0.5) * 60}%`,
      top: `${40 + (Math.random() - 0.5) * 30}%`,
      size: `${1 + Math.random() * 1.5}rem`,
      angle: Math.random() * 360,
      distance: 100 + Math.random() * 400,
      duration: 1 + Math.random() * 2,
      delay: Math.random() * 0.5,
    }))
    setParticles(items)
  }, [])

  return (
    <div className="confetti-container" aria-hidden="true">
      {particles.map(p => (
        <span
          key={p.id}
          className="confetti-particle"
          style={{
            left: p.left,
            top: p.top,
            fontSize: p.size,
            '--tx': `${Math.cos(p.angle * Math.PI / 180) * p.distance}px`,
            '--ty': `${Math.sin(p.angle * Math.PI / 180) * p.distance}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}

export default Confetti
