import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Documents from './pages/Documents';
import KnowledgeGraph from './pages/KnowledgeGraph';
import Analytics from './pages/Analytics';
import Maintenance from './pages/Maintenance';
import Compliance from './pages/Compliance';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ style: { background: '#1f2937', color: '#f9fafb', border: '1px solid #374151' } }} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="chat" element={<Chat />} />
            <Route path="documents" element={<Documents />} />
            <Route path="knowledge-graph" element={<KnowledgeGraph />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="compliance" element={<Compliance />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
