// ─────────────────────────────────────────────────────────
// App — orchestrates loader, scroll engine, slides, UI
// ─────────────────────────────────────────────────────────
import { useState, useRef, useEffect, useCallback } from 'react'
import Loader         from './components/Loader.jsx'
import AmbientFX      from './components/AmbientFX.jsx'
import SlideRenderer  from './components/SlideRenderer.jsx'
import UI             from './components/UI.jsx'
import { useAutoScroll } from './hooks/useAutoScroll.js'
import { useYouTube }    from './hooks/useYouTube.js'
import { useCursor }     from './hooks/useCursor.js'
import { SLIDES }        from './data/slides.js'

const N = SLIDES.length

export default function App() {
  const [showLoader, setShowLoader] = useState(true)
  const [running,    setRunning]    = useState(false)

  // Cursor refs
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  useCursor(dotRef, ringRef)

  // Auto-scroll engine
  const { currentIdx, slideProgress, progressFrac, jumpTo, registerSlide } =
    useAutoScroll(N, running)

  // YouTube music — start when running
  const { muted, toggleMute } = useYouTube('ytplayer', running)

  // When loader completes → start show
  const handleLoaderComplete = useCallback(() => {
    setShowLoader(false)
    setRunning(true)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown')
        jumpTo(Math.min(currentIdx + 1, N - 1))
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')
        jumpTo(Math.max(currentIdx - 1, 0))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [currentIdx, jumpTo])

  // Touch swipe
  useEffect(() => {
    let tx = 0
    const onStart = e => { tx = e.touches[0].clientX }
    const onEnd   = e => {
      const d = tx - e.changedTouches[0].clientX
      if (Math.abs(d) > 48) jumpTo(d > 0
        ? Math.min(currentIdx + 1, N - 1)
        : Math.max(currentIdx - 1, 0))
    }
    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchend',   onEnd,   { passive: true })
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend',   onEnd)
    }
  }, [currentIdx, jumpTo])

  return (
    <>
      {/* Custom cursor */}
      <div ref={dotRef}  className="custom-cursor" />
      <div ref={ringRef} className="cursor-ring" />

      {/* Ambient background FX */}
      <AmbientFX />

      {/* Loader */}
      {showLoader && <Loader onComplete={handleLoaderComplete} />}

      {/* Slide stage */}
      <div className="fixed inset-0 z-10 overflow-hidden">
        <SlideRenderer slides={SLIDES} registerSlide={registerSlide} />
      </div>

      {/* UI chrome */}
      {!showLoader && (
        <UI
          progressFrac={progressFrac}
          currentIdx={currentIdx}
          jumpTo={jumpTo}
          muted={muted}
          onToggleMute={toggleMute}
        />
      )}

      {/* Hidden YT player */}
      <div style={{
        position: 'fixed', width: 1, height: 1, opacity: .001,
        bottom: 0, right: 0, overflow: 'hidden', pointerEvents: 'none',
      }}>
        <div id="ytplayer" />
      </div>
    </>
  )
}
