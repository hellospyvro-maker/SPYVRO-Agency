import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LogOut, LayoutDashboard, Inbox, User as UserIcon } from 'lucide-react';
import { User } from 'firebase/auth';

export default function AdminLayout({ user, onLogout }: { user: User, onLogout: () => void }) {
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <div className="flex items-center gap-2 text-primary font-bold">
            <div className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center font-black">S</div>
            Spyvro Admin
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1">
          <NavLink 
            to="/admin-824/dashboard"
            className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>
          <NavLink 
            to="/admin-824/leads"
            className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <Inbox size={18} />
            Form Collection
          </NavLink>
          <NavLink 
            to="/admin-824/profile"
            className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <UserIcon size={18} />
            Profile Page
          </NavLink>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
              <UserIcon size={16} />
            </div>
            <div className="overflow-hidden">
              <div className="text-sm font-medium text-slate-900 truncate">{user.email}</div>
              <div className="text-xs text-slate-500">Administrator</div>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
