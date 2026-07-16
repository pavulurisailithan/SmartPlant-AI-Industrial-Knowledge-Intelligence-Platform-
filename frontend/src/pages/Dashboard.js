import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { AlertTriangle, CheckCircle, Clock, TrendingUp, FileText, Wrench, Activity, Zap } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

const chartDefaults = { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#9ca3af', font: { size: 11 } } } } };

const MOCK_STATS = [
  { label: 'Total Assets', value: '247', change: '+12', icon: Activity, color: 'blue' },
  { label: 'Active Alerts', value: '8', change: '-3', icon: AlertTriangle, color: 'red' },
  { label: 'Documents', value: '1,284', change: '+56', icon: FileText, color: 'purple' },
  { label: 'Maintenance Due', value: '14', change: '+2', icon: Wrench, color: 'yellow' },
];

const RECENT_ALERTS = [
  { id: 1, asset: 'Pump P-201', type: 'Vibration High', severity: 'critical', time: '2 min ago' },
  { id: 2, asset: 'Motor M-102', type: 'Temperature Warning', severity: 'warning', time: '15 min ago' },
  { id: 3, asset: 'Compressor C-301', type: 'Pressure Drop', severity: 'warning', time: '1 hr ago' },
  { id: 4, asset: 'Valve V-405', type: 'Maintenance Due', severity: 'info', time: '3 hr ago' },
];

const RECENT_QUERIES = [
  { q: 'Why did Pump P-201 fail last month?', time: '10 min ago' },
  { q: 'Show all motor failures in last 2 years', time: '1 hr ago' },
  { q: 'What is the SOP for compressor startup?', time: '2 hr ago' },
];

export default function Dashboard() {
  const [healthData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      label: 'Overall Health Score',
      data: [82, 79, 85, 88, 84, 91, 87],
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59,130,246,0.1)',
      fill: true,
      tension: 0.4,
    }]
  });

  const [failureData] = useState({
    labels: ['Mechanical', 'Electrical', 'Hydraulic', 'Thermal', 'Other'],
    datasets: [{
      data: [35, 25, 20, 12, 8],
      backgroundColor: ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6'],
      borderWidth: 0,
    }]
  });

  const [maintenanceData] = useState({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      { label: 'Planned', data: [4, 6, 3, 8, 5, 2, 1], backgroundColor: '#3b82f6' },
      { label: 'Unplanned', data: [1, 2, 1, 3, 1, 0, 0], backgroundColor: '#ef4444' },
    ]
  });

  const severityColor = { critical: 'text-red-400 bg-red-900/30', warning: 'text-yellow-400 bg-yellow-900/30', info: 'text-blue-400 bg-blue-900/30' };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Operations Dashboard</h1>
          <p className="text-gray-400 text-sm">Real-time industrial intelligence overview</p>
        </div>
        <Link to="/chat" className="btn-primary flex items-center gap-2 text-sm">
          <Zap size={16} /> Ask AI
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_STATS.map(({ label, value, change, icon: Icon, color }) => (
          <div key={label} className="card">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-xs mb-1">{label}</p>
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className={`text-xs mt-1 ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{change} this week</p>
              </div>
              <div className={`p-2 rounded-lg bg-${color}-900/30`}>
                <Icon size={20} className={`text-${color}-400`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card lg:col-span-2">
          <h3 className="text-sm font-semibold text-white mb-4">Asset Health Trend</h3>
          <div className="h-48">
            <Line data={healthData} options={{ ...chartDefaults, scales: { x: { ticks: { color: '#6b7280' }, grid: { color: '#1f2937' } }, y: { ticks: { color: '#6b7280' }, grid: { color: '#1f2937' }, min: 60, max: 100 } } }} />
          </div>
        </div>
        <div className="card">
          <h3 className="text-sm font-semibold text-white mb-4">Failure Distribution</h3>
          <div className="h-48">
            <Doughnut data={failureData} options={{ ...chartDefaults, cutout: '65%' }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card">
          <h3 className="text-sm font-semibold text-white mb-4">Weekly Maintenance</h3>
          <div className="h-40">
            <Bar data={maintenanceData} options={{ ...chartDefaults, scales: { x: { ticks: { color: '#6b7280' }, grid: { display: false } }, y: { ticks: { color: '#6b7280' }, grid: { color: '#1f2937' } } } }} />
          </div>
        </div>

        {/* Alerts */}
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Active Alerts</h3>
            <span className="badge bg-red-900/50 text-red-400">{RECENT_ALERTS.length}</span>
          </div>
          <div className="space-y-2">
            {RECENT_ALERTS.map(alert => (
              <div key={alert.id} className="flex items-start gap-2 p-2 rounded-lg bg-gray-800/50">
                <span className={`badge mt-0.5 ${severityColor[alert.severity]}`}>{alert.severity}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white">{alert.asset}</p>
                  <p className="text-xs text-gray-400">{alert.type}</p>
                </div>
                <span className="text-xs text-gray-500 whitespace-nowrap">{alert.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent AI Queries */}
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Recent AI Queries</h3>
            <Link to="/chat" className="text-xs text-blue-400 hover:text-blue-300">View all</Link>
          </div>
          <div className="space-y-2">
            {RECENT_QUERIES.map((q, i) => (
              <Link key={i} to="/chat" className="block p-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors">
                <p className="text-xs text-gray-200 line-clamp-2">"{q.q}"</p>
                <p className="text-xs text-gray-500 mt-1">{q.time}</p>
              </Link>
            ))}
          </div>
          <Link to="/chat" className="btn-primary w-full text-center text-xs mt-3 block">
            Ask AI Assistant
          </Link>
        </div>
      </div>
    </div>
  );
}
