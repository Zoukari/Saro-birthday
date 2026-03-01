// ─────────────────────────────────────────────────────────
// Loader — précharge la musique MP3 + toutes les images de la galerie,
// affiche une roue de chargement jusqu’à ce que tout soit prêt, puis lance le site
// ─────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from 'react'
import { collectImageUrls } from '../data/images.js'
import { SLIDES } from '../data/slides.js'

const baseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '') + '/'
const musicFilename = 'Taylor Swift - Lover (Official Music Video) (1).mp3'
const MUSIC_URL = baseUrl + musicFilename.split(' ').join('%20')

export default function Loader({ audioRef, onComplete }) {
  const [pct, setPct] = useState(0)
  const [ready, setReady] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)
  const launched = useRef(false)

  useEffect(() => {
    if (!audioRef) return

    const urls = collectImageUrls(SLIDES)
    const total = urls.length + 1
    let done = 0
    const audio = new Audio(MUSIC_URL)
    audio.preload = 'auto'
    audio.load()
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
      setReady(true)
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

  const handleEnter = () => {
    setFadeOut(true)
    if (audioRef?.current) {
      audioRef.current.volume = 0.55
      audioRef.current.play().catch(() => {})
    }
    setTimeout(onComplete, 400)
  }

  if (ready) {
    return (
      <div
        className={`fixed inset-0 z-[9500] bg-choco flex flex-col items-center justify-center gap-8 ${fadeOut ? 'loader-fade-out' : ''}`}
        style={{ pointerEvents: fadeOut ? 'none' : 'auto' }}
      >
        <div className="font-serif italic font-light" style={{ fontSize: 'clamp(54px,12vw,112px)', opacity: 0.95, color: '#2b2118' }}>
          Saro
        </div>
        <button
          type="button"
          onClick={handleEnter}
          className="cursor-pointer px-8 py-4 rounded-full text-choco font-medium tracking-wide border-2 border-gold hover:bg-gold hover:text-white transition-colors"
        >
          Clique pour entrer ♥
        </button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[9500] bg-choco flex flex-col items-center justify-center gap-7" style={{ pointerEvents: 'auto' }}>
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
