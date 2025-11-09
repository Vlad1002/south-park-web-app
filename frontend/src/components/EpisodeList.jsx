import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { episodesAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

function EpisodeList() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
      setError('Failed to load episodes. Make sure the backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  // Get unique seasons for filter dropdown
  const uniqueSeasons = [...new Set(episodes.map(ep => Number(ep.season)))].sort((a, b) => a - b);

  // Get unique years from air_date for filter dropdown
  const uniqueYears = [...new Set(episodes.map(ep => {
    if (ep.air_date) {
      return new Date(ep.air_date).getFullYear();
    }
    return null;
  }).filter(year => year !== null))].sort((a, b) => a - b);

  // Filter episodes based on search and filters
  const filteredEpisodes = episodes.filter(episode => {
    const matchesSearch = episode.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeason = selectedSeason === '' || episode.season.toString() === selectedSeason;
    const matchesYear = selectedYear === '' || (episode.air_date && new Date(episode.air_date).getFullYear().toString() === selectedYear);

    return matchesSearch && matchesSeason && matchesYear;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredEpisodes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEpisodes = filteredEpisodes.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedSeason, selectedYear, itemsPerPage]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSeason('');
    setSelectedYear('');
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading episodes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg max-w-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo / Brand */}
            <div className="flex items-center gap-3">
              <div className="text-3xl">🎬</div>
              <div>
                <h1 className="text-2xl font-bold text-white">South Park Episodes</h1>
                <p className="text-sm text-blue-100">Browse all episodes</p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold px-5 py-3 rounded-lg transition-colors backdrop-blur-sm border border-white border-opacity-30"
              >
                <span>🏠</span>
                <span>Home</span>
              </button>

              <button
                onClick={() => navigate(isAuthenticated() ? '/admin' : '/login')}
                className="flex items-center gap-2 bg-white hover:bg-gray-100 text-blue-600 font-semibold px-6 py-3 rounded-lg transition-colors shadow-md"
              >
                {isAuthenticated() ? (
                  <>
                    <span>📊</span>
                    <span>Dashboard</span>
                  </>
                ) : (
                  <>
                    <span>🔒</span>
                    <span>Admin Login</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search & Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🔍 Search Episodes
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by episode name..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Season Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Season
              </label>
              <select
                value={selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Seasons</option>
                {uniqueSeasons.map(season => (
                  <option key={season} value={season}>Season {season}</option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year
              </label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Years</option>
                {uniqueYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Items Per Page */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Per Page
              </label>
              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={10}>10 episodes</option>
                <option value={25}>25 episodes</option>
                <option value={50}>50 episodes</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex justify-between items-center text-sm text-gray-600 border-t pt-4">
            <span>
              Showing {startIndex + 1}-{Math.min(endIndex, filteredEpisodes.length)} of {filteredEpisodes.length} episodes
            </span>
            {(searchQuery || selectedSeason || selectedYear) && (
              <span className="text-blue-600 font-medium">
                Filters active
              </span>
            )}
          </div>
        </div>

      {/* Episodes Grid */}
      {currentEpisodes.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No episodes found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
          <button
            onClick={clearFilters}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentEpisodes.map((episode) => (
          <div
            key={episode.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            {episode.image && (
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center overflow-hidden">
                <img
                  src={episode.image}
                  alt={episode.name}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="text-gray-500">Image not available</div>';
                  }}
                />
              </div>
            )}

            <div className="p-5">
              <h3 className="text-xl font-bold text-blue-600 mb-2">
                {episode.name}
              </h3>

              <p className="text-gray-600 font-semibold mb-1">
                Season {episode.season}, Episode {episode.episode}
              </p>

              <p className="text-gray-400 text-sm mb-3">
                {episode.air_date}
              </p>

              {episode.description && (
                <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-3">
                  {episode.description}
                </p>
              )}

              <div className="flex gap-3 flex-wrap">
                <Link
                  to={`/episodes/${episode.id}`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
                >
                  View Details →
                </Link>

                {episode.wiki_url && (
                  <a
                    href={episode.wiki_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-blue-600 hover:text-blue-800 font-medium text-sm px-4 py-2 border border-blue-600 rounded-lg transition-colors"
                  >
                    Wiki →
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex justify-center items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
              // Show first page, last page, current page, and pages around current
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (
                page === currentPage - 2 ||
                page === currentPage + 2
              ) {
                return <span key={page} className="px-2 py-2 text-gray-500">...</span>;
              }
              return null;
            })}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next →
          </button>
        </div>
      )}
      </>
      )}
      </div>
    </div>
  );
}

export default EpisodeList;
