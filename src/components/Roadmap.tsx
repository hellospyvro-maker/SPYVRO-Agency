import { motion } from 'motion/react';
import { Sparkles, Search, Compass, Palette, Code2, Rocket, ArrowRight } from 'lucide-react';

const steps = [
  {
    stage: "Stage 01",
    title: "Discovery",
    icon: <Search className="w-5 h-5 text-accent" />,
    duration: "Day 1-2",
    description: "We dive deep into your business, target audience, and objectives to understand exactly what you need to achieve."
  },
  {
    stage: "Stage 02",
    title: "Strategy",
    icon: <Compass className="w-5 h-5 text-accent" />,
    duration: "Day 3-4",
    description: "Developing a comprehensive plan, mapping out user journeys, architecture, and technological requirements."
  },
  {
    stage: "Stage 03",
    title: "Design",
    icon: <Palette className="w-5 h-5 text-accent" />,
    duration: "Day 5-8",
    description: "Crafting a premium visual identity with high-fidelity prototypes and meticulous attention to user experience."
  },
  {
    stage: "Stage 04",
    title: "Development",
    icon: <Code2 className="w-5 h-5 text-accent" />,
    duration: "Day 9-16",
    description: "Building your product with clean, scalable, and highly performant code customized for your needs."
  },
  {
    stage: "Stage 05",
    title: "Launch",
    icon: <Rocket className="w-5 h-5 text-accent" />,
    duration: "Day 17+",
    description: "Rigorous testing leading to a seamless deployment, followed by smooth handover and ongoing support options."
  }
];

export default function Roadmap() {
  return (
    <section id="process" className="py-28 md:py-36 bg-bg relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-500/5 blur-[130px] rounded-full pointer-events-none" />

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
            <span>Workflow & Stages</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary tracking-tight mb-4"
          >
            How We Build
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-base sm:text-lg text-secondary leading-relaxed max-w-lg mx-auto"
          >
            A clear, structured 5-stage journey designed for speed, clarity, and exceptional outcomes.
          </motion.p>
        </div>

        {/* 5-Stage Connected Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-3 relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative flex flex-col"
            >
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_35px_-8px_rgba(15,23,42,0.08)] hover:border-blue-300/80 transition-all duration-300 flex-1 flex flex-col justify-between group hover:-translate-y-1">
                <div>
                  {/* Top Bar: Stage pill + Step icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold text-accent bg-blue-50/80 px-2.5 py-1 rounded-full border border-blue-100/80">
                      {step.stage}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center transition-colors">
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="text-xl font-display font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-secondary text-xs sm:text-sm leading-relaxed mb-4">
                    {step.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-400">
                  <span>Timeline</span>
                  <span className="font-semibold text-primary">{step.duration}</span>
                </div>
              </div>

              {/* Connecting arrow for desktop between cards */}
              {index < steps.length - 1 && (
                <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-20 w-5 h-5 rounded-full bg-blue-50 border border-blue-200/80 items-center justify-center text-accent shadow-2xs pointer-events-none">
                  <ArrowRight size={10} />
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
