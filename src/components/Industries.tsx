import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import Magnetic from './Magnetic';

const industries = [
  {
    title: "Dentists",
    icon: "🦷",
    description: "Premium websites and appointment systems designed to build trust and attract new patients.",
    metric: "High Trust"
  },
  {
    title: "Clinics",
    icon: "🏥",
    description: "Modern healthcare websites focused on accessibility, credibility, and patient experience.",
    metric: "24/7 Booking"
  },
  {
    title: "Interior Designers",
    icon: "🏠",
    description: "Portfolio-driven websites that showcase creativity and generate qualified leads.",
    metric: "Visual Portfolios"
  },
  {
    title: "Architects",
    icon: "📐",
    description: "Elegant digital experiences that present projects with clarity and sophistication.",
    metric: "Project Showcase"
  },
  {
    title: "Builders",
    icon: "🏢",
    description: "Professional websites that strengthen brand presence and support business growth.",
    metric: "Brand Authority"
  }
];

export default function Industries() {
  return (
    <section id="industries" className="py-28 md:py-36 bg-bg-alt relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-blue-200/80 bg-blue-50 text-accent text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles size={13} className="text-accent" />
            <span>Target Verticals</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary tracking-tight mb-4"
          >
            Industries We Serve
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-base sm:text-lg text-secondary leading-relaxed max-w-lg mx-auto"
          >
            Digital experiences tailored for businesses that value quality, trust, and long-term growth.
          </motion.p>
        </div>

        {/* Industries Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {industries.map((ind, index) => (
             <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="h-full"
            >
              <Magnetic actionStrength={0.08} className="w-full h-full block">
                <div className="group bg-white rounded-3xl p-8 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.08)] transition-all duration-300 border border-slate-200/80 hover:border-blue-300/80 hover:-translate-y-1 h-full flex flex-col justify-between cursor-default">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-2xl bg-blue-50/80 w-14 h-14 rounded-2xl flex items-center justify-center border border-blue-100/80 shadow-2xs transition-transform duration-300 group-hover:scale-105">
                        {ind.icon}
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                        {ind.metric}
                      </span>
                    </div>

                    <h3 className="text-xl font-display font-bold text-primary mb-3 transition-colors group-hover:text-accent">
                      {ind.title}
                    </h3>
                    <p className="text-secondary text-sm sm:text-base leading-relaxed">
                      {ind.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-accent transition-colors">
                    <span>Tailored architecture</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Magnetic>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
