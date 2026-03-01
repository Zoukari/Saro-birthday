import { useRef } from 'react'
import { resolveCards } from '../../data/cardLayouts.js'

function FlyingCard({ card, ci, rounded }) {
  const cardRef = useRef(null)

  const baseTf = `translate(-50%,-50%) rotate(${card.r}deg) scale(${card.s})`

  const onEnter = () => {
    const el = cardRef.current
    if (!el) return
    el.style.transition = 'transform .4s cubic-bezier(.25,.46,.45,.94),box-shadow .4s ease'
    el.style.transform  = `translate(-50%,-50%) rotate(${card.r * .2}deg) scale(${card.s * 1.07}) translateY(-13px)`
    el.style.boxShadow  = '0 46px 84px rgba(43,33,24,.28),0 0 0 1px rgba(201,169,98,.30)'
    el.style.zIndex     = '99'
  }
  const onLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.transition = 'transform .55s cubic-bezier(.25,.46,.45,.94),box-shadow .55s ease'
    el.style.transform  = baseTf
    el.style.boxShadow  = ''
    el.style.zIndex     = String(10 + ci)
  }

  const imgH    = card.h
  const totalH  = imgH

  return (
    <div
      ref={cardRef}
      className={`flying-card${card.pol ? ' polaroid' : ''}`}
      style={{
        width:     card.w,
        height:    totalH,
        left:      `calc(50% + ${card.x}%)`,
        top:       `calc(50% + ${card.y}%)`,
        transform: baseTf,
        zIndex:    10 + ci,
        borderRadius: rounded ? 16 : undefined,
        overflow: rounded ? 'hidden' : undefined,
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <img
        src={card.img}
        alt=""
        loading="eager"
        style={{ width: card.w, height: imgH, display: 'block', objectFit: 'cover', borderRadius: rounded ? 16 : 0 }}
      />
    </div>
  )
}

export default function SlideCards({ v, imgs, lbls, rounded, recap }) {
  const cards = resolveCards(v, imgs, lbls)
  return (
    <div className="absolute inset-0 overflow-hidden">
      {cards.map((card, ci) => (
        <FlyingCard key={ci} card={card} ci={ci} rounded={rounded} />
      ))}
      {recap && (
        <div className="absolute bottom-0 left-0 right-0 font-serif italic text-choco text-center text-sm px-6 pb-8 pt-2 opacity-90 max-w-xl mx-auto z-20" style={{ fontSize: 'clamp(14px,2vw,22px)' }}>
          {recap}
        </div>
      )}
    </div>
  )
}
