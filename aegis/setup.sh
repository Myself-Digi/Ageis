#!/bin/bash

echo "🚀 Setting up Aegis - Proactive AI Personal Manager"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.9+ first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Setup Frontend
echo ""
echo "📦 Setting up Frontend..."
cd frontend

# Install dependencies
echo "Installing Node.js dependencies..."
npm install

# Create environment file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "Creating .env.local file..."
    cp .env.local.example .env.local
    echo "⚠️  Please update .env.local with your Supabase credentials"
fi

cd ..

# Setup Backend
echo ""
echo "🐍 Setting up Backend..."
cd backend

# Create virtual environment
echo "Creating Python virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Create environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please update .env with your API keys and credentials"
fi

cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update frontend/.env.local with your Supabase credentials"
echo "2. Update backend/.env with your API keys"
echo "3. Set up your Supabase database tables"
echo "4. Run 'cd frontend && npm run dev' to start the frontend"
echo "5. Run 'cd backend && source venv/bin/activate && uvicorn app.main:app --reload' to start the backend"
echo ""
echo "📚 For more information, check the README.md file"