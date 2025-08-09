"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { AnimatedThemeToggler } from '@/components/magicui/animated-theme-toggler'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  Cloud, LogOut, User, Settings, BarChart3, 
  FileTransfer, History, Activity, CheckCircle, 
  XCircle, Clock, TrendingUp, DollarSign, HardDrive,
  Plus, Eye, Cog, Download, Upload, MoreHorizontal,
  Search, Home, ChevronRight, ChevronUp, ArrowRight,
  ArrowLeft, Play, Folder, File, FileText, Music,
  Archive, Image
} from 'lucide-react'

interface FileItem {
  id: string
  name: string
  type: 'folder' | 'file'
  size: string
  lastModified: string
  icon: any
  selected?: boolean
}

interface CloudProvider {
  id: string
  name: string
  connected: boolean
}

export default function NewTransfer() {
  const { user, logout, loading } = useAuth()
  const router = useRouter()
  
  const [selectedSourceProvider, setSelectedSourceProvider] = useState<string>('')
  const [selectedDestProvider, setSelectedDestProvider] = useState<string>('')
  const [sourceFiles, setSourceFiles] = useState<FileItem[]>([])
  const [destFiles, setDestFiles] = useState<FileItem[]>([])
  const [sourcePath, setSourcePath] = useState<string[]>([])
  const [destPath, setDestPath] = useState<string[]>([])
  const [sourceSearch, setSourceSearch] = useState('')
  const [destSearch, setDestSearch] = useState('')
  const [sessionId] = useState(`session_${Math.random().toString(36).substr(2, 9)}`)

  // Redirect to home if user is not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

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
    return null
  }

  const cloudProviders: CloudProvider[] = [
    { id: 'google-drive', name: 'Google Drive', connected: true },
    { id: 'onedrive', name: 'OneDrive', connected: false },
    { id: 'dropbox', name: 'Dropbox', connected: true },
    { id: 'icloud', name: 'iCloud', connected: false },
    { id: 'samsung-cloud', name: 'Samsung Cloud', connected: true }
  ]

  const mockFiles: { [key: string]: FileItem[] } = {
    'google-drive': [
      { id: '1', name: 'Documents', type: 'folder', size: '-', lastModified: '-', icon: Folder },
      { id: '2', name: 'Photos', type: 'folder', size: '-', lastModified: '-', icon: Folder },
      { id: '3', name: 'Videos', type: 'folder', size: '-', lastModified: '-', icon: Folder },
      { id: '4', name: 'Work_Files', type: 'folder', size: '-', lastModified: '-', icon: Folder },
      { id: '5', name: 'Backup.zip', type: 'file', size: '2.3 GB', lastModified: '2024-07-10', icon: Archive },
      { id: '6', name: 'Music_Playlist.mp3', type: 'file', size: '5.0 MB', lastModified: '2024-07-05', icon: Music }
    ],
    'google-drive/Documents': [
      { id: '7', name: 'Meeting_Notes.docx', type: 'file', size: '0.5 MB', lastModified: '2024-07-29', icon: FileText },
      { id: '8', name: 'Presentation.pptx', type: 'file', size: '8.1 MB', lastModified: '2024-07-25', icon: FileText },
      { id: '9', name: 'Project_Report.pdf', type: 'file', size: '1.2 MB', lastModified: '2024-07-28', icon: FileText },
      { id: '10', name: 'Spreadsheet.xlsx', type: 'file', size: '0.8 MB', lastModified: '2024-07-26', icon: FileText },
      { id: '11', name: 'Contracts', type: 'folder', size: '-', lastModified: '-', icon: Folder }
    ],
    'google-drive/Photos': [
      { id: '12', name: 'Vacation_2024.jpg', type: 'file', size: '2.1 MB', lastModified: '2024-06-15', icon: Image },
      { id: '13', name: 'Family_Portrait.png', type: 'file', size: '1.8 MB', lastModified: '2024-05-20', icon: Image },
      { id: '14', name: 'Screenshots', type: 'folder', size: '-', lastModified: '-', icon: Folder }
    ],
    'google-drive/Videos': [
      { id: '15', name: 'Tutorial.mp4', type: 'file', size: '45.2 MB', lastModified: '2024-07-01', icon: FileText },
      { id: '16', name: 'Presentation_Recording.mov', type: 'file', size: '120.5 MB', lastModified: '2024-06-28', icon: FileText }
    ],
    'google-drive/Work_Files': [
      { id: '17', name: 'Projects', type: 'folder', size: '-', lastModified: '-', icon: Folder },
      { id: '18', name: 'Templates', type: 'folder', size: '-', lastModified: '-', icon: Folder },
      { id: '19', name: 'Budget_2024.xlsx', type: 'file', size: '1.5 MB', lastModified: '2024-07-15', icon: FileText }
    ],
    'dropbox': [
      { id: '20', name: 'Documents', type: 'folder', size: '-', lastModified: '-', icon: Folder },
      { id: '21', name: 'Photos', type: 'folder', size: '-', lastModified: '-', icon: Folder },
      { id: '22', name: 'Videos', type: 'folder', size: '-', lastModified: '-', icon: Folder },
      { id: '23', name: 'Work_Files', type: 'folder', size: '-', lastModified: '-', icon: Folder },
      { id: '24', name: 'Backup.zip', type: 'file', size: '2.3 GB', lastModified: '2024-07-10', icon: Archive },
      { id: '25', name: 'Music_Playlist.mp3', type: 'file', size: '5.0 MB', lastModified: '2024-07-05', icon: Music }
    ],
    'samsung-cloud': [
      { id: '26', name: 'Documents', type: 'folder', size: '-', lastModified: '-', icon: Folder },
      { id: '27', name: 'Photos', type: 'folder', size: '-', lastModified: '-', icon: Folder },
      { id: '28', name: 'Videos', type: 'folder', size: '-', lastModified: '-', icon: Folder },
      { id: '29', name: 'Work_Files', type: 'folder', size: '-', lastModified: '-', icon: Folder },
      { id: '30', name: 'Backup.zip', type: 'file', size: '2.3 GB', lastModified: '2024-07-10', icon: Archive },
      { id: '31', name: 'Music_Playlist.mp3', type: 'file', size: '5.0 MB', lastModified: '2024-07-05', icon: Music }
    ]
  }

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3, href: '/dashboard' },
    { id: 'new-transfer', label: 'New Transfer', icon: Plus, href: '/dashboard/new-transfer' },
    { id: 'sessions', label: 'Sessions', icon: Activity, href: '/dashboard/sessions' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, href: '/dashboard/analytics' }
  ]

  const handleProviderSelect = (provider: string, type: 'source' | 'dest') => {
    const selectedProvider = cloudProviders.find(p => p.id === provider)
    
    // Check if provider is connected
    if (selectedProvider && !selectedProvider.connected) {
      // Handle disconnected provider - for now just select it but show empty files
      if (type === 'source') {
        setSelectedSourceProvider(provider)
        setSourceFiles([])
        setSourcePath([])
      } else {
        setSelectedDestProvider(provider)
        setDestFiles([])
        setDestPath([])
      }
      return
    }

    if (type === 'source') {
      setSelectedSourceProvider(provider)
      setSourceFiles(mockFiles[provider] || [])
      setSourcePath([])
    } else {
      setSelectedDestProvider(provider)
      setDestFiles(mockFiles[provider] || [])
      setDestPath([])
    }
  }

  const handleFileSelect = (fileId: string, type: 'source' | 'dest') => {
    if (type === 'source') {
      setSourceFiles(prev => prev.map(file => 
        file.id === fileId ? { ...file, selected: !file.selected } : file
      ))
    } else {
      setDestFiles(prev => prev.map(file => 
        file.id === fileId ? { ...file, selected: !file.selected } : file
      ))
    }
  }

  const handleFolderNavigate = (folderName: string, type: 'source' | 'dest') => {
    if (type === 'source') {
      const newPath = [...sourcePath, folderName]
      const pathKey = `${selectedSourceProvider}/${newPath.join('/')}`
      setSourcePath(newPath)
      setSourceFiles(mockFiles[pathKey] || [])
    } else {
      const newPath = [...destPath, folderName]
      const pathKey = `${selectedDestProvider}/${newPath.join('/')}`
      setDestPath(newPath)
      setDestFiles(mockFiles[pathKey] || [])
    }
  }

  const handleBreadcrumbNavigate = (index: number, type: 'source' | 'dest') => {
    if (type === 'source') {
      if (index === -1) {
        // Navigate to root
        setSourcePath([])
        setSourceFiles(mockFiles[selectedSourceProvider] || [])
      } else {
        // Navigate to specific level
        const newPath = sourcePath.slice(0, index + 1)
        const pathKey = newPath.length > 0 ? `${selectedSourceProvider}/${newPath.join('/')}` : selectedSourceProvider
        setSourcePath(newPath)
        setSourceFiles(mockFiles[pathKey] || [])
      }
    } else {
      if (index === -1) {
        // Navigate to root
        setDestPath([])
        setDestFiles(mockFiles[selectedDestProvider] || [])
      } else {
        // Navigate to specific level
        const newPath = destPath.slice(0, index + 1)
        const pathKey = newPath.length > 0 ? `${selectedDestProvider}/${newPath.join('/')}` : selectedDestProvider
        setDestPath(newPath)
        setDestFiles(mockFiles[pathKey] || [])
      }
    }
  }

  const getSelectedCount = (files: FileItem[]) => {
    return files.filter(f => f.selected).length
  }

  const getProviderDisplayName = (providerId: string) => {
    const provider = cloudProviders.find(p => p.id === providerId)
    return provider ? provider.name : 'Not Selected'
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-slate-800 border-r-2 border-gray-300 dark:border-gray-600 flex flex-col shadow-lg">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
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
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="space-y-3">
            {cloudProviders.map((provider) => (
              <div key={provider.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{provider.connected ? '🔗' : '⚠️'}</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {provider.name}
                  </span>
                </div>
                <span className={`text-xs font-medium ${provider.connected ? 'text-green-600' : 'text-red-600'}`}>
                  {provider.connected ? 'Connected' : 'Disconnected'}
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
                  item.id === 'new-transfer'
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
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
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
        <header className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700 px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                New File Transfer
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Select your source and destination, then start transferring files.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                New Session
              </Button>
              <AnimatedThemeToggler />
              <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                <User className="h-4 w-4" />
                <span className="text-sm">{user?.email}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Current Transfer Session */}
          <Card className="p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Current Transfer Session</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Session ID:</span>
                <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  {sessionId}...
                </code>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Providers: {getProviderDisplayName(selectedSourceProvider)} 
                  <ArrowRight className="h-4 w-4 mx-2 inline" />
                  {getProviderDisplayName(selectedDestProvider)}
                </span>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Transfers in this session: {getSelectedCount(sourceFiles)}
              </div>
            </div>
          </Card>

          {/* Provider Selection */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Source Provider */}
            <div className="space-y-4">
              <div className="relative">
                <select
                  value={selectedSourceProvider}
                  onChange={(e) => handleProviderSelect(e.target.value, 'source')}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white appearance-none cursor-pointer"
                >
                  <option value="">Select Source Cloud Provider</option>
                  {cloudProviders.map(provider => (
                    <option key={provider.id} value={provider.id}>{provider.name}</option>
                  ))}
                </select>
                <ChevronUp className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Destination Provider */}
            <div className="space-y-4">
              <div className="relative">
                <select
                  value={selectedDestProvider}
                  onChange={(e) => handleProviderSelect(e.target.value, 'dest')}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white appearance-none cursor-pointer"
                >
                  <option value="">Select Destination Cloud Provider</option>
                  {cloudProviders.map(provider => (
                    <option key={provider.id} value={provider.id}>{provider.name}</option>
                  ))}
                </select>
                <ChevronUp className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* File Browsers */}
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Source Browser */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Source: {getProviderDisplayName(selectedSourceProvider)}
                </h3>
                <div className="flex items-center space-x-2">
                  <ArrowRight className="h-5 w-5 text-blue-500" />
                  <ArrowLeft className="h-5 w-5 text-blue-300" />
                </div>
              </div>

              {selectedSourceProvider ? (
                <>
                  {/* Search */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search files..."
                      value={sourceSearch}
                      onChange={(e) => setSourceSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Breadcrumb */}
                  <div className="flex items-center space-x-2 mb-4 text-sm">
                    <button 
                      onClick={() => handleBreadcrumbNavigate(-1, 'source')}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <Home className="h-4 w-4" />
                    </button>
                    {sourcePath.map((path, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                        <button
                          onClick={() => handleBreadcrumbNavigate(index, 'source')}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {path}
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* File List */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="grid grid-cols-4 gap-4 p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-400">
                      <div>Name</div>
                      <div className="text-center">Size</div>
                      <div className="text-center">Last Modified</div>
                      <div></div>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {sourceFiles.map((file) => (
                        <div 
                          key={file.id} 
                          className={`grid grid-cols-4 gap-4 p-3 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer ${file.selected ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                          onClick={() => file.type === 'folder' ? handleFolderNavigate(file.name, 'source') : handleFileSelect(file.id, 'source')}
                        >
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={file.selected || false}
                              onChange={() => handleFileSelect(file.id, 'source')}
                              onClick={(e) => e.stopPropagation()}
                              className="rounded border-gray-300"
                            />
                            <file.icon className="h-5 w-5 text-blue-500" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {file.name}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
                            {file.size}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
                            {file.lastModified}
                          </div>
                          <div></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  Please select a source cloud provider to browse files.
                </div>
              )}
            </Card>

            {/* Destination Browser */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Destination: {getProviderDisplayName(selectedDestProvider)}
                </h3>
                <div className="flex items-center space-x-2">
                  <ArrowRight className="h-5 w-5 text-blue-500" />
                  <ArrowLeft className="h-5 w-5 text-blue-300" />
                </div>
              </div>

              {selectedDestProvider ? (
                <>
                  {/* Search */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search files..."
                      value={destSearch}
                      onChange={(e) => setDestSearch(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Breadcrumb */}
                  <div className="flex items-center space-x-2 mb-4 text-sm">
                    <button 
                      onClick={() => handleBreadcrumbNavigate(-1, 'dest')}
                      className="flex items-center text-blue-600 hover:text-blue-800"
                    >
                      <Home className="h-4 w-4" />
                    </button>
                    {destPath.map((path, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                        <button
                          onClick={() => handleBreadcrumbNavigate(index, 'dest')}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {path}
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* File List */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="grid grid-cols-4 gap-4 p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-medium text-gray-600 dark:text-gray-400">
                      <div>Name</div>
                      <div className="text-center">Size</div>
                      <div className="text-center">Last Modified</div>
                      <div></div>
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {destFiles.map((file) => (
                        <div 
                          key={file.id} 
                          className={`grid grid-cols-4 gap-4 p-3 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer ${file.selected ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
                          onClick={() => file.type === 'folder' ? handleFolderNavigate(file.name, 'dest') : handleFileSelect(file.id, 'dest')}
                        >
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={file.selected || false}
                              onChange={() => handleFileSelect(file.id, 'dest')}
                              onClick={(e) => e.stopPropagation()}
                              className="rounded border-gray-300"
                            />
                            <file.icon className="h-5 w-5 text-blue-500" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {file.name}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
                            {file.size}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
                            {file.lastModified}
                          </div>
                          <div></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  Please select a destination cloud provider to browse files.
                </div>
              )}
            </Card>
          </div>

          {/* Transfer Controls */}
          <Card className="p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Transfer Controls</h3>
            
            <div className="grid lg:grid-cols-2 gap-8 mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-blue-600">
                  <Cloud className="h-5 w-5" />
                  <span className="font-medium">Source: {getSelectedCount(sourceFiles)} file(s) selected</span>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-blue-600">
                  <Cloud className="h-5 w-5" />
                  <span className="font-medium">Destination: {getSelectedCount(destFiles)} file(s) selected</span>
                </div>
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-emerald-600" />
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  Estimated Cost: $0.00
                </span>
              </div>
            </div>

            <Button 
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg font-semibold"
              disabled={getSelectedCount(sourceFiles) === 0 || !selectedDestProvider}
            >
              <Play className="h-5 w-5 mr-2" />
              Start Transfer
            </Button>
          </Card>

          {/* Transfer Queue */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Transfer Queue</h3>
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              No transfers in queue.
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}
