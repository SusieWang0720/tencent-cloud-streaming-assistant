import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Channels from './pages/Channels'
import Clips from './pages/Clips'
import Analytics from './pages/Analytics'
import Storage from './pages/Storage'
import History from './pages/History'
import StreamDetail from './pages/StreamDetail'
import TencentStudio from './pages/TencentStudio'
import EncoderRTMP from './pages/EncoderRTMP'

function App() {
  return (
    <Router basename="/tencent-cloud-streaming-assistant">
      <Routes>
        {/* Pages without Layout */}
        <Route path="/tencent-studio" element={<TencentStudio />} />
        <Route path="/encoder-rtmp" element={<EncoderRTMP />} />
        <Route path="/encoder-rtmp/:streamId" element={<EncoderRTMP />} />
        
        {/* Pages with Layout */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/channels" element={<Channels />} />
              <Route path="/clips" element={<Clips />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/storage" element={<Storage />} />
              <Route path="/history" element={<History />} />
              <Route path="/stream/:id" element={<StreamDetail />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  )
}

export default App

