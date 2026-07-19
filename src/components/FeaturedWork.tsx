import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import Magnetic from './Magnetic';

const projects = [
  {
    title: "VUJobs",
    description: "A comprehensive recruitment platform connecting employers and job seekers through a modern digital experience.",
    url: "https://vujobs.in"
  },
  {
    title: "VXPand",
    description: "A premium animated landing page focused on modern UI, smooth interactions, and conversion-focused design.",
    url: "https://vxpand.netlify.app"
  }
];

export default function FeaturedWork() {
  return (
    <section id="work" className="py-32 bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="max-w-2xl mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-primary mb-6"
          >
            Featured Work
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-secondary leading-relaxed"
          >
            A selection of digital products and websites crafted to solve real business challenges through thoughtful design and modern technology.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <a 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block bg-white rounded-3xl overflow-hidden border border-border-subtle/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-500 hover:-translate-y-2 h-full flex flex-col"
                data-cursor="view"
              >
                {/* Live Preview Container */}
                <div className="relative w-full aspect-[16/10] overflow-hidden border-b border-border-subtle bg-slate-50">
                  <div className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left scale-50 group-hover:scale-[0.52] transition-transform duration-700 ease-out">
                    <iframe 
                      src={project.url} 
                      className="w-full h-full border-0 pointer-events-none"
                      tabIndex={-1}
                      title={`${project.title} live preview`}
                    />
                  </div>
                  {/* Invisible overlay to catch clicks/prevent interactions inside iframe */}
                  <div className="absolute inset-0 z-10" />
                </div>

                {/* Project Info */}
                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-primary mb-3 transition-colors group-hover:text-accent">
                      {project.title}
                    </h3>
                    <p className="text-secondary leading-relaxed mb-8">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 font-medium text-primary group-hover:text-accent transition-colors">
                    View Project
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
