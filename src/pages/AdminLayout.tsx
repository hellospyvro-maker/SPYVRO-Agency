import React, { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { LogOut, LayoutDashboard, Inbox, User as UserIcon, Menu, X } from 'lucide-react';
import { User } from 'firebase/auth';

export default function AdminLayout({ user, onLogout }: { user: User, onLogout: () => void }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Retrieve admin profile customization from localStorage (as formal user settings mock)
  const savedName = localStorage.getItem('admin_name') || 'Administrator';
  const savedAvatar = localStorage.getItem('admin_avatar') || '';

  const navItems = [
    { to: "/admin-824/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { to: "/admin-824/leads", label: "Form Collection", icon: <Inbox size={18} /> },
    { to: "/admin-824/profile", label: "Profile Page", icon: <UserIcon size={18} /> }
  ];

  const handleNavClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col md:flex-row">
      
      {/* Mobile Top Header */}
      <header className="md:hidden h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center gap-2 text-primary font-bold">
          <div className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center font-black">S</div>
          <span className="text-slate-900 font-extrabold tracking-tight">Spyvro Admin</span>
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
          className="md:hidden fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-40 transition-opacity"
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:static inset-y-0 left-0 w-64 bg-white border-r border-slate-200 flex flex-col z-50 transition-transform duration-300 transform 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Header inside Sidebar for branding */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200">
          <div className="flex items-center gap-2 text-primary font-bold">
            <div className="w-8 h-8 bg-blue-600 text-white rounded flex items-center justify-center font-black">S</div>
            <span className="text-slate-900 font-extrabold tracking-tight">Spyvro Admin</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Navigation links */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => (
            <NavLink 
              key={item.to}
              to={item.to}
              onClick={handleNavClick}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all
                ${isActive 
                  ? 'bg-blue-600 text-white font-semibold shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer info/user block inside sidebar */}
        <div className="p-4 border-t border-slate-200 bg-slate-50/50">
          <div className="flex items-center gap-3 px-3 py-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold overflow-hidden">
              {savedAvatar ? (
                <img src={savedAvatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                savedName.charAt(0).toUpperCase()
              )}
            </div>
            <div className="overflow-hidden">
              <div className="text-sm font-bold text-slate-900 truncate">{savedName}</div>
              <div className="text-xs text-slate-500 truncate">{user.email}</div>
            </div>
          </div>
          <button 
            onClick={() => {
              handleNavClick();
              onLogout();
            }}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl border border-slate-200 hover:border-red-100 transition-colors bg-white shadow-xs"
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
