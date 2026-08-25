import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Users, TrendingUp, Calendar, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminOverview() {
  const [leadCount, setLeadCount] = useState(0);
  const [recentCount, setRecentCount] = useState(0);
  const [latestLeads, setLatestLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to entire leads for counters
    const qCount = query(collection(db, 'leads'));
    const unsubscribeCount = onSnapshot(qCount, (snapshot) => {
      setLeadCount(snapshot.size);
      
      const now = new Date();
      const thirtyDaysAgo = now.getTime() - (30 * 24 * 60 * 60 * 1000);
      
      let recent = 0;
      snapshot.forEach(doc => {
         const data = doc.data();
         if (data.createdAt && data.createdAt.seconds * 1000 > thirtyDaysAgo) {
            recent++;
         }
      });
      setRecentCount(recent);
    });

    // Listen to latest 5 leads for quick view
    const qLatest = query(collection(db, 'leads'), orderBy('createdAt', 'desc'), limit(5));
    const unsubscribeLatest = onSnapshot(qLatest, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLatestLeads(items);
      setLoading(false);
    });

    return () => {
      unsubscribeCount();
      unsubscribeLatest();
    };
  }, []);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8">
      {/* Head section */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-sans">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Welcome to the Spyvro Administrative Hub.</p>
      </div>

      {/* Simplified stats card grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Card: Total Leads */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-slate-500 text-sm font-medium">Total Leads Collected</span>
            <div className="text-3xl font-extrabold text-slate-900">{loading ? '...' : leadCount}</div>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Users size={22} />
          </div>
        </div>

        {/* Card: 30 days change */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-slate-500 text-sm font-medium">New Leads (Past 30 Days)</span>
            <div className="text-3xl font-extrabold text-slate-900">{loading ? '...' : recentCount}</div>
          </div>
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <TrendingUp size={22} />
          </div>
        </div>

        {/* Card: System Health */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-slate-500 text-sm font-medium">Platform Status</span>
            <div className="text-lg font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1.5 w-max">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Operational
            </div>
          </div>
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
            <Calendar size={22} />
          </div>
        </div>
      </div>

      {/* Quick Glancing Leads Summary table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Latest Lead Submissions</h2>
            <p className="text-xs text-slate-400 mt-0.5">Quickly review recent client sign-ups.</p>
          </div>
          <Link
            to="/adminspy18/leads"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:translate-x-0.5 transition-all"
          >
            Manage All
            <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="p-12 text-center text-slate-400 text-sm">Syncing latest entries...</div>
        ) : latestLeads.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-sm">
            No entries available. Submitted leads will appear here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50/75 border-b border-slate-100 text-slate-400 font-semibold">
                  <th className="p-4 pl-6">Client Name</th>
                  <th className="p-4">Project Type</th>
                  <th className="p-4">Budget Range</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {latestLeads.map((lead) => {
                  const isCompleted = !!lead.completed;
                  return (
                    <tr key={lead.id} className="hover:bg-slate-50/40 transition-colors">
                      <td className="p-4 pl-6 font-medium text-slate-900">
                        <div>
                          <span>{lead.name}</span>
                          <span className="block text-xs font-normal text-slate-400">{lead.email}</span>
                        </div>
                      </td>
                      <td className="p-4 text-slate-600">{lead.projectType || 'General'}</td>
                      <td className="p-4 text-slate-600">{lead.budget || '--'}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full border ${
                          isCompleted 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {isCompleted ? <CheckCircle size={10} /> : <Clock size={10} />}
                          {isCompleted ? 'Completed' : 'Pending'}
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right text-slate-400 text-xs">
                        {lead.createdAt 
                          ? new Date(lead.createdAt.seconds * 1000).toLocaleDateString()
                          : '--'
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
