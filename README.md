# 🏭 SmartPlant AI – Industrial Knowledge Intelligence & Predictive Maintenance Platform

## 🚀 Project Overview

**SmartPlant AI** is a full-stack, AI-powered **Industrial Knowledge Intelligence and Predictive Maintenance Platform** designed to help engineers, operators, and plant managers interact with industrial documents, equipment data, maintenance records, safety information, and operational knowledge using natural language.

The platform combines **Generative AI, Agentic AI, RAG (Retrieval-Augmented Generation), Machine Learning, Knowledge Graphs, Predictive Maintenance, Explainable AI, OCR, Multilingual AI, Voice AI, and Full-Stack Development** into a unified industrial decision-support system.

Instead of manually searching through hundreds of technical documents, maintenance reports, equipment manuals, SOPs, safety records, and failure reports, users can simply ask questions in natural language.

### 🔗 Live Demo

**Live Application:**
https://pavulurisailithan.github.io/SmartPlant-AI-Industrial-Knowledge-Intelligence-Platform-/

**Compliance Module:**
https://pavulurisailithan.github.io/SmartPlant-AI-Industrial-Knowledge-Intelligence-Platform-/#/compliance

---

# 🎯 Problem Statement

Industrial organizations generate huge amounts of information through:

* Equipment manuals
* Maintenance reports
* Sensor data
* SOPs
* Safety documents
* Inspection reports
* Failure records
* Compliance documents
* Engineer experience

This information is often distributed across multiple systems and documents, making it difficult for engineers to quickly find the correct information.

Traditional systems mainly provide data storage and keyword-based search. They do not provide intelligent reasoning, contextual answers, predictive maintenance insights, or connected equipment knowledge.

### Proposed Solution

SmartPlant AI creates an **AI-powered industrial knowledge layer** that connects documents, equipment, maintenance history, sensor data, failures, causes, regulations, and engineering knowledge.

Users can communicate with the system using natural language and receive contextual, source-supported answers and maintenance recommendations.

---

# ⭐ Key Features

## 1. 🤖 AI Industrial Assistant

Users can ask natural-language questions such as:

* Why did Pump P-201 fail?
* What caused the motor overheating?
* What is the SOP for pump startup?
* Show previous failures of Compressor C-301.
* What safety precautions are required for high-pressure systems?
* What maintenance should be performed on Pump P-201?

The AI retrieves relevant information and generates a contextual response.

---

# 2. 🧠 RAG – Retrieval-Augmented Generation

The platform uses a RAG pipeline to answer questions from industrial documents.

### RAG Pipeline

```text
PDF / DOCX / Excel / Image
            ↓
           OCR
            ↓
      Text Extraction
            ↓
        Text Cleaning
            ↓
      Document Chunking
            ↓
   Sentence Transformer
            ↓
       Embeddings
            ↓
      FAISS Vector Store
            ↓
      Semantic Retrieval
            ↓
       Relevant Context
            ↓
            LLM
            ↓
     AI Generated Answer
            ↓
       Source Citations
```

This reduces the dependency on generic AI knowledge by grounding answers in the plant's own information.

---

# 3. 🤖 Agentic AI Architecture

SmartPlant AI can use specialized AI agents for different industrial tasks.

```text
                    SmartPlant AI
                          │
                  AI Orchestrator
                          │
       ┌──────────────────┼──────────────────┐
       ↓                  ↓                  ↓
 Document Agent     Maintenance Agent   Compliance Agent
       │                  │                  │
       ↓                  ↓                  ↓
   RAG Search       Sensor Analysis     Regulation Check
       │                  │                  │
       └──────────────────┼──────────────────┘
                          ↓
                   Final AI Response
```

### Document Agent

* Searches manuals
* Searches SOPs
* Finds maintenance records
* Retrieves technical information

### Maintenance Agent

* Analyzes equipment condition
* Checks maintenance history
* Predicts maintenance requirements
* Identifies potential failure risks

### Compliance Agent

* Checks compliance requirements
* Identifies missing requirements
* Generates compliance reports
* Suggests corrective actions

### Safety Agent

* Identifies potential hazards
* Provides safety information
* Prioritizes risks
* Retrieves relevant safety procedures

---

# 4. 📄 Intelligent Document Processing

Users can upload:

* PDF
* DOCX
* Excel
* Images
* Scanned documents

The system automatically processes the documents.

```text
Document Upload
      ↓
Document Classification
      ↓
OCR / Text Extraction
      ↓
Metadata Extraction
      ↓
Text Chunking
      ↓
Embeddings
      ↓
FAISS
      ↓
Knowledge Graph
```

The system can identify:

* Equipment names
* Component names
* Failure types
* Dates
* Maintenance actions
* Engineers
* Safety requirements

---

# 5. 🔎 Hybrid Search

Instead of depending only on semantic search, the system can combine:

```text
Keyword Search
      +
Semantic Search
      +
Knowledge Graph Search
      ↓
Hybrid Retrieval
      ↓
Reranking
      ↓
LLM
```

This is useful for technical identifiers such as:

* P-201
* C-301
* API standards
* OISD references
* Equipment codes
* Component names

---

# 6. 🕸️ Industrial Knowledge Graph

Neo4j is used to represent relationships between industrial entities.

### Example

```text
Equipment
    ↓
Component
    ↓
Sensor
    ↓
Observation
    ↓
Failure
    ↓
Cause
    ↓
Maintenance Action
    ↓
Engineer
    ↓
Document
    ↓
Safety Regulation
```

Example:

```text
Pump P-201
     ↓
Bearing
     ↓
High Vibration
     ↓
Bearing Failure
     ↓
Insufficient Lubrication
     ↓
Maintenance Required
```

The knowledge graph allows users to visually explore relationships between equipment, components, failures, causes, documents, and maintenance actions.

---

# 7. 🔧 Predictive Maintenance

SmartPlant AI includes a predictive maintenance module that analyzes equipment information and sensor data.

### Example Sensor Inputs

```text
Temperature
Vibration
Pressure
RPM
Current
Operating Hours
Previous Failures
```

### Output

```text
Equipment: Pump P-201

Health Score: 72/100

Risk Level: HIGH

Failure Probability: 83%

Recommended Action:
Inspect bearing and lubrication system.
```

The system helps move maintenance from:

```text
Failure → Repair
```

to:

```text
Monitor → Predict → Prevent
```

---

# 8. 📊 Machine Health Monitoring

Each industrial asset can have a health score.

Example:

```text
Motor M-101

Temperature: 78°C
Vibration:   6.4 mm/s
Pressure:    8.2 bar
Current:     17.2 A

Health Score: 72/100

Condition: WARNING
```

### Health Levels

```text
90–100 → Healthy
70–89  → Warning
50–69  → Attention Required
0–49   → Critical
```

These thresholds can be configured according to the target equipment and engineering requirements.

---

# 9. 📈 Failure Prediction

Machine-learning models can predict the probability of equipment failure.

Possible models include:

* Random Forest
* XGBoost
* Logistic Regression
* Gradient Boosting
* LSTM for time-series data

### Example

```text
Equipment: Compressor C-301

Failure Probability: 83%

Risk Level: HIGH

Important Factors:
✓ Increased vibration
✓ Increased temperature
✓ Abnormal pressure
✓ Previous maintenance history
```

---

# 10. ⏳ Remaining Useful Life – RUL

The platform can estimate the **Remaining Useful Life** of industrial equipment.

Example:

```text
Compressor C-301

Estimated RUL:
147 Hours

Risk:
MEDIUM

Recommendation:
Schedule preventive maintenance.
```

RUL models can be evaluated using:

* MAE
* RMSE
* R²

---

# 11. 🔍 Explainable AI

SmartPlant AI should not only provide a prediction but also explain the major factors contributing to the prediction.

Example:

```text
Why is the equipment risk HIGH?

High vibration          +35%
Increased temperature   +25%
Abnormal pressure       +15%
Previous failures       +8%
```

SHAP or similar explainability techniques can be used for ML models.

This improves transparency and makes predictions easier for engineers to understand.

---

# 12. 🏭 Digital Twin Concept

SmartPlant AI can maintain a digital representation of plant assets.

```text
Plant
 │
 ├── Pump P-201
 │    ├── Motor
 │    ├── Bearing
 │    ├── Temperature Sensor
 │    └── Vibration Sensor
 │
 ├── Compressor C-301
 │    ├── Motor
 │    ├── Pressure Sensor
 │    └── Temperature Sensor
 │
 └── Boiler B-101
      ├── Pressure Sensor
      └── Temperature Sensor
```

Selecting an asset can display:

* Current health
* Sensor readings
* Maintenance history
* Previous failures
* Predicted failure
* Related documents
* Knowledge graph relationships

---

# 13. 📋 AI Compliance Checker

The platform can analyze industrial compliance requirements.

### Process

```text
Safety / Compliance Document
          ↓
Requirement Extraction
          ↓
Plant Data Comparison
          ↓
Compliance Analysis
          ↓
Compliance Report
```

### Example

| Requirement          | Status    | Risk   |
| -------------------- | --------- | ------ |
| Pressure inspection  | Compliant | Low    |
| Safety documentation | Missing   | Medium |
| Emergency procedure  | Missing   | High   |

The system can generate recommended corrective actions.

---

# 14. 🌐 Multilingual AI

SmartPlant AI supports:

* English
* Hindi
* Telugu

Users can interact with the system using their preferred language.

Example:

```text
User:
పంప్ P-201 ఎందుకు పనిచేయడం ఆపింది?

AI:
Maintenance records ప్రకారం Pump P-201
bearing failure కారణంగా పనిచేయడం ఆపినట్లు
సమాచారం ఉంది.
```

---

# 15. 🎤 Voice-Based Industrial Assistant

The platform supports voice interaction using browser speech capabilities.

```text
Engineer speaks
       ↓
Speech-to-Text
       ↓
AI Agent
       ↓
RAG + Knowledge Graph
       ↓
AI Answer
       ↓
Text / Voice Response
```

Example:

> “Show the maintenance status of Compressor C-301.”

The system retrieves and presents the relevant information.

---

# 16. 🛠️ AI Maintenance Recommendations

After detecting a potential problem, the system can generate an action plan.

Example:

```text
Equipment: Pump P-201
Risk: HIGH

Recommended Actions:

1. Inspect bearing
2. Check lubrication
3. Measure vibration
4. Inspect motor coupling
5. Schedule maintenance

Priority: HIGH
```

These recommendations are intended as AI decision-support suggestions and should be validated by qualified plant personnel before operational use.

---

# 17. 📊 Real-Time Industrial Dashboard

The dashboard provides a centralized view of plant status.

```text
SMARTPLANT AI

Assets:       124
Healthy:       98
Warning:       19
Critical:       7

Equipment Health
────────────────────────

Pump P-201          HIGH
Compressor C-301    MEDIUM
Motor M-101         LOW

Maintenance Predictions
────────────────────────

P-201 → Immediate Inspection
C-301 → Schedule Maintenance
M-101 → Normal Monitoring
```

---

# 18. 👨‍💼 Role-Based Access Control

### Admin

* User management
* Engineer management
* Document management
* Asset management
* System monitoring
* Audit logs

### Engineer

* AI Assistant
* Equipment monitoring
* Maintenance history
* Documents
* Predictions
* Knowledge graph
* Compliance

---

# 19. 🔐 Security

Security features include:

* JWT authentication
* BCrypt password hashing
* Role-based authorization
* API authorization
* CORS configuration
* Document access control
* Audit logging
* 24-hour token expiry

### Audit Log

```text
User
Action
Timestamp
Asset
Document
AI Query
```

---

# 20. 📈 AI and ML Evaluation

For an academic and research-oriented implementation, the system should evaluate its models rather than claiming 100% accuracy.

### RAG Evaluation

* Retrieval Precision
* Retrieval Recall
* Context Relevance
* Answer Relevance
* Faithfulness

### Classification Evaluation

* Accuracy
* Precision
* Recall
* F1-Score
* ROC-AUC

### Regression / RUL Evaluation

* MAE
* RMSE
* R²

These results can be included in the final project report and research paper.

---

# 🏗️ System Architecture

```text
                         USERS
                           │
                           ▼
                  React Web Application
                           │
                      API Gateway
                           │
                    Spring Boot API
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
          Auth          Asset API    Document API
             │             │             │
             └─────────────┼─────────────┘
                           │
                     AI Orchestrator
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
   RAG Agent        Maintenance Agent   Compliance Agent
        │                  │                  │
        ▼                  ▼                  ▼
 Hybrid Retrieval      ML Models       Compliance Engine
        │                  │                  │
   ┌────┴────┐        ┌────┴────┐             │
   │         │        │         │             │
 FAISS    Neo4j    Prediction   RUL            │
   │         │        │         │             │
   └────┬────┘        └────┬────┘             │
        │                  │                  │
        └──────────────────┼──────────────────┘
                           ▼
                          LLM
                           │
                           ▼
                 Explainable AI Response
                           │
                           ▼
             Dashboard + Reports + Voice
```

---

# 🏗️ Project Structure

```text
SmartPlant AI/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   └── services/
│   └── Dockerfile
│
├── backend/
│   ├── src/main/java/com/smartplant/
│   │   ├── controller/
│   │   ├── model/
│   │   ├── repository/
│   │   ├── security/
│   │   └── config/
│   └── Dockerfile
│
├── ai-service/
│   ├── routers/
│   ├── services/
│   │   ├── rag/
│   │   ├── ocr/
│   │   ├── embeddings/
│   │   ├── predictive_maintenance/
│   │   └── knowledge_graph/
│   ├── main.py
│   └── Dockerfile
│
├── sample-data/
│   ├── manuals/
│   ├── maintenance/
│   ├── safety/
│   └── compliance/
│
├── docker-compose.yml
├── .env.example
└── README.md
```

---

# 🔧 Technology Stack

| Layer               | Technology                  |
| ------------------- | --------------------------- |
| Frontend            | React.js 18                 |
| UI                  | Tailwind CSS                |
| Charts              | Chart.js                    |
| Graph Visualization | react-force-graph           |
| Backend             | Java 17                     |
| Framework           | Spring Boot 3.2             |
| Security            | Spring Security + JWT       |
| AI Service          | Python 3.11                 |
| API                 | FastAPI                     |
| RAG                 | LangChain                   |
| Embeddings          | Sentence Transformers       |
| Vector Store        | FAISS                       |
| LLM                 | OpenAI GPT / compatible LLM |
| OCR                 | Tesseract                   |
| PDF Processing      | PyPDF                       |
| DOCX Processing     | python-docx                 |
| Relational DB       | PostgreSQL 15               |
| Document DB         | MongoDB 6                   |
| Graph DB            | Neo4j 5                     |
| ML                  | Scikit-learn / XGBoost      |
| Explainability      | SHAP                        |
| Containerization    | Docker                      |
| Orchestration       | Docker Compose              |

---

# 🚀 Quick Start

## Prerequisites

Install:

* Docker Desktop
* Node.js 18+
* Java 17+
* Python 3.11+

## Run with Docker

```bash
git clone https://github.com/pavulurisailithan/SmartPlant-AI-Industrial-Knowledge-Intelligence-Platform-.git

cd SmartPlant-AI-Industrial-Knowledge-Intelligence-Platform-

docker-compose up --build
```

### Local Services

```text
Frontend:   http://localhost:3000
Backend:    http://localhost:8080
AI Service: http://localhost:8000
Neo4j:      http://localhost:7474
```

---

# 🔑 Demo Credentials

| Role     | Username | Password |
| -------- | -------- | -------- |
| Admin    | admin    | admin123 |
| Engineer | engineer | eng123   |

For a production deployment, replace all demo credentials with secure credentials and environment-based secrets.

---

# 🔐 OpenAI Configuration

Create a `.env` file:

```bash
OPENAI_API_KEY=your-key-here
```

Then restart:

```bash
docker-compose up --build
```

The system can also be configured with a demo/local fallback to minimize API costs during development.

---

# 📡 API Documentation

## Authentication

```http
POST /api/auth/login
```

Request:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Response:

```json
{
  "token": "...",
  "user": {}
}
```

---

## AI Chat

```http
POST /api/chat
```

Request:

```json
{
  "query": "Why did Pump P-201 fail?",
  "language": "en"
}
```

Response:

```json
{
  "answer": "...",
  "sources": []
}
```

---

## Document Upload

```http
POST /api/documents/upload
```

Supports:

```text
PDF
DOCX
Excel
Images
```

---

## AI Service

```http
POST http://localhost:8000/chat

GET http://localhost:8000/maintenance/predict/P-201

GET http://localhost:8000/compliance/check/oisd

GET http://localhost:8000/graph/data
```

---

# 💡 Sample Questions

Try asking:

```text
Why did Pump P-201 fail last month?

Show all motor failures in the last two years.

What is the SOP for pump startup?

Check OISD compliance status.

Predict maintenance for Compressor C-301.

What are the safety precautions for high-pressure systems?

Show the maintenance history of Pump P-201.

What are the possible causes of abnormal vibration?

Which equipment has the highest failure risk?

What corrective action should be taken for Pump P-201?
```

---

# 🎯 Main Objectives

1. Build an AI-powered industrial knowledge platform.
2. Enable natural-language interaction with industrial information.
3. Implement RAG for document-based question answering.
4. Build an industrial knowledge graph using Neo4j.
5. Implement predictive maintenance using machine learning.
6. Estimate Remaining Useful Life of equipment.
7. Provide explainable AI predictions.
8. Implement AI-powered compliance analysis.
9. Support multilingual and voice interaction.
10. Provide an integrated industrial monitoring dashboard.
11. Improve accessibility of engineering knowledge.
12. Support data-driven maintenance decision-making.

---

# 🌟 Major Innovations

The proposed system integrates multiple technologies into a single industrial intelligence platform:

```text
Generative AI
      +
Agentic AI
      +
RAG
      +
Hybrid Search
      +
Knowledge Graph
      +
Predictive Maintenance
      +
RUL Prediction
      +
Explainable AI
      +
OCR
      +
Multilingual AI
      +
Voice AI
      +
Industrial Dashboard
```

---

# 📌 Expected Benefits

### For Engineers

* Faster access to technical information
* Faster troubleshooting
* Maintenance history analysis
* Equipment failure insights
* AI-assisted decision support

### For Operators

* Natural-language interaction
* Voice-based assistance
* Safety information
* Equipment health monitoring

### For Plant Management

* Predictive maintenance insights
* Equipment risk monitoring
* Compliance visibility
* Maintenance planning
* Centralized industrial knowledge

---

# 🔬 Research Potential

SmartPlant AI can be extended into an academic research project in:

* Retrieval-Augmented Generation
* Agentic AI
* Industrial NLP
* Knowledge Graphs
* Predictive Maintenance
* Remaining Useful Life Prediction
* Explainable AI
* Industrial Digital Twins
* Multimodal Industrial AI
* Industrial Knowledge Management

---

# 📄 Suggested IEEE Research Paper Title

**“SmartPlant AI: An Agentic RAG-Based Industrial Knowledge Intelligence and Predictive Maintenance Platform Using Knowledge Graphs”**

### Alternative Title

**“An Explainable AI-Driven Industrial Knowledge Intelligence Framework for Predictive Maintenance and Decision Support”**

---

# 🏆 Project Summary

SmartPlant AI is not just a chatbot or document search application.

It is designed as an **AI-powered industrial decision-support platform** that connects:

```text
Industrial Documents
        +
Equipment Data
        +
Maintenance Records
        +
Sensor Data
        +
Knowledge Graph
        +
Machine Learning
        +
Generative AI
        +
Predictive Analytics
        ↓
Industrial Intelligence
```

The platform helps transform raw industrial information into **searchable knowledge, predictive insights, explainable recommendations, and actionable maintenance intelligence**.

---

# 🌐 Live Project

### 🔵 SmartPlant AI – Live Demo

https://pavulurisailithan.github.io/SmartPlant-AI-Industrial-Knowledge-Intelligence-Platform-/

### 🔵 Compliance Dashboard

https://pavulurisailithan.github.io/SmartPlant-AI-Industrial-Knowledge-Intelligence-Platform-/#/compliance

### 🔵 GitHub Repository

https://github.com/pavulurisailithan/SmartPlant-AI-Industrial-Knowledge-Intelligence-Platform-

---

# 👨‍💻 Project Category

**Artificial Intelligence | Machine Learning | Generative AI | RAG | Agentic AI | NLP | Predictive Maintenance | Knowledge Graph | Full-Stack Development | Industrial AI**

---

# ⭐ Final One-Line Description

**SmartPlant AI is an AI-powered industrial knowledge intelligence platform that combines Agentic RAG, Knowledge Graphs, Predictive Maintenance, Explainable AI, and Generative AI to help engineers intelligently search, analyze, predict, and manage industrial equipment and maintenance knowledge.**
