import React, { useState, useCallback, useEffect, useRef } from 'react'
import Confetti from './Confetti'
import './ProposalSection.css'

/**
 * 💖 ProposalSection Component
 * The main landing page with the cute Valentine proposal question.
 * Features:
 * - The runaway NO button that dodges clicks
 * - Emotional messages when NO is attempted
 * - Heart burst confetti when YES is clicked
 */

const SAD_MESSAGES = [
  { text: "Please don't say no 🥺", emoji: "😢" },
  { text: "I'll be very sad 😭", emoji: "💔" },
  { text: "Try again maybe? 💔", emoji: "🥺" },
  { text: "You're breaking my heart 😭", emoji: "😢" },
  { text: "Please reconsider! 🙏", emoji: "😠" },
  { text: "Suraj will cry! 😭💔", emoji: "🥺" },
  { text: "Just click YES already! 😤💕", emoji: "😤" },
]

function ProposalSection({ onYes }) {
  const [noAttempts, setNoAttempts] = useState(0)
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 })
  const [hasMoved, setHasMoved] = useState(false)
  const [currentMessage, setCurrentMessage] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [yesClicked, setYesClicked] = useState(false)
  const [visible, setVisible] = useState(false)
  const [yesBtnScale, setYesBtnScale] = useState(1)
  const containerRef = useRef(null)
  const audioRef = useRef(null)

  // Fade in on mount
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(timer)
  }, [])

  // YES button grows bigger with each NO attempt (making it easier to click 😄)
  // Capped at 1.5x so it doesn't overflow on small screens
  useEffect(() => {
    setYesBtnScale(Math.min(1 + noAttempts * 0.1, 1.5))
  }, [noAttempts])

  /** Move the NO button to a random position – clamped within viewport */
  const moveNoButton = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    // Use viewport dimensions with safe padding for iPhone notch/home indicator
    const vw = window.innerWidth
    const vh = window.innerHeight
    const btnW = 120 // approximate button width
    const btnH = 50  // approximate button height
    const pad = 20   // safe margin from edges

    // Get button's current resting position (center of buttons area)
    const buttonsEl = container.querySelector('.proposal-buttons')
    const btnRect = buttonsEl ? buttonsEl.getBoundingClientRect() : { left: vw / 2, top: vh / 2 }
    const originX = btnRect.left + btnRect.width / 2
    const originY = btnRect.top + btnRect.height / 2

    // Calculate safe translate range so button stays within viewport
    const minX = pad - originX + btnW / 2
    const maxX = vw - pad - originX - btnW / 2
    const minY = pad - originY + btnH / 2
    const maxY = vh - pad - originY - btnH / 2

    const newX = minX + Math.random() * (maxX - minX)
    const newY = minY + Math.random() * (maxY - minY)

    setNoPosition({ x: newX, y: newY })
    setHasMoved(true)
  }, [])

  /** Handle NO button interaction */
  const handleNo = useCallback(() => {
    moveNoButton()
    const attempt = noAttempts + 1
    setNoAttempts(attempt)

    // Show a sad / angry message
    const msgIndex = Math.min(attempt - 1, SAD_MESSAGES.length - 1)
    setCurrentMessage(SAD_MESSAGES[msgIndex])

    // Clear message after 2.5s
    setTimeout(() => setCurrentMessage(null), 2500)
  }, [noAttempts, moveNoButton])

  /** Handle YES button click – celebrate! 🎉 */
  const handleYes = useCallback(() => {
    setYesClicked(true)
    setShowConfetti(true)

    // Try to play romantic music after user interaction
    if (audioRef.current) {
      audioRef.current.volume = 0.5
      audioRef.current.play().catch(() => {
        // Autoplay blocked – that's okay
      })
    }

    // Transition to love message after celebration
    setTimeout(() => {
      onYes()
    }, 3000)
  }, [onYes])

  return (
    <section
      className={`proposal-section ${visible ? 'visible' : ''} ${yesClicked ? 'yes-clicked' : ''}`}
      ref={containerRef}
    >
      {/* Confetti burst on YES */}
      {showConfetti && <Confetti />}

      {/* Romantic background music placeholder
          Replace the src with your own romantic mp3 file */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/romantic-song.mp3" type="audio/mpeg" />
        {/* 🎵 Place your romantic mp3 at public/romantic-song.mp3 */}
      </audio>

      <div className="proposal-content">
        {/* Decorative emojis */}
        <div className="proposal-decoration">💕 🌹 💕</div>

        {/* Main heading */}
        <h1 className="proposal-title">
          <span className="proposal-name">Nisha,</span>
          <br />
          Will You Be My Valentine?
          <span className="proposal-heart"> 💖</span>
        </h1>

        {/* Subtext */}
        <p className="proposal-subtitle">
          From <strong>Suraj</strong>, with all my love ❤️
        </p>

        {/* Sad message popup */}
        {currentMessage && (
          <div className="sad-message-popup">
            <span className="sad-emoji">{currentMessage.emoji}</span>
            <p>{currentMessage.text}</p>
          </div>
        )}

        {/* YES / NO Buttons */}
        {!yesClicked && (
          <div className="proposal-buttons">
            <button
              className="btn-yes"
              onClick={handleYes}
              style={{ transform: `scale(${yesBtnScale})` }}
            >
              YES 💕
            </button>

            <button
              className="btn-no"
              onClick={handleNo}
              onMouseEnter={handleNo}
              style={{
                transform: hasMoved
                  ? `translate(${noPosition.x}px, ${noPosition.y}px)`
                  : 'none',
                transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              NO 😢
            </button>
          </div>
        )}

        {/* Celebration text when YES is clicked */}
        {yesClicked && (
          <div className="yes-celebration">
            <div className="celebration-emojis">🎉💖🥰💕🎊</div>
            <h2 className="celebration-text">Yaaay! I knew it! 🥰</h2>
            <p className="celebration-sub">You made me the happiest! 💖</p>
          </div>
        )}

        {/* Attempt counter (shown after first NO attempt) */}
        {noAttempts > 0 && !yesClicked && (
          <p className="attempt-hint">
            {noAttempts >= 3
              ? "The NO button is scared of you 😅 Just say YES! 💖"
              : `Hehe, nice try! 😄 (${noAttempts} attempt${noAttempts > 1 ? 's' : ''})`}
          </p>
        )}
      </div>
    </section>
  )
}

export default ProposalSection
