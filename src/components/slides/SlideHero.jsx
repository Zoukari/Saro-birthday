export default function SlideHero({ heroSubtitle }) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-2 p-10 w-full h-full pb-24">
      <div className="text-[9px] tracking-[.6em] uppercase text-gold opacity-80">
        ✦ Un jour très spécial ✦
      </div>
      <div
        className="font-serif italic font-light shimmer-text"
        style={{ fontSize: 'clamp(42px,10vw,120px)', lineHeight: 1.1 }}
      >
        Joyeux anniversaire Saro
      </div>
      {heroSubtitle && (
        <div className="font-serif italic font-light text-choco mt-1" style={{ fontSize: 'clamp(20px,4vw,42px)' }}>
          {heroSubtitle}
        </div>
      )}
      <div className="divider-gold" />
      <div className="text-[9px] tracking-[.6em] uppercase text-choco-2 opacity-70 mt-2">
        MA FUTURE FEMME · MON AMOUR
      </div>
    </div>
  )
}
