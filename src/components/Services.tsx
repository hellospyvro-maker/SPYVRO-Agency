import { motion } from 'motion/react';
import { Layout, Smartphone, Database, RefreshCcw, CalendarCheck } from 'lucide-react';
import Magnetic from './Magnetic';

const services = [
  {
    icon: <Layout className="w-6 h-6" />,
    title: "Premium Business Websites",
    description: "Professional websites designed to build trust, showcase services, and convert visitors into customers."
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Full-Stack Web Applications",
    description: "Custom platforms, dashboards, and business systems built for scalability and performance."
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Website to Mobile App",
    description: "Transform existing websites into professional Android applications with native-like experiences."
  },
  {
    icon: <RefreshCcw className="w-6 h-6" />,
    title: "High-Converting Landing Pages",
    description: "Laser-focused landing pages optimized for lead generation and marketing campaigns."
  },
  {
    icon: <CalendarCheck className="w-6 h-6" />,
    title: "Appointment Booking Systems",
    description: "Modern online booking experiences that simplify scheduling and improve customer convenience."
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-bg-alt relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-accent font-medium tracking-wide uppercase text-sm mb-3 block"
          >
            Our Expertise
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-primary mb-6"
          >
            What We Build
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Magnetic actionStrength={0.12} className="w-full h-full">
                <div className="panel-card p-8 rounded-2xl flex flex-col group cursor-default w-full h-full">
                  <div className="w-12 h-12 bg-bg-alt border border-border-subtle group-hover:bg-accent group-hover:border-accent group-hover:text-white text-accent rounded-xl flex items-center justify-center transition-all duration-300 mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-display font-semibold text-primary mb-3">
                    {service.title}
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    {service.description}
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
