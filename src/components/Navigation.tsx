import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Magnetic from './Magnetic';

export default function Navigation({ settings }: { settings?: any }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoSrc = settings?.logo || "https://iili.io/Cqlf5In.png";
  const wordmarkSrc = settings?.wordmark || "https://iili.io/Cql9kn2.png";

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Industries', href: '#industries' },
    { name: 'Process', href: '#process' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <img 
            src={logoSrc} 
            alt="Spyvro Logo" 
            className="h-8 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
          <img 
            src={wordmarkSrc} 
            alt="Spyvro Wordmark" 
            className="h-5 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-secondary hover:text-primary transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a href="#contact" className="text-sm font-medium text-primary hover:text-accent transition-colors">
            Contact
          </a>
          <Magnetic className="inline-block">
            <a 
              href="#contact" 
              className="px-5 py-2.5 bg-primary text-white text-sm font-medium rounded-full hover:bg-accent transition-colors shadow-sm inline-block"
            >
              Book Consultation
            </a>
          </Magnetic>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-primary"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-border-subtle shadow-xl px-6 py-6 flex flex-col gap-4"
        >
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-primary py-2 border-b border-border-subtle/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" className="text-lg font-medium text-primary py-2 border-b border-border-subtle/50">
            Contact
          </a>
          <a 
            href="#contact" 
            className="mt-4 px-5 py-3 bg-primary text-center text-white text-base font-medium rounded-xl"
            onClick={() => setMobileMenuOpen(false)}
          >
            Book Consultation
          </a>
        </motion.div>
      )}
    </header>
  );
}
