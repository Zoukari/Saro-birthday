export default function SlideHero({ heroTitle }) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-2 p-10 w-full h-full pb-24">
      <div className="text-[9px] tracking-[.6em] uppercase text-gold opacity-80">
        ✦ Un jour très spécial ✦
      </div>
      <div
        className="font-serif italic font-light shimmer-text"
        style={{ fontSize: 'clamp(42px,10vw,120px)', lineHeight: 1.1 }}
      >
        {heroTitle || 'Joyeux anniversaire Saro'}
      </div>
      <div className="divider-gold" />
      <div className="text-[9px] tracking-[.6em] uppercase text-choco-2 opacity-70 mt-2">
        MA FUTURE FEMME · MON AMOUR
      </div>
    </div>
  )
}
