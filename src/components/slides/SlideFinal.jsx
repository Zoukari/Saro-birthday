import { MEME_LINK } from '../../data/memeLink.js'

export default function SlideFinal() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 p-10 w-full h-full pb-28">
      <div className="final-heart" style={{ fontSize: 'clamp(66px,13vw,144px)' }}>♥</div>
      <div className="divider-gold" style={{ marginTop: 16 }} />
      <div
        className="font-serif italic font-light shimmer-text"
        style={{ fontSize: 'clamp(34px,7vw,84px)' }}
      >
        Saro, je t'aime.
      </div>
      <div
        className="font-serif italic font-light shimmer-text mt-2"
        style={{ fontSize: 'clamp(28px,5.5vw,64px)' }}
      >
        Joyeux anniversaire.
      </div>
      <div className="text-[9px] tracking-[.6em] uppercase text-gold opacity-80 mt-2">
        À jamais · Pour toujours · Infiniment
      </div>
      <a
        href={MEME_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 text-[11px] tracking-widest uppercase text-gold opacity-90 hover:opacity-100 underline underline-offset-2 cursor-none"
      >
        Lien du meme
      </a>
    </div>
  )
}
