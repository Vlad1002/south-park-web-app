# South Park Episodes Web App — Full Stack Project Guide for ClaudeCode (MySQL Version)

## 🎯 Objective
Build a full-stack web app to manage South Park episodes using:
- **Backend:** Node.js + Express + MySQL
- **Frontend:** React + Axios + React Router
- **Database:** south_park_episodes.sql (MySQL format cu JSON)
- **Hosting:** Render.com (one full Node.js server)
- **Images:** Stored in Base64 format (în JSON)
- **Auth:** Simple admin login (hardcoded credentials)
- **⭐ IMPORTANT: Folosim BEST PRACTICES peste tot** - cod clean, error handling, validare, separare logică, convenții de naming

---

## ⚙️ Backend Requirements (Node + Express + MySQL)

### 1. Setup
- Create `backend/` folder with Express project.
- Install dependencies:
  ```bash
  npm init -y
  npm install express cors mysql2 body-parser
  ```
- MySQL database name: `south_park_episodes`
- Table: `episodes` (cu coloană JSON)

### 2. Database Connection
- Create file `db.js`:
  ```js
  const mysql = require('mysql2');

  const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // schimbă cu parola ta MySQL
    database: 'south_park_episodes',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  // Folosim promise wrapper pentru async/await
  const promisePool = pool.promise();

  module.exports = promisePool;
  ```

### 3. Import Database
- Creează baza de date și importă fișierul SQL:
  ```bash
  mysql -u root -p
  CREATE DATABASE south_park_episodes;
  USE south_park_episodes;
  SOURCE south_park_episodes.sql;
  ```
- Structura tabelului:
  ```
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT
  data JSON - conține:
    {
      "name": "Titlu episod",
      "season": 15,
      "episode": 1,
      "air_date": "2011-04-27",
      "rating": 8.5,
      "description": "Descriere...",
      "image": "data:image/png;base64,...",
      "wiki_url": "https://..."
    }
  ```

### 4. API Routes
| Method | Endpoint | Description |
|--------|-----------|-------------|
| GET | /api/episodes | List episodes (with pagination, search, filter) |
| GET | /api/episodes/:id | Get one episode |
| POST | /api/episodes | Add new episode |
| PUT | /api/episodes/:id | Edit existing episode |
| DELETE | /api/episodes/:id | Delete episode |
| POST | /api/login | Admin login (username: admin, password: admin123) |

### 5. Middleware
- Enable CORS and JSON parsing.
- Add `authMiddleware.js` for token check on admin routes.

### 6. Serving Frontend
After building React (`npm run build`), serve `/frontend/build` as static:
```js
app.use(express.static('frontend/build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
});
```

---

## 🎨 Frontend Requirements (React + Vite)

### 1. Setup
- Create `frontend/`:
  ```bash
  npm create vite@latest frontend --template react
  cd frontend
  npm install axios react-router-dom bootstrap
  ```

### 2. Pages
| File | Description |
|------|--------------|
| `Home.jsx` | Display episodes with pagination, search, filter |
| `EpisodeDetail.jsx` | Detailed info for an episode |
| `Login.jsx` | Admin login |
| `Dashboard.jsx` | Admin panel for CRUD operations |

### 3. Components
| File | Description |
|------|--------------|
| `EpisodeCard.jsx` | Card layout for episode |
| `Pagination.jsx` | Page navigation |
| `FilterBar.jsx` | Buttons/dropdowns for filtering by season |

### 4. Functionality
- Use Axios for all API calls.
- Store login token in localStorage.
- Protect Dashboard route (redirect if not logged in).
- Convert uploaded images to Base64 before POST/PUT.

---

## 🧠 Optional AI Feature
Use sentiment analysis for episode descriptions:
```bash
npm install sentiment
```
Endpoint:
```
POST /api/sentiment
```
Returns: `"positive"`, `"negative"`, or `"neutral"`.

---

## 🧪 Testing Plan
- Verify all CRUD API routes.
- Test pagination and filtering in frontend.
- Confirm Base64 images display correctly.
- Ensure Dashboard routes require login.

---

## 🚀 Deployment (Render.com)
1. Push project to GitHub.
2. Connect repo to Render.com.
3. Creează un MySQL database pe Render (sau folosește alt provider ca PlanetScale/Railway).
4. Build command:
   ```
   npm install && cd frontend && npm install && npm run build && cd ..
   ```
5. Start command:
   ```
   npm start
   ```
6. Environment variables:
   ```
   DB_HOST=your-mysql-host
   DB_USER=your-mysql-user
   DB_PASSWORD=your-mysql-password
   DB_NAME=south_park_episodes
   PORT=10000
   ```

---

## 📦 Final Deliverables
- Working React + Express + MySQL app on Render
- CRUD dashboard + admin login
- Public episode list with pagination, search, filter
- Base64 image storage (în format JSON)
- Optional AI sentiment analysis
- Documentation (`README.md`) with setup and screenshots

---

## 🧭 Claude Instructions
Claude, you should:
1. Create all required files (backend + frontend).
2. Implement endpoints and React pages exactly as described.
3. Use MySQL connection with JSON data structure (see `db.js`).
4. Generate clean, minimal code with Bootstrap UI.
5. Query JSON fields using MySQL JSON functions (JSON_EXTRACT, JSON_SEARCH, etc.).
6. Test everything locally (`npm run dev` + `node backend/app.js`).
7. Prepare final version for Render deploy.
