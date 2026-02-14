import React, { useState, useEffect, useRef, useMemo } from 'react'
import './SlideshowSection.css'

/**
 * 📸 SlideshowSection Component – ENHANCED
 * Polaroid-style photo frames with personalized Bubu/Babu captions.
 * Now with Ed Sheeran song integration and heart particles on transition.
 *
 * 🎵 Songs: Place mp3 files in /public/songs/
 */

const SLIDES = [
  {
    image: '/photos/photo1.jpeg',
    caption: "My Bubu's Smile 🥹",
    sticker: '/stickers/21-5.thumb128.png',
  },
  {
    image: '/photos/photo2.jpeg',
    caption: 'Mera Baccha Moment 💖',
    sticker: '/stickers/27-1.thumb128.png',
  },
  {
    image: '/photos/photo3.jpeg',
    caption: 'That Special Day, Babu 🌹',
    sticker: '/stickers/28-1.thumb128.png',
  },
  {
    image: '/photos/photo4.jpeg',
    caption: 'Bubu and Suraj Forever 💕',
    sticker: '/stickers/29-1.thumb128.png',
  },
  {
    image: '/photos/photo5.jpeg',
    caption: 'Bby You Look Beautiful 🥰',
    sticker: '/stickers/6-2.thumb128.png',
  },
  {
    image: '/photos/photo6.jpeg',
    caption: 'Dudu & Bubu Together 🐣🧸',
    sticker: '/stickers/21-5.thumb128.png',
  },
]

/** 🎵 Song – Ed Sheeran Perfect
 *  Plays throughout the slideshow */
const SONG = { file: '/songs/ed_sheeran_perfect.mp3', display: 'Perfect – Ed Sheeran' }

function SlideshowSection({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hasCompleted, setHasCompleted] = useState(false)
  const [currentSong, setCurrentSong] = useState(null)
  const [heartParticles, setHeartParticles] = useState([])
  const audioRef = useRef(null)
  const particleIdRef = useRef(0)

  // Fade in section
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  // 🎵 Play Ed Sheeran – Perfect on first render
  useEffect(() => {
    setCurrentSong(SONG.display)

    if (audioRef.current) {
      const audio = audioRef.current
      audio.src = SONG.file
      audio.loop = true
      audio.volume = 0
      audio.play().catch(() => {})
      // Fade in
      const fadeIn = setInterval(() => {
        if (audio.volume < 0.4) {
          audio.volume = Math.min(0.4, audio.volume + 0.05)
        } else {
          clearInterval(fadeIn)
        }
      }, 100)
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  /** 💖 Spawn heart particles on slide change */
  const spawnHeartParticles = () => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: particleIdRef.current++,
      x: 30 + Math.random() * 40,
      y: 30 + Math.random() * 40,
      emoji: ['💖', '💕', '💗', '🧸', '🐣'][Math.floor(Math.random() * 5)],
      size: 1 + Math.random() * 1.2,
    }))
    setHeartParticles(prev => [...prev, ...newParticles])
    // Clean up particles after animation
    setTimeout(() => {
      setHeartParticles(prev => prev.slice(newParticles.length))
    }, 2000)
  }

  // Auto-advance slides every 4 seconds
  useEffect(() => {
    if (hasCompleted) return

    const interval = setInterval(() => {
      setIsTransitioning(true)
      spawnHeartParticles()

      setTimeout(() => {
        setCurrentIndex(prev => {
          const next = prev + 1
          if (next >= SLIDES.length) {
            setHasCompleted(true)
            clearInterval(interval)
            setTimeout(() => onComplete(), 1500)
            return prev
          }
          return next
        })
        setIsTransitioning(false)
      }, 1000)
    }, 5000)

    return () => clearInterval(interval)
  }, [onComplete, hasCompleted])

  const currentSlide = SLIDES[currentIndex]

  return (
    <section className={`slideshow-section ${visible ? 'visible' : ''}`}>
      {/* Hidden audio element for songs */}
      <audio ref={audioRef} preload="auto" />

      {/* 💖 Heart particles on transition */}
      <div className="slide-particles" aria-hidden="true">
        {heartParticles.map(p => (
          <span
            key={p.id}
            className="slide-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              fontSize: `${p.size}rem`,
            }}
          >
            {p.emoji}
          </span>
        ))}
      </div>

      <div className="slideshow-header">
        <h2 className="slideshow-title">Our Beautiful Memories, Bubu 🧸💕</h2>
        <div className="slideshow-dots">
          {SLIDES.map((_, i) => (
            <span
              key={i}
              className={`dot ${i === currentIndex ? 'active' : ''} ${i < currentIndex ? 'done' : ''}`}
            />
          ))}
        </div>
      </div>

      <div className="slideshow-container">
        <div className={`slide ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
          {/* 📸 Polaroid-style frame */}
          <div className="polaroid-frame">
            <div className="slide-image-wrapper">
              <img
                src={currentSlide.image}
                alt={currentSlide.caption}
                className="slide-image"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              <div className="slide-placeholder" style={{ display: 'none' }}>
                <span className="placeholder-emoji">📷</span>
                <p>Add your photo here!</p>
                <p className="placeholder-path">{currentSlide.image}</p>
              </div>
            </div>

            {/* 🧸 Sticker on polaroid */}
            {currentSlide.sticker && (
              <img
                src={currentSlide.sticker}
                alt="sticker"
                className="polaroid-sticker"
              />
            )}

            {/* Polaroid caption area */}
            <div className="polaroid-caption">
              <p>{currentSlide.caption}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 🎵 Now Playing display */}
      {currentSong && (
        <div className="now-playing">
          <span className="now-playing-icon">🎵</span>
          <span className="now-playing-text">
            Now Playing: <strong>{currentSong}</strong> – For My Bubu 💖
          </span>
        </div>
      )}

      {/* Photo counter */}
      <p className="slide-counter">
        {currentIndex + 1} / {SLIDES.length} 📸
      </p>

      {hasCompleted && (
        <div className="slideshow-complete">
          <p>Those were our beautiful moments, Mera Baccha 💖</p>
        </div>
      )}
    </section>
  )
}

export default SlideshowSection
