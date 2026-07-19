export default function Footer({ settings }: { settings?: any }) {
  const logoSrc = settings?.logo || "https://iili.io/Cqlf5In.png";
  const wordmarkSrc = settings?.wordmark || "https://iili.io/Cql9kn2.png";
  const contactEmail = settings?.contactEmail || "hello.spyvro@gmail.com";

  return (
    <footer className="bg-bg-alt border-t border-border-subtle pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-md">
          <div className="flex flex-col gap-6 mb-8 items-start">
            <img 
              src={logoSrc} 
              alt="Spyvro Logo" 
              className="h-10 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
            <img 
              src={wordmarkSrc} 
              alt="Spyvro Wordmark" 
              className="h-6 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <p className="text-secondary mb-12 text-lg leading-relaxed">
            Premium websites, web applications, and mobile experiences for ambitious businesses.
          </p>

          <div className="flex flex-col gap-4 mb-24 text-primary font-medium">
            <a href={`mailto:${contactEmail}`} className="hover:text-accent transition-colors">
              {contactEmail}
            </a>
            <a href="tel:+919686443606" className="hover:text-accent transition-colors">
              +91 96864 43606
            </a>
            <span className="text-secondary font-normal">
              Karnataka, India
            </span>
          </div>
          
          <p className="text-secondary text-sm">
            © 2026 Spyvro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

