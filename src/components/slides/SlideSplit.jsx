export default function SlideSplit({ img, q, lbl, sub, rev, extra, photoCaption }) {
  return (
    <div
      className="split-layout absolute inset-0 flex"
      style={{ flexDirection: rev ? 'row-reverse' : 'row' }}
    >
      {/* Image side */}
      <div className="flex-[0_0_55%] overflow-hidden relative">
        <img src={img} alt="" className="w-full h-full object-cover block" loading="eager" />
        {photoCaption && (
          <div className="absolute top-3 left-3 right-3 text-center text-[11px] font-serif italic text-choco opacity-90 bg-white/80 backdrop-blur-sm py-1.5 px-2 rounded">
            {photoCaption}
          </div>
        )}
        <div
          className="absolute inset-0"
          style={{
            background: rev
              ? 'linear-gradient(to left,transparent 52%,#f5efe6 100%)'
              : 'linear-gradient(to right,transparent 52%,#f5efe6 100%)',
          }}
        />
      </div>

      {/* Text side — aligné en haut pour ne pas être caché par la barre */}
      <div
        className="flex-1 flex flex-col justify-start pt-14 pb-24"
        style={rev ? { padding: '52px 32px 52px 48px' } : { padding: '52px 48px 52px 32px' }}
      >
        {lbl && <div className="text-[9px] tracking-[.54em] uppercase text-gold opacity-80 mb-3">{lbl}</div>}
        <div
          className="font-serif italic font-light text-choco leading-[1.3] mb-4"
          style={{ fontSize: 'clamp(20px,2.9vw,42px)' }}
          dangerouslySetInnerHTML={{ __html: q.replace(/\n/g, '<br/>') }}
        />
        {extra && <div className="font-serif italic text-choco text-sm mb-3 opacity-90">{extra}</div>}
        <div className="divider-gold" style={{ margin: '0 0 12px' }} />
        <div className="text-[9px] tracking-[.54em] uppercase text-gold opacity-80">{sub}</div>
      </div>
    </div>
  )
}
