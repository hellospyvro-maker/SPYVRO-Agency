import { motion } from 'motion/react';
import { ArrowRight, Monitor, Smartphone, BarChart3 } from 'lucide-react';
import Magnetic from './Magnetic';

export default function Hero({ settings }: { settings?: any }) {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden bg-bg">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent-light/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10">
        
        {/* Text Content */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-subtle bg-white/50 backdrop-blur-sm shadow-sm mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-accent-light animate-pulse" />
            <span className="text-xs font-medium text-secondary tracking-wide uppercase">
              Premium Websites • Web Apps • Mobile Experiences
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] text-primary mb-6"
          >
            {settings?.heroText || (
              <>Turning Ambitious Ideas Into <span className="text-gradient">Exceptional Digital Experiences</span></>
            )}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-secondary leading-relaxed mb-10 max-w-lg"
          >
            {settings?.heroSubtext || "Spyvro creates premium websites, web applications, and mobile experiences designed to help ambitious businesses build trust, attract customers, and grow online."}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <Magnetic className="w-full sm:w-auto">
              <a 
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white text-base font-medium rounded-full hover:bg-accent transition-all duration-300 hover:shadow-lg"
              >
                Start a Project
                <ArrowRight size={18} />
              </a>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <a 
                href="#work"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border border-border-subtle text-primary text-base font-medium rounded-full hover:bg-bg-alt transition-all duration-300 hover:shadow-sm"
              >
                View Work
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Premium 3D-like Composition */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-[500px] lg:h-[600px] w-full hidden md:block"
        >
          {/* Main Browser Mockup */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] max-w-[600px] aspect-video bg-white rounded-2xl border border-border-subtle shadow-2xl overflow-hidden"
          >
            <div className="h-8 border-b border-border-subtle bg-bg-alt flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="p-6 h-full bg-white relative overflow-hidden">
              <div className="w-32 h-6 bg-slate-100 rounded-md mb-6" />
              <div className="w-3/4 h-12 bg-slate-100 rounded-md mb-4" />
              <div className="w-1/2 h-4 bg-slate-50 rounded-md mb-8" />
              <div className="grid grid-cols-3 gap-4">
                <div className="h-24 bg-slate-50 rounded-xl" />
                <div className="h-24 bg-slate-50 rounded-xl" />
                <div className="h-24 bg-slate-50 rounded-xl" />
              </div>
            </div>
          </motion.div>

          {/* Floating Mobile Mockup */}
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-6 left-10 w-[180px] h-[360px] bg-white rounded-[2rem] border-4 border-slate-900 shadow-2xl overflow-hidden flex flex-col"
          >
            <div className="flex-1 bg-slate-50 p-4 relative pt-8">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-900 rounded-b-xl" />
              <div className="w-20 h-4 bg-slate-200 rounded-full mb-6" />
              <div className="space-y-3">
                <div className="h-16 bg-white rounded-xl shadow-sm border border-slate-100" />
                <div className="h-16 bg-white rounded-xl shadow-sm border border-slate-100" />
                <div className="h-16 bg-white rounded-xl shadow-sm border border-slate-100" />
              </div>
            </div>
          </motion.div>

          {/* Floating Analytics Card */}
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
            className="absolute top-12 -right-8 w-64 bg-white/80 backdrop-blur-xl border border-border-subtle rounded-2xl shadow-xl p-5"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-accent">
                <BarChart3 size={20} />
              </div>
              <div>
                <div className="text-sm font-medium text-primary">Performance</div>
                <div className="text-xs text-secondary">+124% Engagement</div>
              </div>
            </div>
            <div className="flex items-end gap-2 h-16">
              {[40, 70, 45, 90, 65, 100].map((h, i) => (
                <div key={i} className="flex-1 bg-accent-light/20 rounded-t-sm" style={{ height: `${h}%` }}>
                  {i === 5 && <div className="w-full h-full bg-accent rounded-t-sm" />}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
