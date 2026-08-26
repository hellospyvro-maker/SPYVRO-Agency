import { motion } from 'motion/react';
import { Code2, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';
import Magnetic from './Magnetic';

export default function Team() {
  const team = [
    {
      name: 'Swaroop P.',
      role: 'Main Website Developer',
      tag: 'Engineering Lead',
      description: 'Focused on creating exceptional, high-performance web applications and premium digital experiences tailored for ambitious brands.',
      icon: <Code2 size={24} className="text-accent" />
    },
    {
      name: 'Krish Yallal',
      role: 'App Development & Outreach',
      tag: 'Mobile & Growth',
      description: 'Leading mobile application strategies and driving outreach to ensure digital products reach and resonate with the right audiences.',
      icon: <Smartphone size={24} className="text-accent" />
    }
  ];

  return (
    <section className="py-28 md:py-36 bg-bg-alt relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-blue-200/80 bg-blue-50 text-accent text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles size={13} className="text-accent" />
            <span>Meet The Team</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary tracking-tight mb-4"
          >
            The minds behind Spyvro
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-base sm:text-lg text-secondary leading-relaxed max-w-lg mx-auto"
          >
            Dedicated engineers and digital specialists committed to delivering world-class craftsmanship.
          </motion.p>
        </div>

        {/* Team Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {team.map((member, index) => (
            <motion.div 
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Magnetic actionStrength={0.05} className="w-full h-full block">
                <div className="bg-white rounded-[2rem] p-8 md:p-10 border border-slate-200/80 shadow-[0_4px_25px_-4px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.08)] hover:border-blue-300/80 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full group hover:-translate-y-1">
                  
                  {/* Subtle accent background */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-blue-50/80 border border-blue-100/80 text-accent flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                        {member.icon}
                      </div>
                      <span className="text-xs font-semibold text-accent bg-blue-50/60 px-3 py-1 rounded-full border border-blue-100/60">
                        {member.tag}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-display font-bold text-primary mb-1">
                      {member.name}
                    </h3>
                    <div className="text-xs font-bold text-accent uppercase tracking-wider mb-5 flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-accent" />
                      <span>{member.role}</span>
                    </div>
                    
                    <p className="text-secondary text-sm sm:text-base leading-relaxed">
                      {member.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-100 relative z-10 flex items-center justify-between text-xs font-semibold text-slate-400">
                    <span>Active Member</span>
                    <span className="text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full font-bold">● Available</span>
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
