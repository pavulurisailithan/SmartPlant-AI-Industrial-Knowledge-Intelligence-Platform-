# SmartPlant AI – Industrial Knowledge Intelligence Platform

## 🏭 Overview

SmartPlant AI is a full-stack AI-powered Industrial Knowledge Intelligence Platform that enables engineers and operators to interact with industrial documents, maintenance records, and equipment data using natural language.

## 🚀 Quick Start

### Prerequisites
- Docker Desktop installed and running
- Node.js 18+ (for local frontend development)
- Java 17+ (for local backend development)
- Python 3.11+ (for local AI service development)

### Run with Docker (Recommended)

```bash
# Clone and navigate to project
cd "SmartPlant AI – Industrial Knowledge Intelligence Platform"

# Start all services
docker-compose up --build

# Access the application
# Frontend:  http://localhost:3000
# Backend:   http://localhost:8080
# AI Service: http://localhost:8000
# Neo4j:     http://localhost:7474
# # Live Link : https://pavulurisailithan.github.io/SmartPlant-AI-Industrial-Knowledge-Intelligence-Platform-/
```

### Demo Credentials
| Role | Username | Password |
|------|----------|----------|
| Admin | `admin` | `admin123` |
| Engineer | `engineer` | `eng123` |

### Optional: Add OpenAI API Key
```bash
# Create .env file
echo "OPENAI_API_KEY=your-key-here" > .env

# Restart with OpenAI enabled
docker-compose up --build
```

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Users (Browser)                   │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│           React.js Frontend (Port 3000)              │
│    Dashboard | Chat | Documents | Knowledge Graph    │
│    Analytics | Maintenance | Compliance              │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│         Spring Boot Backend API (Port 8080)          │
│    JWT Auth | Asset API | Document API | Chat Proxy  │
└──────┬──────────────────────────────────┬───────────┘
       │                                  │
┌──────▼──────┐                  ┌────────▼────────────┐
│  PostgreSQL  │                  │  FastAPI AI Service  │
│  (Users,     │                  │  (Port 8000)         │
│   Assets)    │                  │  RAG | OCR | LLM     │
└─────────────┘                  │  Embeddings | FAISS  │
                                  └────────┬────────────┘
┌─────────────┐                           │
│   MongoDB   │◄──────────────────────────┤
│  (Documents)│                           │
└─────────────┘                  ┌────────▼────────────┐
                                  │       Neo4j          │
┌─────────────┐                  │  (Knowledge Graph)   │
│    FAISS    │◄──────────────────└─────────────────────┘
│ Vector Store│
└─────────────┘
```

## 📁 Project Structure

```
SmartPlant AI/
├── frontend/               # React.js + Tailwind CSS
│   ├── src/
│   │   ├── pages/          # Dashboard, Chat, Documents, etc.
│   │   ├── components/     # Layout, shared components
│   │   ├── context/        # Auth context
│   │   └── services/       # API clients
│   └── Dockerfile
├── backend/                # Java Spring Boot
│   ├── src/main/java/com/smartplant/
│   │   ├── controller/     # REST controllers
│   │   ├── model/          # JPA entities
│   │   ├── repository/     # Data repositories
│   │   ├── security/       # JWT auth
│   │   └── config/         # Spring config
│   └── Dockerfile
├── ai-service/             # Python FastAPI
│   ├── routers/            # API endpoints
│   ├── services/           # RAG, OCR, Vector store
│   ├── main.py
│   └── Dockerfile
├── sample-data/            # Demo industrial documents
├── docker-compose.yml
└── README.md
```

## 🤖 AI Features

### RAG Pipeline
1. Upload document (PDF/DOCX/Excel/Image)
2. OCR extracts text
3. Text chunked and embedded (Sentence Transformers)
4. Stored in FAISS vector database
5. User query → semantic search → relevant chunks retrieved
6. LLM generates answer with source citations

### Knowledge Graph (Neo4j)
- Equipment → Component → Failure → Cause relationships
- Engineer → Document → Asset connections
- Visual graph exploration

### Predictive Maintenance
- Health score calculation from sensor data
- Remaining Useful Life (RUL) prediction
- Maintenance schedule optimization

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js 18, Tailwind CSS, Chart.js, react-force-graph |
| Backend | Java 17, Spring Boot 3.2, Spring Security, JWT |
| AI Service | Python 3.11, FastAPI, LangChain, Sentence Transformers |
| Databases | PostgreSQL 15, MongoDB 6, Neo4j 5 |
| Vector DB | FAISS (in-memory, upgradeable to Pinecone/Weaviate) |
| OCR | Tesseract, PyPDF, python-docx |
| LLM | OpenAI GPT-3.5/4 (with demo fallback) |
| Container | Docker, Docker Compose |

## 📊 API Documentation

### Authentication
```
POST /api/auth/login
Body: { "username": "admin", "password": "admin123" }
Response: { "token": "...", "user": {...} }
```

### Chat (RAG)
```
POST /api/chat
Headers: Authorization: Bearer <token>
Body: { "query": "Why did Pump P-201 fail?", "language": "en" }
Response: { "answer": "...", "sources": [...] }
```

### Documents
```
POST /api/documents/upload
Headers: Authorization: Bearer <token>
Body: multipart/form-data with file
```

### AI Service Direct
```
POST http://localhost:8000/chat
Body: { "query": "...", "language": "en" }

GET  http://localhost:8000/maintenance/predict/P-201
GET  http://localhost:8000/compliance/check/oisd
GET  http://localhost:8000/graph/data
live link: https://pavulurisailithan.github.io/SmartPlant-AI-Industrial-Knowledge-Intelligence-Platform-/#/compliance
```

## 🌐 Multi-language Support
- English (en)
- Hindi (hi) - हिंदी
- Telugu (te) - తెలుగు

## 🎤 Voice Input
- Click microphone icon in chat
- Supports browser Web Speech API
- Language-aware (Hindi/Telugu/English)

## 🔒 Security
- JWT authentication with 24-hour expiry
- BCrypt password hashing
- CORS configured for development
- Role-based access (ADMIN, ENGINEER)

## 📈 Sample Queries to Try
- "Why did Pump P-201 fail last month?"
- "Show all motor failures in the last 2 years"
- "What is the SOP for pump startup?"
- "Check OISD compliance status"
- "Predict maintenance for Compressor C-301"
- "What are safety precautions for high pressure systems?"
