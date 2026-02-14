import React, { useState, useEffect, useCallback } from 'react'
import './SlideshowSection.css'

/**
 * 📸 SlideshowSection Component
 * Displays couple photos in a beautiful fading slideshow.
 * Each slide has a romantic caption and smooth transitions.
 *
 * 📌 To add your own photos:
 *    1. Place images in the /public/photos/ folder
 *    2. Update the SLIDES array below with real image paths
 */

const SLIDES = [
  {
    image: '/photos/photo1.jpeg',
    caption: 'Our First Smile 💕',
  },
  {
    image: '/photos/photo2.jpeg',
    caption: 'Our Cute Moment 😘',
  },
  {
    image: '/photos/photo3.jpeg',
    caption: 'That Special Day 🌹',
  },
  {
    image: '/photos/photo4.jpeg',
    caption: 'Together & Happy 🥰',
  },
  {
    image: '/photos/photo5.jpeg',
    caption: 'My Favourite Person 💖',
  },
  {
    image: '/photos/photo6.jpeg',
    caption: 'Forever Together ❤️',
  },
]

function SlideshowSection({ onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hasCompleted, setHasCompleted] = useState(false)

  // Fade in section
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  // Auto-advance slides every 3.5 seconds
  useEffect(() => {
    if (hasCompleted) return

    const interval = setInterval(() => {
      setIsTransitioning(true)

      setTimeout(() => {
        setCurrentIndex(prev => {
          const next = prev + 1
          if (next >= SLIDES.length) {
            setHasCompleted(true)
            clearInterval(interval)
            // Show final section after last slide
            setTimeout(() => onComplete(), 1500)
            return prev
          }
          return next
        })
        setIsTransitioning(false)
      }, 600) // transition duration
    }, 3500)

    return () => clearInterval(interval)
  }, [onComplete, hasCompleted])

  const currentSlide = SLIDES[currentIndex]

  return (
    <section className={`slideshow-section ${visible ? 'visible' : ''}`}>
      <div className="slideshow-header">
        <h2 className="slideshow-title">Our Beautiful Memories 💕</h2>
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
          {/* Image with fallback gradient for placeholder */}
          <div className="slide-image-wrapper">
            <img
              src={currentSlide.image}
              alt={currentSlide.caption}
              className="slide-image"
              onError={(e) => {
                // If image doesn't load, show a cute placeholder
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

          {/* Romantic caption */}
          <div className="slide-caption">
            <p>{currentSlide.caption}</p>
          </div>
        </div>
      </div>

      {/* Photo counter */}
      <p className="slide-counter">
        {currentIndex + 1} / {SLIDES.length} 📸
      </p>

      {hasCompleted && (
        <div className="slideshow-complete">
          <p>Those were our beautiful moments 💖</p>
        </div>
      )}
    </section>
  )
}

export default SlideshowSection
