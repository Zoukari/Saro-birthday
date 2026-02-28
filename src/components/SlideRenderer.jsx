// ─────────────────────────────────────────────────────────
// SlideRenderer — ruban vertical : chaque slide = 100vh, on défile le tout
// ─────────────────────────────────────────────────────────
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

export default function SlideRenderer({ slides, stripRef }) {
  return (
    <div
      ref={stripRef}
      className="scroll-strip"
      style={{
        height: `${slides.length * 100}vh`,
        willChange: 'transform',
      }}
    >
      {slides.map((data, idx) => (
        <section
          key={idx}
          className="slide-cell"
          style={{ minHeight: '100vh', position: 'relative' }}
        >
          <div className="slide-base slide-base--full">
            <SlideContent data={data} />
          </div>
        </section>
      ))}
    </div>
  )
}
