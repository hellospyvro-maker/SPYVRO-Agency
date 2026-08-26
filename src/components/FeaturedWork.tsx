import { motion } from 'motion/react';
import { ArrowUpRight, Smartphone, Globe, Sparkles } from 'lucide-react';
import Magnetic from './Magnetic';

const projects = [
  {
    title: "VUJobs",
    category: "Recruitment Web Platform",
    description: "A comprehensive recruitment platform connecting employers and job seekers through a modern digital experience.",
    url: "https://vujobs.in",
    type: "web",
    tag: "Web Platform"
  },
  {
    title: "VXPand",
    category: "High-Performance Agency",
    description: "A premium animated landing page focused on modern UI, smooth interactions, and conversion-focused design.",
    url: "https://vxpand.netlify.app",
    type: "web",
    tag: "Modern Web"
  },
  {
    title: "QR Studio",
    category: "Mobile Android Application",
    description: "A fast and intuitive QR code & barcode scanner mobile application for Android devices.",
    url: "https://play.google.com/store/apps/details?id=com.krstudio.qrstudio&pcampaignid=web_share",
    type: "app",
    image: "https://iili.io/CDyAwdB.png",
    tag: "Android App"
  }
];

export default function FeaturedWork() {
  return (
    <section id="work" className="py-28 md:py-36 bg-bg relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[140px] rounded-full pointer-events-none" />

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
            <span>Featured Portfolio</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary tracking-tight mb-4"
          >
            Featured Work
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-base sm:text-lg text-secondary leading-relaxed max-w-lg mx-auto"
          >
            A selection of digital products and websites crafted to solve real business challenges through thoughtful design and modern technology.
          </motion.p>
        </div>

        {/* 3-Column Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="h-full flex flex-col"
            >
              <div className="group bg-white rounded-[2rem] overflow-hidden border border-slate-200/80 shadow-[0_4px_25px_-4px_rgba(15,23,42,0.05)] hover:shadow-[0_25px_50px_-12px_rgba(15,23,42,0.12)] hover:border-blue-300/80 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                
                {/* Browser / Device Top Bar */}
                <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300 group-hover:bg-rose-400 transition-colors" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300 group-hover:bg-amber-400 transition-colors" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300 group-hover:bg-emerald-400 transition-colors" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 bg-white px-3 py-0.5 rounded-full border border-slate-200/60 flex items-center gap-1.5 shadow-2xs">
                    {project.type === 'web' ? <Globe size={11} className="text-accent" /> : <Smartphone size={11} className="text-accent" />}
                    {project.tag}
                  </span>
                </div>

                {/* Preview Window */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-slate-100 flex items-center justify-center">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={`${project.title} Preview`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                  ) : project.type === 'web' ? (
                    <div className="absolute top-0 left-0 w-[200%] h-[200%] origin-top-left scale-50 group-hover:scale-[0.52] transition-transform duration-700 ease-out">
                      <iframe 
                        src={project.url} 
                        className="w-full h-full border-0 pointer-events-none"
                        tabIndex={-1}
                        title={`${project.title} live preview`}
                      />
                    </div>
                  ) : null}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content Details */}
                <div className="p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs font-bold text-accent uppercase tracking-wider mb-2">
                      {project.category}
                    </div>
                    <h3 className="text-2xl font-display font-bold text-primary mb-2.5 group-hover:text-accent transition-colors flex items-center justify-between">
                      {project.title}
                    </h3>
                    <p className="text-secondary text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <Magnetic actionStrength={0.12} className="w-full">
                      <a 
                        href={project.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-between px-5 py-3 rounded-xl bg-slate-50 hover:bg-primary text-primary hover:text-white font-semibold text-sm transition-all duration-300 group/btn"
                      >
                        <span>{project.type === 'app' ? 'View on Play Store' : 'View Project'}</span>
                        <ArrowUpRight size={16} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </a>
                    </Magnetic>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
