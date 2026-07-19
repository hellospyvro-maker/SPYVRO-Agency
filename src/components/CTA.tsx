import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import Magnetic from './Magnetic';

export default function CTA() {
  return (
    <section id="contact" className="py-32 bg-bg relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl font-display font-bold text-primary tracking-tight mb-6"
        >
          Ready To Build Something <span className="text-gradient">Exceptional?</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-secondary mb-12 max-w-2xl mx-auto"
        >
          Let's create a digital experience that helps your business stand out and grow.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Magnetic className="w-full sm:w-auto">
            <a 
              href="mailto:contact@spyvro.com"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white text-lg font-medium rounded-full hover:bg-accent transition-all duration-300 hover:shadow-lg"
            >
              Book Consultation
              <ArrowRight size={20} />
            </a>
          </Magnetic>
          <Magnetic className="w-full sm:w-auto">
            <a 
              href="#projects"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white border border-border-subtle text-primary text-lg font-medium rounded-full hover:bg-bg-alt transition-all duration-300"
            >
              Start Project
            </a>
          </Magnetic>
        </motion.div>

      </div>

      {/* Premium floating background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-accent/5 to-accent-light/5 blur-[100px] -z-10 rounded-full" />
    </section>
  );
}
