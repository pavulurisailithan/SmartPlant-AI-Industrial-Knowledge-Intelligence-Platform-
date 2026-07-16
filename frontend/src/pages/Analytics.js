import React from 'react';
import { Line, Bar, Radar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, RadialLinearScale, ArcElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { TrendingDown, DollarSign, Clock, AlertTriangle } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, RadialLinearScale, ArcElement, Title, Tooltip, Legend, Filler);

const opts = { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#9ca3af', font: { size: 11 } } } } };
const scaleOpts = { x: { ticks: { color: '#6b7280' }, grid: { color: '#1f2937' } }, y: { ticks: { color: '#6b7280' }, grid: { color: '#1f2937' } } };

const KPIS = [
  { label: 'MTBF', value: '847 hrs', sub: 'Mean Time Between Failures', icon: Clock, trend: '+12%', up: true },
  { label: 'MTTR', value: '4.2 hrs', sub: 'Mean Time To Repair', icon: TrendingDown, trend: '-8%', up: true },
  { label: 'Maint. Cost', value: '₹2.4L', sub: 'This Month', icon: DollarSign, trend: '-15%', up: true },
  { label: 'Downtime', value: '18 hrs', sub: 'This Month', icon: AlertTriangle, trend: '-22%', up: true },
];

export default function Analytics() {
  const failureTrend = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      { label: 'Failures', data: [8, 12, 7, 10, 6, 9, 5, 8, 4, 7, 3, 6], borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.1)', fill: true, tension: 0.4 },
      { label: 'Maintenance', data: [15, 18, 14, 20, 16, 19, 17, 21, 15, 18, 16, 20], borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.1)', fill: true, tension: 0.4 },
    ]
  };

  const costData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      { label: 'Planned (₹K)', data: [120, 135, 110, 145, 130, 125], backgroundColor: '#3b82f6' },
      { label: 'Unplanned (₹K)', data: [45, 80, 30, 60, 25, 40], backgroundColor: '#ef4444' },
    ]
  };

  const assetHealth = {
    labels: ['Pumps', 'Motors', 'Compressors', 'Valves', 'Heat Exchangers', 'Vessels'],
    datasets: [{
      label: 'Health Score',
      data: [82, 91, 74, 88, 95, 79],
      backgroundColor: 'rgba(59,130,246,0.2)',
      borderColor: '#3b82f6',
      pointBackgroundColor: '#3b82f6',
    }]
  };

  const riskDist = {
    labels: ['Low Risk', 'Medium Risk', 'High Risk', 'Critical'],
    datasets: [{ data: [45, 30, 18, 7], backgroundColor: ['#10b981', '#f59e0b', '#f97316', '#ef4444'], borderWidth: 0 }]
  };

  const topFailures = [
    { asset: 'Pump P-201', failures: 8, cost: '₹85K', downtime: '24h' },
    { asset: 'Motor M-102', failures: 5, cost: '₹62K', downtime: '18h' },
    { asset: 'Compressor C-301', failures: 4, cost: '₹120K', downtime: '32h' },
    { asset: 'Valve V-405', failures: 3, cost: '₹18K', downtime: '6h' },
    { asset: 'HX-201', failures: 2, cost: '₹45K', downtime: '12h' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white">Analytics Dashboard</h1>
        <p className="text-gray-400 text-sm">Maintenance KPIs, failure trends, and cost analysis</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {KPIS.map(({ label, value, sub, icon: Icon, trend, up }) => (
          <div key={label} className="card">
            <div className="flex items-start justify-between mb-2">
              <Icon size={18} className="text-blue-400" />
              <span className={`text-xs font-medium ${up ? 'text-green-400' : 'text-red-400'}`}>{trend}</span>
            </div>
            <p className="text-2xl font-bold text-white">{value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{label} — {sub}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="text-sm font-semibold text-white mb-4">Failure & Maintenance Trend (2024)</h3>
          <div className="h-52">
            <Line data={failureTrend} options={{ ...opts, scales: scaleOpts }} />
          </div>
        </div>
        <div className="card">
          <h3 className="text-sm font-semibold text-white mb-4">Maintenance Cost Analysis (₹K)</h3>
          <div className="h-52">
            <Bar data={costData} options={{ ...opts, scales: scaleOpts }} />
          </div>
        </div>
        <div className="card">
          <h3 className="text-sm font-semibold text-white mb-4">Asset Health by Category</h3>
          <div className="h-52">
            <Radar data={assetHealth} options={{ ...opts, scales: { r: { ticks: { color: '#6b7280', backdropColor: 'transparent' }, grid: { color: '#1f2937' }, pointLabels: { color: '#9ca3af' }, min: 0, max: 100 } } }} />
          </div>
        </div>
        <div className="card">
          <h3 className="text-sm font-semibold text-white mb-4">Risk Distribution</h3>
          <div className="h-52">
            <Doughnut data={riskDist} options={{ ...opts, cutout: '60%' }} />
          </div>
        </div>
      </div>

      {/* Top Failures Table */}
      <div className="card">
        <h3 className="text-sm font-semibold text-white mb-4">Top Failure Assets (YTD)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-gray-400 border-b border-gray-800">
                <th className="pb-2 font-medium">Asset</th>
                <th className="pb-2 font-medium">Failures</th>
                <th className="pb-2 font-medium">Maint. Cost</th>
                <th className="pb-2 font-medium">Downtime</th>
                <th className="pb-2 font-medium">Risk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {topFailures.map((row, i) => (
                <tr key={i} className="text-gray-300">
                  <td className="py-2.5 font-medium text-white">{row.asset}</td>
                  <td className="py-2.5">{row.failures}</td>
                  <td className="py-2.5">{row.cost}</td>
                  <td className="py-2.5">{row.downtime}</td>
                  <td className="py-2.5">
                    <span className={`badge ${i === 0 ? 'bg-red-900/30 text-red-400' : i < 3 ? 'bg-yellow-900/30 text-yellow-400' : 'bg-green-900/30 text-green-400'}`}>
                      {i === 0 ? 'Critical' : i < 3 ? 'High' : 'Medium'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
