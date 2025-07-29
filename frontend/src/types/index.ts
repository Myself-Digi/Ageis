// User types
export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
  is_active: boolean
}

// Task types
export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done',
  CANCELLED = 'cancelled',
}

export interface Task {
  id: string
  user_id: string
  title: string
  description?: string
  priority: TaskPriority
  status: TaskStatus
  due_date?: string
  estimated_duration?: number
  tags: string[]
  created_at: string
  updated_at: string
  completed_at?: string
}

export interface CreateTaskData {
  title: string
  description?: string
  priority?: TaskPriority
  status?: TaskStatus
  due_date?: string
  estimated_duration?: number
  tags?: string[]
}

export interface UpdateTaskData {
  title?: string
  description?: string
  priority?: TaskPriority
  status?: TaskStatus
  due_date?: string
  estimated_duration?: number
  tags?: string[]
}

// Goal types
export enum GoalPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export enum GoalStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  PAUSED = 'paused',
  CANCELLED = 'cancelled',
}

export interface Goal {
  id: string
  user_id: string
  title: string
  description?: string
  priority: GoalPriority
  status: GoalStatus
  target_date?: string
  category?: string
  milestones: string[]
  created_at: string
  updated_at: string
  completed_at?: string
}

export interface CreateGoalData {
  title: string
  description?: string
  priority?: GoalPriority
  status?: GoalStatus
  target_date?: string
  category?: string
  milestones?: string[]
}

export interface UpdateGoalData {
  title?: string
  description?: string
  priority?: GoalPriority
  status?: GoalStatus
  target_date?: string
  category?: string
  milestones?: string[]
}

// Auth types
export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  full_name?: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
}

// Calendar types
export interface CalendarEvent {
  id: string
  title: string
  description?: string
  start_time: string
  end_time: string
  location?: string
  attendees?: string[]
}

// API Response types
export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  has_more: boolean
}