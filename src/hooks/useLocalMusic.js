// ─────────────────────────────────────────────────────────
// useLocalMusic — lecture du MP3 local (public), mute/unmute
// L’élément Audio est créé et préchargé par le Loader, passé ici
// ─────────────────────────────────────────────────────────
import { useState, useCallback, useEffect, useRef } from 'react'

export function useLocalMusic(audioRef, running) {
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    if (!running || !audioRef?.current) return
    const el = audioRef.current
    el.volume = 0.55
    el.muted = false
    const p = el.play()
    if (p && typeof p.catch === 'function') p.catch(() => {})
  }, [running, audioRef])

  useEffect(() => {
    if (!audioRef?.current) return
    audioRef.current.muted = muted
  }, [muted, audioRef])

  const toggleMute = useCallback(() => {
    setMuted(m => !m)
  }, [])

  return { muted, toggleMute }
}
