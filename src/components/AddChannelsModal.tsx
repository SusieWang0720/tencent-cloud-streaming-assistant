import { useState } from 'react'
import { X, ArrowLeft } from 'lucide-react'

interface AddChannelsModalProps {
  isOpen: boolean
  onClose: () => void
}

interface ChannelOption {
  id: string
  name: string
  badge?: 'upgrade' | 'new' | 'live'
  icon?: string
}

const channelOptions: ChannelOption[] = [
  // Row 1
  { id: 'youtube', name: 'YouTube' },
  { id: 'facebook', name: 'Facebook Live', badge: 'live' },
  { id: 'linkedin', name: 'LinkedIn' },
  { id: 'twitch', name: 'Twitch' },
  { id: 'kick', name: 'Kick' },
  
  // Row 2
  { id: 'instagram', name: 'Instagram' },
  { id: 'x', name: 'X' },
  { id: 'tiktok', name: 'TikTok Live', badge: 'live' },
  { id: 'rumble', name: 'Rumble' },
  { id: 'trovo', name: 'Trovo' },
  
  // Row 3
  { id: 'custom-rtmp', name: 'Custom RTMP', badge: 'upgrade' },
  { id: 'custom-srt', name: 'Custom SRT', badge: 'upgrade' },
  { id: 'mux', name: 'Mux', badge: 'new' },
  { id: 'substack', name: 'Substack', badge: 'new' },
  { id: 'amazon', name: 'Amazon Live' },
  
  // Row 4
  { id: 'telegram', name: 'Telegram' },
  { id: 'dlive', name: 'DLive' },
  { id: 'mixcloud', name: 'Mixcloud' },
  { id: 'soop', name: 'SOOP' },
  { id: 'naver', name: 'Naver TV' },
  
  // Additional platforms from second image
  { id: 'vaughn', name: 'Vaughn Live' },
  { id: 'steam', name: 'Steam' },
  { id: 'dailymotion', name: 'Dailymotion' },
  { id: 'nimo', name: 'Nimo TV' },
  { id: 'picarto', name: 'Picarto.TV' },
  
  { id: 'fc2', name: 'FC2 Live' },
  { id: 'breakers', name: 'Breakers.TV' },
  { id: 'bilibili', name: 'Bilibili' },
  { id: 'nonolive', name: 'Nonolive' },
  { id: 'kakao', name: 'kakaoTV' },
  
  { id: 'mlg', name: 'Major League Gaming' },
  { id: 'douyu', name: 'Douyu' },
  { id: 'huya', name: 'Huya' },
  { id: 'zhanqi', name: 'Zhanqi.tv' },
]

export default function AddChannelsModal({ isOpen, onClose }: AddChannelsModalProps) {
  const [selectedChannels, setSelectedChannels] = useState<string[]>([])

  if (!isOpen) return null

  const handleChannelClick = (channelId: string) => {
    if (selectedChannels.includes(channelId)) {
      setSelectedChannels(selectedChannels.filter(id => id !== channelId))
    } else {
      setSelectedChannels([...selectedChannels, channelId])
    }
  }

  const handleAdd = () => {
    // Handle adding selected channels
    console.log('Adding channels:', selectedChannels)
    onClose()
    setSelectedChannels([])
  }

  const getChannelIcon = (channelId: string) => {
    // Return platform-specific text/logo representation
    const iconMap: Record<string, { text: string; style?: string }> = {
      youtube: { text: '▶' },
      facebook: { text: 'f' },
      linkedin: { text: 'in' },
      twitch: { text: 'twitch', style: 'font-normal' },
      kick: { text: 'KICK', style: 'text-[8px]' },
      instagram: { text: '📷' },
      x: { text: 'X', style: 'font-bold' },
      tiktok: { text: '🎵' },
      rumble: { text: '▶' },
      trovo: { text: 'trovo', style: 'font-normal' },
      telegram: { text: '✈' },
      dlive: { text: '🎭' },
      mixcloud: { text: 'M-XCLOUD', style: 'text-[8px] font-normal' },
      soop: { text: 'SOOP', style: 'text-[8px] font-normal' },
      naver: { text: '▶' },
      steam: { text: '⚙' },
      dailymotion: { text: 'DAILYMOTION', style: 'text-[7px] italic font-normal' },
      nimo: { text: '🐦' },
      picarto: { text: '▶' },
      fc2: { text: '🦄' },
      breakers: { text: 'BREAKERS', style: 'text-[8px] font-normal' },
      bilibili: { text: 'bilibili', style: 'text-[9px] font-normal' },
      nonolive: { text: '📹' },
      kakao: { text: 'kakao', style: 'text-[8px] font-normal' },
      mlg: { text: 'MLG', style: 'font-bold' },
      douyu: { text: '🐟' },
      huya: { text: '🐯' },
      zhanqi: { text: 'ZQ', style: 'font-bold' },
      amazon: { text: 'amazon', style: 'text-[8px] font-normal' },
      mux: { text: 'MUX', style: 'font-bold' },
      substack: { text: 'substack', style: 'text-[8px] font-normal' },
      vaughn: { text: '[V]', style: 'font-normal' },
    }
    const icon = iconMap[channelId] || { text: channelId.toUpperCase().substring(0, 2) }
    return icon
  }

  const getChannelColor = (channelId: string) => {
    const colorMap: Record<string, string> = {
      youtube: 'bg-red-500',
      facebook: 'bg-blue-500',
      linkedin: 'bg-blue-600',
      twitch: 'bg-purple-500',
      kick: 'bg-black',
      instagram: 'bg-gradient-to-br from-purple-500 to-orange-500',
      x: 'bg-black',
      tiktok: 'bg-black',
      rumble: 'bg-green-500',
      trovo: 'bg-green-600',
      telegram: 'bg-blue-400',
      dlive: 'bg-yellow-500',
      mixcloud: 'bg-purple-600',
      soop: 'bg-blue-500',
      naver: 'bg-green-500',
      steam: 'bg-blue-700',
      dailymotion: 'bg-blue-500',
      nimo: 'bg-blue-500',
      picarto: 'bg-green-500',
      fc2: 'bg-red-500',
      breakers: 'bg-black',
      bilibili: 'bg-blue-500',
      nonolive: 'bg-red-500',
      kakao: 'bg-yellow-400',
      mlg: 'bg-black',
      douyu: 'bg-orange-500',
      huya: 'bg-orange-500',
      zhanqi: 'bg-blue-500',
      amazon: 'bg-orange-500',
      mux: 'bg-black',
      substack: 'bg-orange-500',
    }
    return colorMap[channelId] || 'bg-gray-500'
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <button
              onClick={onClose}
              className="mr-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <h2 className="text-2xl font-semibold text-gray-900">Add new channels</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-5 gap-3">
            {channelOptions.map((channel) => {
              const isSelected = selectedChannels.includes(channel.id)
              const iconColor = getChannelColor(channel.id)
              
              return (
                <button
                  key={channel.id}
                  onClick={() => handleChannelClick(channel.id)}
                  className={`relative p-3 bg-white border rounded-lg transition-all hover:shadow-md ${
                    isSelected
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  {/* Badge */}
                  {channel.badge && (
                    <div
                      className={`absolute top-1.5 left-1.5 px-1.5 py-0.5 text-[10px] font-bold rounded ${
                        channel.badge === 'upgrade'
                          ? 'bg-purple-500 text-white'
                          : channel.badge === 'new'
                          ? 'bg-blue-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}
                    >
                      {channel.badge === 'upgrade' ? 'UPGRADE' : channel.badge === 'new' ? 'NEW' : 'LIVE'}
                    </div>
                  )}

                  {/* Icon */}
                  <div className="flex flex-col items-center justify-center min-h-[80px] pt-2">
                    <div
                      className={`w-14 h-14 ${iconColor} rounded-lg flex items-center justify-center text-white mb-3`}
                    >
                      <span className={`text-center leading-tight ${getChannelIcon(channel.id).style || 'font-bold text-xs'}`}>
                        {getChannelIcon(channel.id).text}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-gray-900 text-center leading-tight">
                      {channel.name}
                    </span>
                  </div>

                  {/* Selection indicator */}
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            {selectedChannels.length > 0
              ? `${selectedChannels.length} channel${selectedChannels.length > 1 ? 's' : ''} selected`
              : 'Select channels to add'}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              disabled={selectedChannels.length === 0}
              className="px-6 py-2 text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Add {selectedChannels.length > 0 && `(${selectedChannels.length})`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

