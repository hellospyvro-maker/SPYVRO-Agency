import { motion } from 'motion/react';
import Magnetic from './Magnetic';

const industries = [
  {
    title: "Dentists",
    icon: "🦷",
    description: "Premium websites and appointment systems designed to build trust and attract new patients."
  },
  {
    title: "Clinics",
    icon: "🏥",
    description: "Modern healthcare websites focused on accessibility, credibility, and patient experience."
  },
  {
    title: "Interior Designers",
    icon: "🏠",
    description: "Portfolio-driven websites that showcase creativity and generate qualified leads."
  },
  {
    title: "Architects",
    icon: "📐",
    description: "Elegant digital experiences that present projects with clarity and sophistication."
  },
  {
    title: "Builders",
    icon: "🏢",
    description: "Professional websites that strengthen brand presence and support business growth."
  }
];

export default function Industries() {
  return (
    <section id="industries" className="py-32 bg-bg-alt">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="max-w-2xl mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-primary mb-6"
          >
            Industries We Serve
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-secondary leading-relaxed"
          >
            Digital experiences tailored for businesses that value quality, trust, and growth.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((ind, index) => (
             <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <Magnetic actionStrength={0.05} className="w-full h-full block">
                <div className="group bg-white rounded-3xl p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_-8px_rgba(0,0,0,0.08)] transition-all duration-300 border border-border-subtle/50 hover:-translate-y-1 h-full flex flex-col cursor-default">
                  <div className="text-3xl mb-6 bg-bg-alt w-14 h-14 rounded-2xl flex items-center justify-center border border-border-subtle/50 shadow-sm transition-transform duration-300 group-hover:scale-110">
                    {ind.icon}
                  </div>
                  <h3 className="text-xl font-display font-semibold text-primary mb-4 transition-colors group-hover:text-accent">
                    {ind.title}
                  </h3>
                  <p className="text-secondary leading-relaxed flex-1">
                    {ind.description}
                  </p>
                </div>
              </Magnetic>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
