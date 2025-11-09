import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import EpisodeList from './components/EpisodeList'
import EpisodeDetail from './components/EpisodeDetail'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<EpisodeList />} />
            <Route path="/episodes/:id" element={<EpisodeDetail />} />
            <Route path="/login" element={<Login />} />

            {/* Protected routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
