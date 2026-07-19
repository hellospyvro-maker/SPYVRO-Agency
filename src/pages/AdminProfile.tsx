import React from 'react';
import { User } from 'firebase/auth';
import { Mail, Shield, Key } from 'lucide-react';

export default function AdminProfile({ user }: { user: User }) {
  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Admin Profile</h1>
        <p className="text-secondary mt-1">Manage your administrative account settings.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600" />
        <div className="px-8 pb-8 relative">
          <div className="w-24 h-24 bg-white rounded-2xl p-2 shadow-lg absolute -top-12 border border-slate-100">
             <div className="w-full h-full bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-3xl font-black">
               {user.email?.charAt(0).toUpperCase() || 'A'}
             </div>
          </div>
          
          <div className="pt-16">
            <h2 className="text-xl font-bold text-slate-900">Administrator</h2>
            <div className="flex items-center gap-2 text-slate-500 mt-1 mb-8">
              <Mail size={16} />
              {user.email}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl border border-slate-100 bg-slate-50">
                <div className="flex items-center gap-3 text-slate-900 font-semibold mb-2">
                  <Shield size={18} className="text-blue-600" />
                  Security Status
                </div>
                <p className="text-sm text-slate-600 mb-4">Your account has full administrative privileges to view and manage lead data.</p>
                <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Active
                </div>
              </div>

              <div className="p-6 rounded-xl border border-slate-100 bg-slate-50">
                <div className="flex items-center gap-3 text-slate-900 font-semibold mb-2">
                  <Key size={18} className="text-indigo-600" />
                  Authentication
                </div>
                <p className="text-sm text-slate-600 mb-4">You are currently authenticated via Firebase Email/Password authentication.</p>
                <div className="text-xs text-slate-500">
                  User ID: <span className="font-mono text-slate-400 select-all">{user.uid}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
