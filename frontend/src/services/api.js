import axios from 'axios';
import { API_URL } from '../config';

// Configurare axios pentru a comunica cu backend-ul
const api = axios.create({
  baseURL: `${API_URL}/api`, // Backend API URL (din .env)
  timeout: 10000, // 10 secunde timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Functii pentru API calls
export const episodesAPI = {
  // GET toate episoadele
  getAll: () => api.get('/episodes'),

  // GET un episod specific
  getById: (id) => api.get(`/episodes/${id}`),

  // POST - adauga episod nou
  create: (episodeData) => api.post('/episodes', episodeData),

  // PUT - actualizeaza episod
  update: (id, episodeData) => api.put(`/episodes/${id}`, episodeData),

  // DELETE - sterge episod
  delete: (id) => api.delete(`/episodes/${id}`)
};

export default api;
