const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

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

// GET /api/episodes - Listează toate episoadele
app.get('/api/episodes', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM data');

    // Transformăm datele pentru a include id și data JSON
    const episodes = rows.map(row => ({
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
    const [rows] = await db.query('SELECT * FROM data WHERE id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Episode not found' });
    }

    const episode = {
      id: rows[0].id,
      ...rows[0].data
    };

    res.json(episode);
  } catch (error) {
    console.error('Error fetching episode:', error);
    res.status(500).json({ error: 'Failed to fetch episode' });
  }
});

// POST /api/episodes - Adaugă un episod nou
app.post('/api/episodes', async (req, res) => {
  try {
    const episodeData = req.body;

    // Validare simplă
    if (!episodeData.name || !episodeData.season || !episodeData.episode) {
      return res.status(400).json({ error: 'Name, season, and episode are required' });
    }

    const [result] = await db.query(
      'INSERT INTO data (data) VALUES (?)',
      [episodeData]
    );

    res.status(201).json({
      message: 'Episode created successfully',
      id: result.insertId
    });
  } catch (error) {
    console.error('Error creating episode:', error);
    res.status(500).json({ error: 'Failed to create episode' });
  }
});

// PUT /api/episodes/:id - Actualizează un episod
app.put('/api/episodes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const episodeData = req.body;

    // Verifică dacă episodul există
    const [existing] = await db.query('SELECT * FROM data WHERE id = ?', [id]);
    if (existing.length === 0) {
      return res.status(404).json({ error: 'Episode not found' });
    }

    await db.query(
      'UPDATE data SET data = ? WHERE id = ?',
      [episodeData, id]
    );

    res.json({ message: 'Episode updated successfully' });
  } catch (error) {
    console.error('Error updating episode:', error);
    res.status(500).json({ error: 'Failed to update episode' });
  }
});

// DELETE /api/episodes/:id - Șterge un episod
app.delete('/api/episodes/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query('DELETE FROM data WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
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
