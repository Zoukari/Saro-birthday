export default function SlideFullBleed({ img, cap, arrowText }) {
  return (
    <div className="absolute inset-0">
      <img src={img} alt="" className="w-full h-full object-cover block" loading="eager" />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom,rgba(43,33,24,.1) 0%,transparent 30%,rgba(43,33,24,.6) 100%)' }}
      />
      {(cap || arrowText) && (
        <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center gap-3">
          {cap && <span className="font-serif italic text-white drop-shadow-md text-lg">{cap}</span>}
          {arrowText && (
            <span className="font-serif italic text-white/95 text-sm flex items-center gap-2">
              <span className="text-gold">→</span> {arrowText}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
