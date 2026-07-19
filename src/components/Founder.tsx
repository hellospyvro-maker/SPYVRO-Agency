import { motion } from 'motion/react';

export default function Founder() {
  return (
    <section className="py-24 bg-bg-alt">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="panel-card rounded-[2rem] p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center relative overflow-hidden"
        >
          {/* subtle accent background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

          {/* Founder Image Area - abstract representation if no real image */}
          <div className="md:w-1/3 w-48 aspect-square shrink-0">
            <div className="w-full h-full rounded-full border border-border-subtle bg-white shadow-xl flex items-center justify-center p-2 relative">
              <div className="absolute inset-0 rounded-full border border-border-subtle scale-105" />
              <div className="absolute inset-0 rounded-full border border-border-subtle scale-110 opacity-50" />
              <img 
                src="https://iili.io/CqcSt4I.png" 
                alt="Founder" 
                className="w-full h-full object-cover rounded-full transition-all duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Founder Content */}
          <div className="md:w-2/3 relative z-10">
            <span className="text-accent font-medium tracking-wide uppercase text-sm mb-3 block">
              Meet The Founder
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6">
              Swaroop P.
            </h2>
            <div className="space-y-4 text-secondary leading-relaxed text-lg">
              <p>
                Great businesses deserve exceptional digital experiences. Spyvro was founded to help brands establish a powerful online presence through premium websites, modern web applications, and mobile experiences built for growth.
              </p>
              <p>
                By combining thoughtful design, cutting-edge technology, and a relentless focus on quality, we create digital products that inspire trust, elevate brands, and deliver lasting business value. Every project is approached with precision, creativity, and a commitment to excellence.
              </p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
