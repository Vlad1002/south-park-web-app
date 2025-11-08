import axios from 'axios';

// Configurare axios pentru a comunica cu backend-ul
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend API URL
  timeout: 10000, // 10 secunde timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Funcții pentru API calls
export const episodesAPI = {
  // GET toate episoadele
  getAll: () => api.get('/episodes'),

  // GET un episod specific
  getById: (id) => api.get(`/episodes/${id}`),

  // POST - adaugă episod nou
  create: (episodeData) => api.post('/episodes', episodeData),

  // PUT - actualizează episod
  update: (id, episodeData) => api.put(`/episodes/${id}`, episodeData),

  // DELETE - șterge episod
  delete: (id) => api.delete(`/episodes/${id}`)
};

export default api;
