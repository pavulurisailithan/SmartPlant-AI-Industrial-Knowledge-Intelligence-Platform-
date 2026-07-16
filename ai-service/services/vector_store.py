"""
Lightweight vector store using numpy only (no FAISS/sentence-transformers).
Uses TF-IDF style keyword matching for demo mode.
"""
import re
from typing import List, Dict, Any

_documents: List[Dict] = []

def add_document(doc_id: str, text: str, metadata: dict):
    chunks = _chunk_text(text)
    for i, chunk in enumerate(chunks):
        _documents.append({
            "id": f"{doc_id}_{i}",
            "text": chunk,
            "metadata": metadata,
            "keywords": set(re.findall(r'\b\w{4,}\b', chunk.lower()))
        })

def search(query: str, top_k: int = 5) -> List[Dict]:
    if not _documents:
        return []
    query_words = set(re.findall(r'\b\w{4,}\b', query.lower()))
    scored = []
    for doc in _documents:
        score = len(query_words & doc["keywords"]) / max(len(query_words), 1)
        if score > 0:
            scored.append({"score": score, "text": doc["text"], "metadata": doc["metadata"]})
    scored.sort(key=lambda x: x["score"], reverse=True)
    return scored[:top_k]

def _chunk_text(text: str, chunk_size: int = 400, overlap: int = 50) -> List[str]:
    words = text.split()
    if not words:
        return [text[:500]]
    chunks = []
    for i in range(0, len(words), chunk_size - overlap):
        chunk = " ".join(words[i:i + chunk_size])
        if chunk.strip():
            chunks.append(chunk)
    return chunks or [text[:500]]
