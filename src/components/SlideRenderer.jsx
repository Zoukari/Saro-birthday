// ─────────────────────────────────────────────────────────
// SlideRenderer — maps slide type → slide component
// Wraps each in the .slide-base div whose style is driven
// imperatively by useAutoScroll (no React re-render per frame)
// ─────────────────────────────────────────────────────────
import { useEffect } from 'react'
import SlideHero      from './slides/SlideHero.jsx'
import SlideQuote     from './slides/SlideQuote.jsx'
import SlideDiag      from './slides/SlideDiag.jsx'
import SlideFullBleed from './slides/SlideFullBleed.jsx'
import SlideFramed    from './slides/SlideFramed.jsx'
import SlideSplit     from './slides/SlideSplit.jsx'
import SlideCards     from './slides/SlideCards.jsx'
import SlideFinal     from './slides/SlideFinal.jsx'

function SlideContent({ data }) {
  const { t, ...rest } = data
  if (t === 'hero')   return <SlideHero />
  if (t === 'quote')  return <SlideQuote  {...rest} />
  if (t === 'diag')   return <SlideDiag   {...rest} />
  if (t === 'full')   return <SlideFullBleed {...rest} />
  if (t === 'framed') return <SlideFramed {...rest} />
  if (t === 'split')  return <SlideSplit  {...rest} />
  if (t === 'cards')  return <SlideCards  {...rest} />
  if (t === 'final')  return <SlideFinal />
  return null
}

export default function SlideRenderer({ slides, registerSlide }) {
  return (
    <>
      {slides.map((data, idx) => (
        <SlideWrapper key={idx} idx={idx} data={data} registerSlide={registerSlide} />
      ))}
    </>
  )
}

function SlideWrapper({ idx, data, registerSlide }) {
  useEffect(() => {
    // Register DOM node with the scroll engine on mount
    const el = document.getElementById(`slide-${idx}`)
    if (el) registerSlide(idx, el)
  }, [idx, registerSlide])

  return (
    <div
      id={`slide-${idx}`}
      className="slide-base"
      style={{
        opacity: 0,
        transform: 'translateY(58px) scale(.96)',
        pointerEvents: 'none',
      }}
    >
      <SlideContent data={data} />
    </div>
  )
}
