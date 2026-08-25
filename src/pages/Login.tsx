import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updatePassword } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'sonner';
import { ShieldCheck, Lock, ArrowRight } from 'lucide-react';

const ADMIN_SECRET_CODE = '18457@spyvro';
const ADMIN_FIREBASE_EMAIL = 'admin@spyvro.com';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const inputCode = accessCode.trim();

    if (inputCode !== ADMIN_SECRET_CODE) {
      setError('Invalid access code. Access denied.');
      toast.error('Invalid access code.');
      setLoading(false);
      return;
    }

    try {
      try {
        // Try sign in with current code
        await signInWithEmailAndPassword(auth, ADMIN_FIREBASE_EMAIL, inputCode);
      } catch (err: any) {
        if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
          // If password was from previous session, try previous password or create user
          try {
            await createUserWithEmailAndPassword(auth, ADMIN_FIREBASE_EMAIL, inputCode);
          } catch (createErr: any) {
            if (createErr.code === 'auth/email-already-in-use') {
              try {
                // Try previous known password then update to new password
                const prevCred = await signInWithEmailAndPassword(auth, ADMIN_FIREBASE_EMAIL, 'SpyvroAdmin824!');
                if (prevCred.user) {
                  await updatePassword(prevCred.user, inputCode);
                }
              } catch {
                throw new Error('Authentication failed.');
              }
            } else {
              throw createErr;
            }
          }
        } else {
          throw err;
        }
      }

      toast.success('Admin access granted.');
      onLogin();
      navigate('/adminspy18/dashboard');
    } catch (err: any) {
      console.error(err);
      setError('Access denied. Authentication error.');
      toast.error('Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-800/90 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-slate-700/80 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock size={26} />
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Spyvro Admin Portal</h2>
          <p className="text-sm text-slate-400 mt-1.5">Enter your secret passkey to access the control panel.</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Passkey / Special Code
            </label>
            <div className="relative">
              <input 
                required
                type="password" 
                autoComplete="current-password"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-700 bg-slate-900/80 text-white placeholder-slate-500 focus:bg-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm tracking-wider"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Enter secret code"
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                <ShieldCheck size={18} />
              </div>
            </div>
          </div>

          {error && (
            <div className="text-rose-400 text-xs font-medium bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-lg">
              {error}
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all shadow-lg active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? 'Verifying...' : (
              <>
                <span>Enter Admin Panel</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-700/60 text-center">
          <p className="text-xs text-slate-500">
            Protected endpoint &bull; Restricted to authorized Spyvro personnel
          </p>
        </div>
      </div>
    </div>
  );
}
