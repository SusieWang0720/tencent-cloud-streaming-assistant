import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Users, Camera, Mic, HelpCircle, LogOut } from 'lucide-react'

export default function TencentStudio() {
  const navigate = useNavigate()
  const [cameraAllowed, setCameraAllowed] = useState(false)

  const handleAllowAccess = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      setCameraAllowed(true)
      // Stop the stream immediately, we just needed permission
      stream.getTracks().forEach(track => track.stop())
    } catch (error) {
      console.error('Error accessing camera/microphone:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="absolute top-6 left-6">
        <h1 className="text-xl font-semibold">Tencent | Studio</h1>
      </div>

      <div className="flex h-screen">
        {/* Left Side - Stream Information */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-2xl flex flex-col items-center text-center">
            {/* User Info */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                SW
              </div>
              <div>
                <p className="text-sm text-gray-400">shuoxin wang, you're hosting this stream</p>
              </div>
            </div>

            {/* Stream Title */}
            <h2 className="text-4xl font-bold mb-6">Live with Tencent, November 16</h2>

            {/* Copy Invite Link */}
            <button className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors mb-8">
              <Users className="h-5 w-5" />
              <span>Copy Invite Link</span>
            </button>

            {/* Copyright */}
            <p className="text-sm text-gray-500 mt-auto">© 2025 Tencent, Inc. All Rights Reserved.</p>
          </div>
        </div>

        {/* Right Side - Camera Access Card */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Accessing your camera</h3>
            
            {/* Video Preview Area */}
            <div className="w-full bg-gray-800 rounded-lg aspect-video mb-6 flex items-center justify-center">
              {cameraAllowed ? (
                <div className="text-center text-white">
                  <Camera className="h-16 w-16 mx-auto mb-2 opacity-50" />
                  <p className="text-sm opacity-75">Camera Preview</p>
                </div>
              ) : (
                <Camera className="h-16 w-16 text-white opacity-30" />
              )}
            </div>

            <p className="text-sm text-gray-600 mb-6">
              Studio needs access to your camera and microphone.
            </p>

            <button
              onClick={handleAllowAccess}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors mb-4"
            >
              Allow mic/cam access
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                You're logged in as <span className="font-medium">susie000720@gmail.com</span>.{' '}
                <button className="text-blue-600 hover:text-blue-700">
                  Log out
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Help Button */}
      <button className="fixed bottom-6 right-6 w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors">
        <HelpCircle className="h-6 w-6" />
      </button>

      {/* Tencent Logo */}
      <div className="fixed bottom-6 right-24 w-8 h-8 bg-red-600 rounded flex items-center justify-center">
        <span className="text-white font-bold text-sm">T</span>
      </div>
    </div>
  )
}

