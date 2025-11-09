import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { episodesAPI } from '../services/api';
import axios from 'axios';

function AdminDashboard() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch episodes când componenta se montează
  useEffect(() => {
    fetchEpisodes();
  }, []);

  const fetchEpisodes = async () => {
    try {
      setLoading(true);
      const response = await episodesAPI.getAll();
      setEpisodes(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching episodes:', err);
      setError('Failed to load episodes');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleDelete = async (id, episodeName) => {
    if (!window.confirm(`Are you sure you want to delete "${episodeName}"?`)) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/episodes/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      // Success - refresh episodes list
      fetchEpisodes();
    } catch (err) {
      console.error('Error deleting episode:', err);
      alert(err.response?.data?.error || 'Failed to delete episode. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header cu logout */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-600">Welcome, {user?.username}!</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/episodes')}
              className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              View Episodes
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Add New Episode Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/admin/episodes/new')}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            Add New Episode
          </button>
        </div>

        {/* Episodes List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">
              Episode Management
            </h2>
            <p className="text-gray-600 mt-1">
              Total Episodes: {episodes.length}
            </p>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="text-xl text-gray-600">Loading episodes...</div>
            </div>
          ) : error ? (
            <div className="p-12 text-center">
              <div className="text-red-600">{error}</div>
            </div>
          ) : episodes.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-gray-600">No episodes found. Add your first episode!</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Season
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Episode
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Air Date
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {episodes.map((episode) => (
                    <tr key={episode.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {episode.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {episode.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {episode.season}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {episode.episode}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {episode.air_date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => navigate(`/admin/episodes/${episode.id}/edit`)}
                          className="text-blue-600 hover:text-blue-900 font-medium mr-4"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(episode.id, episode.name)}
                          className="text-red-600 hover:text-red-900 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
