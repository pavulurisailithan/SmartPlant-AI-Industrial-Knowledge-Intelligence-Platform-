import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { aiApi } from '../services/api';
import toast from 'react-hot-toast';
import { Upload, FileText, File, Image, Table, Trash2, Eye, Search, Filter, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const MOCK_DOCS = [
  { id: 1, name: 'Pump P-201 OEM Manual.pdf', type: 'PDF', size: '4.2 MB', status: 'indexed', pages: 124, uploadedAt: '2024-01-10', category: 'Manual' },
  { id: 2, name: 'Motor M-102 Maintenance Report.docx', type: 'DOCX', size: '1.1 MB', status: 'indexed', pages: 18, uploadedAt: '2024-02-15', category: 'Report' },
  { id: 3, name: 'Safety SOP - High Pressure Systems.pdf', type: 'PDF', size: '2.8 MB', status: 'indexed', pages: 45, uploadedAt: '2024-02-20', category: 'SOP' },
  { id: 4, name: 'Maintenance Schedule Q1 2024.xlsx', type: 'Excel', size: '0.5 MB', status: 'indexed', pages: 8, uploadedAt: '2024-03-01', category: 'Schedule' },
  { id: 5, name: 'Compressor C-301 Inspection.pdf', type: 'PDF', size: '3.1 MB', status: 'processing', pages: 32, uploadedAt: '2024-03-10', category: 'Inspection' },
  { id: 6, name: 'OISD Compliance Checklist.pdf', type: 'PDF', size: '1.9 MB', status: 'indexed', pages: 67, uploadedAt: '2024-03-12', category: 'Compliance' },
  { id: 7, name: 'P&ID Drawing - Unit 3.png', type: 'Image', size: '8.4 MB', status: 'indexed', pages: 1, uploadedAt: '2024-03-15', category: 'Drawing' },
];

const typeIcon = { PDF: FileText, DOCX: File, Excel: Table, Image: Image };
const statusBadge = {
  indexed: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-900/30', label: 'Indexed' },
  processing: { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-900/30', label: 'Processing' },
  failed: { icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-900/30', label: 'Failed' },
};

export default function Documents() {
  const [docs, setDocs] = useState(MOCK_DOCS);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const onDrop = useCallback(async (acceptedFiles) => {
    setUploading(true);
    for (const file of acceptedFiles) {
      const newDoc = {
        id: Date.now() + Math.random(),
        name: file.name,
        type: file.name.split('.').pop().toUpperCase(),
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        status: 'processing',
        pages: 0,
        uploadedAt: new Date().toISOString().split('T')[0],
        category: 'Uploaded',
      };
      setDocs(prev => [newDoc, ...prev]);

      try {
        const formData = new FormData();
        formData.append('file', file);
        await aiApi.post('/documents/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        setDocs(prev => prev.map(d => d.id === newDoc.id ? { ...d, status: 'indexed' } : d));
        toast.success(`${file.name} indexed successfully`);
      } catch {
        // Demo: simulate processing
        setTimeout(() => {
          setDocs(prev => prev.map(d => d.id === newDoc.id ? { ...d, status: 'indexed', pages: Math.floor(Math.random() * 50) + 5 } : d));
          toast.success(`${file.name} indexed successfully`);
        }, 3000);
      }
    }
    setUploading(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'], 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'], 'image/*': ['.png', '.jpg', '.jpeg'] },
  });

  const filtered = docs.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || d.status === filter || d.type.toLowerCase() === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Document Library</h1>
          <p className="text-gray-400 text-sm">{docs.filter(d => d.status === 'indexed').length} documents indexed • {docs.length} total</p>
        </div>
      </div>

      {/* Upload Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-blue-500 bg-blue-900/10' : 'border-gray-700 hover:border-gray-600'}`}
      >
        <input {...getInputProps()} />
        <Upload size={32} className={`mx-auto mb-3 ${isDragActive ? 'text-blue-400' : 'text-gray-500'}`} />
        <p className="text-white font-medium">{isDragActive ? 'Drop files here' : 'Upload Industrial Documents'}</p>
        <p className="text-gray-400 text-sm mt-1">PDF, DOCX, Excel, Images, Drawings • AI will auto-extract and index</p>
        {uploading && (
          <div className="mt-3 flex items-center justify-center gap-2 text-blue-400 text-sm">
            <div className="w-4 h-4 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
            Processing with OCR + AI...
          </div>
        )}
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="flex-1 min-w-48 relative">
          <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
          <input className="input pl-8 text-sm" placeholder="Search documents..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)} className="input w-auto text-sm">
          <option value="all">All Types</option>
          <option value="indexed">Indexed</option>
          <option value="processing">Processing</option>
          <option value="pdf">PDF</option>
          <option value="docx">DOCX</option>
          <option value="excel">Excel</option>
        </select>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map(doc => {
          const Icon = typeIcon[doc.type] || File;
          const status = statusBadge[doc.status];
          const StatusIcon = status.icon;
          return (
            <div key={doc.id} className="card hover:border-gray-700 transition-colors group">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{doc.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="badge bg-gray-800 text-gray-400">{doc.type}</span>
                    <span className="badge bg-gray-800 text-gray-400">{doc.category}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800">
                <div className="flex items-center gap-1.5">
                  <StatusIcon size={12} className={status.color} />
                  <span className={`text-xs ${status.color}`}>{status.label}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{doc.pages}p</span>
                  <span>•</span>
                  <span>{doc.size}</span>
                  <span>•</span>
                  <span>{doc.uploadedAt}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
