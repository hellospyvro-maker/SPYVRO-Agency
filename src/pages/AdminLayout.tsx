import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LogOut, LayoutDashboard, Inbox, User as UserIcon, Menu, X, Shield } from 'lucide-react';
import { User } from 'firebase/auth';

export default function AdminLayout({ user, onLogout }: { user: User, onLogout: () => void }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Retrieve admin profile customization from localStorage
  const savedName = localStorage.getItem('admin_name') || 'Administrator';
  const savedAvatar = localStorage.getItem('admin_avatar') || '';

  const navItems = [
    { to: "/adminspy18/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/adminspy18/leads", label: "Client Orders & Leads", icon: <Inbox size={18} /> },
    { to: "/adminspy18/profile", label: "Admin Profile", icon: <UserIcon size={18} /> }
  ];

  const handleNavClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col md:flex-row">
      
      {/* Mobile Top Header */}
      <header className="md:hidden h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-2.5 text-primary font-bold">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-black text-sm shadow-xs">S</div>
          <div>
            <span className="text-slate-900 font-extrabold tracking-tight block text-sm leading-tight">Spyvro Panel</span>
            <span className="text-[10px] font-medium text-slate-400 block uppercase tracking-wider">Administration</span>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      {/* Backdrop for Mobile Sidebar */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="md:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 transition-opacity"
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:static inset-y-0 left-0 w-64 bg-white border-r border-slate-200 flex flex-col z-50 transition-transform duration-300 transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Header inside Sidebar for branding */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-black text-sm shadow-xs">S</div>
            <div>
              <span className="text-slate-900 font-extrabold tracking-tight block text-sm leading-tight">Spyvro Admin</span>
              <span className="text-[10px] font-semibold text-blue-600 block uppercase tracking-wider">Direct Portal</span>
            </div>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Navigation links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Workspace
          </div>
          {navItems.map((item) => (
            <NavLink 
              key={item.to}
              to={item.to}
              onClick={handleNavClick}
              className={({ isActive }) => `
                flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all
                ${isActive 
                  ? 'bg-blue-600 text-white font-semibold shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'}
              `}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer info/user block inside sidebar */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/70">
          <div className="flex items-center gap-3 px-2 py-1.5 mb-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold overflow-hidden shrink-0">
              {savedAvatar ? (
                <img src={savedAvatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                savedName.charAt(0).toUpperCase()
              )}
            </div>
            <div className="overflow-hidden">
              <div className="text-sm font-bold text-slate-900 truncate">{savedName}</div>
              <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                <Shield size={10} />
                <span>Super Admin</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => {
              handleNavClick();
              onLogout();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-slate-200 hover:border-rose-100 transition-colors bg-white shadow-xs cursor-pointer"
          >
            <LogOut size={14} />
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
