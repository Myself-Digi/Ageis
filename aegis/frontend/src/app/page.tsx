'use client'

import Link from 'next/link'
import { ShieldCheckIcon, ClockIcon, ChartBarIcon, SparklesIcon } from '@heroicons/react/24/outline'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <ShieldCheckIcon className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Aegis</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="btn-outline">
                Sign In
              </Link>
              <Link href="/signup" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Proactive
            <span className="text-primary-600"> AI Personal Manager</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Aegis acts as your digital chief of staff, anticipating needs, automating workflows, 
            and architecting your time to align with your long-term goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup" className="btn-primary text-lg px-8 py-3">
              Start Your Free Trial
            </Link>
            <Link href="/demo" className="btn-outline text-lg px-8 py-3">
              Watch Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Aegis?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built for ambitious professionals who want to focus on what matters most.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <SparklesIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Proactive Intelligence</h3>
              <p className="text-gray-600">
                Aegis doesn't wait for commands. It analyzes your data and makes intelligent 
                suggestions to optimize your productivity.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Time Architecture</h3>
              <p className="text-gray-600">
                Intelligently schedules your day, prioritizes tasks, and ensures you're 
                making progress toward your most important goals.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChartBarIcon className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Goal-Oriented</h3>
              <p className="text-gray-600">
                Every feature is designed to help you make tangible progress toward your 
                stated goals, not just manage tasks.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Productivity?
          </h2>
          <p className="text-primary-100 mb-8 text-lg">
            Join thousands of professionals who have already elevated their productivity with Aegis.
          </p>
          <Link href="/signup" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
            Get Started Today
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <ShieldCheckIcon className="h-6 w-6 text-primary-400" />
              <span className="ml-2 text-lg font-semibold">Aegis</span>
            </div>
            <p className="text-gray-400">
              © 2024 Aegis. All rights reserved. Your proactive AI personal manager.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}