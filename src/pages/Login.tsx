import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'sonner';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password !== 'SpyvroAdmin824!') {
       setError('Invalid access code.');
       toast.error('Access denied.');
       setLoading(false);
       return;
    }

    try {
      try {
        await signInWithEmailAndPassword(auth, 'admin@spyvro.com', password);
      } catch (err: any) {
        if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
             try {
                 await createUserWithEmailAndPassword(auth, 'admin@spyvro.com', password);
             } catch (createErr: any) {
                 if (createErr.code === 'auth/email-already-in-use') {
                     throw new Error('Invalid access code.');
                 }
                 throw createErr;
             }
        } else {
             throw err;
        }
      }
      onLogin();
      navigate('/admin-824/dashboard');
    } catch (err: any) {
      setError('Access denied.');
      toast.error('Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl">
        <div className="text-center mb-8">
           <h2 className="text-2xl font-bold text-slate-900">Access Admin Panel</h2>
           <p className="text-sm text-slate-500 mt-2">Enter your secure access code to continue.</p>
        </div>
        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Access Code</label>
            <input 
              required
              type="password" 
              className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-slate-50 focus:bg-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full px-6 py-4 bg-primary text-white text-base font-medium rounded-xl hover:bg-accent focus:ring-4 focus:ring-accent/20 transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Authenticating...' : 'Enter Panel'}
          </button>
        </form>
      </div>
    </div>
  );
}
