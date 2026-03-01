export default function SlideDiag({ q, sub, extra, al }) {
  const isRight = al === 'r'
  const alignStyle = isRight ? 'text-right items-end' : 'text-left items-start'

  return (
    <div
      className={`flex flex-col justify-end gap-3 p-[9vw] w-full h-full relative ${alignStyle}`}
      style={isRight ? { justifyContent: 'flex-start' } : {}}
    >
      <div className="text-[9px] tracking-[.54em] uppercase text-gold opacity-80 z-10">
        {sub}
      </div>
      <div
        className="font-serif italic font-light text-choco leading-[1.2] z-10"
        style={{ fontSize: 'clamp(30px,5.2vw,68px)' }}
        dangerouslySetInnerHTML={{ __html: q.replace(/\n/g, '<br/>') }}
      />
      {extra && (
        <div className="font-serif italic text-choco opacity-90 z-10" style={{ fontSize: 'clamp(16px,2.5vw,28px)' }}>
          {extra}
        </div>
      )}
      <div
        className="divider-gold z-10"
        style={isRight ? { marginRight: 0, marginLeft: 'auto' } : { marginLeft: 0, marginRight: 'auto' }}
      />
    </div>
  )
}
