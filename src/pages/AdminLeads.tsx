import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { 
  Inbox, 
  Download, 
  Search, 
  Phone, 
  Mail, 
  Trash2, 
  CheckCircle, 
  Clock, 
  MessageCircle, 
  Building2, 
  Briefcase, 
  DollarSign, 
  Send,
  Calendar,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronDown,
  PhoneCall
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLeads() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'in-discussion' | 'completed'>('all');
  const [projectFilter, setProjectFilter] = useState('all');
  const [selectedLeadForMessage, setSelectedLeadForMessage] = useState<any | null>(null);
  const [customMsg, setCustomMsg] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const leadsData = snapshot.docs.map(d => ({
        id: d.id,
        ...d.data()
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

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const leadRef = doc(db, 'leads', id);
      const isCompleted = newStatus === 'completed';
      await updateDoc(leadRef, {
        status: newStatus,
        completed: isCompleted
      });
      toast.success(`Project status updated to ${newStatus.replace('-', ' ').toUpperCase()}`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status.');
    }
  };

  const handleDeleteLead = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to delete the inquiry from "${name || 'this client'}"? This cannot be undone.`)) {
      return;
    }
    try {
      const leadRef = doc(db, 'leads', id);
      await deleteDoc(leadRef);
      toast.success('Inquiry record deleted successfully.');
    } catch (error) {
      console.error('Error deleting lead:', error);
      toast.error('Failed to delete inquiry.');
    }
  };

  // CSV Exporter
  const handleDownloadCSV = () => {
    if (leads.length === 0) {
      toast.error('No lead data available to download.');
      return;
    }

    const headers = [
      'Name', 
      'Email', 
      'Phone', 
      'Company Name', 
      'Company Type', 
      'Industry/Category', 
      'Project Type', 
      'Budget', 
      'Details', 
      'Status', 
      'Date Submitted'
    ];

    const rows = filteredLeads.map(lead => {
      const dateStr = lead.createdAt 
        ? new Date(lead.createdAt.seconds * 1000).toLocaleString() 
        : '';
      const statusText = lead.status || (lead.completed ? 'Completed' : 'Pending');
      
      return [
        lead.name || '',
        lead.email || '',
        lead.phone || '',
        lead.businessName || '',
        lead.companyType || '',
        lead.industry || '',
        lead.projectType || '',
        lead.budget || '',
        (lead.details || '').replace(/\r?\n/g, ' '),
        statusText,
        dateStr
      ];
    });

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
    link.setAttribute('download', `spyvro_leads_orders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('CSV downloaded successfully!');
  };

  // Unique list of project types
  const projectTypes = Array.from(new Set(leads.map(l => l.projectType || 'General Inquiry'))).filter(Boolean);

  // Filter leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      (lead.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.phone || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.businessName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.projectType || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const currentStatus = lead.status || (lead.completed ? 'completed' : 'pending');
    
    const matchesStatus = 
      statusFilter === 'all' ? true :
      statusFilter === currentStatus;
    
    const matchesProject = 
      projectFilter === 'all' ? true : 
      (lead.projectType || 'General Inquiry') === projectFilter;

    return matchesSearch && matchesStatus && matchesProject;
  });

  // Communication helper templates
  const getCommunicationLinks = (lead: any) => {
    const cleanPhone = (lead.phone || '').replace(/[^0-9+]/g, '');
    const name = lead.name || 'there';
    const projectType = lead.projectType || 'a digital experience';
    const budget = lead.budget ? `in the ${lead.budget} range` : '';
    
    const defaultWhatsAppText = `Hey ${name}! 👋 We received your project request on Spyvro for ${projectType} ${budget}. We'd love to learn more and discuss how we can bring it to life! When would be a good time for a quick chat?`;
    
    const emailSubject = `Spyvro Digital Project Discussion - ${projectType}`;
    const emailBody = `Hi ${name},\n\nThank you for reaching out to Spyvro!\n\nWe reviewed your submission for ${projectType} ${budget} and would love to schedule a brief discovery call or share a customized proposal.\n\nCould you share any additional timeline or reference details?\n\nBest regards,\nSpyvro Team\nhttps://spyvro.com`;

    return {
      whatsapp: `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultWhatsAppText)}`,
      call: `tel:${cleanPhone}`,
      email: `mailto:${lead.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`,
      defaultWhatsAppText
    };
  };

  const openWhatsAppModal = (lead: any) => {
    const links = getCommunicationLinks(lead);
    setSelectedLeadForMessage(lead);
    setCustomMsg(links.defaultWhatsAppText);
  };

  const sendCustomWhatsApp = () => {
    if (!selectedLeadForMessage) return;
    const cleanPhone = (selectedLeadForMessage.phone || '').replace(/[^0-9+]/g, '');
    if (!cleanPhone) {
      toast.error('Client has no phone number recorded.');
      return;
    }
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(customMsg)}`;
    window.open(url, '_blank');
    setSelectedLeadForMessage(null);
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      {/* Top Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-sans">
              Client Orders & Leads
            </h1>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full">
              {leads.length} Total
            </span>
          </div>
          <p className="text-slate-500 mt-1 text-sm">
            Manage incoming project requests, contact leads directly via WhatsApp, Call, or Email.
          </p>
        </div>

        <button
          onClick={handleDownloadCSV}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <Download size={16} />
          Download CSV
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 md:p-5 shadow-xs flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by client name, email, phone, or company..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Status selector */}
        <div className="w-full md:w-48">
          <select
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none text-sm cursor-pointer hover:bg-slate-100/60 transition-colors font-medium text-slate-700"
            value={statusFilter}
            onChange={(e: any) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-discussion">In Discussion</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Project Type selector */}
        <div className="w-full md:w-48">
          <select
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white outline-none text-sm cursor-pointer hover:bg-slate-100/60 transition-colors font-medium text-slate-700"
            value={projectFilter}
            onChange={(e) => setProjectFilter(e.target.value)}
          >
            <option value="all">All Project Types</option>
            {projectTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Orders / Leads List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-3" />
          <span className="text-sm font-medium">Fetching orders from Firestore...</span>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center shadow-xs">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Inbox size={30} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No matching orders or leads found</h3>
          <p className="text-slate-500 mt-1 max-w-sm mx-auto text-sm">
            Try adjusting your search keywords or filter settings.
          </p>
        </div>
      ) : (
        <div className="grid gap-5">
          {filteredLeads.map((lead) => {
            const links = getCommunicationLinks(lead);
            const status = lead.status || (lead.completed ? 'completed' : 'pending');
            const hasPhone = !!lead.phone;
            const hasEmail = !!lead.email;

            return (
              <div 
                key={lead.id} 
                className={`bg-white rounded-2xl border transition-all duration-200 p-5 md:p-6 shadow-xs hover:shadow-md flex flex-col lg:flex-row justify-between gap-6 ${
                  status === 'completed'
                    ? 'border-emerald-200/80 bg-emerald-50/10'
                    : status === 'in-discussion'
                    ? 'border-indigo-200/80 bg-indigo-50/10'
                    : 'border-slate-200'
                }`}
              >
                {/* Left: Lead Details */}
                <div className="flex-1 space-y-4">
                  {/* Title and Badges */}
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight">{lead.name}</h3>
                    
                    {/* Status Pill */}
                    <div className="relative inline-block">
                      <select
                        value={status}
                        onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border cursor-pointer appearance-none pr-7 outline-none transition-colors ${
                          status === 'completed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                            : status === 'in-discussion'
                            ? 'bg-indigo-50 text-indigo-700 border-indigo-300 hover:bg-indigo-100'
                            : 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
                        }`}
                      >
                        <option value="pending">⏳ Pending Review</option>
                        <option value="in-discussion">💬 In Discussion</option>
                        <option value="completed">✅ Completed</option>
                      </select>
                      <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                    </div>

                    {lead.createdAt && (
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Calendar size={12} />
                        {new Date(lead.createdAt.seconds * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    )}
                  </div>

                  {/* Company & Industry */}
                  {(lead.businessName || lead.companyType || lead.industry) && (
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-600 bg-slate-50/80 px-3.5 py-2 rounded-xl border border-slate-100">
                      {lead.businessName && (
                        <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                          <Building2 size={14} className="text-slate-400" />
                          {lead.businessName}
                        </span>
                      )}
                      {lead.companyType && (
                        <>
                          <span className="text-slate-300">&bull;</span>
                          <span>{lead.companyType}</span>
                        </>
                      )}
                      {lead.industry && (
                        <>
                          <span className="text-slate-300">&bull;</span>
                          <span className="text-slate-500">{lead.industry}</span>
                        </>
                      )}
                    </div>
                  )}

                  {/* Key specs: Project type & Budget tags */}
                  <div className="flex flex-wrap gap-2.5">
                    <div className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-blue-100">
                      <Briefcase size={13} />
                      <span>{lead.projectType || 'Custom Project'}</span>
                    </div>

                    {lead.budget && (
                      <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-emerald-100">
                        <DollarSign size={13} />
                        <span>Budget: {lead.budget}</span>
                      </div>
                    )}
                  </div>

                  {/* Client Project Notes / Description */}
                  {lead.details && (
                    <div className="bg-slate-50/90 p-4 rounded-xl border border-slate-200/70 text-sm">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        Project Scope & Requirements:
                      </span>
                      <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                        {lead.details}
                      </p>
                    </div>
                  )}

                  {/* Contact info snippets */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                    {hasPhone && (
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <Phone size={13} className="text-slate-400" />
                        {lead.phone}
                      </span>
                    )}
                    {hasEmail && (
                      <span className="flex items-center gap-1 font-medium text-slate-700">
                        <Mail size={13} className="text-slate-400" />
                        {lead.email}
                      </span>
                    )}
                  </div>
                </div>

                {/* Right: Instant Contact & Actions Bar */}
                <div className="flex flex-col justify-between items-stretch lg:items-end gap-5 lg:min-w-[280px] border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
                  
                  {/* Action row */}
                  <div className="flex items-center justify-between lg:justify-end gap-2 w-full">
                    <button
                      onClick={() => handleUpdateStatus(lead.id, status === 'completed' ? 'pending' : 'completed')}
                      className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        status === 'completed'
                          ? 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                          : 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700'
                      }`}
                    >
                      {status === 'completed' ? 'Mark as Pending' : 'Mark Completed'}
                    </button>

                    <button
                      onClick={() => handleDeleteLead(lead.id, lead.name)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"
                      title="Delete entry"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Fast Outreach Channels */}
                  <div className="w-full bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-2.5">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block text-center lg:text-left">
                      Direct Client Outreach
                    </span>

                    <div className="grid grid-cols-3 gap-2">
                      {/* WhatsApp */}
                      {hasPhone ? (
                        <button
                          onClick={() => openWhatsAppModal(lead)}
                          className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-all cursor-pointer text-center group"
                          title="Open WhatsApp composer"
                        >
                          <MessageCircle size={18} className="group-hover:scale-110 transition-transform text-emerald-600" />
                          <span className="text-[10px] font-bold mt-1">WhatsApp</span>
                        </button>
                      ) : (
                        <div className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-400 opacity-50 cursor-not-allowed">
                          <MessageCircle size={18} />
                          <span className="text-[10px] font-medium mt-1">No Phone</span>
                        </div>
                      )}

                      {/* Direct Phone Call */}
                      {hasPhone ? (
                        <a
                          href={links.call}
                          className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-800 transition-all text-center group"
                          title="Call client dialer"
                        >
                          <PhoneCall size={18} className="group-hover:scale-110 transition-transform text-blue-600" />
                          <span className="text-[10px] font-bold mt-1">Call</span>
                        </a>
                      ) : (
                        <div className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-400 opacity-50 cursor-not-allowed">
                          <PhoneCall size={18} />
                          <span className="text-[10px] font-medium mt-1">No Phone</span>
                        </div>
                      )}

                      {/* Email */}
                      {hasEmail ? (
                        <a
                          href={links.email}
                          className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 transition-all text-center group"
                          title="Open Email Client"
                        >
                          <Mail size={18} className="group-hover:scale-110 transition-transform text-indigo-600" />
                          <span className="text-[10px] font-bold mt-1">Email</span>
                        </a>
                      ) : (
                        <div className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-400 opacity-50 cursor-not-allowed">
                          <Mail size={18} />
                          <span className="text-[10px] font-medium mt-1">No Email</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* WhatsApp Message Modal */}
      {selectedLeadForMessage && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-emerald-700 font-bold">
                <MessageCircle size={20} />
                <span>Send WhatsApp Message to {selectedLeadForMessage.name}</span>
              </div>
              <button 
                onClick={() => setSelectedLeadForMessage(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Target Phone Number
              </label>
              <div className="text-sm font-bold text-slate-900 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                {selectedLeadForMessage.phone}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Message Content (Editable)
              </label>
              <textarea
                rows={5}
                className="w-full p-3 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-slate-800"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
              />
            </div>

            {/* Quick snippet options */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Quick Template Presets:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setCustomMsg(`Hi ${selectedLeadForMessage.name}! We saw your request for ${selectedLeadForMessage.projectType || 'a project'} on Spyvro. Are you free for a quick 5-min chat today?`)}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  Quick Call Request
                </button>
                <button
                  type="button"
                  onClick={() => setCustomMsg(`Hello ${selectedLeadForMessage.name}, Spyvro team here! We have reviewed your requirements and prepared a tailored proposal. Where should we send it?`)}
                  className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  Proposal Ready
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedLeadForMessage(null)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={sendCustomWhatsApp}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-5 py-2 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <Send size={15} />
                Open in WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
