import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { Mail, Shield, Key, Save, Smile } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminProfile({ user }: { user: User }) {
  const [name, setName] = useState(localStorage.getItem('admin_name') || 'Administrator');
  const [avatar, setAvatar] = useState(localStorage.getItem('admin_avatar') || '');

  // Premium pre-loaded visual avatar illustrations
  const avatarPresets = [
    'https://api.dicebear.com/7.x/bottts/svg?seed=SpyvroAdmin',
    'https://api.dicebear.com/7.x/shapes/svg?seed=TechAesthetic',
    'https://api.dicebear.com/7.x/identicon/svg?seed=CreativeAgency',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    'https://api.dicebear.com/7.x/pixel-art/svg?seed=RetroDigital'
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('admin_name', name);
    localStorage.setItem('admin_avatar', avatar);
    toast.success('Admin Profile updated successfully!');
    
    // Refresh to immediately apply changes in sidebar layout
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 font-sans">Admin Profile</h1>
        <p className="text-slate-500 mt-1">Manage and personalize your administrative account details (saved locally).</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Details Customization */}
        <div className="md:col-span-2">
          <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Smile className="text-blue-600" size={18} />
                Profile Identity
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Admin Display Name</label>
                  <input 
                    type="text"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Administrator"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Avatar Image URL</label>
                  <input 
                    type="url"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm mb-3"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    placeholder="Enter custom image URL or select from presets below"
                  />
                  
                  {/* Avatar Preset Selectors */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Or select a premium preset avatar</span>
                    <div className="flex flex-wrap gap-3">
                      {avatarPresets.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setAvatar(preset)}
                          className={`w-12 h-12 rounded-xl p-1 border transition-all hover:scale-105 bg-slate-50 ${
                            avatar === preset ? 'border-blue-600 ring-2 ring-blue-500/20 bg-blue-50/50' : 'border-slate-200'
                          }`}
                        >
                          <img src={preset} alt="Preset Avatar" className="w-full h-full object-cover rounded-lg" />
                        </button>
                      ))}
                      {avatar && (
                        <button
                          type="button"
                          onClick={() => setAvatar('')}
                          className="px-3 text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 rounded-xl transition-all"
                        >
                          Clear Avatar
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md active:scale-95 text-sm"
              >
                <Save size={16} />
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Account Metadata Side-Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex flex-col items-center text-center pb-4 border-b border-slate-100 mb-4">
              <div className="w-20 h-20 bg-blue-50 border border-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-black mb-3 shadow-inner overflow-hidden">
                {avatar ? (
                  <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  name.charAt(0).toUpperCase()
                )}
              </div>
              <h3 className="font-bold text-slate-900">{name}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3 text-slate-600 text-sm">
                <Shield size={16} className="text-blue-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-800 block">Security Status</span>
                  <span className="text-slate-500 text-xs">Active Super-Admin. Access to form data granted.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-600 text-sm">
                <Key size={16} className="text-indigo-600 mt-0.5 shrink-0" />
                <div>
                  <span className="font-semibold text-slate-800 block">Firebase Authentication</span>
                  <span className="text-slate-500 text-xs">ID: {user.uid.slice(0, 12)}...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
