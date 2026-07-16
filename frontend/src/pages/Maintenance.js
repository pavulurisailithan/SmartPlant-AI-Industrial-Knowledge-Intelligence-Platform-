import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Wrench, AlertTriangle, CheckCircle, Clock, TrendingUp, Calendar } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ASSETS = [
  { id: 'P-201', name: 'Pump P-201', type: 'Centrifugal Pump', health: 62, rul: 45, nextMaint: '2024-04-15', status: 'warning', lastMaint: '2024-01-10', failures: 3 },
  { id: 'M-102', name: 'Motor M-102', type: 'Induction Motor', health: 78, rul: 120, nextMaint: '2024-05-01', status: 'good', lastMaint: '2024-02-20', failures: 1 },
  { id: 'C-301', name: 'Compressor C-301', type: 'Reciprocating', health: 45, rul: 20, nextMaint: '2024-04-05', status: 'critical', lastMaint: '2023-12-15', failures: 5 },
  { id: 'V-405', name: 'Valve V-405', type: 'Control Valve', health: 88, rul: 200, nextMaint: '2024-06-10', status: 'good', lastMaint: '2024-03-01', failures: 0 },
  { id: 'HX-201', name: 'Heat Exchanger HX-201', type: 'Shell & Tube', health: 71, rul: 90, nextMaint: '2024-04-25', status: 'warning', lastMaint: '2024-01-25', failures: 2 },
  { id: 'T-101', name: 'Tank T-101', type: 'Storage Tank', health: 92, rul: 365, nextMaint: '2024-08-01', status: 'good', lastMaint: '2024-03-10', failures: 0 },
];

const statusConfig = {
  critical: { color: 'text-red-400', bg: 'bg-red-900/30', border: 'border-red-800', label: 'Critical' },
  warning: { color: 'text-yellow-400', bg: 'bg-yellow-900/30', border: 'border-yellow-800', label: 'Warning' },
  good: { color: 'text-green-400', bg: 'bg-green-900/30', border: 'border-green-800', label: 'Good' },
};

const healthColor = (h) => h >= 80 ? '#10b981' : h >= 60 ? '#f59e0b' : '#ef4444';

export default function Maintenance() {
  const [selected, setSelected] = useState(ASSETS[0]);

  const rulData = {
    labels: ASSETS.map(a => a.id),
    datasets: [{
      label: 'Remaining Useful Life (days)',
      data: ASSETS.map(a => a.rul),
      backgroundColor: ASSETS.map(a => healthColor(a.health)),
    }]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Predictive Maintenance</h1>
        <p className="text-gray-400 text-sm">AI-powered failure prediction and maintenance scheduling</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card"><p className="text-xs text-gray-400">Critical Assets</p><p className="text-2xl font-bold text-red-400 mt-1">{ASSETS.filter(a => a.status === 'critical').length}</p></div>
        <div className="card"><p className="text-xs text-gray-400">Warning Assets</p><p className="text-2xl font-bold text-yellow-400 mt-1">{ASSETS.filter(a => a.status === 'warning').length}</p></div>
        <div className="card"><p className="text-xs text-gray-400">Healthy Assets</p><p className="text-2xl font-bold text-green-400 mt-1">{ASSETS.filter(a => a.status === 'good').length}</p></div>
        <div className="card"><p className="text-xs text-gray-400">Due This Week</p><p className="text-2xl font-bold text-blue-400 mt-1">3</p></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Asset List */}
        <div className="space-y-2">
          {ASSETS.map(asset => {
            const s = statusConfig[asset.status];
            return (
              <button
                key={asset.id}
                onClick={() => setSelected(asset)}
                className={`w-full card text-left transition-all ${selected.id === asset.id ? 'border-blue-600' : 'hover:border-gray-700'}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{asset.name}</p>
                    <p className="text-xs text-gray-400">{asset.type}</p>
                  </div>
                  <span className={`badge ${s.bg} ${s.color}`}>{s.label}</span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Health</span><span>{asset.health}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${asset.health}%`, backgroundColor: healthColor(asset.health) }} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Asset Detail */}
        <div className="space-y-3">
          <div className={`card border ${statusConfig[selected.status].border}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-white">{selected.name}</h3>
                <p className="text-xs text-gray-400">{selected.type}</p>
              </div>
              <span className={`badge ${statusConfig[selected.status].bg} ${statusConfig[selected.status].color}`}>
                {statusConfig[selected.status].label}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-800/50 rounded-lg p-2">
                <p className="text-xs text-gray-400">Health Score</p>
                <p className="text-xl font-bold" style={{ color: healthColor(selected.health) }}>{selected.health}%</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-2">
                <p className="text-xs text-gray-400">Remaining Life</p>
                <p className="text-xl font-bold text-white">{selected.rul}d</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-2">
                <p className="text-xs text-gray-400">Next Maintenance</p>
                <p className="text-sm font-medium text-white">{selected.nextMaint}</p>
              </div>
              <div className="bg-gray-800/50 rounded-lg p-2">
                <p className="text-xs text-gray-400">Total Failures</p>
                <p className="text-xl font-bold text-white">{selected.failures}</p>
              </div>
            </div>

            {selected.status === 'critical' && (
              <div className="mt-3 p-2 bg-red-900/20 border border-red-800 rounded-lg">
                <p className="text-xs text-red-400 font-medium">⚠ AI Recommendation</p>
                <p className="text-xs text-gray-300 mt-1">Immediate inspection required. Predicted failure within {selected.rul} days. Schedule emergency maintenance.</p>
              </div>
            )}
          </div>

          <div className="card">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">AI Prediction Factors</h3>
            {[
              { factor: 'Vibration Level', value: selected.status === 'critical' ? 'High (6.2 mm/s)' : 'Normal', risk: selected.status === 'critical' ? 'high' : 'low' },
              { factor: 'Temperature', value: selected.status !== 'good' ? 'Elevated (+12°C)' : 'Normal', risk: selected.status !== 'good' ? 'medium' : 'low' },
              { factor: 'Lubrication', value: selected.health < 70 ? 'Degraded' : 'Good', risk: selected.health < 70 ? 'medium' : 'low' },
              { factor: 'Operating Hours', value: `${Math.floor(Math.random() * 5000 + 2000)} hrs`, risk: 'low' },
            ].map(({ factor, value, risk }) => (
              <div key={factor} className="flex items-center justify-between py-1.5 border-b border-gray-800 last:border-0">
                <span className="text-xs text-gray-400">{factor}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-200">{value}</span>
                  <span className={`w-2 h-2 rounded-full ${risk === 'high' ? 'bg-red-400' : risk === 'medium' ? 'bg-yellow-400' : 'bg-green-400'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RUL Chart */}
        <div className="card">
          <h3 className="text-sm font-semibold text-white mb-4">Remaining Useful Life (days)</h3>
          <div className="h-64">
            <Bar data={rulData} options={{
              responsive: true, maintainAspectRatio: false, indexAxis: 'y',
              plugins: { legend: { display: false } },
              scales: {
                x: { ticks: { color: '#6b7280' }, grid: { color: '#1f2937' } },
                y: { ticks: { color: '#9ca3af' }, grid: { display: false } }
              }
            }} />
          </div>
          <div className="mt-4 space-y-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Upcoming Schedule</p>
            {ASSETS.sort((a, b) => new Date(a.nextMaint) - new Date(b.nextMaint)).slice(0, 3).map(a => (
              <div key={a.id} className="flex items-center justify-between text-xs">
                <span className="text-gray-300">{a.name}</span>
                <span className="text-gray-400">{a.nextMaint}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
