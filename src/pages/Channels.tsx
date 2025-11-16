import { useState } from 'react'
import { Plus, Search, MoreVertical, Play, Pause, Settings } from 'lucide-react'
import AddChannelsModal from '../components/AddChannelsModal'

export default function Channels() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const channels = [
    {
      id: 1,
      name: 'Gaming Channel',
      description: 'Live gaming content and tournaments',
      status: 'active',
      viewers: 1234,
      streamKey: 'live_abc123xyz',
      createdAt: '2024-01-15',
    },
    {
      id: 2,
      name: 'Tech Talks',
      description: 'Technology discussions and tutorials',
      status: 'active',
      viewers: 856,
      streamKey: 'live_def456uvw',
      createdAt: '2024-01-10',
    },
    {
      id: 3,
      name: 'Music Live',
      description: 'Live music performances',
      status: 'inactive',
      viewers: 0,
      streamKey: 'live_ghi789rst',
      createdAt: '2024-01-05',
    },
    {
      id: 4,
      name: 'News Channel',
      description: 'Breaking news and updates',
      status: 'active',
      viewers: 2341,
      streamKey: 'live_jkl012mno',
      createdAt: '2024-01-20',
    },
  ]

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Channels</h1>
          <p className="text-gray-500 mt-1">Manage your streaming channels</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Channels
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search channels..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Channels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {channels.map((channel) => (
          <div
            key={channel.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {channel.name}
                </h3>
                <p className="text-sm text-gray-500">{channel.description}</p>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Status</span>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    channel.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {channel.status}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Viewers</span>
                <span className="text-sm font-medium text-gray-900">
                  {channel.viewers.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Stream Key</span>
                <span className="text-xs font-mono text-gray-600">
                  {channel.streamKey.substring(0, 12)}...
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Created</span>
                <span className="text-sm text-gray-600">{channel.createdAt}</span>
              </div>
            </div>

            <div className="flex space-x-2 pt-4 border-t border-gray-200">
              <button className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                {channel.status === 'active' ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start
                  </>
                )}
              </button>
              <button className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <AddChannelsModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />
    </div>
  )
}

