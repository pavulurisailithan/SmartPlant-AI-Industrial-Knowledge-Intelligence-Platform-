from fastapi import APIRouter, UploadFile, File, Form
from typing import Optional
from services.ocr_service import extract_text
from services.vector_store import add_document
import uuid

router = APIRouter()

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    doc_id: Optional[str] = Form(None)
):
    content = await file.read()
    text = extract_text(content, file.filename)
    
    document_id = doc_id or str(uuid.uuid4())
    metadata = {
        "filename": file.filename,
        "doc_id": document_id,
        "file_type": file.content_type,
        "page": 1
    }
    
    add_document(document_id, text, metadata)
    
    return {
        "doc_id": document_id,
        "filename": file.filename,
        "status": "indexed",
        "text_length": len(text),
        "chunks": max(1, len(text.split()) // 450)
    }

@router.get("/search")
async def search_documents(q: str, top_k: int = 5):
    from services.vector_store import search
    results = search(q, top_k)
    return {"query": q, "results": results}
