# Aegis - Proactive AI Personal Manager

Aegis is a proactive AI personal manager that acts as a digital chief of staff for ambitious professionals. It anticipates needs, automates complex workflows, and actively architects the user's time to align with their long-term goals.

## 🎯 Core Philosophy

- **Proactive vs. Reactive**: Aegis analyzes user data to make intelligent suggestions and take action on the user's behalf
- **Goal-Oriented**: Every feature helps users make tangible progress toward their stated goals
- **Calm Technology**: Clean, minimalist UI/UX that reduces anxiety, not creates it

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Backend**: Python with FastAPI
- **Database**: Supabase (PostgreSQL, Auth, Storage)
- **AI**: OpenAI API (GPT-4, GPT-3.5-Turbo)

### Project Structure
```
aegis/
├── frontend/          # Next.js application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Next.js pages
│   │   ├── lib/           # Utility functions and configurations
│   │   ├── types/         # TypeScript type definitions
│   │   └── styles/        # Global styles
│   └── public/            # Static assets
├── backend/           # FastAPI application
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── core/          # Core configurations
│   │   ├── models/        # Database models
│   │   ├── schemas/       # Pydantic schemas
│   │   └── services/      # Business logic
│   └── tests/             # Test files
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- Supabase account
- OpenAI API key

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Environment Variables
Create `.env.local` in the frontend directory and `.env` in the backend directory with:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`

## 📋 MVP Features

1. **Secure User Authentication** - Email/password and Google OAuth
2. **Unified Dashboard** - Today's schedule, priority tasks, quick-add
3. **Calendar Integration** - Google Calendar read-only integration
4. **Smart Task Management** - NLP-powered task creation
5. **Goal Setting** - High-level goal definition interface

## 🔮 Future Roadmap

- Proactive task suggestions
- Email integration and smart responses
- Advanced calendar optimization
- Goal progress tracking
- AI-powered workflow automation