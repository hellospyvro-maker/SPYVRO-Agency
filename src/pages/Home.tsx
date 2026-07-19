import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import Services from '../components/Services';
import FeaturedWork from '../components/FeaturedWork';
import Industries from '../components/Industries';
import Founder from '../components/Founder';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import LeadForm from '../components/LeadForm';
import { useState } from 'react';

export default function Home() {
  const [settings, setSettings] = useState<any>({});

  return (
    <div className="bg-bg text-primary min-h-screen font-sans selection:bg-accent/20">
      <CustomCursor />
      <Navigation settings={settings} />

      <main>
        <Hero settings={settings} />
        <Services />
        <FeaturedWork />
        <Industries />
        <Founder />
        <LeadForm />
      </main>

      <Footer settings={settings} />
    </div>
  );
}
