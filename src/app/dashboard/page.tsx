"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { AnimatedThemeToggler } from '@/components/magicui/animated-theme-toggler'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Cloud, LogOut, User, Settings, BarChart3, 
  FileTransfer, History, Activity, CheckCircle, 
  XCircle, Clock, TrendingUp, DollarSign, HardDrive,
  Plus, Eye, Cog, Download, Upload, MoreHorizontal
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend,
  Tooltip
} from 'recharts'

export default function Dashboard() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('dashboard')

  // Redirect to home if user is not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  // Show loading or redirect if not authenticated
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full w-fit mx-auto mb-4">
            <Cloud className="h-8 w-8 text-white animate-pulse" />
          </div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect via useEffect
  }

  // Chart data
  const transferPerformanceData = [
    { month: 'Jan', speed: 120, avg: 115 },
    { month: 'Feb', speed: 150, avg: 130 },
    { month: 'Mar', speed: 130, avg: 125 },
    { month: 'Apr', speed: 180, avg: 150 },
    { month: 'May', speed: 160, avg: 155 },
    { month: 'Jun', speed: 200, avg: 170 },
    { month: 'Jul', speed: 190, avg: 180 }
  ]

  const platformUsageData = [
    { name: 'Google Drive', value: 45, color: '#4285F4' },
    { name: 'OneDrive', value: 25, color: '#0078D4' },
    { name: 'Dropbox', value: 15, color: '#0061FF' },
    { name: 'iCloud', value: 10, color: '#007AFF' },
    { name: 'Samsung Cloud', value: 5, color: '#1428A0' }
  ]

  const cloudProviders = [
    { name: 'Google Drive', status: 'Connected', icon: '🔗', color: 'text-green-600' },
    { name: 'OneDrive', status: 'Disconnected', icon: '⚠️', color: 'text-red-600' },
    { name: 'Dropbox', status: 'Connected', icon: '🔗', color: 'text-green-600' },
    { name: 'iCloud', status: 'Disconnected', icon: '⚠️', color: 'text-red-600' },
    { name: 'Samsung Cloud', status: 'Connected', icon: '🔗', color: 'text-green-600' }
  ]

  const recentTransfers = [
    {
      fileName: 'Project_Report_Q3.pdf',
      source: 'Google Drive',
      destination: 'OneDrive',
      size: '15 MB',
      status: 'Completed',
      date: '2024-07-30',
      statusColor: 'text-green-600'
    },
    {
      fileName: 'Marketing_Assets.zip',
      source: 'Dropbox',
      destination: 'Google Drive',
      size: '2.1 GB',
      status: 'In Progress',
      date: '2024-07-30',
      statusColor: 'text-blue-600'
    },
    {
      fileName: 'Team_Meeting_Notes.docx',
      source: 'OneDrive',
      destination: 'Dropbox',
      size: '0.5 MB',
      status: 'Failed',
      date: '2024-07-29',
      statusColor: 'text-red-600'
    },
    {
      fileName: 'Family_Photos_2023.zip',
      source: 'iCloud',
      destination: 'Google Drive',
      size: '12 GB',
      status: 'Completed',
      date: '2024-07-28',
      statusColor: 'text-green-600'
    },
    {
      fileName: 'Backup_Mobile_Data.tar',
      source: 'Samsung Cloud',
      destination: 'OneDrive',
      size: '5.7 GB',
      status: 'Completed',
      date: '2024-07-27',
      statusColor: 'text-green-600'
    }
  ]

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, href: '/dashboard' },
    { id: 'new-transfer', label: 'New Transfer', icon: Plus, href: '/dashboard/new-transfer' },
    { id: 'sessions', label: 'Sessions', icon: Activity, href: '/dashboard/sessions' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, href: '/dashboard/analytics' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-slate-800 border-r-2 border-gray-300 dark:border-gray-600 flex flex-col shadow-lg">
        {/* Logo */}
        <div className="p-6 border-b-2 border-gray-300 dark:border-gray-600">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
              <Cloud className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AquaCloud
            </span>
          </div>
        </div>

        {/* Cloud Providers */}
        <div className="p-4 border-b-2 border-gray-300 dark:border-gray-600">
          <div className="space-y-3">
            {cloudProviders.map((provider, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{provider.icon}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {provider.name}
                  </span>
                </div>
                <span className={`text-xs font-medium ${provider.color}`}>
                  {provider.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4">
          <div className="space-y-1">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
              Navigation
            </div>
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => router.push(item.href)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  item.id === 'dashboard'
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t-2 border-gray-300 dark:border-gray-600">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full">
              <User className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                Aqua Customer
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                customer
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Log out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 border-b-2 border-gray-300 dark:border-gray-600 px-6 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome, Aqua Customer!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Your AquaCloud Dashboard Overview
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <AnimatedThemeToggler />
              <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <User className="h-4 w-4" />
                <span className="text-sm">{user?.email}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">47</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Transfers Completed</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">All time successful transfers</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">3</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Transfer Sessions</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">Currently running transfers</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-emerald-100 dark:bg-emerald-900/20 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">$12.50</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Cost Spent</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">Cumulative cost of transfers</div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 dark:bg-purple-900/20 p-3 rounded-full">
                  <HardDrive className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">125 GB</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Storage Transferred</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">Total data moved across clouds</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                size="lg" 
                onClick={() => router.push('/dashboard/new-transfer')}
                className="h-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Upload className="h-5 w-5 mr-2" />
                Start New Transfer
              </Button>
              <Button variant="outline" size="lg" className="h-16">
                <History className="h-5 w-5 mr-2" />
                View Transfer History
              </Button>
              <Button variant="outline" size="lg" className="h-16">
                <Settings className="h-5 w-5 mr-2" />
                Account Settings
              </Button>
            </div>
          </Card>

          {/* Charts Section */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Transfer Performance Chart */}
            <Card className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Transfer Performance
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Monthly average transfer speed over time.
                </p>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={transferPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis 
                      dataKey="month" 
                      axisLine={false}
                      tickLine={false}
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      className="text-gray-600 dark:text-gray-400"
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgb(255, 255, 255)',
                        border: '1px solid rgb(229, 231, 235)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                      labelStyle={{ color: 'rgb(55, 65, 81)' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="speed" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#3B82F6', strokeWidth: 2 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="avg" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#10B981', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">speed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">avg</span>
                </div>
              </div>
            </Card>

            {/* Platform Usage Chart */}
            <Card className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Platform Usage
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Distribution of data transferred across cloud providers.
                </p>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={platformUsageData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {platformUsageData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgb(255, 255, 255)',
                        border: '1px solid rgb(229, 231, 235)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }}
                      formatter={(value) => [`${value}%`, 'Usage']}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2">
                {platformUsageData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {item.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">File Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Source</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Destination</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Size</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransfers.map((transfer, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">
                        {transfer.fileName}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                        {transfer.source}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                        {transfer.destination}
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                        {transfer.size}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          transfer.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                          transfer.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                          {transfer.status === 'Completed' && <CheckCircle className="h-3 w-3 mr-1" />}
                          {transfer.status === 'In Progress' && <Clock className="h-3 w-3 mr-1" />}
                          {transfer.status === 'Failed' && <XCircle className="h-3 w-3 mr-1" />}
                          {transfer.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                        {transfer.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}
