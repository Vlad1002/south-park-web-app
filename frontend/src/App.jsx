import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import EpisodeList from './components/EpisodeList'
import EpisodeDetail from './components/EpisodeDetail'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<EpisodeList />} />
          <Route path="/episodes/:id" element={<EpisodeDetail />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
