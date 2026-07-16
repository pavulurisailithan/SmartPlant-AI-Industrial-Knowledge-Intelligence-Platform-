from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from services.rag_service import get_rag_answer

router = APIRouter()

class ChatRequest(BaseModel):
    query: str
    language: str = "en"
    session_id: Optional[str] = None

@router.post("")
async def chat(request: ChatRequest):
    result = get_rag_answer(request.query, request.language)
    return result
