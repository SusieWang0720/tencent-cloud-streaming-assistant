import { Plus, Search, Download, Trash2, Play, Calendar } from 'lucide-react'

export default function Clips() {
  const clips = [
    {
      id: 1,
      title: 'Gaming Highlights - Episode 1',
      duration: '5:32',
      size: '125 MB',
      thumbnail: '🎮',
      createdAt: '2024-01-20',
      views: 1234,
    },
    {
      id: 2,
      title: 'Tech Conference Keynote',
      duration: '12:45',
      size: '312 MB',
      thumbnail: '💻',
      createdAt: '2024-01-18',
      views: 856,
    },
    {
      id: 3,
      title: 'Music Performance Clip',
      duration: '3:21',
      size: '89 MB',
      thumbnail: '🎵',
      createdAt: '2024-01-15',
      views: 2341,
    },
    {
      id: 4,
      title: 'Product Launch Demo',
      duration: '8:15',
      size: '198 MB',
      thumbnail: '📱',
      createdAt: '2024-01-12',
      views: 567,
    },
    {
      id: 5,
      title: 'Interview Session',
      duration: '15:30',
      size: '445 MB',
      thumbnail: '🎤',
      createdAt: '2024-01-10',
      views: 789,
    },
    {
      id: 6,
      title: 'Tutorial Part 1',
      duration: '7:45',
      size: '167 MB',
      thumbnail: '📚',
      createdAt: '2024-01-08',
      views: 1234,
    },
  ]

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clips</h1>
          <p className="text-gray-500 mt-1">Manage your video clips and highlights</p>
        </div>
        <button className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-sm">
          <Plus className="h-5 w-5 mr-2" />
          Create Clip
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search clips..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>
        <select className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
          <option>All Clips</option>
          <option>Recent</option>
          <option>Popular</option>
        </select>
      </div>

      {/* Clips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clips.map((clip) => (
          <div
            key={clip.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Thumbnail */}
            <div className="relative bg-gradient-to-br from-primary-400 to-primary-600 h-48 flex items-center justify-center">
              <div className="text-6xl">{clip.thumbnail}</div>
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                <button className="opacity-0 hover:opacity-100 transition-opacity">
                  <div className="bg-white rounded-full p-4">
                    <Play className="h-8 w-8 text-primary-600" />
                  </div>
                </button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                {clip.duration}
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {clip.title}
              </h3>
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  {clip.createdAt}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Size: {clip.size}</span>
                  <span className="text-gray-500">{clip.views.toLocaleString()} views</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-4 border-t border-gray-200">
                <button className="flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition-colors">
                  <Play className="h-4 w-4 mr-2" />
                  Play
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <Download className="h-4 w-4" />
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

