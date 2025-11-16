import { useState } from 'react'
import { X, ArrowLeft, Video, List, ArrowRight, Upload, Check, MoreVertical } from 'lucide-react'

interface VideoPlaylistModalProps {
  isOpen: boolean
  onClose: () => void
  onBack: () => void
}

type ViewType = 'select' | 'video' | 'playlist'

interface VideoItem {
  id: string
  name: string
  duration: string
  thumbnail: string
}

export default function VideoPlaylistModal({ isOpen, onClose, onBack }: VideoPlaylistModalProps) {
  const [viewType, setViewType] = useState<ViewType>('select')
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [selectedVideos, setSelectedVideos] = useState<string[]>([])

  // Mock video data
  const videos: VideoItem[] = [
    { id: '1', name: 'live gaming.webm', duration: '00:00:09', thumbnail: '🎮' },
    { id: '2', name: 'tech demo.mp4', duration: '00:05:23', thumbnail: '💻' },
    { id: '3', name: 'music performance.mov', duration: '00:12:45', thumbnail: '🎵' },
  ]

  if (!isOpen) return null

  const handleVideoSelect = (videoId: string) => {
    if (viewType === 'video') {
      setSelectedVideo(videoId)
    } else if (viewType === 'playlist') {
      if (selectedVideos.includes(videoId)) {
        setSelectedVideos(selectedVideos.filter(id => id !== videoId))
      } else {
        setSelectedVideos([...selectedVideos, videoId])
      }
    }
  }

  const handleNext = () => {
    // Handle next step
    console.log('Next step', { viewType, selectedVideo, selectedVideos })
    onClose()
  }

  // Initial selection view
  if (viewType === 'select') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="mr-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h2 className="text-2xl font-semibold text-gray-900">Create a new stream</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Options */}
          <div className="p-6 space-y-4">
            {/* Video Option */}
            <button
              onClick={() => setViewType('video')}
              className="w-full p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all text-left group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <Video className="h-8 w-8 text-purple-600 z-10" />
                    <div className="absolute inset-0 bg-primary-600 bg-opacity-10"></div>
                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-primary-600 rounded flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Video</h3>
                    <p className="text-sm text-gray-500">Single video file</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
              </div>
            </button>

            {/* Playlist Option */}
            <button
              onClick={() => setViewType('playlist')}
              className="w-full p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all text-left group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <List className="h-8 w-8 text-purple-600 z-10" />
                    <div className="absolute inset-0 bg-primary-600 bg-opacity-10"></div>
                    <div className="absolute bottom-1 right-1 w-6 h-6 bg-primary-600 rounded flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Playlist</h3>
                    <p className="text-sm text-gray-500">List of multiple video files</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Video selection view
  if (viewType === 'video') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center">
              <button
                onClick={() => setViewType('select')}
                className="mr-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h2 className="text-2xl font-semibold text-gray-900">Select one video</h2>
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
            {/* Uploads Header */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-gray-600">Uploads {videos.length}/{videos.length + 2}</span>
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                <Upload className="h-5 w-5" />
                <span>Upload Video</span>
              </button>
            </div>

            {/* Video Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map((video) => {
                const isSelected = selectedVideo === video.id
                return (
                  <div
                    key={video.id}
                    onClick={() => handleVideoSelect(video.id)}
                    className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                      isSelected
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                      <div className="text-6xl">{video.thumbnail}</div>
                      {isSelected && (
                        <>
                          <div className="absolute inset-0 bg-primary-500 bg-opacity-30"></div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                              <Check className="h-10 w-10 text-primary-600" />
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Video Info */}
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 mb-1 truncate">{video.name}</h3>
                          <p className="text-sm text-gray-500">{video.duration}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle menu
                          }}
                          className="text-gray-400 hover:text-gray-600 ml-2 flex-shrink-0"
                        >
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleNext}
              disabled={!selectedVideo}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Playlist selection view
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <button
              onClick={() => setViewType('select')}
              className="mr-4 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Select multiple videos</h2>
              <p className="text-sm text-gray-500 mt-1">Build your playlist and schedule it to go live.</p>
            </div>
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
          {/* Uploads Header */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-gray-600">Uploads {videos.length}/{videos.length + 2}</span>
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              <Upload className="h-5 w-5" />
              <span>Upload Video</span>
            </button>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map((video) => {
              const isSelected = selectedVideos.includes(video.id)
              const order = isSelected ? selectedVideos.indexOf(video.id) + 1 : null
              return (
                <div
                  key={video.id}
                  onClick={() => handleVideoSelect(video.id)}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    isSelected
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
                    <div className="text-6xl">{video.thumbnail}</div>
                    {isSelected && (
                      <>
                        <div className="absolute inset-0 bg-primary-500 bg-opacity-30"></div>
                        <div className="absolute top-2 right-2 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                          {order}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Video Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 mb-1 truncate">{video.name}</h3>
                        <p className="text-sm text-gray-500">{video.duration}</p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          // Handle menu
                        }}
                        className="text-gray-400 hover:text-gray-600 ml-2 flex-shrink-0"
                      >
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-2">
            <Check className="h-5 w-5 text-gray-600" />
            <span className="text-sm text-gray-600">
              {selectedVideos.length} selected
            </span>
          </div>
          <button
            onClick={handleNext}
            disabled={selectedVideos.length === 0}
            className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
