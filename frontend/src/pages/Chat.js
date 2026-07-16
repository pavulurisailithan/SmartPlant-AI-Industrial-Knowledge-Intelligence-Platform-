import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { aiApi } from '../services/api';
import { Send, Mic, MicOff, Globe, Paperclip, Bot, User, Loader, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी' },
  { code: 'te', label: 'తెలుగు' },
];

const SAMPLE_QUESTIONS = [
  'Why did Pump P-201 fail last month?',
  'Show all motor failures in the last 2 years',
  'What is the SOP for compressor startup?',
  'What are the safety precautions for high-pressure systems?',
  'Predict maintenance schedule for Motor M-102',
  'Check OISD compliance for storage tanks',
];

const DEMO_RESPONSES = {
  default: `## Analysis Complete

Based on the industrial knowledge base, here is what I found:

**Root Cause Analysis:**
- Primary cause: Bearing wear due to inadequate lubrication (Ref: Maintenance Report MR-2024-089)
- Contributing factor: Vibration levels exceeded threshold (>4.5 mm/s) for 3 consecutive days

**Maintenance History:**
| Date | Type | Engineer | Finding |
|------|------|----------|---------|
| 2024-01-15 | Preventive | R. Kumar | Bearing clearance OK |
| 2024-02-20 | Corrective | S. Patel | Seal replaced |
| 2024-03-10 | Emergency | A. Singh | Bearing failure |

**Recommended Actions:**
1. Replace bearing assembly (Part No: SKF-6205-2RS)
2. Check alignment within ±0.05mm tolerance
3. Verify lubrication schedule (every 500 hrs)
4. Install vibration sensor for continuous monitoring

**Risk Level:** 🔴 High — Immediate action required

**Related Documents:**
- 📄 Pump P-201 OEM Manual (Section 4.3)
- 📋 SOP-PUMP-001: Pump Maintenance Procedure
- 📊 Maintenance Report MR-2024-089`,
};

export default function Chat() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I am SmartPlant AI, your industrial knowledge assistant. Ask me anything about your equipment, maintenance history, SOPs, safety procedures, or compliance requirements.',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('en');
  const [listening, setListening] = useState(false);
  const bottomRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg) return;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg, timestamp: new Date() }]);
    setLoading(true);

    try {
      const res = await aiApi.post('/chat', { query: userMsg, language, session_id: 'demo' });
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: res.data.answer,
        sources: res.data.sources,
        timestamp: new Date(),
      }]);
    } catch {
      // Demo fallback
      await new Promise(r => setTimeout(r, 1500));
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: DEMO_RESPONSES.default,
        sources: [
          { title: 'Pump P-201 OEM Manual', page: 42 },
          { title: 'Maintenance Report MR-2024-089', page: 1 },
          { title: 'SOP-PUMP-001', page: 8 },
        ],
        timestamp: new Date(),
      }]);
    } finally {
      setLoading(false);
    }
  };

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      toast.error('Voice not supported in this browser');
      return;
    }
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SR();
    recognition.lang = language === 'hi' ? 'hi-IN' : language === 'te' ? 'te-IN' : 'en-US';
    recognition.onresult = (e) => { setInput(e.results[0][0].transcript); setListening(false); };
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  };

  return (
    <div className="flex h-full gap-4" style={{ height: 'calc(100vh - 120px)' }}>
      {/* Chat Area */}
      <div className="flex-1 flex flex-col card p-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">SmartPlant AI Assistant</p>
              <p className="text-xs text-green-400">● Online • RAG + GPT</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={14} className="text-gray-400" />
            <select
              value={language}
              onChange={e => setLanguage(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded text-xs text-gray-300 px-2 py-1"
            >
              {LANGUAGES.map(l => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-700'}`}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className={`max-w-2xl ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
                  {msg.role === 'assistant' ? (
                    <div className="prose prose-invert prose-sm max-w-none text-gray-100">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm">{msg.content}</p>
                  )}
                </div>
                {msg.sources && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {msg.sources.map((s, si) => (
                      <span key={si} className="flex items-center gap-1 text-xs bg-gray-800 border border-gray-700 rounded px-2 py-0.5 text-gray-400">
                        <BookOpen size={10} /> {s.title} {s.page && `p.${s.page}`}
                      </span>
                    ))}
                  </div>
                )}
                <span className="text-xs text-gray-600">{msg.timestamp?.toLocaleTimeString()}</span>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-gray-700 flex items-center justify-center">
                <Bot size={14} />
              </div>
              <div className="chat-bubble-ai flex items-center gap-2">
                <Loader size={14} className="animate-spin text-blue-400" />
                <span className="text-sm text-gray-400">Analyzing knowledge base...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-gray-800">
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-xl px-3 py-2">
              <input
                className="flex-1 bg-transparent text-sm text-gray-100 placeholder-gray-500 outline-none"
                placeholder="Ask about equipment, maintenance, safety, compliance..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              />
              <button onClick={toggleVoice} className={`${listening ? 'text-red-400 animate-pulse' : 'text-gray-400 hover:text-white'} transition-colors`}>
                {listening ? <MicOff size={16} /> : <Mic size={16} />}
              </button>
            </div>
            <button onClick={() => sendMessage()} disabled={loading || !input.trim()} className="btn-primary px-3 disabled:opacity-50">
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar - Sample Questions */}
      <div className="w-64 flex-shrink-0 space-y-3">
        <div className="card">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Sample Questions</h3>
          <div className="space-y-2">
            {SAMPLE_QUESTIONS.map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                className="w-full text-left text-xs text-gray-300 hover:text-white bg-gray-800/50 hover:bg-gray-800 rounded-lg p-2 transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
        <div className="card">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">AI Capabilities</h3>
          <ul className="space-y-1.5 text-xs text-gray-400">
            {['Root Cause Analysis', 'Maintenance History', 'SOP Retrieval', 'Compliance Check', 'Predictive Insights', 'Multi-language', 'Voice Input', 'Source Citations'].map(c => (
              <li key={c} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
