# Aegis - Proactive AI Personal Manager

Aegis is a proactive AI personal manager designed to act as a digital chief of staff for ambitious professionals. It goes beyond traditional task management by anticipating needs, automating complex workflows, and actively architecting time to align with long-term goals.

## 🚀 Features

### MVP Features
- **Secure User Authentication**: Email/password and Google OAuth login using Supabase Auth
- **Unified Dashboard**: Single-view dashboard showing today's schedule, priority tasks, and quick-add functionality
- **Smart Task Management**: CRUD operations for tasks with natural language processing capabilities
- **Goal Setting**: Interface for defining and tracking high-level goals
- **Calendar Integration**: Read-only integration with Google Calendar (coming soon)

### Core Philosophy
- **Proactive vs. Reactive**: Moves beyond command-based interfaces to anticipate needs
- **Goal-Oriented**: Every feature helps users make tangible progress toward their goals
- **Calm Technology**: Clean, minimalist UI that reduces anxiety, not creates it

## 🛠 Tech Stack

### Frontend
- **Next.js 14** with TypeScript
- **Tailwind CSS** for styling
- **React Hook Form** with Zod validation
- **Supabase Auth** for authentication
- **Framer Motion** for animations
- **React Hot Toast** for notifications

### Backend
- **FastAPI** with Python
- **Supabase** for database and authentication
- **OpenAI API** for AI capabilities
- **Google Calendar API** for calendar integration
- **Pydantic** for data validation

### Database
- **Supabase** (PostgreSQL) with real-time capabilities

## 📁 Project Structure

```
aegis/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # Next.js app directory
│   │   │   ├── dashboard/   # Dashboard page
│   │   │   ├── login/       # Login page
│   │   │   ├── signup/      # Signup page
│   │   │   └── globals.css  # Global styles
│   │   ├── components/      # Reusable components
│   │   ├── lib/            # Utility functions and API clients
│   │   └── types/          # TypeScript type definitions
│   ├── package.json
│   └── tailwind.config.js
├── backend/                 # FastAPI backend application
│   ├── app/
│   │   ├── api/            # API routes
│   │   ├── core/           # Configuration and core utilities
│   │   ├── models/         # Pydantic models
│   │   └── services/       # Business logic
│   ├── main.py             # FastAPI application entry point
│   └── requirements.txt
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- Supabase account
- OpenAI API key (optional for MVP)

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd aegis/backend
   ```

2. **Create virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

5. **Run the backend**:
   ```bash
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

The API will be available at `http://localhost:8000` with documentation at `http://localhost:8000/docs`.

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd aegis/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

4. **Run the frontend**:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

### Supabase Setup

1. **Create a Supabase project** at [supabase.com](https://supabase.com)

2. **Set up the database tables**:

   ```sql
   -- Users table (handled by Supabase Auth)
   -- No additional setup needed for users

   -- Tasks table
   CREATE TABLE tasks (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     title TEXT NOT NULL,
     description TEXT,
     priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
     status TEXT DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'done', 'cancelled')),
     due_date TIMESTAMP WITH TIME ZONE,
     estimated_duration INTEGER, -- in minutes
     tags TEXT[] DEFAULT '{}',
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     completed_at TIMESTAMP WITH TIME ZONE
   );

   -- Goals table
   CREATE TABLE goals (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
     title TEXT NOT NULL,
     description TEXT,
     priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
     status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'cancelled')),
     target_date TIMESTAMP WITH TIME ZONE,
     category TEXT,
     milestones TEXT[] DEFAULT '{}',
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     completed_at TIMESTAMP WITH TIME ZONE
   );

   -- Enable Row Level Security
   ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
   ALTER TABLE goals ENABLE ROW LEVEL SECURITY;

   -- Create policies
   CREATE POLICY "Users can view own tasks" ON tasks
     FOR SELECT USING (auth.uid() = user_id);

   CREATE POLICY "Users can insert own tasks" ON tasks
     FOR INSERT WITH CHECK (auth.uid() = user_id);

   CREATE POLICY "Users can update own tasks" ON tasks
     FOR UPDATE USING (auth.uid() = user_id);

   CREATE POLICY "Users can delete own tasks" ON tasks
     FOR DELETE USING (auth.uid() = user_id);

   CREATE POLICY "Users can view own goals" ON goals
     FOR SELECT USING (auth.uid() = user_id);

   CREATE POLICY "Users can insert own goals" ON goals
     FOR INSERT WITH CHECK (auth.uid() = user_id);

   CREATE POLICY "Users can update own goals" ON goals
     FOR UPDATE USING (auth.uid() = user_id);

   CREATE POLICY "Users can delete own goals" ON goals
     FOR DELETE USING (auth.uid() = user_id);
   ```

3. **Get your Supabase credentials** from the project settings and add them to your environment files.

## 🔧 Environment Variables

### Backend (.env)
```env
# App settings
APP_NAME=Aegis
APP_VERSION=1.0.0
DEBUG=true

# Supabase settings
SUPABASE_URL=your_supabase_url_here
SUPABASE_KEY=your_supabase_anon_key_here

# OpenAI settings
OPENAI_API_KEY=your_openai_api_key_here

# Google Calendar settings
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# JWT settings
SECRET_KEY=your_secret_key_here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Database settings
DATABASE_URL=your_database_url_here
```

### Frontend (.env.local)
```env
# Supabase settings
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# API settings
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📚 API Documentation

Once the backend is running, you can access:
- **Interactive API docs**: `http://localhost:8000/docs`
- **ReDoc documentation**: `http://localhost:8000/redoc`

## 🚀 Deployment

### Backend Deployment
The FastAPI backend can be deployed to:
- **Railway**: Easy deployment with automatic HTTPS
- **Heroku**: Traditional platform with good Python support
- **DigitalOcean App Platform**: Scalable container deployment
- **AWS/GCP/Azure**: For enterprise deployments

### Frontend Deployment
The Next.js frontend can be deployed to:
- **Vercel**: Optimized for Next.js with automatic deployments
- **Netlify**: Great for static sites with serverless functions
- **Railway**: Full-stack deployment option

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/your-repo/aegis/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

## 🎯 Roadmap

### Phase 2: Enhanced AI Features
- Natural language task creation and parsing
- Smart task prioritization based on goals
- Automated calendar scheduling suggestions
- Email integration and smart responses

### Phase 3: Advanced Integrations
- Slack/Teams integration
- CRM integration
- Project management tools
- Time tracking and analytics

### Phase 4: Proactive Features
- Predictive task scheduling
- Goal progress tracking and insights
- Automated workflow creation
- AI-powered productivity recommendations

---

Built with ❤️ by the Aegis team
