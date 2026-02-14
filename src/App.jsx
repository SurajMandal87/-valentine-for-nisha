import React, { useState } from 'react'
import FloatingHearts from './components/FloatingHearts'
import ProposalSection from './components/ProposalSection'
import SlideshowSection from './components/SlideshowSection'
import FinalMessageSection from './components/FinalMessageSection'
import './App.css'

/**
 * 💖 Main App Component
 * Controls the page flow: Proposal → Love Message → Slideshow → Final Message
 */
function App() {
  // Track which section is currently visible
  const [currentSection, setCurrentSection] = useState('proposal') // proposal | loveMessage | slideshow | final

  return (
    <div className="app">
      {/* Floating hearts always visible in background */}
      <FloatingHearts />

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
 * Shown after Nisha clicks YES – displays a heartfelt message from Suraj
 */
function LoveMessageSection({ onNext }) {
  const [visible, setVisible] = useState(false)

  React.useEffect(() => {
    // Fade in after a short delay
    const timer = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className={`love-message-section ${visible ? 'visible' : ''}`}>
      <div className="love-message-card">
        <div className="love-message-emoji">💌</div>
        <h2 className="love-message-title">A Letter For You</h2>
        <div className="love-message-divider">~ ❤️ ~</div>
        <div className="love-message-text">
          <p className="love-greeting">My Dearest Nisha ❤️</p>
          <p>You are the most beautiful part of my life.</p>
          <p>Every moment with you feels magical. ✨</p>
          <p>Your smile lights up my entire world,</p>
          <p>and your love makes everything worthwhile.</p>
          <br />
          <p>Thank you for being mine,</p>
          <p>for choosing me every single day,</p>
          <p>and for making this life so beautiful. 🌹</p>
          <br />
          <p className="love-closing">I love you forever and always.</p>
          <p className="love-signature">– Suraj 💖</p>
        </div>
        <button className="memories-btn" onClick={onNext}>
          See Our Memories 💖
        </button>
      </div>
    </section>
  )
}

export default App
