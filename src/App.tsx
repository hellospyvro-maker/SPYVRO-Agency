import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from './firebase';

import Home from './pages/Home';
import Login from './pages/Login';
import AdminLayout from './pages/AdminLayout';
import AdminLeads from './pages/AdminLeads';
import AdminOverview from './pages/AdminOverview';
import AdminProfile from './pages/AdminProfile';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50">Loading...</div>;
  }

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <BrowserRouter>
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Admin Routes */}
        <Route path="/admin-824" element={user ? <AdminLayout user={user} onLogout={handleLogout} /> : <Login onLogin={() => {}} />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminOverview />} />
          <Route path="leads" element={<AdminLeads />} />
          <Route path="profile" element={<AdminProfile user={user} />} />
        </Route>
        
        {/* Redirect old routes */}
        <Route path="/login" element={<Navigate to="/" replace />} />
        <Route path="/legacy" element={<Navigate to="/" replace />} />
        <Route path="/admin" element={<Navigate to="/" replace />} />
        <Route path="/admin/dashboard" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
