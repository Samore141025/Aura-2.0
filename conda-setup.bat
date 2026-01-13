@echo off
echo ==========================================
echo   AURA AI - ENVIRONMENT SETUP (WINDOWS)
echo ==========================================
echo.
echo [1/3] Creating Conda environment 'aura-chatbot'...
call conda env create -f environment.yml
if %errorlevel% neq 0 (
    echo Error creating environment. Make sure Conda is installed.
    pause
    exit /b %errorlevel%
)

echo.
echo [2/3] Activating environment...
call conda activate aura-chatbot

echo.
echo [3/3] Setting up backend directories...
if not exist backend mkdir backend
if not exist backend\.env (
    copy backend\.env.example backend\.env
)

echo.
echo Setup complete! To start the app:
echo 1. Activate env: conda activate aura-chatbot
echo 2. Backend: cd backend ^& python app.py
echo 3. Frontend: cd frontend ^& npm start
echo.
pause
