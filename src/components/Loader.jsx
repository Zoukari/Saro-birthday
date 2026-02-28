// ─────────────────────────────────────────────────────────
// Loader — précharge la musique MP3 + toutes les images de la galerie,
// affiche une roue de chargement jusqu’à ce que tout soit prêt, puis lance le site
// ─────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from 'react'
import { collectImageUrls } from '../data/images.js'
import { SLIDES } from '../data/slides.js'

const MUSIC_URL = encodeURI('/Taylor Swift - Lover (Official Music Video) (1).mp3')

export default function Loader({ audioRef, onComplete }) {
  const [pct, setPct] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)
  const launched = useRef(false)

  useEffect(() => {
    if (!audioRef) return

    const urls = collectImageUrls(SLIDES)
    const total = urls.length + 1
    let done = 0
    const audio = new Audio(MUSIC_URL)
    audio.preload = 'auto'
    audioRef.current = audio

    const checkDone = () => {
      done++
      const p = Math.min(done / total, 1)
      setPct(Math.round(p * 100))
      if (p >= 1) launch()
    }

    const launch = () => {
      if (launched.current) return
      launched.current = true
      setFadeOut(true)
      setTimeout(onComplete, 1200)
    }

    audio.addEventListener('canplaythrough', () => checkDone(), { once: true })
    audio.addEventListener('error', () => checkDone(), { once: true })

    urls.forEach(url => {
      const img = new Image()
      img.onload = img.onerror = checkDone
      img.src = url
    })

    if (urls.length === 0) checkDone()
  }, [onComplete, audioRef])

  if (fadeOut === null) return null

  return (
    <div
      className={`fixed inset-0 z-[9500] bg-choco flex flex-col items-center justify-center gap-7
        ${fadeOut ? 'loader-fade-out' : ''}`}
      style={{ pointerEvents: fadeOut ? 'none' : 'auto' }}
    >
      <div className="loader-spinner mb-2" aria-hidden="true" />
      <div
        className="font-serif italic font-light"
        style={{
          fontSize: 'clamp(54px,12vw,112px)',
          opacity: 0.95,
          color: '#2b2118',
        }}
      >
        Saro
      </div>
      <div
        className="text-[9px] tracking-[.6em] uppercase"
        style={{ color: 'rgba(201,169,98,.5)' }}
      >
        Chargement de ton univers ♥
      </div>
      <div
        className="w-44 h-px rounded-full overflow-hidden"
        style={{ background: 'rgba(201,169,98,.18)' }}
      >
        <div
          className="h-full rounded-full transition-[width] duration-150"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg,#c9a962,#cd5c5c)',
          }}
        />
      </div>
      <div className="text-[10px] tracking-[.3em]" style={{ color: 'rgba(201,169,98,.4)' }}>
        {pct} %
      </div>
      <div className="flex gap-4">
        {['♥', '♥', '♥'].map((h, i) => (
          <span key={i} className="beat text-rose text-sm">{h}</span>
        ))}
      </div>
    </div>
  )
}
