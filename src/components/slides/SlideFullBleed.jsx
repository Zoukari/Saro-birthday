export default function SlideFullBleed({ img, cap }) {
  return (
    <div className="absolute inset-0">
      <img src={img} alt="" className="w-full h-full object-cover block" loading="eager" />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom,rgba(43,33,24,.1) 0%,transparent 30%,rgba(43,33,24,.6) 100%)' }}
      />
      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 text-center text-white">
        <div className="w-11 h-px mx-auto mb-2" style={{ background: 'rgba(201,169,98,.8)' }} />
        <p className="text-[8px] tracking-[.5em] uppercase">{cap}</p>
      </div>
    </div>
  )
}
