// ─────────────────────────────────────────────────────────
// useLocalMusic — lecture du MP3 local (public), mute/unmute
// L’élément Audio est créé et préchargé par le Loader, passé ici
// ─────────────────────────────────────────────────────────
import { useState, useCallback, useEffect, useRef } from 'react'

export function useLocalMusic(audioRef, running, progressFrac) {
  const [muted, setMuted] = useState(false)
  const wasPausedRef = useRef(false)

  useEffect(() => {
    if (!audioRef?.current) return
    const el = audioRef.current
    el.volume = 0.55
    if (running) {
      // On resume only: sync audio to scroll so music and slides stay in sync
      if (wasPausedRef.current && typeof progressFrac === 'number' && isFinite(el.duration) && el.duration > 0) {
        el.currentTime = progressFrac * el.duration
        wasPausedRef.current = false
      }
      const p = el.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    } else {
      wasPausedRef.current = true
      el.pause()
    }
  }, [running, audioRef, progressFrac])

  useEffect(() => {
    if (!audioRef?.current) return
    audioRef.current.muted = muted
  }, [muted, audioRef])

  const toggleMute = useCallback(() => {
    setMuted(m => !m)
  }, [])

  return { muted, toggleMute }
}
