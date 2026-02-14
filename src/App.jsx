import React, { useState, useCallback } from 'react'
import FloatingHearts from './components/FloatingHearts'
import ProposalSection from './components/ProposalSection'
import SlideshowSection from './components/SlideshowSection'
import FinalMessageSection from './components/FinalMessageSection'
import './App.css'

/**
 * 💖 Main App Component
 * Controls the page flow: Proposal → Love Message → Slideshow → Final Message
 * Now with Bubu Mode 🧸 and personalized nicknames!
 */
function App() {
  // Track which section is currently visible
  const [currentSection, setCurrentSection] = useState('proposal') // proposal | loveMessage | slideshow | final
  // Bubu Mode 🧸 – extra cute mode toggle
  const [bubuMode, setBubuMode] = useState(false)

  const toggleBubuMode = useCallback(() => {
    setBubuMode(prev => !prev)
  }, [])

  return (
    <div className={`app ${bubuMode ? 'bubu-mode' : ''}`}>
      {/* Floating hearts always visible in background */}
      <FloatingHearts bubuMode={bubuMode} />

      {/* 🧸 Bubu Mode Toggle – always visible */}
      <button
        className={`bubu-mode-toggle ${bubuMode ? 'active' : ''}`}
        onClick={toggleBubuMode}
        title="Toggle Bubu Mode 🧸"
      >
        {bubuMode ? '🧸 Bubu Mode ON' : 'Show Bubu Mode 🧸'}
      </button>

      {/* Section 1: The Big Proposal Question */}
      {currentSection === 'proposal' && (
        <ProposalSection onYes={() => setCurrentSection('loveMessage')} />
      )}

      {/* Section 2: Love Message after YES */}
      {currentSection === 'loveMessage' && (
        <LoveMessageSection onNext={() => setCurrentSection('slideshow')} />
      )}

      {/* Section 3: Photo Slideshow */}
      {currentSection === 'slideshow' && (
        <SlideshowSection onComplete={() => setCurrentSection('final')} />
      )}

      {/* Section 4: Final Valentine Message */}
      {currentSection === 'final' && (
        <FinalMessageSection />
      )}
    </div>
  )
}

/**
 * 💌 Love Message Section
 * Shown after Nisha clicks YES – displays a deeply personal heartfelt message
 * Easter Egg: Click "Bubu" 5 times for a surprise popup 🧸
 */
function LoveMessageSection({ onNext }) {
  const [visible, setVisible] = useState(false)
  const [bubuClicks, setBubuClicks] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  React.useEffect(() => {
    // Fade in after a short delay
    const timer = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  /** 🧸 Easter Egg: Click "Bubu" 5 times for surprise */
  const handleBubuClick = () => {
    const next = bubuClicks + 1
    setBubuClicks(next)
    if (next >= 5 && !showEasterEgg) {
      setShowEasterEgg(true)
      // Auto hide after 5 seconds
      setTimeout(() => setShowEasterEgg(false), 5000)
    }
  }

  return (
    <section className={`love-message-section ${visible ? 'visible' : ''}`}>
      {/* 🧸 Easter egg popup */}
      {showEasterEgg && (
        <div className="bubu-easter-egg">
          <div className="easter-egg-teddy">🧸</div>
          <p className="easter-egg-text">
            Suraj loves his Bubu more than chocolate 🍫💖
          </p>
          <div className="easter-egg-hearts">💖💕💖💕💖</div>
        </div>
      )}

      <div className="love-message-card">
        {/* Heartbeat animation behind */}
        <div className="heartbeat-bg" aria-hidden="true">💖</div>

        {/* 🧸 Floating stickers around the love letter */}
        <img src="/stickers/21-5.thumb128.png" alt="sticker" className="love-sticker love-sticker-1" />
        <img src="/stickers/27-1.thumb128.png" alt="sticker" className="love-sticker love-sticker-2" />
        <img src="/stickers/6-2.thumb128.png" alt="sticker" className="love-sticker love-sticker-3" />

        <div className="love-message-emoji">💌</div>
        <h2 className="love-message-title">A Letter For My Bubu 🧸</h2>
        <div className="love-message-divider">~ ❤️ ~</div>
        <div className="love-message-text">
          <p className="love-greeting">
            Nisha{' '}
            <span className="bubu-clickable" onClick={handleBubuClick} role="button" tabIndex={0}>
              Bubu
            </span>{' '}
            ❤️
          </p>
          <p>Mera baccha… 🥹</p>
          <p>You are my peace,</p>
          <p>my madness,</p>
          <p>my Dudu 🐣,</p>
          <p>my everything.</p>
          <br />
          <p>When you smile, Babu,</p>
          <p>my whole world glows. ✨</p>
          <p>Every moment with you is like</p>
          <p>the most beautiful Bollywood scene. 🎬💕</p>
          <br />
          <p>Stay with me forever, okay? 🥹💖</p>
          <br />
          <p className="love-closing">I love you forever and always, Bby.</p>
          <p className="love-signature">– Yours always, Suraj (Only yours 😌) 💖</p>
        </div>
        <button className="memories-btn" onClick={onNext}>
          See Our Memories, Bubu 💖
        </button>
      </div>
    </section>
  )
}

export default App
