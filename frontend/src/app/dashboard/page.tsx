'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser, signOut } from '@/lib/supabase'
import { tasksAPI, goalsAPI } from '@/lib/api'
import { Task, Goal, TaskPriority, TaskStatus } from '@/types'
import toast from 'react-hot-toast'
import { format } from 'date-fns'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [goals, setGoals] = useState<Goal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [newTaskInput, setNewTaskInput] = useState('')
  const [isAddingTask, setIsAddingTask] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const { user, error } = await getCurrentUser()
      if (error || !user) {
        router.push('/login')
        return
      }
      setUser(user)
      await loadData()
    }

    checkAuth()
  }, [router])

  const loadData = async () => {
    try {
      const [tasksData, goalsData] = await Promise.all([
        tasksAPI.getTasks({ limit: 10 }),
        goalsAPI.getGoals({ limit: 5 })
      ])
      setTasks(tasksData)
      setGoals(goalsData)
    } catch (error) {
      toast.error('Failed to load data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTaskInput.trim()) return

    setIsAddingTask(true)
    try {
      const taskData = {
        title: newTaskInput,
        priority: TaskPriority.MEDIUM,
        status: TaskStatus.TODO,
      }
      
      const newTask = await tasksAPI.createTask(taskData)
      setTasks([newTask, ...tasks])
      setNewTaskInput('')
      toast.success('Task added successfully!')
    } catch (error) {
      toast.error('Failed to add task')
    } finally {
      setIsAddingTask(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
      router.push('/login')
    } catch (error) {
      toast.error('Logout failed')
    }
  }

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.URGENT:
        return 'bg-red-100 text-red-800'
      case TaskPriority.HIGH:
        return 'bg-orange-100 text-orange-800'
      case TaskPriority.MEDIUM:
        return 'bg-yellow-100 text-yellow-800'
      case TaskPriority.LOW:
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.DONE:
        return 'bg-green-100 text-green-800'
      case TaskStatus.IN_PROGRESS:
        return 'bg-blue-100 text-blue-800'
      case TaskStatus.CANCELLED:
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Aegis</h1>
              <span className="ml-2 text-sm text-gray-500">Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user?.user_metadata?.full_name || user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Add Task */}
        <div className="mb-8">
          <form onSubmit={handleAddTask} className="flex gap-4">
            <input
              type="text"
              value={newTaskInput}
              onChange={(e) => setNewTaskInput(e.target.value)}
              placeholder="Add a new task or thought..."
              className="flex-1 input"
              disabled={isAddingTask}
            />
            <button
              type="submit"
              disabled={isAddingTask || !newTaskInput.trim()}
              className="btn-primary disabled:opacity-50"
            >
              {isAddingTask ? 'Adding...' : 'Add Task'}
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-semibold text-gray-900">Today's Schedule</h2>
                <p className="text-sm text-gray-500">{format(new Date(), 'EEEE, MMMM d, yyyy')}</p>
              </div>
              <div className="card-body">
                <div className="text-center py-8 text-gray-500">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="mt-2">No events scheduled for today</p>
                  <p className="text-sm">Calendar integration coming soon</p>
                </div>
              </div>
            </div>
          </div>

          {/* Top Priority Tasks */}
          <div>
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-semibold text-gray-900">Top Priority Tasks</h2>
              </div>
              <div className="card-body">
                {tasks.length > 0 ? (
                  <div className="space-y-3">
                    {tasks.slice(0, 3).map((task) => (
                      <div
                        key={task.id}
                        className="flex items-start justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {task.title}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`badge ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                            <span className={`badge ${getStatusColor(task.status)}`}>
                              {task.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <p>No tasks yet</p>
                    <p className="text-sm">Add your first task above</p>
                  </div>
                )}
                {tasks.length > 3 && (
                  <div className="mt-4 text-center">
                    <button className="text-sm text-primary-600 hover:text-primary-500">
                      View all tasks
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Goals */}
            <div className="card mt-6">
              <div className="card-header">
                <h2 className="text-lg font-semibold text-gray-900">Active Goals</h2>
              </div>
              <div className="card-body">
                {goals.length > 0 ? (
                  <div className="space-y-3">
                    {goals.slice(0, 3).map((goal) => (
                      <div
                        key={goal.id}
                        className="flex items-start justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {goal.title}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`badge ${getPriorityColor(goal.priority as any)}`}>
                              {goal.priority}
                            </span>
                            <span className={`badge ${getStatusColor(goal.status as any)}`}>
                              {goal.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <p>No goals set</p>
                    <p className="text-sm">Set your first goal to get started</p>
                  </div>
                )}
                {goals.length > 3 && (
                  <div className="mt-4 text-center">
                    <button className="text-sm text-primary-600 hover:text-primary-500">
                      View all goals
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}