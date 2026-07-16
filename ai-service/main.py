from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import chat, documents, maintenance, compliance, graph
import uvicorn

app = FastAPI(title="SmartPlant AI Service", version="1.0.0", description="Industrial Knowledge Intelligence AI Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/chat", tags=["Chat"])
app.include_router(documents.router, prefix="/documents", tags=["Documents"])
app.include_router(maintenance.router, prefix="/maintenance", tags=["Maintenance"])
app.include_router(compliance.router, prefix="/compliance", tags=["Compliance"])
app.include_router(graph.router, prefix="/graph", tags=["Knowledge Graph"])

@app.get("/health")
def health(): return {"status": "healthy", "service": "SmartPlant AI"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
