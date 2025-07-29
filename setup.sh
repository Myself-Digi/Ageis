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
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Setup Backend
echo ""
echo "🔧 Setting up Backend..."
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

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env with your actual values"
fi

cd ..

# Setup Frontend
echo ""
echo "🔧 Setting up Frontend..."
cd frontend

# Install dependencies
echo "Installing Node.js dependencies..."
npm install

# Create .env.local file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "Creating .env.local file..."
    cp .env.example .env.local
    echo "⚠️  Please edit frontend/.env.local with your actual values"
fi

cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Set up your Supabase project at https://supabase.com"
echo "2. Run the SQL commands from the README to create the database tables"
echo "3. Update the environment variables in backend/.env and frontend/.env.local"
echo "4. Start the backend: cd backend && source venv/bin/activate && uvicorn main:app --reload"
echo "5. Start the frontend: cd frontend && npm run dev"
echo ""
echo "For detailed instructions, see the README.md file"#!/bin/bash

echo "🚀 Setting up Aegis - Proactive AI Personal Manager"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8+ first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Setup Backend
echo ""
echo "🔧 Setting up Backend..."
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

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env with your actual values"
fi

cd ..

# Setup Frontend
echo ""
echo "🔧 Setting up Frontend..."
cd frontend

# Install dependencies
echo "Installing Node.js dependencies..."
npm install

# Create .env.local file if it doesn't exist
if [ ! -f .env.local ]; then
    echo "Creating .env.local file..."
    cp .env.example .env.local
    echo "⚠️  Please edit frontend/.env.local with your actual values"
fi

cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Set up your Supabase project at https://supabase.com"
echo "2. Run the SQL commands from the README to create the database tables"
echo "3. Update the environment variables in backend/.env and frontend/.env.local"
echo "4. Start the backend: cd backend && source venv/bin/activate && uvicorn main:app --reload"
echo "5. Start the frontend: cd frontend && npm run dev"
echo ""
echo "For detailed instructions, see the README.md file"