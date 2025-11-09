import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
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
              onClick={() => navigate('/')}
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
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Episode Management
          </h2>
          <p className="text-gray-600 mb-6">
            Here you will be able to add, edit, and delete episodes.
          </p>

          {/* Placeholder pentru CRUD operations */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">🎬</div>
              <h3 className="font-semibold text-gray-900 mb-2">Add Episode</h3>
              <p className="text-sm text-gray-600">Coming soon...</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">✏️</div>
              <h3 className="font-semibold text-gray-900 mb-2">Edit Episodes</h3>
              <p className="text-sm text-gray-600">Coming soon...</p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">🗑️</div>
              <h3 className="font-semibold text-gray-900 mb-2">Delete Episodes</h3>
              <p className="text-sm text-gray-600">Coming soon...</p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> CRUD operations will be implemented in the next sprint.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
