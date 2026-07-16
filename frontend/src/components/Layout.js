import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, MessageSquare, FileText, Share2,
  BarChart3, Wrench, ShieldCheck, LogOut, Menu, X,
  Zap, Bell, User
} from 'lucide-react';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/chat', icon: MessageSquare, label: 'AI Assistant' },
  { to: '/documents', icon: FileText, label: 'Documents' },
  { to: '/knowledge-graph', icon: Share2, label: 'Knowledge Graph' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/maintenance', icon: Wrench, label: 'Maintenance' },
  { to: '/compliance', icon: ShieldCheck, label: 'Compliance' },
];

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-60' : 'w-16'} bg-gray-900 border-r border-gray-800 flex flex-col transition-all duration-300 flex-shrink-0`}>
        <div className="flex items-center gap-3 p-4 border-b border-gray-800">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Zap size={16} className="text-white" />
          </div>
          {sidebarOpen && <span className="font-bold text-white text-sm">SmartPlant AI</span>}
        </div>

        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`
              }
            >
              <Icon size={18} className="flex-shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="p-2 border-t border-gray-800">
          {sidebarOpen && (
            <div className="flex items-center gap-2 px-3 py-2 mb-1">
              <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center">
                <User size={14} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">{user?.name || user?.username}</p>
                <p className="text-xs text-gray-500 truncate">{user?.role}</p>
              </div>
            </div>
          )}
          <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-gray-800 w-full transition-colors">
            <LogOut size={18} className="flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between flex-shrink-0">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white transition-colors">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-green-900/30 border border-green-800 rounded-full px-3 py-1">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-400 font-medium">AI Online</span>
            </div>
            <button className="text-gray-400 hover:text-white relative">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">3</span>
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
