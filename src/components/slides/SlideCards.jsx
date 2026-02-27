import { useRef } from 'react'
import { resolveCards } from '../../data/cardLayouts.js'

function FlyingCard({ card, ci }) {
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
  const totalH  = card.pol ? imgH + 44 : imgH

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
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <img
        src={card.img}
        alt=""
        loading="eager"
        style={{ width: card.w, height: imgH, display: 'block', objectFit: 'cover' }}
      />
      {card.pol ? (
        <div style={{
          padding: '8px 0 0', textAlign: 'center', color: '#4a3728',
          fontSize: 8, letterSpacing: '.34em', textTransform: 'uppercase',
        }}>
          {card.lbl}
        </div>
      ) : (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '12px',
          background: 'linear-gradient(to top,rgba(43,33,24,.88),transparent)',
          color: '#fff', fontSize: 8, letterSpacing: '.42em', textTransform: 'uppercase',
        }}>
          {card.lbl}
        </div>
      )}
    </div>
  )
}

export default function SlideCards({ v, imgs, lbls }) {
  const cards = resolveCards(v, imgs, lbls)
  return (
    <div className="absolute inset-0 overflow-hidden">
      {cards.map((card, ci) => (
        <FlyingCard key={ci} card={card} ci={ci} />
      ))}
    </div>
  )
}
