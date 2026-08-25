import { motion } from 'motion/react';
import { Code2, Smartphone } from 'lucide-react';

export default function Team() {
  const team = [
    {
      name: 'Swaroop P.',
      role: 'Main Website Developer',
      description: 'Focused on creating exceptional, high-performance web applications and premium digital experiences tailored for ambitious brands.',
      icon: <Code2 size={24} className="text-accent" />
    },
    {
      name: 'Krish Yallal',
      role: 'App Development & Outreach',
      description: 'Leading mobile application strategies and driving outreach to ensure digital products reach and resonate with the right audiences.',
      icon: <Smartphone size={24} className="text-accent" />
    }
  ];

  return (
    <section className="py-24 bg-bg-alt">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-accent font-medium tracking-wide uppercase text-sm mb-3 block">
            Meet The Team
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-primary">
            The minds behind Spyvro
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {team.map((member, index) => (
            <motion.div 
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="panel-card rounded-[2rem] p-8 md:p-12 relative overflow-hidden"
            >
              {/* Subtle accent background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-white border border-border-subtle flex items-center justify-center mb-8 shadow-sm">
                  {member.icon}
                </div>
                
                <h3 className="text-2xl font-display font-bold text-primary mb-2">
                  {member.name}
                </h3>
                <span className="text-sm font-semibold text-accent uppercase tracking-wider mb-6 block">
                  {member.role}
                </span>
                
                <p className="text-secondary leading-relaxed flex-grow">
                  {member.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
