#!/bin/bash
echo "=========================================="
echo "  AURA AI - ENVIRONMENT SETUP (LINUX/MAC)"
echo "=========================================="
echo ""
echo "[1/3] Creating Conda environment 'aura-chatbot'..."
conda env create -f environment.yml

echo ""
echo "[2/3] Activating environment..."
source activate aura-chatbot

echo ""
echo "[3/3] Setting up backend directories..."
mkdir -p backend
if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
fi

echo ""
echo "Setup complete! To start the app:"
echo "1. Activate env: conda activate aura-chatbot"
echo "2. Backend: cd backend && python app.py"
echo "3. Frontend: cd frontend && npm start"
echo ""
