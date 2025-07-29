export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  title: string
  description?: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'todo' | 'in_progress' | 'done' | 'cancelled'
  due_date?: string
  estimated_duration?: number
  user_id: string
  created_at: string
  updated_at: string
  completed_at?: string
}

export interface Goal {
  id: string
  title: string
  description?: string
  category: 'career' | 'personal' | 'health' | 'financial' | 'learning' | 'relationships' | 'other'
  target_date?: string
  is_active: boolean
  user_id: string
  created_at: string
  updated_at: string
}

export interface CalendarEvent {
  id: string
  title: string
  description?: string
  start_time: string
  end_time: string
  location?: string
  is_all_day: boolean
}

export interface AuthResponse {
  access_token: string
  token_type: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface SignupCredentials {
  email: string
  password: string
  full_name?: string
}