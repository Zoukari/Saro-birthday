// ─────────────────────────────────────────────────────────
// useYouTube — loads YT IFrame API, auto-plays muted then unmutes
// videoId: Taylor Swift - Lover  (-BjZmE2gtdo)
// ─────────────────────────────────────────────────────────
import { useRef, useState, useCallback, useEffect } from 'react'

const VIDEO_ID = '-BjZmE2gtdo'

export function useYouTube(containerId, autoStart) {
  const playerRef = useRef(null)
  const [muted, setMuted] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // Load YT script once
  useEffect(() => {
    if (!autoStart) return
    if (window.YT && window.YT.Player) {
      initPlayer()
      return
    }
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    document.head.appendChild(tag)

    window.onYouTubeIframeAPIReady = initPlayer
    return () => { /* no cleanup needed */ }
  }, [autoStart]) // eslint-disable-line

  function initPlayer() {
    if (playerRef.current) return
    playerRef.current = new window.YT.Player(containerId, {
      height: '1', width: '1',
      videoId: VIDEO_ID,
      playerVars: {
        autoplay: 1, controls: 0, disablekb: 1,
        loop: 1, playlist: VIDEO_ID, rel: 0, showinfo: 0,
        mute: 1, // start muted to pass autoplay policy
      },
      events: {
        onReady: e => {
          e.target.playVideo()
          // Unmute after short delay — bypasses browser autoplay block
          setTimeout(() => {
            e.target.unMute()
            e.target.setVolume(55)
            setLoaded(true)
          }, 900)
        },
      },
    })
  }

  const toggleMute = useCallback(() => {
    if (!playerRef.current) return
    if (muted) {
      playerRef.current.unMute()
      playerRef.current.setVolume(55)
    } else {
      playerRef.current.mute()
    }
    setMuted(m => !m)
  }, [muted])

  return { muted, loaded, toggleMute }
}
