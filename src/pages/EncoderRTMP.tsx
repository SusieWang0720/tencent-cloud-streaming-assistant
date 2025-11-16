import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { 
  Home, 
  ChevronDown, 
  Copy, 
  Check, 
  Play, 
  Plus, 
  Edit, 
  MessageSquare, 
  Code, 
  Settings,
  HelpCircle,
  X,
  Globe,
  Eye,
  EyeOff,
  Save
} from 'lucide-react'

type Protocol = 'rtmp' | 'rtmps' | 'srt' | 'whip'
type RightPanel = 'channels' | 'chat' | 'embed' | 'settings'

// Mock stream data - in real app, fetch from API
const streamData: Record<string, { name: string; date: string }> = {
  '1': { name: 'Gaming Live Stream', date: 'November 16' },
  '2': { name: 'Tech Conference 2024', date: 'November 16' },
  '3': { name: 'Music Performance', date: 'November 15' },
  '4': { name: 'Product Launch', date: 'November 14' },
}

export default function EncoderRTMP() {
  const navigate = useNavigate()
  const { streamId } = useParams<{ streamId?: string }>()
  const [protocol, setProtocol] = useState<Protocol>('rtmp')
  const [copied, setCopied] = useState<string | null>(null)
  const [recordEnabled, setRecordEnabled] = useState(false)
  const [activePanel, setActivePanel] = useState<RightPanel>('channels')
  const [showStreamKey, setShowStreamKey] = useState(false)

  // Get stream info based on streamId
  const streamInfo = streamId ? streamData[streamId] : { name: 'Live November 16', date: 'November 16' }
  const streamName = streamInfo.name

  const protocols = {
    rtmp: {
      url: 'rtmp://live.tencent.com/live',
      key: 'live_abc123xyz789def456',
    },
    rtmps: {
      url: 'rtmps://live.tencent.com/live',
      key: 'live_abc123xyz789def456',
    },
    srt: {
      url: 'srt://live.tencent.com:2935',
      key: 'live_abc123xyz789def456',
    },
    whip: {
      url: 'wss://live.tencent.com/whip',
      key: 'live_abc123xyz789def456',
    },
  }

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleReset = () => {
    // Handle reset stream key
    console.log('Reset stream key')
  }

  const embedCode = `<iframe src="https://stream.example.com/embed/abc123" width="640" height="360" frameborder="0" allowfullscreen></iframe>`
  const streamUrl = 'https://stream.example.com/live/abc123'

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Navigation */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Home className="h-5 w-5" />
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium">{streamName}</span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm font-medium transition-colors">
            Upgrade
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Record</span>
            <button
              onClick={() => setRecordEnabled(!recordEnabled)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                recordEnabled ? 'bg-primary-600' : 'bg-gray-600'
              }`}
            >
              <div
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  recordEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col p-8 overflow-y-auto">
          {/* Tencent Logo */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-semibold">Tencent</span>
              <button className="text-gray-400 hover:text-gray-300">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Connect Encoder Section - Centered */}
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-3xl">
              <h1 className="text-4xl font-bold mb-2">Connect your encoder</h1>
              <p className="text-gray-400 mb-8">Copy & paste links into your streaming software.</p>

            {/* Protocol Selection */}
            <div className="flex space-x-2 mb-6">
              {(['rtmp', 'rtmps', 'srt', 'whip'] as Protocol[]).map((proto) => (
                <button
                  key={proto}
                  onClick={() => setProtocol(proto)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    protocol === proto
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-750'
                  }`}
                >
                  {proto.toUpperCase()}
                  {proto === 'whip' && (
                    <span className="ml-2 px-1.5 py-0.5 bg-blue-500 text-white text-xs rounded">
                      BETA
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* URL Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">URL</label>
              <div className="flex">
                <input
                  type="text"
                  value={protocols[protocol].url}
                  readOnly
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  onClick={() => handleCopy(protocols[protocol].url, 'url')}
                  className="px-4 py-3 bg-gray-700 hover:bg-gray-600 border border-l-0 border-gray-700 rounded-r-lg transition-colors"
                >
                  {copied === 'url' ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Stream Key Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">Stream key</label>
              <div className="flex">
                <input
                  type={showStreamKey ? 'text' : 'password'}
                  value={protocols[protocol].key}
                  readOnly
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button
                  onClick={handleReset}
                  className="px-4 py-3 bg-gray-700 hover:bg-gray-600 border border-l-0 border-gray-700 text-sm font-medium transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={() => handleCopy(protocols[protocol].key, 'key')}
                  className="px-4 py-3 bg-gray-700 hover:bg-gray-600 border border-l-0 border-gray-700 rounded-r-lg transition-colors"
                >
                  {copied === 'key' ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <Copy className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Backup Stream Banner */}
            <div className="mb-6 p-4 bg-purple-900 border border-pink-500 rounded-lg flex items-center justify-between">
              <span className="text-sm">Running an important event? Get backup stream</span>
              <button className="text-gray-400 hover:text-gray-300">
                <X className="h-4 w-4" />
              </button>
            </div>

              {/* Help Link */}
              <div className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 cursor-pointer">
                <Play className="h-4 w-4" />
                <span className="text-sm">Explore how to connect OBS, Zoom, vMix</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Dynamic Content */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
          {activePanel === 'channels' && (
            <>
              {/* Channels Header */}
              <div className="p-6 border-b border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Your Channels</h2>
                  <button className="text-sm text-blue-400 hover:text-blue-300">
                    Paired Channels &gt;
                  </button>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 mb-6">
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                    <Plus className="h-5 w-5" />
                    <span>Add Channel</span>
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                    <Edit className="h-5 w-5" />
                    <span>Update Titles</span>
                  </button>
                </div>

                {/* Channel Status */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400">0 of 2 active</span>
                  <button className="text-sm text-blue-400 hover:text-blue-300">Get More</button>
                </div>

                {/* Toggle All */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm text-gray-400">Toggle all</span>
                  <div className="flex space-x-1 bg-gray-700 rounded-lg p-1">
                    <button className="px-3 py-1 bg-gray-600 text-white text-xs rounded">OFF</button>
                    <button className="px-3 py-1 text-gray-400 text-xs rounded hover:text-white">
                      ON
                    </button>
                  </div>
                </div>
              </div>

              {/* Channel List */}
              <div className="flex-1 overflow-y-auto p-6 pt-0">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-gray-700 rounded-lg">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        SW
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">f</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">Susie Wang</span>
                        <div className="flex items-center space-x-2">
                          <button className="text-sm text-gray-400 hover:text-gray-300">Edit</button>
                          <button
                            className={`relative w-10 h-6 rounded-full transition-colors ${
                              false ? 'bg-primary-600' : 'bg-gray-600'
                            }`}
                          >
                            <div
                              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                                false ? 'translate-x-5' : 'translate-x-0'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400">Live November 16</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                        <span className="text-xs text-gray-500">Offline</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activePanel === 'chat' && (
            <div className="flex-1 flex flex-col p-6">
              <h2 className="text-lg font-semibold mb-4">Chat</h2>
              
              {/* Chat Settings */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Enable Chat</h3>
                    <p className="text-xs text-gray-400">Allow viewers to send messages</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Moderate Chat</h3>
                    <p className="text-xs text-gray-400">Require approval for messages</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Slow Mode</h3>
                    <p className="text-xs text-gray-400">Limit message frequency</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>

              {/* Chat Preview */}
              <div className="flex-1 bg-gray-700 rounded-lg p-4 overflow-y-auto">
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      U1
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium">User123</span>
                        <span className="text-xs text-gray-400">2m ago</span>
                      </div>
                      <p className="text-sm text-gray-300">Great stream! Keep it up!</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      U2
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium">Viewer456</span>
                        <span className="text-xs text-gray-400">1m ago</span>
                      </div>
                      <p className="text-sm text-gray-300">Love the content! 🔥</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePanel === 'embed' && (
            <div className="flex-1 flex flex-col p-6">
              <h2 className="text-lg font-semibold mb-4">Embed</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Embed Code</label>
                  <div className="relative">
                    <textarea
                      value={embedCode}
                      readOnly
                      rows={4}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      onClick={() => handleCopy(embedCode, 'embed')}
                      className="absolute top-2 right-2 p-2 bg-gray-600 hover:bg-gray-500 rounded transition-colors"
                    >
                      {copied === 'embed' ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Copy and paste this code into your website</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Stream URL</label>
                  <div className="flex">
                    <input
                      type="text"
                      value={streamUrl}
                      readOnly
                      className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-l-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      onClick={() => handleCopy(streamUrl, 'stream-url')}
                      className="px-4 py-2 bg-gray-600 hover:bg-gray-500 border border-l-0 border-gray-600 rounded-r-lg transition-colors"
                    >
                      {copied === 'stream-url' ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="text-sm font-medium mb-3">Preview</h3>
                  <div className="bg-black rounded aspect-video flex items-center justify-center">
                    <div className="text-center text-white">
                      <Globe className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm opacity-75">Stream Preview</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activePanel === 'settings' && (
            <div className="flex-1 overflow-y-auto p-6">
              <h2 className="text-lg font-semibold mb-4">Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Stream Name</label>
                  <input
                    type="text"
                    defaultValue={streamName}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter stream description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Resolution</label>
                    <select 
                      defaultValue="1080p"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="720p">720p</option>
                      <option value="1080p">1080p</option>
                      <option value="1440p">1440p</option>
                      <option value="2160p">2160p (4K)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Bitrate (kbps)</label>
                    <input
                      type="number"
                      defaultValue="6000"
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Show Stream Key</h3>
                    <p className="text-xs text-gray-400">Display stream key in plain text</p>
                  </div>
                  <button
                    onClick={() => setShowStreamKey(!showStreamKey)}
                    className="p-2 hover:bg-gray-600 rounded transition-colors"
                  >
                    {showStreamKey ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors">
                  <Save className="h-5 w-5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Navigation Bar */}
        <div className="w-20 bg-gray-800 border-l border-gray-700 flex flex-col items-center py-6 space-y-8">
          <button
            onClick={() => setActivePanel('channels')}
            className={`p-3 rounded-lg transition-colors ${
              activePanel === 'channels' ? 'bg-primary-600' : 'hover:bg-gray-700'
            }`}
          >
            <div className="w-6 h-6 border-2 border-white rounded-full"></div>
            <span className="text-xs mt-1 block">Channels</span>
          </button>
          <button
            onClick={() => setActivePanel('chat')}
            className={`p-3 rounded-lg transition-colors ${
              activePanel === 'chat' ? 'bg-primary-600' : 'hover:bg-gray-700'
            }`}
          >
            <MessageSquare className="h-6 w-6" />
            <span className="text-xs mt-1 block">Chat</span>
          </button>
          <button
            onClick={() => setActivePanel('embed')}
            className={`p-3 rounded-lg transition-colors ${
              activePanel === 'embed' ? 'bg-primary-600' : 'hover:bg-gray-700'
            }`}
          >
            <Code className="h-6 w-6" />
            <span className="text-xs mt-1 block">Embed</span>
          </button>
          <button
            onClick={() => setActivePanel('settings')}
            className={`p-3 rounded-lg transition-colors ${
              activePanel === 'settings' ? 'bg-primary-600' : 'hover:bg-gray-700'
            }`}
          >
            <Settings className="h-6 w-6" />
            <span className="text-xs mt-1 block">Settings</span>
          </button>
          <div className="mt-auto">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">T</span>
            </div>
          </div>
        </div>
      </div>

      {/* Help Button */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
        <HelpCircle className="h-6 w-6" />
      </button>
    </div>
  )
}
