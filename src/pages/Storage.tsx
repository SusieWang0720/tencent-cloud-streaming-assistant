import { HardDrive, Upload, Download, Trash2, Folder, FileVideo } from 'lucide-react'

export default function Storage() {
  const storageStats = {
    used: 245.6,
    total: 500,
    percentage: 49.12,
  }

  const files = [
    {
      id: 1,
      name: 'Gaming Highlights - Episode 1.mp4',
      type: 'video',
      size: 125.4,
      uploaded: '2024-01-20',
      duration: '5:32',
    },
    {
      id: 2,
      name: 'Tech Conference Keynote.mp4',
      type: 'video',
      size: 312.8,
      uploaded: '2024-01-18',
      duration: '12:45',
    },
    {
      id: 3,
      name: 'Music Performance Clip.mp4',
      type: 'video',
      size: 89.2,
      uploaded: '2024-01-15',
      duration: '3:21',
    },
    {
      id: 4,
      name: 'Product Launch Demo.mp4',
      type: 'video',
      size: 198.6,
      uploaded: '2024-01-12',
      duration: '8:15',
    },
    {
      id: 5,
      name: 'Interview Session.mp4',
      type: 'video',
      size: 445.3,
      uploaded: '2024-01-10',
      duration: '15:30',
    },
    {
      id: 6,
      name: 'Tutorial Part 1.mp4',
      type: 'video',
      size: 167.9,
      uploaded: '2024-01-08',
      duration: '7:45',
    },
  ]

  const formatSize = (size: number) => {
    return `${size.toFixed(1)} GB`
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Storage</h1>
          <p className="text-gray-500 mt-1">Manage your storage and media files</p>
        </div>
        <button className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-sm">
          <Upload className="h-5 w-5 mr-2" />
          Upload Files
        </button>
      </div>

      {/* Storage Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <HardDrive className="h-6 w-6 text-gray-400 mr-3" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Storage Usage</h2>
              <p className="text-sm text-gray-500">Total storage capacity</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">
              {formatSize(storageStats.used)} / {formatSize(storageStats.total)}
            </p>
            <p className="text-sm text-gray-500">{storageStats.percentage.toFixed(1)}% used</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-primary-600 h-3 rounded-full transition-all"
            style={{ width: `${storageStats.percentage}%` }}
          />
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>Available: {formatSize(storageStats.total - storageStats.used)}</span>
          <div className="flex space-x-4">
            <button className="flex items-center text-primary-600 hover:text-primary-700">
              <Download className="h-4 w-4 mr-1" />
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>

      {/* Files List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Files</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Uploaded
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {files.map((file) => (
                <tr key={file.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileVideo className="h-5 w-5 text-gray-400 mr-3" />
                      <div className="text-sm font-medium text-gray-900">{file.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {file.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatSize(file.size)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {file.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {file.uploaded}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-3">
                      <button className="text-primary-600 hover:text-primary-900">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
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

