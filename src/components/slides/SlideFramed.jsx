import { useRef } from 'react'

export default function SlideFramed({ img, cap, w, h, extra, memeLink }) {
  const fwRef = useRef(null)

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

  const memeUrl = 'https://youtube.com/shorts/jqa6UT_AnhE?si=bY-F2SU0eckIEOHx'

  return (
    <div className="relative flex flex-col items-center justify-center gap-5 w-full h-full">
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
      <div className="absolute top-4 left-4 right-4 flex flex-col items-center gap-1 z-10">
        {(extra || cap) && <div className="font-serif italic text-choco text-center text-lg opacity-90 drop-shadow-sm">{extra || cap}</div>}
        {memeLink && (
          <a href={memeUrl} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline text-sm">
            Lien du meme
          </a>
        )}
      </div>
    </div>
  )
}
