from fastapi import APIRouter
from pydantic import BaseModel
import random

router = APIRouter()

ASSETS_DATA = {
    "P-201": {"name": "Pump P-201", "type": "Centrifugal Pump", "health": 62, "rul": 45, "status": "warning",
               "factors": {"vibration": 4.2, "temperature": 72, "pressure": 8.5, "flow": 95}},
    "M-102": {"name": "Motor M-102", "type": "Induction Motor", "health": 78, "rul": 120, "status": "good",
               "factors": {"vibration": 3.2, "temperature": 68, "current": 42, "insulation": 95}},
    "C-301": {"name": "Compressor C-301", "type": "Reciprocating", "health": 45, "rul": 20, "status": "critical",
               "factors": {"vibration": 6.8, "temperature": 89, "pressure": 12.1, "valve_wear": 65}},
    "V-405": {"name": "Valve V-405", "type": "Control Valve", "health": 88, "rul": 200, "status": "good",
               "factors": {"position_error": 0.5, "leakage": 0.1, "actuator_pressure": 5.2}},
}

@router.get("/predict/{asset_id}")
async def predict_maintenance(asset_id: str):
    asset = ASSETS_DATA.get(asset_id.upper())
    if not asset:
        return {"error": f"Asset {asset_id} not found"}
    
    recommendations = []
    if asset["health"] < 50:
        recommendations.append({"priority": "CRITICAL", "action": "Immediate inspection and overhaul required", "timeframe": "Within 48 hours"})
    elif asset["health"] < 70:
        recommendations.append({"priority": "HIGH", "action": "Schedule maintenance within 2 weeks", "timeframe": "Within 14 days"})
    else:
        recommendations.append({"priority": "ROUTINE", "action": "Continue monitoring, schedule next PM", "timeframe": "As per schedule"})
    
    return {
        "asset_id": asset_id,
        "asset_name": asset["name"],
        "health_score": asset["health"],
        "remaining_useful_life_days": asset["rul"],
        "status": asset["status"],
        "sensor_readings": asset["factors"],
        "recommendations": recommendations,
        "predicted_failure_probability": round((100 - asset["health"]) / 100, 2),
        "confidence": 0.87
    }

@router.get("/all")
async def get_all_predictions():
    return [
        {
            "asset_id": aid,
            "asset_name": data["name"],
            "health_score": data["health"],
            "rul_days": data["rul"],
            "status": data["status"]
        }
        for aid, data in ASSETS_DATA.items()
    ]
