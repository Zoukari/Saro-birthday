// ─────────────────────────────────────────────────────────
// AmbientFX — hearts, sparkles, aurora blobs, dot grid, noise
// ─────────────────────────────────────────────────────────
import { useEffect } from 'react'

const HEART_CHARS = ['♥', '♡', '✿', '♪', '✦', '❋']

export default function AmbientFX() {
  // Spawn hearts
  useEffect(() => {
    const hc = document.getElementById('hc')
    if (!hc) return

    // Respect system reduced-motion preference
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const iv = setInterval(() => {
      // Avoid unbounded DOM growth on lower machines
      if (hc.childElementCount > 40) return
      const h = document.createElement('div')
      h.className = 'heart-particle'
      h.textContent = HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)]
      h.style.cssText = [
        `left:${8 + Math.random() * 84}vw`,
        'bottom:6vh',
        `font-size:${10 + Math.random() * 13}px`,
        `animation-duration:${4 + Math.random() * 5}s`,
        `color:${Math.random() > .5 ? '#cd5c5c' : '#c9a962'}`,
      ].join(';')
      hc.appendChild(h)
      setTimeout(() => h.remove(), 10_000)
    }, 1100)
    return () => clearInterval(iv)
  }, [])

  // Spawn sparkles
  useEffect(() => {
    const sc = document.getElementById('sc')
    if (!sc) return

    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const iv = setInterval(() => {
      if (sc.childElementCount > 120) return
      const s = document.createElement('div')
      s.className = 'sparkle-particle'
      const sz = 2 + Math.random() * 4
      s.style.cssText = [
        `left:${4 + Math.random() * 92}vw`,
        `top:${4 + Math.random() * 92}vh`,
        `width:${sz}px`, `height:${sz}px`,
        `animation-duration:${1.8 + Math.random() * 2.8}s`,
        `animation-delay:${Math.random() * 1.5}s`,
      ].join(';')
      sc.appendChild(s)
      setTimeout(() => s.remove(), 6_000)
    }, 230)
    return () => clearInterval(iv)
  }, [])

  return (
    <>
      {/* Aurora */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
      </div>

      {/* Dot grid */}
      <div className="dot-grid" />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Heart container */}
      <div id="hc" className="fixed inset-0 pointer-events-none z-[500] overflow-hidden" />

      {/* Sparkle container */}
      <div id="sc" className="fixed inset-0 pointer-events-none z-[500] overflow-hidden" />
    </>
  )
}
