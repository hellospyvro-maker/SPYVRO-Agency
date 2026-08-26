import { motion } from 'motion/react';
import { PenTool, Zap, Smartphone, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';

const reasons = [
  {
    icon: <PenTool className="w-5 h-5 text-blue-400" />,
    title: "Premium Design",
    badge: "Craftsmanship",
    description: "Interfaces crafted with absolute precision, focusing on typography, whitespace, and visual hierarchy."
  },
  {
    icon: <Zap className="w-5 h-5 text-cyan-400" />,
    title: "Performance First",
    badge: "Speed & SEO",
    description: "Lightning-fast load times and optimized codebase for superior user experience and search engine rankings."
  },
  {
    icon: <Smartphone className="w-5 h-5 text-indigo-400" />,
    title: "Mobile Optimized",
    badge: "Every Device",
    description: "Flawless execution across all screens ensures your brand looks professional and converts everywhere."
  },
  {
    icon: <TrendingUp className="w-5 h-5 text-emerald-400" />,
    title: "Built For Growth",
    badge: "Scalability",
    description: "Scalable architectures and conversion-focused layouts designed to generate measurable business value."
  }
];

export default function WhySpyvro() {
  return (
    <section className="py-28 md:py-36 bg-slate-950 text-white relative overflow-hidden">
      {/* Decorative premium dark background elements */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="max-w-2xl mb-16 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles size={13} className="text-blue-400" />
            <span>The Spyvro Advantage</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight"
          >
            Why Businesses Choose Spyvro
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-slate-300 leading-relaxed"
          >
            We combine high-end aesthetic design with rigorous engineering standards to build digital products that operate at the highest level.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 p-8 rounded-3xl backdrop-blur-md hover:bg-slate-800/80 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {reason.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                    {reason.badge}
                  </span>
                </div>
                
                <h3 className="text-xl font-display font-bold mb-2.5 text-white group-hover:text-blue-300 transition-colors">
                  {reason.title}
                </h3>
                
                <p className="text-slate-400 leading-relaxed text-sm">
                  {reason.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-1.5 text-xs text-blue-400 font-medium">
                <CheckCircle2 size={13} />
                <span>Enterprise Standard</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
