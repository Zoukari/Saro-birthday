export default function SlideFinal() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 p-10 w-full h-full">
      <div className="final-heart" style={{ fontSize: 'clamp(66px,13vw,144px)' }}>♥</div>
      <div className="divider-gold" style={{ marginTop: 16 }} />
      <div
        className="font-serif italic font-light shimmer-text"
        style={{ fontSize: 'clamp(34px,7vw,84px)' }}
      >
        Saro, je t'aime.
      </div>
      <div className="text-[9px] tracking-[.6em] uppercase text-gold opacity-80 mt-2">
        À jamais · Pour toujours · Infiniment
      </div>
    </div>
  )
}
