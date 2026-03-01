export default function SlideDiag({ q, sub, al, topCaption }) {
  const isRight = al === 'r'
  const alignStyle = isRight ? 'text-right items-end' : 'text-left items-start'

  return (
    <div
      className={`flex flex-col justify-end gap-3 p-[9vw] w-full h-full relative pb-28 ${alignStyle}`}
      style={isRight ? { justifyContent: 'flex-start' } : {}}
    >
      {topCaption && (
        <div className="absolute top-[9vw] left-[9vw] right-[9vw] text-center font-serif italic font-light text-choco z-10" style={{ fontSize: 'clamp(14px,2vw,22px)' }}>
          {topCaption}
        </div>
      )}
      <div className="text-[9px] tracking-[.54em] uppercase text-gold opacity-80 z-10">
        {sub}
      </div>
      <div
        className="font-serif italic font-light text-choco leading-[1.2] z-10"
        style={{ fontSize: 'clamp(30px,5.2vw,68px)' }}
        dangerouslySetInnerHTML={{ __html: q.replace(/\n/g, '<br/>') }}
      />
      <div
        className="divider-gold z-10"
        style={isRight ? { marginRight: 0, marginLeft: 'auto' } : { marginLeft: 0, marginRight: 'auto' }}
      />
    </div>
  )
}
