import os
from typing import List, Dict, Any
from services.vector_store import search

# Demo knowledge base for when OpenAI is not configured
DEMO_KNOWLEDGE = {
    "pump": """Pump P-201 Failure Analysis:
    - Last failure: March 2024 - Bearing failure due to inadequate lubrication
    - Previous failure: January 2024 - Mechanical seal leak
    - Root cause: Vibration levels exceeded 4.5 mm/s threshold
    - Recommended: Replace bearing SKF-6205-2RS, check alignment ±0.05mm
    - Maintenance interval: Every 500 operating hours
    - OEM Manual reference: Section 4.3 - Bearing Maintenance""",
    
    "motor": """Motor M-102 Maintenance History:
    - Type: 3-phase induction motor, 75kW, 1450 RPM
    - Last maintenance: February 2024 - Winding insulation check
    - Current status: Temperature slightly elevated (+8°C above baseline)
    - Vibration: 3.2 mm/s (within limits <4.5 mm/s)
    - Recommended: Monitor temperature, check cooling fan
    - Next scheduled maintenance: May 2024""",
    
    "sop": """Standard Operating Procedure - Pump Startup (SOP-PUMP-001):
    1. Verify all isolation valves are in correct position
    2. Check mechanical seal flush is flowing
    3. Prime the pump if required
    4. Start motor and verify rotation direction
    5. Slowly open discharge valve
    6. Check for vibration, noise, and leaks
    7. Verify flow rate and pressure at design conditions
    8. Log startup in maintenance system""",
    
    "safety": """Safety Precautions - High Pressure Systems:
    - Always wear PPE: safety glasses, gloves, hard hat
    - Isolate and depressurize before any maintenance
    - Follow LOTO (Lock Out Tag Out) procedure
    - Check pressure gauges before opening any connections
    - Never exceed design pressure limits
    - Emergency shutdown: Press red ESD button at panel
    - Refer: OISD-116 Section 5.1""",
    
    "compliance": """OISD Compliance Status:
    - OISD-116 §4.2 Fire & Gas Detection: PASS
    - OISD-116 §5.1 Emergency Shutdown: PASS  
    - OISD-118 §3.4 PRV Testing: FAIL - PRV-201 overdue (18 months)
    - OISD-129 §2.1 Permit to Work: WARNING - 3 incomplete records
    Overall Score: 78% - Action required on PRV testing""",
    
    "compressor": """Compressor C-301 Status:
    - Type: Reciprocating compressor, 2-stage
    - Health Score: 45% - CRITICAL
    - Remaining Useful Life: ~20 days
    - Issues: Valve wear, piston ring degradation
    - Last inspection: December 2023
    - Immediate action required: Schedule overhaul
    - Estimated downtime: 3-4 days for major overhaul"""
}

def get_rag_answer(query: str, language: str = "en") -> Dict[str, Any]:
    """RAG pipeline: retrieve relevant docs + generate answer"""
    
    # Try vector search first
    results = search(query, top_k=3)
    context = "\n\n".join([r["text"] for r in results]) if results else ""
    
    # Fallback to demo knowledge base
    if not context:
        query_lower = query.lower()
        relevant = []
        for key, content in DEMO_KNOWLEDGE.items():
            if key in query_lower or any(word in query_lower for word in key.split()):
                relevant.append(content)
        context = "\n\n".join(relevant) if relevant else "\n\n".join(list(DEMO_KNOWLEDGE.values())[:2])
    
    # Try OpenAI if configured
    openai_key = os.getenv("OPENAI_API_KEY", "demo-key")
    if openai_key and openai_key != "demo-key":
        try:
            return _openai_answer(query, context, language)
        except Exception:
            pass
    
    # Demo response generation
    return _demo_answer(query, context, language, results)

def _openai_answer(query: str, context: str, language: str) -> Dict[str, Any]:
    from openai import OpenAI
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    
    lang_instruction = {"hi": "Respond in Hindi.", "te": "Respond in Telugu.", "en": "Respond in English."}.get(language, "")
    
    prompt = f"""You are SmartPlant AI, an industrial knowledge assistant. 
Answer based on the provided context. Include source citations.
{lang_instruction}

Context:
{context}

Question: {query}

Provide a structured answer with:
1. Direct answer
2. Supporting details from context
3. Recommended actions if applicable
4. Risk level if relevant"""

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=800,
        temperature=0.3
    )
    
    return {
        "answer": response.choices[0].message.content,
        "sources": [{"title": "Knowledge Base", "relevance": "high"}],
        "model": "gpt-3.5-turbo"
    }

def _demo_answer(query: str, context: str, language: str, results: list) -> Dict[str, Any]:
    query_lower = query.lower()
    
    if "pump" in query_lower and ("fail" in query_lower or "why" in query_lower):
        answer = """## Root Cause Analysis — Pump P-201

**Primary Cause:** Bearing failure due to inadequate lubrication

**Evidence from Knowledge Base:**
- Vibration levels exceeded threshold (4.5 mm/s) for 3 consecutive days before failure
- Lubrication interval was overdue by 120 hours
- Previous seal failure (Jan 2024) may have contaminated bearing grease

**Maintenance History:**
| Date | Event | Engineer |
|------|-------|---------|
| 2024-01-15 | Seal replacement | S. Patel |
| 2024-02-20 | Bearing inspection | R. Kumar |
| 2024-03-10 | Bearing failure | Emergency |

**Recommended Actions:**
1. Replace bearing assembly (Part: SKF-6205-2RS)
2. Verify shaft alignment (tolerance: ±0.05mm)
3. Implement vibration monitoring (continuous)
4. Update lubrication schedule to every 400 hrs

**Risk Level:** 🔴 High — Immediate action required

**Sources:** Maintenance Report MR-2024-089 | SOP-PUMP-001 | OEM Manual §4.3"""

    elif "motor" in query_lower:
        answer = """## Motor M-102 — Status & Analysis

**Current Status:** ⚠️ Warning — Temperature elevated

**Key Parameters:**
- Health Score: 78%
- Vibration: 3.2 mm/s (Normal < 4.5 mm/s)
- Temperature: +8°C above baseline
- Operating Hours: 3,240 hrs since last overhaul

**Recommended Actions:**
1. Check cooling fan and air filters
2. Verify ambient temperature in motor room
3. Inspect winding insulation (next PM)
4. Schedule thermography scan

**Next Maintenance:** May 2024

**Sources:** Motor M-102 Maintenance Log | SOP-MAINT-002"""

    elif "sop" in query_lower or "procedure" in query_lower or "how to" in query_lower:
        answer = """## Standard Operating Procedure

**SOP-PUMP-001: Pump Startup Procedure**

**Pre-Start Checks:**
1. ✅ Verify all isolation valves in correct position
2. ✅ Check mechanical seal flush is flowing
3. ✅ Confirm lube oil level is adequate
4. ✅ Check coupling guard is in place

**Startup Sequence:**
1. Prime the pump if required
2. Start motor — verify correct rotation direction
3. Slowly open discharge valve (30 seconds minimum)
4. Check for vibration, noise, and leaks
5. Verify flow rate and pressure at design conditions

**Post-Start Monitoring (First 30 min):**
- Vibration < 4.5 mm/s
- Bearing temperature < 80°C
- No visible leaks

**Sources:** SOP-PUMP-001 Rev.3 | OISD-118 §3.4"""

    elif "compliance" in query_lower or "oisd" in query_lower or "iso" in query_lower:
        answer = """## Compliance Status Report

**Overall Compliance: 78%** ⚠️ Action Required

**OISD Standards:**
- ✅ OISD-116 §4.2 — Fire & Gas Detection: PASS
- ✅ OISD-116 §5.1 — Emergency Shutdown: PASS
- ❌ OISD-118 §3.4 — PRV Testing: **FAIL** (PRV-201 overdue 18 months)
- ⚠️ OISD-129 §2.1 — Permit to Work: WARNING (3 incomplete records)

**ISO 55001:** 85% — Minor gaps in KPI reporting

**Immediate Actions Required:**
1. Schedule PRV-201 testing within 7 days
2. Complete pending PTW records
3. Update MSDS for 2 chemicals

**Sources:** OISD Compliance Checklist 2024 | ISO 55001 Audit Report"""

    elif "predict" in query_lower or "maintenance" in query_lower or "schedule" in query_lower:
        answer = """## Predictive Maintenance Analysis

**AI Prediction Summary:**

| Asset | Health | RUL | Next Action |
|-------|--------|-----|-------------|
| Compressor C-301 | 45% 🔴 | 20 days | **Immediate overhaul** |
| Pump P-201 | 62% 🟡 | 45 days | Schedule bearing replacement |
| HX-201 | 71% 🟡 | 90 days | Tube bundle inspection |
| Motor M-102 | 78% 🟢 | 120 days | Routine PM |

**Priority Actions:**
1. 🚨 Compressor C-301 — Schedule overhaul this week
2. ⚠️ Pump P-201 — Bearing replacement by April 15
3. 📅 HX-201 — Tube inspection by April 25

**Cost Savings:** Predictive approach saves ~₹3.2L vs reactive maintenance

**Sources:** Sensor Data Analysis | Historical Failure Database | ML Model v2.1"""

    else:
        answer = f"""## SmartPlant AI Response

Based on the industrial knowledge base, here is the relevant information for your query:

**Query:** {query}

**Retrieved Information:**
{context[:600] if context else "No specific documents found for this query."}

**General Guidance:**
- For equipment-specific queries, include the asset ID (e.g., "Pump P-201")
- For maintenance procedures, ask for specific SOP numbers
- For compliance queries, specify the standard (OISD, ISO, Factory Act)

**Available Topics:**
- Equipment failure analysis and root cause
- Maintenance history and scheduling
- SOPs and operating procedures
- Safety guidelines and compliance
- Predictive maintenance insights

*Ask me anything about your industrial assets!*"""

    sources = [
        {"title": "Industrial Knowledge Base", "page": 1},
        {"title": "Maintenance Records 2024", "page": 3},
    ]
    if results:
        sources = [{"title": r["metadata"].get("filename", "Document"), "page": r["metadata"].get("page", 1)} for r in results[:3]]

    return {"answer": answer, "sources": sources, "model": "demo-rag"}
