export default function SlideHero() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-2 p-10 w-full h-full">
      <div className="text-[9px] tracking-[.6em] uppercase text-gold opacity-80">
        ✦ Un jour très spécial ✦
      </div>
      <div
        className="font-serif font-light text-choco leading-[.88] tracking-tight"
        style={{ fontSize: 'clamp(44px,9vw,116px)' }}
      >
        JOYEUX<br />ANNIVERSAIRE
      </div>
      <div className="divider-gold" />
      <div
        className="font-serif italic font-light shimmer-text"
        style={{ fontSize: 'clamp(64px,14vw,170px)', lineHeight: 1 }}
      >
        Saro
      </div>
      <div className="text-[9px] tracking-[.6em] uppercase text-choco-2 opacity-70 mt-2">
        MA FUTURE FEMME · MON AMOUR
      </div>
    </div>
  )
}
