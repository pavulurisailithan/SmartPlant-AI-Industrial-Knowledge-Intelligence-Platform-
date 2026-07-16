import React, { useEffect, useRef, useState } from 'react';
import { Search, RefreshCw, Info } from 'lucide-react';

const NODES = [
  { id: 'unit3',        label: 'Unit 3',            type: 'unit',      color: '#6366f1', x: 400, y: 260 },
  { id: 'pump201',      label: 'Pump P-201',         type: 'equipment', color: '#3b82f6', x: 220, y: 160 },
  { id: 'motor102',     label: 'Motor M-102',        type: 'equipment', color: '#3b82f6', x: 400, y: 100 },
  { id: 'comp301',      label: 'Compressor C-301',   type: 'equipment', color: '#3b82f6', x: 580, y: 160 },
  { id: 'valve405',     label: 'Valve V-405',        type: 'equipment', color: '#3b82f6', x: 120, y: 300 },
  { id: 'bearing_fail', label: 'Bearing Failure',    type: 'failure',   color: '#ef4444', x: 180, y: 400 },
  { id: 'seal_fail',    label: 'Seal Failure',       type: 'failure',   color: '#ef4444', x: 320, y: 420 },
  { id: 'vibration',    label: 'High Vibration',     type: 'symptom',   color: '#f59e0b', x: 80,  y: 200 },
  { id: 'temp_high',    label: 'High Temperature',   type: 'symptom',   color: '#f59e0b', x: 560, y: 300 },
  { id: 'maint_001',    label: 'MR-2024-089',        type: 'document',  color: '#10b981', x: 300, y: 320 },
  { id: 'sop_001',      label: 'SOP-PUMP-001',       type: 'document',  color: '#10b981', x: 160, y: 500 },
  { id: 'eng_kumar',    label: 'R. Kumar',           type: 'engineer',  color: '#8b5cf6', x: 460, y: 420 },
  { id: 'lubrication',  label: 'Lubrication Issue',  type: 'cause',     color: '#f97316', x: 280, y: 500 },
  { id: 'alignment',    label: 'Misalignment',       type: 'cause',     color: '#f97316', x: 420, y: 520 },
];

const LINKS = [
  { s: 'unit3', t: 'pump201',      label: 'contains' },
  { s: 'unit3', t: 'motor102',     label: 'contains' },
  { s: 'unit3', t: 'comp301',      label: 'contains' },
  { s: 'pump201', t: 'valve405',   label: 'connected_to' },
  { s: 'pump201', t: 'bearing_fail', label: 'had_failure' },
  { s: 'pump201', t: 'seal_fail',  label: 'had_failure' },
  { s: 'motor102', t: 'vibration', label: 'shows_symptom' },
  { s: 'comp301', t: 'temp_high',  label: 'shows_symptom' },
  { s: 'bearing_fail', t: 'lubrication', label: 'caused_by' },
  { s: 'bearing_fail', t: 'alignment',   label: 'caused_by' },
  { s: 'vibration', t: 'bearing_fail',   label: 'indicates' },
  { s: 'maint_001', t: 'pump201',  label: 'documents' },
  { s: 'sop_001', t: 'pump201',    label: 'applies_to' },
  { s: 'eng_kumar', t: 'maint_001', label: 'authored' },
];

const LEGEND = [
  { type: 'unit',      color: '#6366f1', label: 'Unit/Plant' },
  { type: 'equipment', color: '#3b82f6', label: 'Equipment' },
  { type: 'failure',   color: '#ef4444', label: 'Failure' },
  { type: 'symptom',   color: '#f59e0b', label: 'Symptom' },
  { type: 'cause',     color: '#f97316', label: 'Root Cause' },
  { type: 'document',  color: '#10b981', label: 'Document' },
  { type: 'engineer',  color: '#8b5cf6', label: 'Engineer' },
];

export default function KnowledgeGraph() {
  const canvasRef = useRef(null);
  const [nodes, setNodes] = useState(NODES.map(n => ({ ...n })));
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [dragging, setDragging] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const animRef = useRef(null);
  const nodesRef = useRef(nodes);

  useEffect(() => { nodesRef.current = nodes; }, [nodes]);

  // Draw graph on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = '#111827';
      ctx.fillRect(0, 0, W, H);

      const current = nodesRef.current;
      const nodeMap = Object.fromEntries(current.map(n => [n.id, n]));
      const searchLower = search.toLowerCase();

      // Draw links
      LINKS.forEach(link => {
        const s = nodeMap[link.s], t = nodeMap[link.t];
        if (!s || !t) return;
        const highlighted = !searchLower || s.label.toLowerCase().includes(searchLower) || t.label.toLowerCase().includes(searchLower);
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(t.x, t.y);
        ctx.strokeStyle = highlighted ? '#4b5563' : '#1f2937';
        ctx.lineWidth = highlighted ? 1.5 : 1;
        ctx.stroke();

        // Arrow
        const angle = Math.atan2(t.y - s.y, t.x - s.x);
        const r = 14;
        const ax = t.x - r * Math.cos(angle), ay = t.y - r * Math.sin(angle);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(ax - 8 * Math.cos(angle - 0.4), ay - 8 * Math.sin(angle - 0.4));
        ctx.lineTo(ax - 8 * Math.cos(angle + 0.4), ay - 8 * Math.sin(angle + 0.4));
        ctx.closePath();
        ctx.fillStyle = highlighted ? '#4b5563' : '#1f2937';
        ctx.fill();
      });

      // Draw nodes
      current.forEach(node => {
        const isSelected = selected?.id === node.id;
        const isSearchMatch = searchLower && node.label.toLowerCase().includes(searchLower);
        const dim = searchLower && !isSearchMatch;

        ctx.globalAlpha = dim ? 0.3 : 1;

        // Glow for selected
        if (isSelected || isSearchMatch) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, 18, 0, Math.PI * 2);
          ctx.fillStyle = node.color + '33';
          ctx.fill();
        }

        // Node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, 13, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
        ctx.strokeStyle = isSelected ? '#fff' : node.color + '88';
        ctx.lineWidth = isSelected ? 2 : 1;
        ctx.stroke();

        // Label
        ctx.font = '10px Inter, sans-serif';
        ctx.fillStyle = dim ? '#6b7280' : '#e5e7eb';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + 26);

        ctx.globalAlpha = 1;
      });
    };

    draw();
  }, [nodes, selected, search]);

  const getNodeAt = (x, y) => {
    return nodesRef.current.find(n => Math.hypot(n.x - x, n.y - y) < 16);
  };

  const handleMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    const node = getNodeAt(x, y);
    if (node) {
      setSelected(node);
      setDragging(node.id);
      setOffset({ x: x - node.x, y: y - node.y });
    } else {
      setSelected(null);
    }
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - offset.x;
    const y = e.clientY - rect.top - offset.y;
    setNodes(prev => prev.map(n => n.id === dragging ? { ...n, x, y } : n));
  };

  const handleMouseUp = () => setDragging(null);

  const resetPositions = () => setNodes(NODES.map(n => ({ ...n })));

  const connectedLinks = selected
    ? LINKS.filter(l => l.s === selected.id || l.t === selected.id)
    : [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Knowledge Graph</h1>
          <p className="text-gray-400 text-sm">Visual relationships — drag nodes to explore</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
            <input className="input pl-8 text-sm w-44" placeholder="Search nodes..."
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <button onClick={resetPositions} className="btn-secondary text-sm flex items-center gap-1">
            <RefreshCw size={14} /> Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Canvas */}
        <div className="lg:col-span-3 rounded-xl overflow-hidden border border-gray-800" style={{ height: 540 }}>
          <canvas
            ref={canvasRef}
            width={760} height={540}
            style={{ width: '100%', height: '100%', cursor: dragging ? 'grabbing' : 'grab' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-3">
          <div className="card">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Legend</h3>
            <div className="space-y-2">
              {LEGEND.map(({ color, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-xs text-gray-300">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {selected && (
            <div className="card border border-blue-800">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Selected Node</h3>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selected.color }} />
                <span className="text-sm font-medium text-white">{selected.label}</span>
              </div>
              <p className="text-xs text-gray-400 mb-2">Type: <span className="text-gray-200 capitalize">{selected.type}</span></p>
              <p className="text-xs text-gray-400 mb-2">Connections: <span className="text-gray-200">{connectedLinks.length}</span></p>
              <div className="space-y-1">
                {connectedLinks.map((l, i) => (
                  <p key={i} className="text-xs text-gray-400">• <span className="text-blue-400">{l.label}</span></p>
                ))}
              </div>
            </div>
          )}

          <div className="card">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Graph Stats</h3>
            <div className="space-y-1 text-xs text-gray-400">
              <p>Total Nodes: <span className="text-white">{NODES.length}</span></p>
              <p>Relationships: <span className="text-white">{LINKS.length}</span></p>
              <p>Equipment: <span className="text-white">{NODES.filter(n => n.type === 'equipment').length}</span></p>
              <p>Failures: <span className="text-white">{NODES.filter(n => n.type === 'failure').length}</span></p>
              <p>Documents: <span className="text-white">{NODES.filter(n => n.type === 'document').length}</span></p>
            </div>
          </div>

          <div className="card">
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <Info size={12} /> Click node to select • Drag to move
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
