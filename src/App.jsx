// ─────────────────────────────────────────────────────────
// App — loader (musique + images), scroll, slides, UI
// ─────────────────────────────────────────────────────────
import { useState, useRef, useEffect, useCallback } from 'react'
import Loader         from './components/Loader.jsx'
import AmbientFX      from './components/AmbientFX.jsx'
import SlideRenderer  from './components/SlideRenderer.jsx'
import UI             from './components/UI.jsx'
import { useAutoScroll } from './hooks/useAutoScroll.js'
import { useLocalMusic } from './hooks/useLocalMusic.js'
import { useCursor }     from './hooks/useCursor.js'
import { SLIDES }        from './data/slides.js'

const N = SLIDES.length

export default function App() {
  const [showLoader, setShowLoader] = useState(true)
  const [running,    setRunning]    = useState(false)
  const [musicStatus, setMusicStatus] = useState('loading')

  const audioRef = useRef(null)
  const dotRef   = useRef(null)
  const ringRef  = useRef(null)
  useCursor(dotRef, ringRef)

  const { currentIdx, progressFrac, jumpTo, registerSlide } =
    useAutoScroll(N, running)

  const { muted, toggleMute } = useLocalMusic(audioRef, running)

  useEffect(() => {
    if (showLoader || !audioRef.current) return
    const el = audioRef.current
    setMusicStatus('loading')
    const onReady = () => setMusicStatus('ready')
    const onErr = () => setMusicStatus('error')
    el.addEventListener('canplaythrough', onReady, { once: true })
    el.addEventListener('error', onErr, { once: true })
    if (el.readyState >= 3) setMusicStatus('ready')
    return () => {
      el.removeEventListener('canplaythrough', onReady)
      el.removeEventListener('error', onErr)
    }
  }, [showLoader])

  const handleLoaderComplete = useCallback(() => {
    setShowLoader(false)
    setRunning(true)
  }, [])

  const handleRestart = useCallback(() => {
    jumpTo(0)
    setRunning(true)
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
    }
  }, [jumpTo])

  const togglePause = useCallback(() => {
    setRunning(r => !r)
  }, [])

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
      <div ref={dotRef}  className="custom-cursor" />
      <div ref={ringRef} className="cursor-ring" />

      <AmbientFX />

      {showLoader && <Loader audioRef={audioRef} onComplete={handleLoaderComplete} />}

      <div className="fixed inset-0 z-10 overflow-hidden">
        <SlideRenderer slides={SLIDES} registerSlide={registerSlide} />
      </div>

      {!showLoader && (
        <UI
          progressFrac={progressFrac}
          currentIdx={currentIdx}
          jumpTo={jumpTo}
          muted={muted}
          onToggleMute={toggleMute}
          running={running}
          onPauseResume={togglePause}
          onRestart={handleRestart}
          musicStatus={musicStatus}
        />
      )}
    </>
  )
}
