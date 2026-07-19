import { motion } from 'motion/react';
import { PenTool, Zap, Smartphone, TrendingUp } from 'lucide-react';

const reasons = [
  {
    icon: <PenTool className="w-5 h-5" />,
    title: "Premium Design",
    description: "Interfaces crafted with absolute precision, focusing on typography, whitespace, and visual hierarchy."
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Performance First",
    description: "Lightning-fast load times and optimized codebase for superior user experience and SEO rankings."
  },
  {
    icon: <Smartphone className="w-5 h-5" />,
    title: "Mobile Optimized",
    description: "Flawless execution across all devices ensures your brand looks professional everywhere."
  },
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Built For Growth",
    description: "Scalable architectures and conversion-focused layouts designed to generate real business value."
  }
];

export default function WhySpyvro() {
  return (
    <section className="py-24 bg-primary text-white relative overflow-hidden">
      {/* Decorative premium dark background elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-light/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDMiLz4KPC9zdmc+')] opacity-20 mask-image:linear-gradient(to_bottom,transparent,black,transparent)" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="mb-16 md:w-1/2">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            Why Businesses Choose Spyvro
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-300"
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
              className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white mb-6">
                {reason.icon}
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">
                {reason.title}
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
