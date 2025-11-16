import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Video, Grid3x3, Calendar, ArrowRight } from 'lucide-react'
import VideoPlaylistModal from './VideoPlaylistModal'

interface CreateStreamModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CreateStreamModal({ isOpen, onClose }: CreateStreamModalProps) {
  const navigate = useNavigate()
  const [showVideoPlaylist, setShowVideoPlaylist] = useState(false)

  if (!isOpen) return null

  const handleTencentStudio = () => {
    onClose()
    navigate('/tencent-studio')
  }

  const handleEncoderRTMP = () => {
    onClose()
    navigate('/encoder-rtmp')
  }

  const handleVideoPlaylist = () => {
    setShowVideoPlaylist(true)
  }

  const handleVideoPlaylistClose = () => {
    setShowVideoPlaylist(false)
    onClose()
  }

  const handleVideoPlaylistBack = () => {
    setShowVideoPlaylist(false)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900">Create a new stream</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Options */}
        <div className="p-6 space-y-4">
          {/* Tencent Studio */}
          <button
            onClick={handleTencentStudio}
            className="w-full p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all text-left group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                  <Video className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Tencent Studio</h3>
                  <p className="text-sm text-gray-500">Go live or record — from your browser.</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
            </div>
          </button>

          {/* Encoder | RTMP */}
          <button
            onClick={handleEncoderRTMP}
            className="w-full p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all text-left group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Grid3x3 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Encoder | RTMP</h3>
                  <p className="text-sm text-gray-500">Stream from OBS, Zoom, vMix, etc.</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
            </div>
          </button>

          {/* Video or Playlist */}
          <button
            onClick={handleVideoPlaylist}
            className="w-full p-6 bg-white border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all text-left group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Video or Playlist</h3>
                  <p className="text-sm text-gray-500">Schedule videos or stream recordings</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
            </div>
          </button>
        </div>
      </div>

      <VideoPlaylistModal
        isOpen={showVideoPlaylist}
        onClose={handleVideoPlaylistClose}
        onBack={handleVideoPlaylistBack}
      />
    </div>
  )
}
