import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Zap, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.username, form.password);
      toast.success('Welcome to SmartPlant AI!');
      navigate('/');
    } catch (err) {
      toast.error('Invalid credentials. Use admin/admin123 or engineer/eng123');
    } finally {
      setLoading(false);
    }
  };

  const demoLogin = (role) => {
    const creds = { admin: { username: 'admin', password: 'admin123' }, engineer: { username: 'engineer', password: 'eng123' } };
    setForm(creds[role]);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <Zap size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">SmartPlant AI</h1>
          <p className="text-gray-400 text-sm mt-1">Industrial Knowledge Intelligence Platform</p>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-6">Sign In</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Username</label>
              <input className="input" placeholder="admin or engineer" value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })} required />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Password</label>
              <div className="relative">
                <input className="input pr-10" type={showPass ? 'text' : 'password'}
                  placeholder="admin123 or eng123" value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })} required />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-white">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
              {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-gray-800">
            <p className="text-xs text-gray-500 mb-2">Quick demo login:</p>
            <div className="flex gap-2">
              <button onClick={() => demoLogin('admin')} className="btn-secondary text-xs flex-1">
                Admin (admin/admin123)
              </button>
              <button onClick={() => demoLogin('engineer')} className="btn-secondary text-xs flex-1">
                Engineer (engineer/eng123)
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 card text-xs text-gray-400 space-y-1">
          <p className="text-green-400 font-medium">✅ Services Running:</p>
          <p>• AI Service: <span className="text-white">http://127.0.0.1:8000</span></p>
          <p>• Frontend: <span className="text-white">http://localhost:3000</span></p>
          <p>• API Docs: <span className="text-white">http://127.0.0.1:8000/docs</span></p>
        </div>
      </div>
    </div>
  );
}
