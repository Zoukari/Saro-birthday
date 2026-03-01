export default function SlideFullBleed({ img, cap }) {
  return (
    <div className="absolute inset-0">
      <img src={img} alt="" className="w-full h-full object-cover block" loading="eager" />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom,rgba(43,33,24,.1) 0%,transparent 30%,rgba(43,33,24,.6) 100%)' }}
      />
    </div>
  )
}
