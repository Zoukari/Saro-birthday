import { useRef } from 'react'
import { MEME_LINK } from '../../data/memeLink.js'

export default function SlideFramed({ img, cap, w, h, linkMeme, capPosition }) {
  const fwRef = useRef(null)
  const isCapTop = capPosition === 'top'

  const onMove = e => {
    const el = fwRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const dx = (e.clientX - r.left - r.width  / 2) * .08
    const dy = (e.clientY - r.top  - r.height / 2) * .08
    el.style.transition = 'transform .08s'
    el.style.transform  = `translate(${dx}px,${dy}px) scale(1.02)`
  }
  const onLeave = () => {
    const el = fwRef.current
    if (!el) return
    el.style.transition = 'transform .6s cubic-bezier(.25,.46,.45,.94)'
    el.style.transform  = 'translate(0,0) scale(1)'
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full h-full pb-28 relative">
      {cap && isCapTop && (
        <p className="absolute top-8 left-1/2 -translate-x-1/2 text-center font-serif italic font-light text-choco max-w-lg px-4 z-10" style={{ fontSize: 'clamp(14px,2vw,22px)' }}>
          {cap}
        </p>
      )}
      <div
        ref={fwRef}
        className="frame-wrap"
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <div className="frame-inner" style={{ width: w, height: h }}>
          <img src={img} alt="" loading="eager" style={{ width: w, height: h }} />
        </div>
      </div>
      {cap && !isCapTop && (
        <p className="font-serif italic font-light text-choco text-center px-4" style={{ fontSize: 'clamp(14px,2vw,22px)' }}>
          {cap}
        </p>
      )}
      {linkMeme && (
        <a
          href={MEME_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] tracking-widest uppercase text-gold opacity-90 hover:opacity-100 underline underline-offset-2 cursor-none"
        >
          Lien du meme
        </a>
      )}
    </div>
  )
}
