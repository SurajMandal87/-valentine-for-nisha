import React, { useState, useEffect } from 'react'
import './FinalMessageSection.css'

/**
 * 💘 FinalMessageSection Component
 * The grand finale – big animated Valentine's message with
 * glowing text, floating hearts, and emotional messages.
 */
function FinalMessageSection() {
  const [visible, setVisible] = useState(false)
  const [showLines, setShowLines] = useState([])

  const messages = [
    { text: "Happy Valentine's Day, My Bubu 💘", className: 'line-main' },
    { text: "Miss you a lot, Mera Baccha ❤️", className: 'line-miss' },
    { text: "Please come fast Dudu… 🐣", className: 'line-come' },
    { text: "We will celebrate together forever 💑", className: 'line-come' },
    { text: "Forever Yours, Suraj 💖", className: 'line-signature' },
  ]

  // Stagger each line's appearance
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300)
    
    messages.forEach((_, index) => {
      setTimeout(() => {
        setShowLines(prev => [...prev, index])
      }, 800 + index * 1200)
    })

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className={`final-section ${visible ? 'visible' : ''}`}>
      {/* Big sparkle decoration */}
      <div className="final-sparkles" aria-hidden="true">
        {Array.from({ length: 25 }, (_, i) => (
          <span
            key={i}
            className="sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              fontSize: `${1 + Math.random() * 1.5}rem`,
            }}
          >
            {['✨', '💖', '💕', '🧸', '🐣', '💗', '🌟'][Math.floor(Math.random() * 7)]}
          </span>
        ))}
      </div>

      <div className="final-content">
        {/* Heart decoration with stickers */}
        <div className="final-heart-deco">
          <img src="/stickers/28-1.thumb128.png" alt="sticker" className="final-sticker final-sticker-left" />
          <span className="big-heart">💖</span>
          <img src="/stickers/29-1.thumb128.png" alt="sticker" className="final-sticker final-sticker-right" />
        </div>

        {/* Staggered message lines */}
        <div className="final-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`final-line ${msg.className} ${
                showLines.includes(index) ? 'show' : ''
              }`}
            >
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className={`final-footer ${showLines.length >= messages.length ? 'show' : ''}`}>
          <div className="footer-stickers">
            <img src="/stickers/21-5.thumb128.png" alt="sticker" className="footer-sticker" />
            <img src="/stickers/6-2.thumb128.png" alt="sticker" className="footer-sticker" />
          </div>
          <div className="footer-hearts">🧸 💕 💖 💕 🐣</div>
          <p className="footer-text">Made with all my love for you, Bubu 🌹</p>
          <div className="footer-date">Valentine's Day 2026 • Suraj ❤️ Nisha</div>
        </div>
      </div>
    </section>
  )
}

export default FinalMessageSection
