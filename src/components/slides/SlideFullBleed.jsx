export default function SlideFullBleed({ img, cap, arrow }) {
  return (
    <div className="absolute inset-0">
      <img src={img} alt="" className="w-full h-full object-cover block" loading="eager" />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom,rgba(43,33,24,.1) 0%,transparent 30%,rgba(43,33,24,.6) 100%)' }}
      />
      {(cap || arrow) && (
        <div className="absolute bottom-0 left-0 right-0 p-6 pb-28 text-center">
          {arrow && (
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-gold text-lg">→</span>
              <span
                className="font-serif italic text-white text-shadow-sm max-w-md"
                style={{ fontSize: 'clamp(14px,2vw,20px)' }}
              >
                {arrow}
              </span>
            </div>
          )}
          {cap && (
            <p
              className="font-serif italic font-light text-white text-shadow-sm"
              style={{ fontSize: 'clamp(16px,2.5vw,28px)' }}
            >
              {cap}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
