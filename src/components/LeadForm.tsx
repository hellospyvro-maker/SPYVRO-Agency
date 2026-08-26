import React, { useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { db } from '../firebase';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Sparkles, ShieldCheck, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import Magnetic from './Magnetic';

export default function LeadForm() {
  const initialFormState = {
    name: '',
    businessName: '',
    companyType: '',
    email: '',
    phone: '',
    industry: '',
    industryOther: '',
    projectType: '',
    budget: '',
    details: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email.trim() && !formData.phone.trim()) {
      toast.error('Please provide at least an Email address or a Phone number so we can contact you!');
      return;
    }

    setLoading(true);
    try {
      const newLeadRef = doc(collection(db, 'leads'));
      
      const payload: Record<string, any> = {
        name: formData.name,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        createdAt: serverTimestamp(),
      };
      
      if (formData.businessName) payload.businessName = formData.businessName;
      if (formData.companyType) payload.companyType = formData.companyType;
      if (formData.industry) payload.industry = formData.industry === 'Other' ? formData.industryOther : formData.industry;
      if (formData.projectType) payload.projectType = formData.projectType;
      if (formData.budget) payload.budget = formData.budget;
      if (formData.details) payload.details = formData.details;

      await setDoc(newLeadRef, payload);
      
      setSuccess(true);
      setFormData(initialFormState);
      toast.success('Project submitted successfully.');
    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to submit project request.');
    } finally {
      setLoading(false);
    }
  };


  const industries = [
    'Art', 'Restaurant', 'Salon', 'Dentist', 'Clinic', 
    'Interior Designer', 'Architect', 'Real Estate', 
    'Education', 'E-commerce', 'Other'
  ];

  const projectTypes = [
    'Website Design', 'Website Redesign', 'Full-stack App Development', 'Mobile App Development', 'Other'
  ];

  const websiteBudgets = [
    { label: '₹5,000 – ₹10,000', value: '₹5,000 – ₹10,000' },
    { label: '₹10,000 – ₹20,000', value: '₹10,000 – ₹20,000' },
    { label: '₹20,000 – ₹30,000', value: '₹20,000 – ₹30,000' },
    { label: '₹30,000 – ₹50,000', value: '₹30,000 – ₹50,000' },
    { label: '₹50,000+', value: '₹50,000+' }
  ];

  const appBudgets = [
    { label: '₹20,000 – ₹30,000', value: '₹20,000 – ₹30,000' },
    { label: '₹30,000 – ₹50,000', value: '₹30,000 – ₹50,000' },
    { label: '₹50,000 – ₹1,00,000', value: '₹50,000 – ₹1,00,000' },
    { label: '₹1,00,000+', value: '₹1,00,000+' }
  ];

  const isAppProject = formData.projectType.toLowerCase().includes('app');
  const activeBudgets = isAppProject ? appBudgets : websiteBudgets;

  return (
    <section id="contact" className="py-28 md:py-36 bg-bg relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-400/10 to-indigo-300/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-blue-200/80 bg-blue-50 text-accent text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <Sparkles size={13} className="text-accent" />
            <span>Let's Build Something Great</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary tracking-tight mb-4"
          >
            Start Your Project
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-base sm:text-lg text-secondary leading-relaxed max-w-lg mx-auto"
          >
            Let's discuss how we can help your business grow.
          </motion.p>
        </div>

        {/* Form Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_-15px_rgba(15,23,42,0.08)] border border-slate-200/80 relative"
        >
          {/* Trust points strip at top of card */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-100 text-xs font-semibold text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-blue-50 text-accent flex items-center justify-center">
                <Clock size={12} />
              </div>
              <span>Fast 24-Hour Response</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <ShieldCheck size={12} />
              </div>
              <span>100% Confidential & Secure</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <CheckCircle2 size={12} />
              </div>
              <span>Free Consultation & Scope</span>
            </div>
          </div>

          {success ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl shadow-inner font-bold">✓</div>
              <h3 className="text-2xl font-display font-bold text-primary mb-2">Thank you!</h3>
              <p className="text-secondary text-base max-w-md mx-auto">Your project has been submitted. You will be soon contacted by the team.</p>
              <button 
                onClick={() => {
                  setSuccess(false);
                  setFormData(initialFormState);
                }}
                className="mt-8 px-7 py-3.5 bg-slate-100 hover:bg-slate-200 text-primary font-semibold text-sm rounded-full transition-colors"
                type="button"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Full Name *</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none text-sm text-primary transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Company Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Apex Health Ltd."
                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none text-sm text-primary transition-all"
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Company Type</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Private Clinic / Startup / Agency"
                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none text-sm text-primary transition-all"
                    value={formData.companyType}
                    onChange={(e) => setFormData({...formData, companyType: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Email Address <span className="text-[10px] font-normal text-slate-400 lowercase">(Email or Phone required)</span>
                  </label>
                  <input 
                    type="email" 
                    placeholder="rahul@example.com"
                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none text-sm text-primary transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Phone Number <span className="text-[10px] font-normal text-slate-400 lowercase">(Email or Phone required)</span>
                  </label>
                  <input 
                    type="tel" 
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none text-sm text-primary transition-all"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Category</label>
                  <select 
                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none text-sm text-primary transition-all cursor-pointer"
                    value={formData.industry}
                    onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  >
                    <option value="">Select category...</option>
                    {industries.map(ind => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>
              </div>

              {formData.industry === 'Other' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Specify Category</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Enter your industry or niche"
                    className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none text-sm text-primary transition-all"
                    value={formData.industryOther}
                    onChange={(e) => setFormData({...formData, industryOther: e.target.value})}
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Type of Service</label>
                <select 
                  className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none text-sm text-primary transition-all cursor-pointer"
                  value={formData.projectType}
                  onChange={(e) => setFormData({...formData, projectType: e.target.value, budget: ''})}
                >
                  <option value="">Select service type...</option>
                  {projectTypes.map(pt => (
                    <option key={pt} value={pt}>{pt}</option>
                  ))}
                </select>
              </div>

              {formData.projectType && (
                <motion.div initial={{opacity: 0, height: 0}} animate={{opacity: 1, height: 'auto'}} transition={{duration: 0.3}}>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                    Estimated Budget Range ({isAppProject ? 'Mobile Application' : 'Website'})
                  </label>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {activeBudgets.map(b => (
                      <label 
                        key={b.value} 
                        className={`relative flex items-center p-4 border rounded-2xl cursor-pointer transition-all ${
                          formData.budget === b.value 
                            ? 'border-accent bg-blue-50/70 ring-1 ring-accent' 
                            : 'border-slate-200/80 bg-white hover:border-slate-300'
                        }`}
                      >
                        <input 
                          type="radio" 
                          name="budget" 
                          value={b.value}
                          className="sr-only"
                          checked={formData.budget === b.value}
                          onChange={(e) => setFormData({...formData, budget: e.target.value})}
                        />
                        <span className="flex-1 text-sm font-semibold text-primary">{b.label}</span>
                        {formData.budget === b.value && (
                          <div className="w-2 h-2 rounded-full bg-accent" />
                        )}
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Project Details / Context (Optional)</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none text-sm text-primary transition-all resize-none"
                  placeholder="Tell us a bit about your goals, current challenges, and what you hope to achieve..."
                  value={formData.details}
                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                />
              </div>

              <div className="pt-2">
                <Magnetic className="w-full sm:w-auto">
                  <button 
                    disabled={loading}
                    type="submit" 
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-9 py-4 bg-primary text-white text-base font-semibold rounded-full hover:bg-accent focus:ring-4 focus:ring-accent/20 transition-all duration-300 shadow-lg shadow-primary/10 hover:shadow-accent/25 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span>{loading ? 'Submitting...' : 'Submit Project Request'}</span>
                    <ArrowRight size={18} />
                  </button>
                </Magnetic>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
