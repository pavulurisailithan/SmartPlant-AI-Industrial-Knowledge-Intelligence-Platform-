from fastapi import APIRouter

router = APIRouter()

GRAPH_DATA = {
    "nodes": [
        {"id": "unit3", "label": "Unit 3", "type": "unit"},
        {"id": "pump201", "label": "Pump P-201", "type": "equipment"},
        {"id": "motor102", "label": "Motor M-102", "type": "equipment"},
        {"id": "comp301", "label": "Compressor C-301", "type": "equipment"},
        {"id": "bearing_fail", "label": "Bearing Failure", "type": "failure"},
        {"id": "vibration", "label": "High Vibration", "type": "symptom"},
        {"id": "maint_001", "label": "MR-2024-089", "type": "document"},
        {"id": "sop_001", "label": "SOP-PUMP-001", "type": "document"},
        {"id": "eng_kumar", "label": "R. Kumar", "type": "engineer"},
        {"id": "lubrication", "label": "Lubrication Issue", "type": "cause"},
    ],
    "relationships": [
        {"from": "unit3", "to": "pump201", "type": "CONTAINS"},
        {"from": "unit3", "to": "motor102", "type": "CONTAINS"},
        {"from": "unit3", "to": "comp301", "type": "CONTAINS"},
        {"from": "pump201", "to": "bearing_fail", "type": "HAD_FAILURE"},
        {"from": "bearing_fail", "to": "lubrication", "type": "CAUSED_BY"},
        {"from": "vibration", "to": "bearing_fail", "type": "INDICATES"},
        {"from": "pump201", "to": "vibration", "type": "SHOWS_SYMPTOM"},
        {"from": "maint_001", "to": "pump201", "type": "DOCUMENTS"},
        {"from": "sop_001", "to": "pump201", "type": "APPLIES_TO"},
        {"from": "eng_kumar", "to": "maint_001", "type": "AUTHORED"},
    ]
}

@router.get("/data")
async def get_graph():
    return GRAPH_DATA

@router.get("/asset/{asset_id}")
async def get_asset_graph(asset_id: str):
    asset_map = {"P-201": "pump201", "M-102": "motor102", "C-301": "comp301"}
    node_id = asset_map.get(asset_id.upper())
    if not node_id:
        return {"error": "Asset not found"}
    
    related_nodes = {node_id}
    related_rels = []
    for rel in GRAPH_DATA["relationships"]:
        if rel["from"] == node_id or rel["to"] == node_id:
            related_rels.append(rel)
            related_nodes.add(rel["from"])
            related_nodes.add(rel["to"])
    
    nodes = [n for n in GRAPH_DATA["nodes"] if n["id"] in related_nodes]
    return {"nodes": nodes, "relationships": related_rels}
