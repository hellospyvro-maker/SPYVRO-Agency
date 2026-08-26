import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Check, Smartphone, Globe, ShieldCheck, Zap, Layers, Star, TrendingUp } from 'lucide-react';
import Magnetic from './Magnetic';

export default function Hero({ settings }: { settings?: any }) {
  return (
    <section className="relative min-h-[95vh] flex flex-col justify-between pt-28 md:pt-36 pb-12 overflow-hidden bg-bg">
      {/* Background Decor & Ambient Lighting */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-blue-400/10 via-indigo-300/10 to-transparent blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10 my-auto">
        
        {/* Left Column: Text Content */}
        <div className="lg:col-span-7 max-w-2xl">
          {/* Reference-style Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200/80 bg-blue-50/70 backdrop-blur-md shadow-xs mb-6"
          >
            <Sparkles size={14} className="text-accent animate-pulse" />
            <span className="text-xs font-semibold text-accent tracking-wide uppercase">
              Premium Websites • Web Apps • Mobile Experiences
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-display font-extrabold leading-[1.08] text-primary tracking-tight mb-6"
          >
            {settings?.heroText || (
              <>Turning Ambitious Ideas Into <span className="text-gradient">Exceptional Digital Experiences</span></>
            )}
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-secondary leading-relaxed mb-8 max-w-xl font-normal"
          >
            {settings?.heroSubtext || "Spyvro creates premium websites, web applications, and mobile experiences designed to help ambitious businesses build trust, attract customers, and grow online."}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8"
          >
            <Magnetic className="w-full sm:w-auto">
              <a 
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-primary text-white text-base font-semibold rounded-full hover:bg-accent transition-all duration-300 shadow-lg shadow-primary/10 hover:shadow-accent/25 hover:-translate-y-0.5"
              >
                Start a Project
                <ArrowRight size={18} />
              </a>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <a 
                href="#work"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 bg-white border border-slate-200/80 text-primary text-base font-semibold rounded-full hover:bg-slate-50 transition-all duration-300 shadow-xs hover:border-slate-300 hover:-translate-y-0.5"
              >
                View Work
              </a>
            </Magnetic>
          </motion.div>

          {/* Trust Checkmarks Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-slate-500"
          >
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-blue-100 text-accent flex items-center justify-center">
                <Check size={11} strokeWidth={3} />
              </div>
              <span>Fixed, transparent pricing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-blue-100 text-accent flex items-center justify-center">
                <Check size={11} strokeWidth={3} />
              </div>
              <span>100% code ownership</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 rounded-full bg-blue-100 text-accent flex items-center justify-center">
                <Check size={11} strokeWidth={3} />
              </div>
              <span>Direct developer communication</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: High-End Interactive Layered Mockup (Roy Digital Reference Style) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-5 relative w-full h-[460px] sm:h-[520px] flex items-center justify-center"
        >
          {/* Ambient Glow behind Device Stack */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-indigo-400/10 to-transparent blur-2xl rounded-3xl" />

          {/* Layer 1: Background Glass Web Card */}
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute top-4 right-2 sm:right-6 w-[88%] sm:w-[380px] bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-[0_25px_50px_-12px_rgba(15,23,42,0.12)] p-5 z-10"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <div className="px-2.5 py-0.5 rounded-md bg-slate-100 text-[10px] font-medium text-slate-500 flex items-center gap-1">
                <Globe size={10} /> spyvro.com
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="h-4 w-28 bg-slate-100 rounded-full" />
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  ● Live Preview
                </span>
              </div>
              <div className="h-10 bg-slate-50 rounded-xl p-2.5 flex items-center justify-between border border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Layers size={13} />
                  </div>
                  <div className="space-y-1">
                    <div className="h-2 w-16 bg-slate-200 rounded-full" />
                    <div className="h-1.5 w-24 bg-slate-100 rounded-full" />
                  </div>
                </div>
                <div className="h-5 w-14 bg-primary text-white text-[9px] font-semibold rounded-md flex items-center justify-center">
                  Launch
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="h-16 bg-gradient-to-br from-blue-50/80 to-slate-50 rounded-xl p-2.5 border border-blue-100/50 flex flex-col justify-between">
                  <span className="text-[10px] font-medium text-slate-500">Page Speed</span>
                  <div className="text-lg font-bold text-primary">99/100</div>
                </div>
                <div className="h-16 bg-gradient-to-br from-indigo-50/80 to-slate-50 rounded-xl p-2.5 border border-indigo-100/50 flex flex-col justify-between">
                  <span className="text-[10px] font-medium text-slate-500">SEO Score</span>
                  <div className="text-lg font-bold text-accent">Top 1%</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Layer 2: Main Floating Smartphone Mockup (Front & Center) */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-2 left-2 sm:left-6 w-[230px] sm:w-[250px] bg-slate-900 rounded-[2.5rem] p-2.5 shadow-[0_30px_60px_-15px_rgba(15,23,42,0.3)] border-4 border-slate-800 z-20"
          >
            <div className="w-full bg-slate-950 rounded-[2rem] overflow-hidden p-3.5 text-white flex flex-col justify-between h-[390px] relative">
              {/* Dynamic Island / Notch */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-900 rounded-full flex items-center justify-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-800" />
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/80" />
              </div>

              {/* Mobile App Header */}
              <div className="pt-5 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 font-medium">Digital Solution</div>
                  <div className="text-xs font-bold text-white">Spyvro Mobile App</div>
                </div>
                <div className="w-7 h-7 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Smartphone size={14} />
                </div>
              </div>

              {/* Mobile App Screen Content */}
              <div className="space-y-2.5 my-auto">
                <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-slate-300">5.0 (200+ Reviews)</span>
                  </div>
                  <div className="text-[11px] font-semibold text-white">Instant Booking & Orders</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">High conversion seamless checkout</div>
                </div>

                <div className="p-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-between text-white shadow-md shadow-blue-500/20">
                  <div className="flex items-center gap-2">
                    <Zap size={14} />
                    <div className="text-[10px] font-bold">Fast Performance</div>
                  </div>
                  <span className="text-[9px] bg-white/20 px-2 py-0.5 rounded-full font-semibold">Native</span>
                </div>
              </div>

              {/* Mobile Action Bar */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <div className="text-[9px] text-slate-400">Status: <span className="text-emerald-400 font-semibold">Active</span></div>
                <div className="text-[9px] font-semibold text-blue-400">Built for Growth →</div>
              </div>
            </div>
          </motion.div>

          {/* Layer 3: Floating Micro Analytics Badge */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="absolute -top-3 -left-2 sm:left-0 bg-white/95 backdrop-blur-xl border border-blue-100 rounded-2xl shadow-xl p-3.5 z-30 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-accent flex items-center justify-center shadow-inner">
              <TrendingUp size={20} />
            </div>
            <div>
              <div className="text-[11px] font-bold text-primary flex items-center gap-1.5">
                <span>Conversion Boost</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <div className="text-xs font-semibold text-emerald-600">+140% Growth Rate</div>
            </div>
          </motion.div>
        </motion.div>

      </div>

      {/* Reference-style Value Props Strip / Ticker Bar (Bottom of Hero) */}
      <div className="max-w-7xl mx-auto px-6 w-full pt-10 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100"
        >
          <div className="flex items-center gap-3 pl-2">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Zap size={18} />
            </div>
            <div>
              <div className="text-xs font-bold text-primary">Rapid Delivery</div>
              <div className="text-[11px] text-slate-500 font-normal">Fast turnaround in days</div>
            </div>
          </div>

          <div className="flex items-center gap-3 pl-2 sm:pl-6 pt-3 sm:pt-0">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Smartphone size={18} />
            </div>
            <div>
              <div className="text-xs font-bold text-primary">Web & Mobile Ready</div>
              <div className="text-[11px] text-slate-500 font-normal">Modern multi-platform UI</div>
            </div>
          </div>

          <div className="flex items-center gap-3 pl-2 sm:pl-6 pt-3 sm:pt-0">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="text-xs font-bold text-primary">Fixed Pricing</div>
              <div className="text-[11px] text-slate-500 font-normal">No hidden surprise fees</div>
            </div>
          </div>

          <div className="flex items-center gap-3 pl-2 sm:pl-6 pt-3 sm:pt-0">
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <div className="text-xs font-bold text-primary">Full Support</div>
              <div className="text-[11px] text-slate-500 font-normal">Complete launch & testing</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
