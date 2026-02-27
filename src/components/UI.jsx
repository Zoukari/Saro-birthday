// ─────────────────────────────────────────────────────────
// UI — fixed chrome elements
// ─────────────────────────────────────────────────────────
import { SLIDES } from '../data/slides.js'

const N = SLIDES.length

export default function UI({ progressFrac, currentIdx, jumpTo, muted, onToggleMute }) {
  return (
    <>
      {/* Progress bar */}
      <div
        className="progress-bar"
        style={{ width: `${progressFrac * 100}%` }}
      />

      {/* Dot navigation */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[800] flex flex-col gap-[6px]">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => jumpTo(i)}
            className="cursor-none"
            style={{
              width: 4, height: 4, borderRadius: '50%', border: 'none', padding: 0,
              background: '#c9a962',
              opacity:    i === currentIdx ? 1 : .28,
              transform:  i === currentIdx ? 'scale(1.8)' : 'scale(1)',
              transition: 'opacity .3s, transform .3s',
            }}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[800] text-[8px] tracking-[.42em] text-gold opacity-50">
        {String(currentIdx + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
      </div>

      {/* Music toggle */}
      <button
        onClick={onToggleMute}
        className="fixed bottom-5 right-5 z-[800] w-10 h-10 rounded-full flex items-center justify-center text-base text-choco transition-all hover:bg-gold hover:text-white cursor-none"
        style={{
          border: '1px solid rgba(201,169,98,.38)',
          background: 'rgba(245,239,230,.88)',
          backdropFilter: 'blur(10px)',
        }}
        title={muted ? 'Activer la musique' : 'Couper la musique'}
      >
        {muted ? '♪' : '♫'}
      </button>
    </>
  )
}
