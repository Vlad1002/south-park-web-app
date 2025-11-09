import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { episodesAPI } from '../services/api';

function EpisodeDetail() {
  const { id } = useParams(); // Obține ID-ul din URL
  const navigate = useNavigate();
  const [episode, setEpisode] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEpisode();
  }, [id]);

  const fetchEpisode = async () => {
    try {
      setLoading(true);
      const response = await episodesAPI.getById(id);
      setEpisode(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching episode:', err);
      setError('Episode not found or backend is not running.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading episode details...</div>
      </div>
    );
  }

  if (error || !episode) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg max-w-lg mb-4">
          {error || 'Episode not found'}
        </div>
        <Link
          to="/episodes"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Episodes List
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header cu Navigation Buttons */}
      <div className="mb-6 flex gap-4 flex-wrap">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-800 font-medium transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Home
        </button>

        <button
          onClick={() => navigate('/episodes')}
          className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Episodes List
        </button>
      </div>

      {/* Card principal cu detalii episod */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Imagine mare */}
        {episode.image && (
          <div className="w-full bg-gray-100 flex justify-center py-6 px-8">
            <img
              src={episode.image}
              alt={episode.name}
              className="w-full max-w-3xl h-auto rounded-lg shadow-md"
            />
          </div>
        )}

        {/* Informații episod */}
        <div className="p-8">
          {/* Titlu */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {episode.name}
          </h1>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <span className="text-gray-600 text-sm">Season</span>
              <p className="text-blue-600 font-bold text-lg">{episode.season}</p>
            </div>

            <div className="bg-blue-50 px-4 py-2 rounded-lg">
              <span className="text-gray-600 text-sm">Episode</span>
              <p className="text-blue-600 font-bold text-lg">{episode.episode}</p>
            </div>

            <div className="bg-gray-50 px-4 py-2 rounded-lg">
              <span className="text-gray-600 text-sm">Air Date</span>
              <p className="text-gray-900 font-semibold text-lg">{episode.air_date}</p>
            </div>
          </div>

          {/* Descriere completă */}
          {episode.description && (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                Description
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                {episode.description}
              </p>
            </div>
          )}

          {/* Link către Wiki */}
          {episode.wiki_url && (
            <div className="pt-6 border-t border-gray-200">
              <a
                href={episode.wiki_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                View on South Park Wiki
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EpisodeDetail;
