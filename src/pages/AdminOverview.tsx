import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Users, BarChart3, TrendingUp, Calendar } from 'lucide-react';

export default function AdminOverview() {
  const [leadCount, setLeadCount] = useState(0);
  const [recentCount, setRecentCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'leads'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
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
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-primary">Dashboard Overview</h1>
          <p className="text-secondary mt-1">Welcome to the Spyvro administrative panel.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                 <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <Users size={24} />
                 </div>
                 <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">Live</span>
              </div>
              <div className="text-slate-500 text-sm font-medium mb-1">Total Leads</div>
              <div className="text-3xl font-bold text-slate-900">{loading ? '-' : leadCount}</div>
           </div>

           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                 <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                    <TrendingUp size={24} />
                 </div>
              </div>
              <div className="text-slate-500 text-sm font-medium mb-1">Recent (30 Days)</div>
              <div className="text-3xl font-bold text-slate-900">{loading ? '-' : recentCount}</div>
           </div>

           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                 <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                    <BarChart3 size={24} />
                 </div>
              </div>
              <div className="text-slate-500 text-sm font-medium mb-1">Conversion Rate</div>
              <div className="text-3xl font-bold text-slate-900">--%</div>
           </div>

           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                 <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                    <Calendar size={24} />
                 </div>
              </div>
              <div className="text-slate-500 text-sm font-medium mb-1">System Status</div>
              <div className="text-xl font-bold text-slate-900 mt-2">Operational</div>
           </div>
        </div>
    </div>
  );
}
