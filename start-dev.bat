@echo off
echo ========================================
echo   SmartPlant AI - Local Dev Setup
echo ========================================
echo.

echo [1/3] Installing Frontend dependencies...
cd frontend
call npm install --legacy-peer-deps
echo Frontend dependencies installed!
cd ..

echo.
echo [2/3] Installing AI Service dependencies...
cd ai-service
pip install fastapi uvicorn python-multipart sentence-transformers pypdf python-docx openpyxl Pillow pydantic pydantic-settings numpy
echo AI Service dependencies installed!
cd ..

echo.
echo [3/3] Starting services...
echo.
echo Starting AI Service on port 8000...
start "SmartPlant AI Service" cmd /k "cd ai-service && python -m uvicorn main:app --reload --port 8000"

timeout /t 3 /nobreak > nul

echo Starting Frontend on port 3000...
start "SmartPlant Frontend" cmd /k "cd frontend && npm start"

echo.
echo ========================================
echo   Services Starting...
echo ========================================
echo   Frontend:   http://localhost:3000
echo   AI Service: http://localhost:8000
echo   API Docs:   http://localhost:8000/docs
echo.
echo   Login: admin / admin123
echo         engineer / eng123
echo ========================================
echo.
echo NOTE: For full features, also start:
echo   - PostgreSQL on port 5432
echo   - MongoDB on port 27017
echo   - Spring Boot backend on port 8080
echo.
echo Or use: docker-compose up --build
echo ========================================
pause
