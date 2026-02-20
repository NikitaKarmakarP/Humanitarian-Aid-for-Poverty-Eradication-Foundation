import { Camera, Sparkles, Image as ImageIcon, Aperture, Video, Layers, Heart } from "lucide-react"

export function PhotoGalleryHero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-br from-emerald-50/50 via-teal-50/30 to-blue-50/20" />
        <div className="absolute right-0 top-0 w-[800px] h-[800px] bg-gradient-to-bl from-emerald-100/30 via-teal-50/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute left-0 top-20 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100/30 via-indigo-50/20 to-transparent rounded-full blur-3xl -translate-x-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-emerald-100 shadow-sm mb-10 hover:shadow-md transition-all duration-300 group cursor-default">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-sm font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-teal-800 uppercase group-hover:from-emerald-600 group-hover:to-teal-600">
            Visual Stories
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-gray-900 mb-8 tracking-tight leading-tight">
          <span className="relative inline-block z-10">
            Photo
            <Sparkles className="absolute -top-6 -left-6 md:-top-8 md:-left-10 w-8 h-8 md:w-12 md:h-12 text-yellow-400 fill-yellow-200 animate-bounce" style={{ animationDuration: '3000ms' }} strokeWidth={1.5} />
          </span>{" "}
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 pb-2">
            Gallery
            <div className="absolute -bottom-2 left-0 w-full h-2 md:h-3 bg-emerald-200/40 -rotate-2 rounded-full blur-sm"></div>
          </span>
        </h1>

        {/* Description */}
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-14 font-medium leading-relaxed">
          Journey through captured moments of <span className="text-emerald-600 font-bold">hope</span>, <span className="text-teal-600 font-bold">resilience</span>, and <span className="text-blue-600 font-bold">transformation</span> across the heart of rural India.
        </p>

        {/* Stats / Categories Preview - Decorative */}

      </div>
    </section>
  )
}
