from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

COMPLIANCE_DATA = {
    "oisd": {
        "name": "OISD Standards",
        "score": 78,
        "clauses": [
            {"clause": "OISD-116 §4.2", "description": "Fire & Gas Detection System", "status": "pass"},
            {"clause": "OISD-116 §5.1", "description": "Emergency Shutdown System", "status": "pass"},
            {"clause": "OISD-118 §3.4", "description": "Pressure Relief Valve Testing", "status": "fail",
             "note": "PRV-201 overdue for testing (last tested 18 months ago)"},
            {"clause": "OISD-129 §2.1", "description": "Permit to Work System", "status": "warning",
             "note": "PTW records incomplete for 3 jobs"},
        ]
    },
    "iso55001": {
        "name": "ISO 55001",
        "score": 85,
        "clauses": [
            {"clause": "ISO 55001 §6.2", "description": "Asset Management Objectives", "status": "pass"},
            {"clause": "ISO 55001 §8.1", "description": "Operational Planning & Control", "status": "pass"},
            {"clause": "ISO 55001 §9.1", "description": "Performance Monitoring", "status": "warning",
             "note": "KPI reporting delayed by 2 weeks"},
        ]
    },
    "factories_act": {
        "name": "Factories Act 1948",
        "score": 92,
        "clauses": [
            {"clause": "Section 21", "description": "Fencing of Machinery", "status": "pass"},
            {"clause": "Section 31", "description": "Pressure Plant Examination", "status": "pass"},
            {"clause": "Section 41B", "description": "Hazardous Process Safety", "status": "warning",
             "note": "MSDS update pending for 2 chemicals"},
        ]
    }
}

@router.get("/check/{standard}")
async def check_compliance(standard: str):
    data = COMPLIANCE_DATA.get(standard.lower())
    if not data:
        return {"error": f"Standard {standard} not found", "available": list(COMPLIANCE_DATA.keys())}
    
    total = len(data["clauses"])
    passed = sum(1 for c in data["clauses"] if c["status"] == "pass")
    failed = sum(1 for c in data["clauses"] if c["status"] == "fail")
    warnings = sum(1 for c in data["clauses"] if c["status"] == "warning")
    
    return {
        **data,
        "summary": {"total": total, "passed": passed, "failed": failed, "warnings": warnings},
        "action_required": failed > 0 or warnings > 0
    }

@router.get("/summary")
async def compliance_summary():
    return {
        "standards": [
            {"id": k, "name": v["name"], "score": v["score"]}
            for k, v in COMPLIANCE_DATA.items()
        ],
        "overall_score": round(sum(v["score"] for v in COMPLIANCE_DATA.values()) / len(COMPLIANCE_DATA)),
        "critical_issues": 1,
        "warnings": 3
    }
