import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, ShieldX, CheckCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';

const STANDARDS = [
  {
    id: 'oisd',
    name: 'OISD Standards',
    description: 'Oil Industry Safety Directorate',
    score: 78,
    items: [
      { clause: 'OISD-116 §4.2', desc: 'Fire & Gas Detection System', status: 'pass' },
      { clause: 'OISD-116 §5.1', desc: 'Emergency Shutdown System', status: 'pass' },
      { clause: 'OISD-118 §3.4', desc: 'Pressure Relief Valve Testing', status: 'fail', note: 'PRV-201 overdue for testing (last: 18 months ago)' },
      { clause: 'OISD-118 §6.2', desc: 'Earthing & Bonding', status: 'pass' },
      { clause: 'OISD-129 §2.1', desc: 'Permit to Work System', status: 'warning', note: 'PTW records incomplete for 3 jobs' },
    ]
  },
  {
    id: 'iso',
    name: 'ISO 55001',
    description: 'Asset Management System',
    score: 85,
    items: [
      { clause: 'ISO 55001 §6.2', desc: 'Asset Management Objectives', status: 'pass' },
      { clause: 'ISO 55001 §8.1', desc: 'Operational Planning & Control', status: 'pass' },
      { clause: 'ISO 55001 §9.1', desc: 'Performance Monitoring', status: 'warning', note: 'KPI reporting delayed by 2 weeks' },
      { clause: 'ISO 55001 §10.1', desc: 'Nonconformity & Corrective Action', status: 'pass' },
    ]
  },
  {
    id: 'factory',
    name: 'Factories Act 1948',
    description: 'Indian Factory Compliance',
    score: 92,
    items: [
      { clause: 'Section 21', desc: 'Fencing of Machinery', status: 'pass' },
      { clause: 'Section 31', desc: 'Pressure Plant Examination', status: 'pass' },
      { clause: 'Section 38', desc: 'Fire Safety Measures', status: 'pass' },
      { clause: 'Section 41B', desc: 'Hazardous Process Safety', status: 'warning', note: 'MSDS update pending for 2 chemicals' },
    ]
  },
  {
    id: 'sop',
    name: 'Internal SOPs',
    description: 'Standard Operating Procedures',
    score: 71,
    items: [
      { clause: 'SOP-OPS-001', desc: 'Startup/Shutdown Procedure', status: 'pass' },
      { clause: 'SOP-MAINT-002', desc: 'Preventive Maintenance', status: 'fail', note: 'PM schedule not followed for 4 assets' },
      { clause: 'SOP-SAFE-003', desc: 'LOTO Procedure', status: 'pass' },
      { clause: 'SOP-ENV-004', desc: 'Environmental Monitoring', status: 'warning', note: 'Monthly report overdue' },
    ]
  },
];

const statusIcon = {
  pass: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-900/20', label: 'Pass' },
  fail: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-900/20', label: 'Fail' },
  warning: { icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-900/20', label: 'Warning' },
};

const scoreColor = (s) => s >= 85 ? 'text-green-400' : s >= 70 ? 'text-yellow-400' : 'text-red-400';
const scoreRing = (s) => s >= 85 ? '#10b981' : s >= 70 ? '#f59e0b' : '#ef4444';

export default function Compliance() {
  const [active, setActive] = useState('oisd');
  const [checking, setChecking] = useState(false);

  const standard = STANDARDS.find(s => s.id === active);
  const totalPass = standard.items.filter(i => i.status === 'pass').length;
  const totalFail = standard.items.filter(i => i.status === 'fail').length;
  const totalWarn = standard.items.filter(i => i.status === 'warning').length;

  const runCheck = async () => {
    setChecking(true);
    await new Promise(r => setTimeout(r, 2000));
    setChecking(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Compliance Checker</h1>
          <p className="text-gray-400 text-sm">AI-automated compliance verification against industrial standards</p>
        </div>
        <button onClick={runCheck} disabled={checking} className="btn-primary flex items-center gap-2 text-sm">
          <RefreshCw size={14} className={checking ? 'animate-spin' : ''} />
          {checking ? 'Checking...' : 'Run AI Check'}
        </button>
      </div>

      {/* Standard Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {STANDARDS.map(s => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={`card text-left transition-all ${active === s.id ? 'border-blue-600' : 'hover:border-gray-700'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <ShieldCheck size={18} className={scoreColor(s.score)} />
              <span className={`text-lg font-bold ${scoreColor(s.score)}`}>{s.score}%</span>
            </div>
            <p className="text-sm font-medium text-white">{s.name}</p>
            <p className="text-xs text-gray-400">{s.description}</p>
            <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${s.score}%`, backgroundColor: scoreRing(s.score) }} />
            </div>
          </button>
        ))}
      </div>

      {/* Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white">{standard.name} — Clause Details</h3>
            <div className="flex gap-3 text-xs">
              <span className="text-green-400">✓ {totalPass} Pass</span>
              <span className="text-yellow-400">⚠ {totalWarn} Warn</span>
              <span className="text-red-400">✗ {totalFail} Fail</span>
            </div>
          </div>
          <div className="space-y-2">
            {standard.items.map((item, i) => {
              const s = statusIcon[item.status];
              const Icon = s.icon;
              return (
                <div key={i} className={`p-3 rounded-lg border ${item.status === 'fail' ? 'border-red-900' : item.status === 'warning' ? 'border-yellow-900' : 'border-gray-800'} ${s.bg}`}>
                  <div className="flex items-start gap-3">
                    <Icon size={16} className={`${s.color} mt-0.5 flex-shrink-0`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-gray-400">{item.clause}</span>
                        <span className={`badge ${s.bg} ${s.color} border border-current/20`}>{s.label}</span>
                      </div>
                      <p className="text-sm text-white mt-0.5">{item.desc}</p>
                      {item.note && <p className="text-xs text-gray-400 mt-1">⚠ {item.note}</p>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <div className="card text-center">
            <p className="text-xs text-gray-400 mb-2">Overall Compliance Score</p>
            <div className="relative inline-flex items-center justify-center w-28 h-28">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#1f2937" strokeWidth="10" />
                <circle cx="50" cy="50" r="40" fill="none" stroke={scoreRing(standard.score)} strokeWidth="10"
                  strokeDasharray={`${2 * Math.PI * 40 * standard.score / 100} ${2 * Math.PI * 40}`} strokeLinecap="round" />
              </svg>
              <span className={`absolute text-2xl font-bold ${scoreColor(standard.score)}`}>{standard.score}%</span>
            </div>
            <p className="text-sm text-white mt-2">{standard.name}</p>
          </div>

          <div className="card">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Action Items</h3>
            <div className="space-y-2">
              {standard.items.filter(i => i.status !== 'pass').map((item, i) => (
                <div key={i} className="text-xs p-2 bg-gray-800/50 rounded-lg">
                  <p className="font-medium text-white">{item.clause}</p>
                  <p className="text-gray-400 mt-0.5">{item.note || item.desc}</p>
                  <span className={`badge mt-1 ${statusIcon[item.status].bg} ${statusIcon[item.status].color}`}>
                    {item.status === 'fail' ? 'Immediate Action' : 'Review Required'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">All Standards Summary</h3>
            {STANDARDS.map(s => (
              <div key={s.id} className="flex items-center justify-between py-1.5 border-b border-gray-800 last:border-0">
                <span className="text-xs text-gray-300">{s.name}</span>
                <span className={`text-xs font-bold ${scoreColor(s.score)}`}>{s.score}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
