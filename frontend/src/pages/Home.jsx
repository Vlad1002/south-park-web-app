import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { episodesAPI } from '../services/api';

function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [episodes, setEpisodes] = useState([]);
  const [stats, setStats] = useState({
    totalEpisodes: 0,
    totalSeasons: 0,
    latestSeason: 0
  });
  const [loading, setLoading] = useState(true);

  // Fetch episodes pentru statistici
  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await episodesAPI.getAll();
      const episodesData = response.data;

      setEpisodes(episodesData);

      const seasons = [...new Set(episodesData.map(ep => Number(ep.season)))];

      setStats({
        totalEpisodes: episodesData.length,
        totalSeasons: seasons.length,
        latestSeason: Math.max(...seasons)
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRandomEpisode = () => {
    if (episodes.length > 0) {
      const randomIndex = Math.floor(Math.random() * episodes.length);
      const randomEpisode = episodes[randomIndex];
      navigate(`/episodes/${randomEpisode.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Navbar */}
      <nav className="bg-black bg-opacity-30 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🎬</div>
              <div>
                <h1 className="text-2xl font-bold text-white">South Park DB</h1>
                <p className="text-sm text-blue-200">Episode Database</p>
              </div>
            </div>

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
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          {/* Main Title */}
          <div className="mb-8">
            <div className="text-7xl mb-6 animate-bounce">🎭</div>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-4 tracking-tight">
              SOUTH PARK
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
              Episode Database
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
              Explore the complete collection of South Park episodes. Search, filter, and discover your favorite moments from the iconic animated series.
            </p>
          </div>

          {/* Stats Cards */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 border border-white border-opacity-20 hover:bg-opacity-20 transition-all">
                <div className="text-5xl font-black text-blue-400 mb-2">
                  {stats.totalEpisodes}
                </div>
                <div className="text-gray-300 font-semibold text-lg">
                  Total Episodes
                </div>
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 border border-white border-opacity-20 hover:bg-opacity-20 transition-all">
                <div className="text-5xl font-black text-purple-400 mb-2">
                  {stats.totalSeasons}
                </div>
                <div className="text-gray-300 font-semibold text-lg">
                  Seasons Available
                </div>
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-2xl p-8 border border-white border-opacity-20 hover:bg-opacity-20 transition-all">
                <div className="text-5xl font-black text-pink-400 mb-2">
                  S{stats.latestSeason}
                </div>
                <div className="text-gray-300 font-semibold text-lg">
                  Latest Season
                </div>
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate('/episodes')}
              className="group relative px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-xl font-bold rounded-xl shadow-2xl transition-all transform hover:scale-105 hover:shadow-blue-500/50"
            >
              <span className="flex items-center gap-3">
                🎬 Browse Episodes
              </span>
            </button>

            <button
              onClick={handleRandomEpisode}
              className="px-10 py-5 bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-md text-white text-xl font-bold rounded-xl border-2 border-white border-opacity-30 transition-all transform hover:scale-105"
            >
              <span className="flex items-center gap-3">
                🎲 Random Episode
              </span>
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl border border-white border-opacity-10">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-3">Advanced Search</h3>
            <p className="text-gray-300">
              Quickly find episodes by name with real-time search functionality
            </p>
          </div>

          <div className="text-center p-8 bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl border border-white border-opacity-10">
            <div className="text-5xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-white mb-3">Smart Filters</h3>
            <p className="text-gray-300">
              Filter episodes by season, year, and customize results per page
            </p>
          </div>

          <div className="text-center p-8 bg-white bg-opacity-5 backdrop-blur-sm rounded-2xl border border-white border-opacity-10">
            <div className="text-5xl mb-4">🎲</div>
            <h3 className="text-xl font-bold text-white mb-3">Random Discovery</h3>
            <p className="text-gray-300">
              Feeling adventurous? Discover random episodes with one click
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black bg-opacity-30 backdrop-blur-sm mt-20 py-8 border-t border-white border-opacity-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            South Park Episode Database - University Project 2025
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Built with React, Node.js, Express & MySQL
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
