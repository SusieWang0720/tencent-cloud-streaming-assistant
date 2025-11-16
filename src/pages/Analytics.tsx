import { TrendingUp, Users, Eye, Clock, ArrowUp, ArrowDown } from 'lucide-react'

export default function Analytics() {
  const metrics = [
    {
      label: 'Total Views',
      value: '1.2M',
      change: '+12.5%',
      trend: 'up',
      icon: Eye,
      color: 'bg-blue-500',
    },
    {
      label: 'Active Viewers',
      value: '3.4K',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
      color: 'bg-green-500',
    },
    {
      label: 'Watch Time',
      value: '245h',
      change: '+15.3%',
      trend: 'up',
      icon: Clock,
      color: 'bg-purple-500',
    },
    {
      label: 'Growth Rate',
      value: '18.5%',
      change: '-2.1%',
      trend: 'down',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ]

  const chartData = [
    { day: 'Mon', views: 12000, viewers: 3400 },
    { day: 'Tue', views: 19000, viewers: 4200 },
    { day: 'Wed', views: 15000, viewers: 3800 },
    { day: 'Thu', views: 22000, viewers: 5100 },
    { day: 'Fri', views: 18000, viewers: 4500 },
    { day: 'Sat', views: 25000, viewers: 6200 },
    { day: 'Sun', views: 28000, viewers: 6800 },
  ]

  const topStreams = [
    { name: 'Gaming Live Stream', views: 123400, duration: '2h 15m', peak: 3400 },
    { name: 'Tech Conference 2024', views: 85600, duration: '1h 30m', peak: 2100 },
    { name: 'Music Performance', views: 234100, duration: '3h 45m', peak: 5200 },
    { name: 'Product Launch', views: 56700, duration: '1h 20m', peak: 1800 },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 mt-1">Track your streaming performance and insights</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <div key={metric.label} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${metric.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div
                  className={`flex items-center text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {metric.trend === 'up' ? (
                    <ArrowUp className="h-4 w-4 mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 mr-1" />
                  )}
                  {metric.change}
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-1">{metric.label}</p>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            </div>
          )
        })}
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Views & Viewers (Last 7 Days)</h2>
        <div className="h-64 flex items-end justify-between space-x-2">
          {chartData.map((data, index) => {
            const maxValue = Math.max(...chartData.map(d => d.views))
            const viewsHeight = (data.views / maxValue) * 100
            const viewersHeight = (data.viewers / maxValue) * 100 * 0.3

            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full flex items-end justify-center space-x-1 h-full">
                  <div
                    className="w-full bg-primary-500 rounded-t"
                    style={{ height: `${viewsHeight}%` }}
                  />
                  <div
                    className="w-full bg-primary-300 rounded-t"
                    style={{ height: `${viewersHeight}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">{data.day}</p>
              </div>
            )
          })}
        </div>
        <div className="flex items-center justify-center space-x-6 mt-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-primary-500 rounded mr-2" />
            <span className="text-sm text-gray-600">Views</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-primary-300 rounded mr-2" />
            <span className="text-sm text-gray-600">Viewers</span>
          </div>
        </div>
      </div>

      {/* Top Streams */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Top Performing Streams</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stream Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Peak Viewers
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {topStreams.map((stream, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{stream.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{stream.views.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {stream.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{stream.peak.toLocaleString()}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

