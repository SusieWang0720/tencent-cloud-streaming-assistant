import { Calendar, Clock, Eye, Filter } from 'lucide-react'

export default function History() {
  const historyItems = [
    {
      id: 1,
      streamName: 'Gaming Live Stream',
      status: 'completed',
      startTime: '2024-01-20 14:30',
      endTime: '2024-01-20 16:45',
      duration: '2h 15m',
      viewers: 1234,
      views: 12340,
    },
    {
      id: 2,
      streamName: 'Tech Conference 2024',
      status: 'completed',
      startTime: '2024-01-18 10:00',
      endTime: '2024-01-18 11:30',
      duration: '1h 30m',
      viewers: 856,
      views: 8560,
    },
    {
      id: 3,
      streamName: 'Music Performance',
      status: 'completed',
      startTime: '2024-01-15 19:00',
      endTime: '2024-01-15 22:45',
      duration: '3h 45m',
      viewers: 2341,
      views: 23410,
    },
    {
      id: 4,
      streamName: 'Product Launch',
      status: 'completed',
      startTime: '2024-01-12 15:00',
      endTime: '2024-01-12 16:20',
      duration: '1h 20m',
      viewers: 567,
      views: 5670,
    },
    {
      id: 5,
      streamName: 'Interview Session',
      status: 'completed',
      startTime: '2024-01-10 11:00',
      endTime: '2024-01-10 12:30',
      duration: '1h 30m',
      viewers: 789,
      views: 7890,
    },
    {
      id: 6,
      streamName: 'Tutorial Part 1',
      status: 'completed',
      startTime: '2024-01-08 09:00',
      endTime: '2024-01-08 10:45',
      duration: '1h 45m',
      viewers: 1234,
      views: 12340,
    },
  ]

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">History</h1>
          <p className="text-gray-500 mt-1">View your streaming history and past sessions</p>
        </div>
        <button className="flex items-center px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
          <Filter className="h-5 w-5 mr-2" />
          Filter
        </button>
      </div>

      {/* History List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stream Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Peak Viewers
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {historyItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{item.streamName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      <div>
                        <div>{item.startTime}</div>
                        <div className="text-xs text-gray-400">to {item.endTime}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      {item.duration}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Eye className="h-4 w-4 mr-2 text-gray-400" />
                      {item.viewers.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 mr-4">
                      View
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      Download
                    </button>
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

