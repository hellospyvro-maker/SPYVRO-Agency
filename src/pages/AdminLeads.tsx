import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Inbox, Download, Search, Phone, Mail, Trash2, CheckCircle, Clock, ExternalLink, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [projectFilter, setProjectFilter] = useState('all');

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
      toast.error('Failed to sync lead data from Firestore.');
    });

    return () => unsubscribe();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const leadRef = doc(db, 'leads', id);
      await updateDoc(leadRef, {
        completed: !currentStatus
      });
      toast.success(`Marked project as ${!currentStatus ? 'Completed' : 'Pending'}`);
    } catch (error) {
      console.error('Error updating lead status:', error);
      toast.error('Failed to update project status.');
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this lead? This cannot be undone.')) {
      return;
    }
    try {
      const leadRef = doc(db, 'leads', id);
      await deleteDoc(leadRef);
      toast.success('Lead deleted successfully.');
    } catch (error) {
      console.error('Error deleting lead:', error);
      toast.error('Failed to delete lead.');
    }
  };

  // CSV Exporter
  const handleDownloadCSV = () => {
    if (leads.length === 0) {
      toast.error('No lead data available to download.');
      return;
    }

    const headers = [
      'Name', 'Email', 'Phone', 'Company Name', 'Company Type', 
      'Industry/Category', 'Project Type', 'Budget', 'Details', 'Status', 'Date Submitted'
    ];

    const rows = filteredLeads.map(lead => {
      const dateStr = lead.createdAt 
        ? new Date(lead.createdAt.seconds * 1000).toLocaleString() 
        : '';
      const statusText = lead.completed ? 'Completed' : 'Pending';
      
      return [
        lead.name || '',
        lead.email || '',
        lead.phone || '',
        lead.businessName || '',
        lead.companyType || '',
        lead.industry || '',
        lead.projectType || '',
        lead.budget || '',
        (lead.details || '').replace(/\r?\n/g, ' '), // sanitize line breaks
        statusText,
        dateStr
      ];
    });

    // Helper to escape values containing commas, quotes, etc.
    const escapeCSV = (val: string) => {
      const clean = val.replace(/"/g, '""');
      if (clean.includes(',') || clean.includes('"') || clean.includes('\n')) {
        return `"${clean}"`;
      }
      return clean;
    };

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(val => escapeCSV(String(val))).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('CSV downloaded successfully!');
  };

  // Unique list of project types for filters
  const projectTypes = Array.from(new Set(leads.map(l => l.projectType || 'General Inquiry'))).filter(Boolean);

  // Filter leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      (lead.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.businessName || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const isCompleted = !!lead.completed;
    const matchesStatus = 
      statusFilter === 'all' ? true :
      statusFilter === 'completed' ? isCompleted : !isCompleted;
    
    const matchesProject = 
      projectFilter === 'all' ? true : 
      (lead.projectType || 'General Inquiry') === projectFilter;

    return matchesSearch && matchesStatus && matchesProject;
  });

  // Communication helper templates
  const getCommunicationLinks = (lead: any) => {
    const cleanPhone = (lead.phone || '').replace(/[^0-9+]/g, '');
    const name = lead.name || 'there';
    const projectType = lead.projectType || 'a digital project';
    const budget = lead.budget || 'your preferred budget';
    
    const messageText = `Hey ${name}, we saw your request that you want a project on ${projectType} at ${budget} range. We would like to know more details about this!`;
    const emailSubject = `Spyvro Project Inquiry - ${projectType}`;
    const emailBody = `Hey ${name},\n\nWe saw your request that you want a project on ${projectType} at ${budget} range. We would like to know more details about this!\n\nBest regards,\nSpyvro Team`;

    return {
      whatsapp: `https://wa.me/${cleanPhone}?text=${encodeURIComponent(messageText)}`,
      call: `tel:${cleanPhone}`,
      email: `mailto:${lead.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
    };
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      {/* Head section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-sans">Form Collection</h1>
          <p className="text-slate-500 mt-1">Review, filter, and contact potential clients directly.</p>
        </div>
        <button
          onClick={handleDownloadCSV}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-xl transition-all shadow-md active:scale-95"
        >
          <Download size={18} />
          Export to CSV
        </button>
      </div>

      {/* Filters bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm mb-6 flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by name, email or company..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Status Filter */}
        <div className="flex gap-2 min-w-[200px]">
          <select
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none text-sm cursor-pointer hover:bg-slate-100/50 transition-colors"
            value={statusFilter}
            onChange={(e: any) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Project Type Filter */}
        <div className="flex gap-2 min-w-[200px]">
          <select
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 outline-none text-sm cursor-pointer hover:bg-slate-100/50 transition-colors"
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
          >
            <option value="all">All Projects</option>
            {projectTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Lead Cards List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2" />
          <span>Synchronizing leads...</span>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-sm">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Inbox size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No matching records found</h3>
          <p className="text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query, status, or project type filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredLeads.map((lead) => {
            const links = getCommunicationLinks(lead);
            const isCompleted = !!lead.completed;

            return (
              <div 
                key={lead.id} 
                className={`bg-white rounded-2xl border transition-all duration-200 p-6 shadow-sm hover:shadow-md flex flex-col md:flex-row justify-between gap-6 ${
                  isCompleted ? 'border-emerald-100 bg-emerald-50/5' : 'border-slate-200'
                }`}
              >
                {/* Details Section */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-bold text-slate-900">{lead.name}</h3>
                    
                    {/* Status Badge */}
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${
                      isCompleted 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {isCompleted ? <CheckCircle size={12} /> : <Clock size={12} />}
                      {isCompleted ? 'Completed' : 'Pending'}
                    </span>
                  </div>

                  {/* Contact/Brief Details Row */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                    <span className="font-semibold text-slate-800">{lead.businessName || 'No Company'}</span>
                    {lead.companyType && (
                      <>
                        <span className="text-slate-300">|</span>
                        <span>{lead.companyType}</span>
                      </>
                    )}
                    {lead.industry && (
                      <>
                        <span className="text-slate-300">|</span>
                        <span>{lead.industry}</span>
                      </>
                    )}
                  </div>

                  {/* Submission brief info */}
                  {lead.createdAt && (
                    <div className="text-xs text-slate-400">
                      Submitted: {new Date(lead.createdAt.seconds * 1000).toLocaleDateString()} at {new Date(lead.createdAt.seconds * 1000).toLocaleTimeString()}
                    </div>
                  )}

                  {/* Details block */}
                  {lead.details && (
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100/80 text-sm">
                      <span className="font-semibold text-slate-700 block mb-1">Project Details:</span>
                      <p className="text-slate-600 whitespace-pre-wrap">{lead.details}</p>
                    </div>
                  )}

                  {/* Meta Specs (Project Type & Budget) */}
                  <div className="flex flex-wrap gap-3 pt-1">
                    <div className="bg-blue-50 text-blue-800 text-xs font-medium px-3 py-1.5 rounded-lg border border-blue-100">
                      Project: <span className="font-bold">{lead.projectType || 'General'}</span>
                    </div>
                    {lead.budget && (
                      <div className="bg-indigo-50 text-indigo-800 text-xs font-medium px-3 py-1.5 rounded-lg border border-indigo-100">
                        Budget: <span className="font-bold">{lead.budget}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions Panel */}
                <div className="flex flex-col justify-between items-stretch md:items-end gap-6 md:min-w-[240px] border-t md:border-t-0 pt-4 md:pt-0 border-slate-100">
                  {/* Status toggle & delete buttons */}
                  <div className="flex items-center gap-2 self-end">
                    <button
                      onClick={() => handleToggleStatus(lead.id, isCompleted)}
                      className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-all border ${
                        isCompleted
                          ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100/50'
                          : 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 hover:border-emerald-700'
                      }`}
                    >
                      {isCompleted ? 'Mark Pending' : 'Mark Completed'}
                    </button>

                    <button
                      onClick={() => handleDeleteLead(lead.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                      title="Delete entry"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Direct Communication Actions */}
                  <div className="space-y-2 w-full">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5 md:text-right">
                      Contact Client
                    </span>
                    
                    <div className="grid grid-cols-3 gap-2">
                      {/* WhatsApp */}
                      <a
                        href={links.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-emerald-100 bg-emerald-50/40 hover:bg-emerald-50 text-emerald-700 transition-all text-center group"
                        title="Open in WhatsApp"
                      >
                        <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-semibold mt-1">WhatsApp</span>
                      </a>

                      {/* Call */}
                      <a
                        href={links.call}
                        className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-blue-100 bg-blue-50/40 hover:bg-blue-50 text-blue-700 transition-all text-center group"
                        title="Call Client"
                      >
                        <Phone size={18} className="group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-semibold mt-1">Call</span>
                      </a>

                      {/* Email */}
                      <a
                        href={links.email}
                        className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-indigo-100 bg-indigo-50/40 hover:bg-indigo-50 text-indigo-700 transition-all text-center group"
                        title="Email Client"
                      >
                        <Mail size={18} className="group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] font-semibold mt-1">Email</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
