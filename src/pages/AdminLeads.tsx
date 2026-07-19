import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Inbox } from 'lucide-react';

export default function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLeads(leadsData);
      setLoading(false);
    }, (error) => {
      console.error("Firestore Error: ", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-primary">Form Collection</h1>
          <p className="text-secondary mt-1">Review and manage submitted project requests.</p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-secondary">Loading leads...</div>
        ) : leads.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Inbox size={32} />
            </div>
            <h3 className="text-lg font-bold text-primary">No leads yet</h3>
            <p className="text-secondary mt-1">When clients submit the contact form, they will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {leads.map((lead) => (
              <div key={lead.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-xl font-bold text-primary">{lead.name}</h3>
                    <div className="text-sm text-secondary flex flex-wrap items-center gap-3 mt-1">
                      <a href={`mailto:${lead.email}`} className="hover:text-blue-600 transition-colors">{lead.email}</a>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <a href={`tel:${lead.phone}`} className="hover:text-blue-600 transition-colors">{lead.phone}</a>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-900 bg-slate-100 px-3 py-1 rounded-full inline-block">
                      {lead.projectType || 'General Inquiry'}
                    </div>
                    {lead.createdAt && (
                      <div className="text-xs text-slate-400 mt-2">
                        {new Date(lead.createdAt.seconds * 1000).toLocaleDateString()} at {new Date(lead.createdAt.seconds * 1000).toLocaleTimeString()}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  {lead.businessName && (
                    <div><span className="font-medium text-slate-900 block mb-1">Company:</span> <span className="text-slate-600">{lead.businessName}</span></div>
                  )}
                  {lead.companyType && (
                    <div><span className="font-medium text-slate-900 block mb-1">Company Type:</span> <span className="text-slate-600">{lead.companyType}</span></div>
                  )}
                  {lead.industry && (
                    <div><span className="font-medium text-slate-900 block mb-1">Category:</span> <span className="text-slate-600">{lead.industry}</span></div>
                  )}
                  {lead.budget && (
                    <div><span className="font-medium text-slate-900 block mb-1">Budget:</span> <span className="text-slate-600">{lead.budget}</span></div>
                  )}
                  {lead.details && (
                    <div className="md:col-span-2 mt-2">
                      <span className="font-medium text-slate-900 block mb-1">Project Details:</span>
                      <p className="text-slate-600 whitespace-pre-wrap bg-slate-50 p-4 rounded-xl border border-slate-100">{lead.details}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
}
