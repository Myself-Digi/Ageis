'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ShieldCheckIcon, 
  CalendarIcon, 
  ClockIcon, 
  CheckCircleIcon,
  PlusIcon,
  UserCircleIcon,
  CogIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline'
import { signOut, getCurrentUser } from '@/lib/supabase'
import { User, Task, CalendarEvent } from '@/types'
import toast from 'react-hot-toast'

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [quickAddText, setQuickAddText] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
    loadDashboardData()
  }, [])

  const checkAuth = async () => {
    const { user, error } = await getCurrentUser()
    if (error || !user) {
      router.push('/login')
      return
    }
    setUser(user as any)
  }

  const loadDashboardData = async () => {
    setIsLoading(true)
    try {
      // TODO: Load tasks and events from API
      // For now, using mock data
      setTasks([
        {
          id: '1',
          title: 'Review Q4 budget proposal',
          description: 'Analyze and provide feedback on the quarterly budget',
          priority: 'high',
          status: 'todo',
          due_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          user_id: '1',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Prepare presentation for client meeting',
          description: 'Create slides for the upcoming client presentation',
          priority: 'urgent',
          status: 'in_progress',
          due_date: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
          user_id: '1',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: '3',
          title: 'Schedule team retrospective',
          description: 'Plan and schedule the weekly team retrospective meeting',
          priority: 'medium',
          status: 'todo',
          due_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
          user_id: '1',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])

      setEvents([
        {
          id: '1',
          title: 'Client Meeting - TechCorp',
          description: 'Quarterly review meeting with TechCorp team',
          start_time: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
          end_time: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
          location: 'Conference Room A',
          is_all_day: false,
        },
        {
          id: '2',
          title: 'Team Standup',
          description: 'Daily team standup meeting',
          start_time: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
          end_time: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
          location: 'Zoom',
          is_all_day: false,
        },
      ])
    } catch (error) {
      toast.error('Failed to load dashboard data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!quickAddText.trim()) return

    try {
      // TODO: Implement NLP task creation
      toast.success('Task added successfully!')
      setQuickAddText('')
      // Reload tasks
      loadDashboardData()
    } catch (error) {
      toast.error('Failed to add task')
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push('/login')
    } catch (error) {
      toast.error('Failed to sign out')
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'text-red-600 bg-red-100'
      case 'high':
        return 'text-orange-600 bg-orange-100'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100'
      case 'low':
        return 'text-green-600 bg-green-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <ShieldCheckIcon className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Aegis</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="btn-outline">
                <CalendarIcon className="h-5 w-5 mr-2" />
                Calendar
              </button>
              <div className="relative">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                  <UserCircleIcon className="h-6 w-6" />
                  <span>{user?.full_name || user?.email}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                    <CogIcon className="h-4 w-4 mr-2" />
                    Settings
                  </button>
                  <button 
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Good morning, {user?.full_name?.split(' ')[0] || 'there'}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's on your agenda today
          </p>
        </div>

        {/* Quick Add */}
        <div className="card mb-8">
          <form onSubmit={handleQuickAdd} className="flex space-x-4">
            <input
              type="text"
              value={quickAddText}
              onChange={(e) => setQuickAddText(e.target.value)}
              placeholder="Add a task, reminder, or thought... (e.g., 'Call John tomorrow at 2pm to discuss project')"
              className="flex-1 input-field"
            />
            <button type="submit" className="btn-primary">
              <PlusIcon className="h-5 w-5" />
            </button>
          </form>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Today's Schedule</h2>
                <ClockIcon className="h-5 w-5 text-gray-400" />
              </div>
              
              {events.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No events scheduled for today</p>
              ) : (
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{event.title}</p>
                        <p className="text-sm text-gray-500">{event.description}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatTime(event.start_time)} - {formatTime(event.end_time)}
                          {event.location && ` • ${event.location}`}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Priority Tasks */}
          <div>
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Priority Tasks</h2>
                <CheckCircleIcon className="h-5 w-5 text-gray-400" />
              </div>
              
              {tasks.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No tasks yet</p>
              ) : (
                <div className="space-y-4">
                  {tasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{task.title}</p>
                        <p className="text-sm text-gray-500">{task.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          {task.due_date && (
                            <span className="text-xs text-gray-400">
                              Due {new Date(task.due_date).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {tasks.length > 3 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="text-sm text-primary-600 hover:text-primary-500">
                    View all {tasks.length} tasks →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}