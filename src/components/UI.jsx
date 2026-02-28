// ─────────────────────────────────────────────────────────
// UI — fixed chrome elements + barre du bas (recommencer, pause, son)
// ─────────────────────────────────────────────────────────
import { SLIDES } from '../data/slides.js'

const N = SLIDES.length

const barBtn =
  'cursor-none px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all hover:bg-gold hover:text-white border border-[rgba(201,169,98,.38)] bg-[rgba(245,239,230,.88)] backdrop-blur-[10px] text-choco'

const musicStatusLabel = {
  loading: 'Musique : en cours…',
  ready: 'Musique : chargée',
  error: 'Musique : indisponible',
}

export default function UI({
  progressFrac,
  currentIdx,
  jumpTo,
  muted,
  onToggleMute,
  running,
  onPauseResume,
  onRestart,
  musicStatus = 'loading',
}) {
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
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[800] text-[8px] tracking-[.42em] text-gold opacity-50">
        {String(currentIdx + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
      </div>

      {/* Barre du bas : recommencer, pause, son */}
      <div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[800] flex items-center gap-3"
        style={{
          border: '1px solid rgba(201,169,98,.28)',
          background: 'rgba(245,239,230,.92)',
          backdropFilter: 'blur(12px)',
          borderRadius: 9999,
          padding: '6px 10px 6px 14px',
          boxShadow: '0 4px 24px rgba(43,33,24,.08)',
        }}
      >
        <button
          type="button"
          onClick={onRestart}
          className={barBtn}
          title="Tout recommencer (début + musique)"
        >
          Tout recommencer
        </button>
        <span className="w-px h-5 bg-[rgba(201,169,98,.25)]" />
        <button
          type="button"
          onClick={onPauseResume}
          className={barBtn}
          title={running ? 'Pause (défilement + musique)' : 'Reprendre'}
        >
          {running ? 'Pause' : 'Reprendre'}
        </button>
        <span className="w-px h-5 bg-[rgba(201,169,98,.25)]" />
        <button
          type="button"
          onClick={onToggleMute}
          className={`${barBtn} w-9 h-9 p-0 flex items-center justify-center text-base`}
          title={muted ? 'Activer la musique' : 'Couper la musique'}
        >
          {muted ? '♪' : '♫'}
        </button>
      </div>

      {/* Statut musique (lien) */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[799] text-center py-1.5 text-[10px] tracking-widest opacity-70"
        style={{ color: musicStatus === 'error' ? '#cd5c5c' : 'rgba(201,169,98,.9)' }}
      >
        {musicStatusLabel[musicStatus]}
      </div>
    </>
  )
}
