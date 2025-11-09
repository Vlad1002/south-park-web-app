import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { episodesAPI } from '../services/api';

function EpisodeList() {
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
      setError('Failed to load episodes. Make sure the backend is running on port 5000.');
    } finally {
      setLoading(false);
    }
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        South Park Episodes
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {episodes.map((episode) => (
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
    </div>
  );
}

export default EpisodeList;
