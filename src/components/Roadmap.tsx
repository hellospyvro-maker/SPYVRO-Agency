import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const steps = [
  {
    title: "Discovery",
    description: "We dive deep into your business, target audience, and objectives to understand exactly what you need to achieve."
  },
  {
    title: "Strategy",
    description: "Developing a comprehensive plan, mapping out user journeys, architecture, and technological requirements."
  },
  {
    title: "Design",
    description: "Crafting a premium visual identity with high-fidelity prototypes and meticulous attention to user experience."
  },
  {
    title: "Development",
    description: "Building your product with clean, scalable, and highly performant code customized for your needs."
  },
  {
    title: "Launch",
    description: "Rigorous testing leading to a seamless deployment, followed by smooth handover and ongoing support options."
  }
];

export default function Roadmap() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="py-32 bg-bg relative">
      <div className="max-w-4xl mx-auto px-6" ref={containerRef}>
        
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-primary mb-6"
          >
            How We Build
          </motion.h2>
          <p className="text-lg text-secondary">A refined process designed for exceptional outcomes.</p>
        </div>

        <div className="relative">
          {/* Animated Line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-px bg-border-subtle" />
          <motion.div 
            className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 w-1 bg-gradient-to-b from-accent to-accent-light origin-top rounded-full"
            style={{ height: lineHeight }}
          />

          <div className="space-y-16">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className="relative flex items-center md:justify-between w-full">
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center z-10">
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="w-3 h-3 bg-white border-2 border-accent rounded-full shadow-[0_0_0_4px_white]"
                    />
                  </div>

                  {/* Desktop Layout - Alternating sides */}
                  <div className={`hidden md:block w-5/12 ${isEven ? 'text-right pr-8' : 'order-1 pl-8'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                    >
                      <h3 className="text-2xl font-display font-bold text-primary mb-3">{step.title}</h3>
                      <p className="text-secondary leading-relaxed">{step.description}</p>
                    </motion.div>
                  </div>
                  
                  {/* Empty space for alternating Desktop */}
                  <div className={`hidden md:block w-5/12 ${isEven ? 'order-1' : ''}`} />

                  {/* Mobile Layout */}
                  <div className="pl-14 md:hidden w-full">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                    >
                      <h3 className="text-2xl font-display font-bold text-primary mb-2">{step.title}</h3>
                      <p className="text-secondary leading-relaxed">{step.description}</p>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
