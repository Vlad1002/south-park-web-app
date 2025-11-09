const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('./db');
const authenticateToken = require('./authMiddleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Permite frontend-ului să comunice cu backend-ul
app.use(bodyParser.json({ limit: '50mb' })); // Parsează JSON (50mb pentru imagini base64)
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'South Park Episodes API is running!' });
});

// POST /api/auth/login - Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  // Validare input
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  // Verificare credențiale (hardcoded în .env)
  if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
    // Generare JWT token
    const token = jwt.sign(
      { username: username, role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '24h' } // Token valabil 24 ore
    );

    return res.json({
      message: 'Login successful',
      token: token,
      user: { username: username, role: 'admin' }
    });
  } else {
    return res.status(401).json({ error: 'Invalid username or password' });
  }
});

// GET /api/episodes - Listează toate episoadele
app.get('/api/episodes', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM data');

    // Transformăm datele pentru a include id și data JSON
    const episodes = result.rows.map(row => ({
      id: row.id,
      ...row.data
    }));

    res.json(episodes);
  } catch (error) {
    console.error('Error fetching episodes:', error);
    res.status(500).json({ error: 'Failed to fetch episodes' });
  }
});

// GET /api/episodes/:id - Obține un episod specific
app.get('/api/episodes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query('SELECT * FROM data WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Episode not found' });
    }

    const episode = {
      id: result.rows[0].id,
      ...result.rows[0].data
    };

    res.json(episode);
  } catch (error) {
    console.error('Error fetching episode:', error);
    res.status(500).json({ error: 'Failed to fetch episode' });
  }
});

// POST /api/episodes - Adaugă un episod nou (PROTEJAT - necesită autentificare)
app.post('/api/episodes', authenticateToken, async (req, res) => {
  try {
    const episodeData = req.body;

    // Validare simplă
    if (!episodeData.name || !episodeData.season || !episodeData.episode) {
      return res.status(400).json({ error: 'Name, season, and episode are required' });
    }

    const result = await db.query(
      'INSERT INTO data (data) VALUES ($1) RETURNING id',
      [JSON.stringify(episodeData)]
    );

    res.status(201).json({
      message: 'Episode created successfully',
      id: result.rows[0].id
    });
  } catch (error) {
    console.error('Error creating episode:', error);
    res.status(500).json({ error: 'Failed to create episode' });
  }
});

// PUT /api/episodes/:id - Actualizează un episod (PROTEJAT - necesită autentificare)
app.put('/api/episodes/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const episodeData = req.body;

    // Verifică dacă episodul există
    const existing = await db.query('SELECT * FROM data WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Episode not found' });
    }

    await db.query(
      'UPDATE data SET data = $1 WHERE id = $2',
      [JSON.stringify(episodeData), id]
    );

    res.json({ message: 'Episode updated successfully' });
  } catch (error) {
    console.error('Error updating episode:', error);
    res.status(500).json({ error: 'Failed to update episode' });
  }
});

// DELETE /api/episodes/:id - Șterge un episod (PROTEJAT - necesită autentificare)
app.delete('/api/episodes/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await db.query('DELETE FROM data WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Episode not found' });
    }

    res.json({ message: 'Episode deleted successfully' });
  } catch (error) {
    console.error('Error deleting episode:', error);
    res.status(500).json({ error: 'Failed to delete episode' });
  }
});

// Pornește serverul
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
