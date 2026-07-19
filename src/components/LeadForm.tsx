import React, { useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { db } from '../firebase';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';

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
    setLoading(true);
    try {
      const newLeadRef = doc(collection(db, 'leads'));
      
      const payload: Record<string, any> = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
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
    <section id="contact" className="py-32 bg-slate-50 border-t border-border-subtle">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold text-primary mb-4"
          >
            Start Your Project
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-secondary"
          >
            Let's discuss how we can help your business grow.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100"
        >
          {success ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">✓</div>
              <h3 className="text-2xl font-bold text-primary mb-2">Thank you!</h3>
              <p className="text-secondary text-lg max-w-md mx-auto">Your project has been submitted. You will be soon contacted by the team.</p>
              <button 
                onClick={() => {
                  setSuccess(false);
                  setFormData(initialFormState);
                }}
                className="mt-8 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-primary font-medium rounded-full transition-colors"
                type="button"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Full Name *</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-slate-50 focus:bg-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Company Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-slate-50 focus:bg-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Company Type</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-slate-50 focus:bg-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    value={formData.companyType}
                    onChange={(e) => setFormData({...formData, companyType: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Email Address *</label>
                  <input 
                    required
                    type="email" 
                    className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-slate-50 focus:bg-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-slate-50 focus:bg-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Category</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-slate-50 focus:bg-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all cursor-pointer"
                    value={formData.industry}
                    onChange={(e) => setFormData({...formData, industry: e.target.value})}
                  >
                    <option value="">Select category...</option>
                    {industries.map(ind => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>
                {formData.industry === 'Other' && (
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Specify Category</label>
                    <input 
                      required
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-slate-50 focus:bg-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
                      value={formData.industryOther}
                      onChange={(e) => setFormData({...formData, industryOther: e.target.value})}
                    />
                  </div>
                )}
                <div className={formData.industry === 'Other' ? "md:col-span-2" : ""}>
                   <label className="block text-sm font-medium text-primary mb-2">Type of Service</label>
                    <select 
                      className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-slate-50 focus:bg-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all cursor-pointer"
                      value={formData.projectType}
                      onChange={(e) => setFormData({...formData, projectType: e.target.value, budget: ''})}
                    >
                      <option value="">Select service type...</option>
                      {projectTypes.map(pt => (
                        <option key={pt} value={pt}>{pt}</option>
                      ))}
                    </select>
                </div>
              </div>

              {formData.projectType && (
                <motion.div initial={{opacity: 0, height: 0}} animate={{opacity: 1, height: 'auto'}} transition={{duration: 0.3}}>
                  <label className="block text-sm font-medium text-primary mb-3">
                    Budget Range for {isAppProject ? 'App' : 'Website'}
                  </label>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {activeBudgets.map(b => (
                      <label 
                        key={b.value} 
                        className={`relative flex items-center p-4 border rounded-xl cursor-pointer transition-all ${
                          formData.budget === b.value 
                            ? 'border-accent bg-accent/5 ring-1 ring-accent' 
                            : 'border-border-subtle bg-white hover:border-slate-300'
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
                        <span className="flex-1 text-sm font-medium text-primary">{b.label}</span>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}

              <div>
                <label className="block text-sm font-medium text-primary mb-2">Project Details / Context (Optional)</label>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-slate-50 focus:bg-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Tell us a bit about your goals, current challenges, and what you hope to achieve..."
                  value={formData.details}
                  onChange={(e) => setFormData({...formData, details: e.target.value})}
                />
              </div>

              <div className="pt-4">
                <button 
                  disabled={loading}
                  type="submit" 
                  className="w-full sm:w-auto px-8 py-4 bg-primary text-white text-base font-medium rounded-full hover:bg-accent focus:ring-4 focus:ring-accent/20 transition-all shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? 'Submitting...' : 'Submit Project Request'}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
