import { useState } from 'react'
import { X, ArrowLeft, Grid3x3, Copy, Check, Save } from 'lucide-react'

interface EncoderRTMPModalProps {
  isOpen: boolean
  onClose: () => void
  onBack: () => void
}

export default function EncoderRTMPModal({ isOpen, onClose, onBack }: EncoderRTMPModalProps) {
  const [formData, setFormData] = useState({
    streamName: '',
    description: '',
  })
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Encoder RTMP stream created:', formData)
    onClose()
  }

  const rtmpUrl = 'rtmp://live.example.com/live'
  const streamKey = 'live_abc123xyz789'

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Encoder | RTMP</h2>
              <p className="text-sm text-gray-500 mt-1">Stream from OBS, Zoom, vMix, etc.</p>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stream Name *
            </label>
            <input
              type="text"
              required
              value={formData.streamName}
              onChange={(e) => setFormData({ ...formData, streamName: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter stream name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter stream description"
            />
          </div>

          {/* RTMP Settings */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 space-y-4">
            <div className="flex items-start space-x-3">
              <Grid3x3 className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-900 mb-3">RTMP Connection Details</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      RTMP URL
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        value={rtmpUrl}
                        readOnly
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg bg-white font-mono text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => handleCopy(rtmpUrl)}
                        className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 transition-colors"
                      >
                        {copied ? (
                          <Check className="h-5 w-5 text-green-600" />
                        ) : (
                          <Copy className="h-5 w-5 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Stream Key
                    </label>
                    <div className="flex">
                      <input
                        type="password"
                        value={streamKey}
                        readOnly
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg bg-white font-mono text-sm"
                      />
                      <button
                        type="button"
                        onClick={() => handleCopy(streamKey)}
                        className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-200 transition-colors"
                      >
                        {copied ? (
                          <Check className="h-5 w-5 text-green-600" />
                        ) : (
                          <Copy className="h-5 w-5 text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-3">
                  Use these credentials in OBS Studio, Zoom, vMix, or any RTMP-compatible encoder.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              type="submit"
              className="flex items-center px-6 py-2 text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Save className="h-5 w-5 mr-2" />
              Create Stream
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

