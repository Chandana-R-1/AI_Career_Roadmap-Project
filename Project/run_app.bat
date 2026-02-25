@echo off
echo Starting AI Career Roadmap Generator...

:: Start Backend
start cmd /k "cd backend && python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload"

:: Start Frontend
start cmd /k "cd frontend && npm run dev"

echo Servers are starting in separate windows.
echo Frontend: http://localhost:3000
echo Backend:  http://127.0.0.1:8000
pause
