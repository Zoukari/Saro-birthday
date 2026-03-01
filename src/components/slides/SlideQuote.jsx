export default function SlideQuote({ q, sub, sh }) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 p-10 w-full h-full relative pb-28">
      <div className="text-[9px] tracking-[.54em] uppercase text-gold opacity-80 z-10">
        {sub}
      </div>
      <div
        className={`font-serif italic font-light text-choco leading-[1.25] max-w-3xl z-10 ${sh ? 'shimmer-gold' : ''}`}
        style={{ fontSize: 'clamp(24px,4vw,58px)' }}
        dangerouslySetInnerHTML={{ __html: q.replace(/\n/g, '<br/>') }}
      />
      <div className="divider-gold z-10" />
    </div>
  )
}
