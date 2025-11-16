import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  Settings, 
  Code, 
  MessageSquare, 
  Radio,
  Copy,
  Check,
  Play,
  Pause,
  Save,
  Globe,
  Plus
} from 'lucide-react'

type TabType = 'settings' | 'embed' | 'chat' | 'channels'

export default function StreamDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<TabType>('settings')
  const [copied, setCopied] = useState<string | null>(null)
  const [isLive, setIsLive] = useState(true)

  // Mock stream data - in real app, fetch by id
  const stream = {
    id: id || '1',
    name: 'Gaming Live Stream',
    description: 'Live gaming content and tournaments',
    status: isLive ? 'live' : 'offline',
    streamKey: 'live_abc123xyz789',
    rtmpUrl: 'rtmp://live.example.com/live',
    streamUrl: 'https://stream.example.com/live/abc123',
    embedCode: `<iframe src="https://stream.example.com/embed/abc123" width="640" height="360" frameborder="0" allowfullscreen></iframe>`,
    viewers: 1234,
    createdAt: '2024-01-15',
  }

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const tabs = [
    { id: 'settings' as TabType, name: 'Settings', icon: Settings },
    { id: 'embed' as TabType, name: 'Embed', icon: Code },
    { id: 'chat' as TabType, name: 'Chat', icon: MessageSquare },
    { id: 'channels' as TabType, name: 'Channels', icon: Radio },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{stream.name}</h1>
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${
                  stream.status === 'live'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {stream.status}
              </span>
            </div>
            <p className="text-gray-500">{stream.description}</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsLive(!isLive)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                isLive
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {isLive ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Stop Stream
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Start Stream
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm transition-colors ${
                  isActive
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {tab.name}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Stream Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stream Name *
                  </label>
                  <input
                    type="text"
                    defaultValue={stream.name}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    defaultValue={stream.description}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stream Key
                    </label>
                    <div className="flex">
                      <input
                        type="password"
                        value={stream.streamKey}
                        readOnly
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg bg-gray-50"
                      />
                      <button
                        onClick={() => handleCopy(stream.streamKey, 'key')}
                        className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 transition-colors"
                      >
                        {copied === 'key' ? (
                          <Check className="h-5 w-5 text-green-600" />
                        ) : (
                          <Copy className="h-5 w-5 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      RTMP URL
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        value={stream.rtmpUrl}
                        readOnly
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg bg-gray-50"
                      />
                      <button
                        onClick={() => handleCopy(stream.rtmpUrl, 'rtmp')}
                        className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 transition-colors"
                      >
                        {copied === 'rtmp' ? (
                          <Check className="h-5 w-5 text-green-600" />
                        ) : (
                          <Copy className="h-5 w-5 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stream URL
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      value={stream.streamUrl}
                      readOnly
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg bg-gray-50"
                    />
                    <button
                      onClick={() => handleCopy(stream.streamUrl, 'url')}
                      className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 transition-colors"
                    >
                      {copied === 'url' ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <Copy className="h-5 w-5 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Resolution
                    </label>
                    <select 
                      defaultValue="1080p"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="720p">720p</option>
                      <option value="1080p">1080p</option>
                      <option value="1440p">1440p</option>
                      <option value="2160p">2160p (4K)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bitrate (kbps)
                    </label>
                    <input
                      type="number"
                      defaultValue="6000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <button className="flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    <Save className="h-5 w-5 mr-2" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'embed' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Embed Stream</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Embed Code
                  </label>
                  <div className="relative">
                    <textarea
                      value={stream.embedCode}
                      readOnly
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
                    />
                    <button
                      onClick={() => handleCopy(stream.embedCode, 'embed')}
                      className="absolute top-2 right-2 p-2 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                    >
                      {copied === 'embed' ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <Copy className="h-5 w-5 text-gray-600" />
                      )}
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Copy and paste this code into your website to embed the stream
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stream URL
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      value={stream.streamUrl}
                      readOnly
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg bg-gray-50"
                    />
                    <button
                      onClick={() => handleCopy(stream.streamUrl, 'embed-url')}
                      className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 transition-colors"
                    >
                      {copied === 'embed-url' ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : (
                        <Copy className="h-5 w-5 text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Preview</h3>
                  <div className="bg-black rounded aspect-video flex items-center justify-center">
                    <div className="text-white text-center">
                      <Globe className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm opacity-75">Stream Preview</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Chat Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Enable Chat</h3>
                    <p className="text-sm text-gray-500">Allow viewers to send messages during the stream</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Moderate Chat</h3>
                    <p className="text-sm text-gray-500">Require approval for messages before they appear</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Slow Mode</h3>
                    <p className="text-sm text-gray-500">Limit how often viewers can send messages</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slow Mode Delay (seconds)
                  </label>
                  <input
                    type="number"
                    defaultValue="5"
                    min="1"
                    max="60"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Chat Preview</h3>
                  <div className="bg-white rounded border border-gray-200 h-64 overflow-y-auto p-4 space-y-3">
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        U1
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">User123</span>
                          <span className="text-xs text-gray-500">2m ago</span>
                        </div>
                        <p className="text-sm text-gray-700">Great stream! Keep it up!</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        U2
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">Viewer456</span>
                          <span className="text-xs text-gray-500">1m ago</span>
                        </div>
                        <p className="text-sm text-gray-700">Love the content! 🔥</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                        U3
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">Fan789</span>
                          <span className="text-xs text-gray-500">30s ago</span>
                        </div>
                        <p className="text-sm text-gray-700">Can you explain that again?</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <button className="flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    <Save className="h-5 w-5 mr-2" />
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'channels' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Destination Channels</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold">
                      YT
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">YouTube</h3>
                      <p className="text-sm text-gray-500">youtube.com/live/abc123</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Settings className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                      TW
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Twitch</h3>
                      <p className="text-sm text-gray-500">twitch.tv/streamer123</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Active
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Settings className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                      FB
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">Facebook Live</h3>
                      <p className="text-sm text-gray-500">facebook.com/live/xyz789</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      Inactive
                    </span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Settings className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-400 hover:text-primary-600 transition-colors">
                  <div className="flex items-center justify-center">
                    <Plus className="h-5 w-5 mr-2" />
                    Add Destination Channel
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

