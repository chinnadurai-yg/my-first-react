"use client";

import Link from "next/link";
import Image from "next/image";
import { useSiteContent } from "../../context/SiteContentContext";

export default function HeroBanner() {
  const { heroContent, loading, error } = useSiteContent();

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 pt-20 pb-16 lg:pt-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-orange-200/20 dark:bg-orange-900/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-pink-200/20 dark:bg-pink-900/10 blur-3xl animate-pulse opacity-50" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center mt-10">
          <div className="flex flex-col items-start gap-8 lg:pr-10">
            <div className="w-48 h-10 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" />
            <div className="space-y-4 w-full">
              <div className="h-16 bg-slate-200 dark:bg-slate-800 rounded-2xl w-[90%] animate-pulse" />
              <div className="h-16 bg-slate-200 dark:bg-slate-800 rounded-2xl w-[70%] animate-pulse" />
            </div>
            <div className="space-y-3 w-full">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-full animate-pulse" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-full w-[80%] animate-pulse" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
              <div className="w-full sm:w-48 h-14 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" />
              <div className="w-full sm:w-48 h-14 bg-slate-200 dark:bg-slate-800 rounded-full animate-pulse" />
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-lg aspect-[5/4] sm:aspect-[4/3] bg-slate-200 dark:bg-slate-800 rounded-[32px] animate-pulse" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {error && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-orange-100 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/50 rounded-lg shadow-xl backdrop-blur-md">
          <p className="text-sm font-medium text-orange-700 dark:text-orange-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            {error}
          </p>
        </div>
      )}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 pt-20 pb-16 lg:pt-28">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-blob absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-orange-400/20 dark:bg-orange-600/15 blur-3xl" />
        <div className="animate-blob-delay absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-pink-400/20 dark:bg-pink-600/15 blur-3xl opacity-50" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center mt-10">
        {/* Left Column - Text */}
        <div className="flex flex-col items-start gap-8 lg:pr-10">
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 text-sm font-medium shadow-sm">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            {heroContent.badge}
          </div>

          <h1 className="animate-fade-in-up-delay-1 text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
            {heroContent.title} <br />
            <span className="relative inline-block mt-2">
              <span
                className="animate-shimmer bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg, #f97316, #ec4899, #f59e0b, #f97316)",
                  backgroundSize: "200% auto",
                }}
              >
                {heroContent.titleHighlight}
              </span>
            </span>{" "}
            {heroContent.titleEnd}
          </h1>

          <p className="animate-fade-in-up-delay-2 text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
            {heroContent.subtitle}
          </p>

          <div className="animate-fade-in-up-delay-3 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-2">
            <Link
              href="/courses"
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500 shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/50 hover:-translate-y-1 transition-all duration-300 no-underline"
            >
              {heroContent.ctaPrimary}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-white/5 hover:border-orange-400 dark:hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 hover:-translate-y-1 transition-all duration-300 no-underline backdrop-blur-sm"
            >
              {heroContent.ctaSecondary}
            </Link>
          </div>

          {/* Social Proof */}
          <div className="animate-fade-in-up-delay-4 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-10 h-10 rounded-full border-2 border-slate-50 dark:border-slate-950 flex items-center justify-center text-xs font-bold text-white shadow-sm ring-2 ring-transparent bg-gradient-to-br ${
                  i === 1 ? "from-blue-400 to-indigo-500" :
                  i === 2 ? "from-pink-400 to-rose-500" :
                  i === 3 ? "from-emerald-400 to-teal-500" :
                  "from-orange-400 to-amber-500"
                }`}>
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-slate-50 dark:border-slate-950 bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300 shadow-sm">+2k</div>
            </div>
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Join <span className="font-bold text-slate-900 dark:text-white">100k+</span> students
            </div>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="relative flex justify-center lg:justify-end animate-slide-in-right">
          <div className="relative w-full max-w-lg aspect-[5/4] sm:aspect-[4/3] group">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-500/30 to-pink-500/30 blur-3xl animate-pulse delay-75" />
            <div
              className="relative w-full h-full overflow-hidden shadow-2xl transition-transform duration-700 bg-slate-200 dark:bg-slate-800"
              style={{
                borderRadius: "32px",
                WebkitMask: "radial-gradient(circle at 0% 50%, transparent 24px, black 25px) 0 0 / 51.5% 100% no-repeat, radial-gradient(circle at 100% 50%, transparent 24px, black 25px) 100% 0 / 51.5% 100% no-repeat",
                mask: "radial-gradient(circle at 0% 50%, transparent 24px, black 25px) 0 0 / 51.5% 100% no-repeat, radial-gradient(circle at 100% 50%, transparent 24px, black 25px) 100% 0 / 51.5% 100% no-repeat",
              }}
            >
              <Image
                src="/hero-image.png"
                alt="Creative Learning Illustration"
                fill
                priority
                className="object-cover scale-105 group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
              />
            </div>
            <div className="absolute -left-6 top-1/4 animate-float z-20 hidden md:flex items-center gap-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-3 pr-5 rounded-2xl border border-black/5 dark:border-white/10 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center text-lg text-orange-500">✨</div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">UI/UX Design</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Trending Now</p>
              </div>
            </div>
            <div className="absolute -right-4 bottom-1/4 animate-float-delayed z-20 hidden md:flex items-center gap-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-3 pr-5 rounded-2xl border border-black/5 dark:border-white/10 shadow-xl">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-lg text-blue-500">💻</div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Web Development</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">50+ Projects</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
