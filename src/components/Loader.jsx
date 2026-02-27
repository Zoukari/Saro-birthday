// ─────────────────────────────────────────────────────────
// Loader — preloads images, fake 3.5s minimum, then reveals site
// ─────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from 'react'
import { collectImageUrls } from '../data/images.js'
import { SLIDES } from '../data/slides.js'

const MIN_DURATION = 3500 // ms

export default function Loader({ onComplete }) {
  const [pct, setPct]       = useState(0)
  const [fadeOut, setFadeOut] = useState(false)
  const launched = useRef(false)

  useEffect(() => {
    const urls = collectImageUrls(SLIDES)
    let loaded  = 0
    const total = urls.length
    const fakeStart = performance.now()

    const launch = () => {
      if (launched.current) return
      launched.current = true
      setFadeOut(true)
      setTimeout(onComplete, 1200)
    }

    const check = () => {
      const imgP  = total > 0 ? loaded / total : 1
      const timeP = Math.min((performance.now() - fakeStart) / MIN_DURATION, 1)
      const p     = Math.min(Math.max(imgP, timeP), 1)
      setPct(Math.round(p * 100))
      if (p >= 1) setTimeout(launch, 350)
      else        requestAnimationFrame(check)
    }

    urls.forEach(url => {
      const img = new Image()
      img.onload = img.onerror = () => { loaded++ }
      img.src = url
    })
    requestAnimationFrame(check)
  }, [onComplete])

  if (fadeOut === null) return null // fully unmounted

  return (
    <div
      className={`fixed inset-0 z-[9500] bg-choco flex flex-col items-center justify-center gap-7
        ${fadeOut ? 'loader-fade-out' : ''}`}
      style={{ pointerEvents: fadeOut ? 'none' : 'auto' }}
    >
      {/* Logo */}
      <div
        className="font-serif italic font-light shimmer-loader"
        style={{
          fontSize: 'clamp(54px,12vw,112px)',
          opacity: 0,
          animation: 'loader-up .9s ease .3s forwards, ldr-shim 3.5s linear 1.2s infinite',
        }}
      >
        Saro
      </div>

      {/* Sub */}
      <div
        className="text-[9px] tracking-[.6em] uppercase"
        style={{ color: 'rgba(201,169,98,.5)', opacity: 0, animation: 'loader-up .8s ease .9s forwards' }}
      >
        Chargement de ton univers ♥
      </div>

      {/* Progress bar */}
      <div
        className="w-44 h-px rounded-full overflow-hidden"
        style={{ background: 'rgba(201,169,98,.18)', opacity: 0, animation: 'loader-up .6s ease 1.2s forwards' }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg,#c9a962,#cd5c5c)',
            transition: 'width .04s linear',
          }}
        />
      </div>

      {/* Percent */}
      <div
        className="text-[10px] tracking-[.3em]"
        style={{ color: 'rgba(201,169,98,.4)', opacity: 0, animation: 'loader-up .5s ease 1.4s forwards' }}
      >
        {pct} %
      </div>

      {/* Hearts */}
      <div
        className="flex gap-4"
        style={{ opacity: 0, animation: 'loader-up .5s ease 1.7s forwards' }}
      >
        {['♥', '♥', '♥'].map((h, i) => (
          <span key={i} className="beat text-rose text-sm">{h}</span>
        ))}
      </div>
    </div>
  )
}
