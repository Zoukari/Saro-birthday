export default function SlideFinal() {
  const memeUrl = 'https://youtube.com/shorts/jqa6UT_AnhE?si=bY-F2SU0eckIEOHx'
  return (
    <div className="flex flex-col items-center justify-start text-center gap-4 p-10 pt-8 w-full h-full">
      <div className="final-heart" style={{ fontSize: 'clamp(66px,13vw,144px)' }}>♥</div>
      <div className="divider-gold" style={{ marginTop: 16 }} />
      <div
        className="font-serif italic font-light shimmer-text"
        style={{ fontSize: 'clamp(34px,7vw,84px)' }}
      >
        Saro, je t'aime.<br />Joyeux anniversaire.
      </div>
      <div className="text-[9px] tracking-[.6em] uppercase text-gold opacity-80 mt-2">
        À jamais · Pour toujours · Infiniment
      </div>
      <a href={memeUrl} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline mt-4 text-sm">
        Lien du meme
      </a>
    </div>
  )
}
