import { motion } from 'motion/react';
import { Layout, Smartphone, Database, RefreshCcw, CalendarCheck, ArrowRight, Sparkles } from 'lucide-react';
import Magnetic from './Magnetic';

const services = [
  {
    num: "01",
    icon: <Layout className="w-6 h-6" />,
    title: "Premium Business Websites",
    description: "Professional websites designed to build trust, showcase services, and convert visitors into customers.",
    tag: "Web Experience"
  },
  {
    num: "02",
    icon: <Database className="w-6 h-6" />,
    title: "Full-Stack Web Applications",
    description: "Custom platforms, dashboards, and business systems built for scalability and performance.",
    tag: "Custom Systems"
  },
  {
    num: "03",
    icon: <Smartphone className="w-6 h-6" />,
    title: "Website to Mobile App",
    description: "Transform existing websites into professional Android applications with native-like experiences.",
    tag: "Mobile Native"
  },
  {
    num: "04",
    icon: <RefreshCcw className="w-6 h-6" />,
    title: "High-Converting Landing Pages",
    description: "Laser-focused landing pages optimized for lead generation and marketing campaigns.",
    tag: "Lead Generation"
  },
  {
    num: "05",
    icon: <CalendarCheck className="w-6 h-6" />,
    title: "Appointment Booking Systems",
    description: "Modern online booking experiences that simplify scheduling and improve customer convenience.",
    tag: "Automation"
  }
];

export default function Services() {
  return (
    <section id="services" className="py-28 md:py-36 bg-bg-alt relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 right-0 w-96 h-96 bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header with Reference-style Eyebrow */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-blue-200/80 bg-blue-50 text-accent text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles size={13} className="text-accent" />
            <span>Our Expertise</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary tracking-tight mb-4"
          >
            What We Build
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-base sm:text-lg text-secondary leading-relaxed max-w-lg mx-auto"
          >
            End-to-end digital solutions crafted with exceptional visual precision, clean code, and scalable architecture.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="h-full"
            >
              <Magnetic actionStrength={0.08} className="w-full h-full">
                <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.08)] hover:border-blue-300/80 transition-all duration-300 group flex flex-col justify-between h-full hover:-translate-y-1">
                  <div>
                    {/* Top Row: Icon + Stage/Number Pill */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 bg-blue-50/80 border border-blue-100 group-hover:bg-accent group-hover:text-white text-accent rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xs">
                        {service.icon}
                      </div>
                      <span className="text-xs font-bold font-display text-slate-400 group-hover:text-accent transition-colors bg-slate-50 group-hover:bg-blue-50 px-2.5 py-1 rounded-full border border-slate-100">
                        {service.num}
                      </span>
                    </div>

                    {/* Tag badge */}
                    <div className="text-[11px] font-bold text-accent uppercase tracking-wider mb-2">
                      {service.tag}
                    </div>

                    <h3 className="text-xl font-display font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-secondary text-sm sm:text-base leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Micro action prompt */}
                  <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 group-hover:text-accent transition-colors">
                    <span>Learn more</span>
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
