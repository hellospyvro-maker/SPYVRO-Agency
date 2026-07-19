import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'sonner';

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isSignup) {
        if (email !== 'admin@spyvro.com') {
           throw new Error('Only admin@spyvro.com can be registered as the admin account due to security rules.');
        }
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success('Admin account created successfully.');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onLogin();
      navigate('/admin/leads');
    } catch (err: any) {
      if (err.message && isSignup) {
         setError(err.message);
      } else {
         setError('Invalid email or password.');
      }
      toast.error(isSignup ? 'Failed to create account.' : 'Failed to login. Ensure credentials are correct.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-xl">
        <div className="text-center mb-8">
           <h2 className="text-2xl font-bold text-slate-900">{isSignup ? 'Setup Admin Account' : 'Admin Login'}</h2>
           <p className="text-sm text-slate-500 mt-2">{isSignup ? 'Create your unique password for admin@spyvro.com' : 'Enter your credentials to access the panel.'}</p>
        </div>
        <form onSubmit={handleAuth} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Email</label>
            <input 
              required
              type="email" 
              className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-slate-50 focus:bg-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary mb-2">Password</label>
            <input 
              required
              type="password" 
              className="w-full px-4 py-3 rounded-xl border border-border-subtle bg-slate-50 focus:bg-white focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full px-6 py-4 bg-primary text-white text-base font-medium rounded-xl hover:bg-accent focus:ring-4 focus:ring-accent/20 transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (isSignup ? 'Creating...' : 'Logging in...') : (isSignup ? 'Create Account' : 'Login')}
          </button>
        </form>

        <div className="mt-8 text-center">
           <button 
             onClick={() => setIsSignup(!isSignup)}
             className="text-sm font-medium text-slate-500 hover:text-accent transition-colors"
           >
             {isSignup ? 'Already have an account? Login' : 'First time? Setup Admin Account'}
           </button>
        </div>
      </div>
    </div>
  );
}
