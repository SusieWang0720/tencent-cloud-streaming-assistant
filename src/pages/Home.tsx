import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Play, Radio, TrendingUp, Users } from 'lucide-react'
import CreateStreamModal from '../components/CreateStreamModal'

export default function Home() {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const stats = [
    { label: 'Active Streams', value: '12', icon: Radio, color: 'bg-blue-500' },
    { label: 'Total Views', value: '1.2M', icon: TrendingUp, color: 'bg-green-500' },
    { label: 'Active Viewers', value: '3.4K', icon: Users, color: 'bg-purple-500' },
    { label: 'Streaming Hours', value: '245', icon: Play, color: 'bg-orange-500' },
  ]

  const recentStreams = [
    { id: 1, name: 'Gaming Live Stream', status: 'live', viewers: 1234, duration: '2h 15m' },
    { id: 2, name: 'Tech Conference 2024', status: 'live', viewers: 856, duration: '1h 30m' },
    { id: 3, name: 'Music Performance', status: 'ended', viewers: 0, duration: '3h 45m' },
    { id: 4, name: 'Product Launch', status: 'scheduled', viewers: 0, duration: '-' },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your streams.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Stream
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Streams */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Streams</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stream Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Viewers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentStreams.map((stream) => (
                <tr 
                  key={stream.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => navigate(`/encoder-rtmp/${stream.id}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{stream.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        stream.status === 'live'
                          ? 'bg-red-100 text-red-800'
                          : stream.status === 'scheduled'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {stream.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {stream.viewers.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {stream.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      className="text-primary-600 hover:text-primary-900 mr-4"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/encoder-rtmp/${stream.id}`)
                      }}
                    >
                      View
                    </button>
                    <button 
                      className="text-gray-600 hover:text-gray-900"
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/encoder-rtmp/${stream.id}`)
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CreateStreamModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

