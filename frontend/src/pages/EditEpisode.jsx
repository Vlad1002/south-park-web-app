import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { episodesAPI } from '../services/api';
import { API_URL } from '../config';
import axios from 'axios';

function EditEpisode() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    season: '',
    episode: '',
    air_date: '',
    description: '',
    wiki_url: '',
    image: ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch episode data on mount
  useEffect(() => {
    fetchEpisode();
  }, [id]);

  const fetchEpisode = async () => {
    try {
      setFetchLoading(true);
      const response = await episodesAPI.getById(id);
      const episode = response.data;

      // Pre-fill form with existing data
      setFormData({
        name: episode.name || '',
        season: episode.season || '',
        episode: episode.episode || '',
        air_date: episode.air_date || '',
        description: episode.description || '',
        wiki_url: episode.wiki_url || '',
        image: episode.image || ''
      });
      setError('');
    } catch (err) {
      console.error('Error fetching episode:', err);
      setError('Failed to load episode. Please try again.');
    } finally {
      setFetchLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image upload si conversie la Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validare tip fisier
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    // Validare dimensiune (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setImageFile(file);

    // Convert to Base64
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        image: reader.result // Data URI cu Base64
      }));
    };
    reader.readAsDataURL(file);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validare
    if (!formData.name || !formData.season || !formData.episode) {
      setError('Name, Season, and Episode are required');
      setLoading(false);
      return;
    }

    try {
      // Trimite cu token JWT in header
      await axios.put(
        `${API_URL}/api/episodes/${id}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Success - redirect la admin dashboard
      navigate('/admin');
    } catch (err) {
      console.error('Error updating episode:', err);
      setError(err.response?.data?.error || 'Failed to update episode. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading episode...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/admin')}
            className="text-blue-600 hover:text-blue-800 font-medium mb-4 flex items-center gap-2"
          >
            <span>←</span> Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Edit Episode</h1>
          <p className="text-gray-600 mt-2">Update the episode details</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-8 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Episode Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., HUMANCENTiPAD"
            />
          </div>

          {/* Season & Episode */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Season <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="season"
                value={formData.season}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 15"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Episode Number <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="episode"
                value={formData.episode}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 1"
              />
            </div>
          </div>

          {/* Air Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Air Date
            </label>
            <input
              type="date"
              name="air_date"
              value={formData.air_date}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Episode description..."
            />
          </div>

          {/* Wiki URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Wiki URL
            </label>
            <input
              type="url"
              name="wiki_url"
              value={formData.wiki_url}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://southpark.fandom.com/wiki/..."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Episode Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              Max size: 5MB. Leave empty to keep existing image.
            </p>

            {/* Image Preview */}
            {formData.image && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Current Image:</p>
                <img
                  src={formData.image}
                  alt="Preview"
                  className="max-w-sm h-auto rounded-lg border border-gray-300"
                />
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating Episode...' : 'Update Episode'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEpisode;
