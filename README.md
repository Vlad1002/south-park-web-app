# 🎬 South Park Episodes Database

> A full-stack web application for browsing and managing South Park episodes with advanced search, filtering, and pagination capabilities.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)
![React](https://img.shields.io/badge/react-18.2.0-blue)
![MySQL](https://img.shields.io/badge/mysql-8.0-orange)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

South Park Episodes Database is a modern web application built as a university project for the Web Technologies course. The application provides a comprehensive platform for browsing South Park episodes with features like advanced search, filtering by season/year, pagination, and a secure admin panel for content management.

**Key Highlights:**
- 🔐 Secure JWT-based authentication
- 🎨 Beautiful gradient UI with Tailwind CSS
- 🔍 Real-time search functionality
- 📊 Smart filters (Season, Year)
- 📄 Pagination with customizable page size
- 🎲 Random episode discovery
- 🖼️ Base64 image storage (no external hosting needed)
- 📱 Fully responsive design

---

## ✨ Features

### Public Features
- **Homepage**: Stunning landing page with live statistics
- **Browse Episodes**: Grid view of all available episodes
- **Search Bar**: Real-time search by episode name
- **Filters**: Filter by season and air date year
- **Pagination**: Navigate through episodes with 10/25/50 items per page
- **Episode Details**: Comprehensive detail page for each episode
- **Random Episode**: Discover random episodes with one click
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### Admin Features (Protected)
- **Secure Login**: JWT-based authentication
- **Add Episodes**: Create new episodes with image upload (converts to Base64)
- **Edit Episodes**: Modify existing episode information
- **Delete Episodes**: Remove episodes with confirmation dialog
- **Dashboard**: Overview of all episodes with management tools

---

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js (v16+)
- **Framework**: Express.js
- **Database**: MySQL 8.0
- **Authentication**: JSON Web Tokens (JWT)
- **Libraries**:
  - `mysql2` - MySQL client with promises support
  - `body-parser` - Request body parsing
  - `cors` - Cross-origin resource sharing
  - `dotenv` - Environment variable management

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v3
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **State Management**: React Context API

### Development Tools
- **Version Control**: Git & GitHub
- **Code Editor**: VS Code
- **API Testing**: Postman / Thunder Client
- **Database Management**: MySQL Workbench / phpMyAdmin

---

## 📸 Screenshots

### Homepage
![Homepage](./docs/screenshots/homepage.png)
*Beautiful gradient homepage with live statistics and CTA buttons*

### Episodes List with Search & Filters
![Episodes List](./docs/screenshots/episodes-list.png)
*Advanced search bar, season/year filters, and pagination*

### Episode Detail Page
![Episode Detail](./docs/screenshots/episode-detail.png)
*Comprehensive episode information with navigation*

### Admin Dashboard
![Admin Dashboard](./docs/screenshots/admin-dashboard.png)
*Secure admin panel for CRUD operations*

### Add/Edit Episode Form
![Add Episode](./docs/screenshots/add-episode.png)
*Form with Base64 image upload and preview*

---

## 🚀 Installation

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MySQL** (v8.0 or higher) - [Download](https://dev.mysql.com/downloads/)
- **Git** - [Download](https://git-scm.com/)

### Step 1: Clone Repository

```bash
git clone https://github.com/Vlad1002/south-park-web-app.git
cd south-park-web-app
```

### Step 2: Setup Database

**Option A: Using MySQL Workbench**

```sql
-- Create database
CREATE DATABASE south_park_db;
USE south_park_db;

-- Create table
CREATE TABLE data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data JSON NOT NULL
);

-- Import seed data (optional)
SOURCE database/seed.sql;
```

**Option B: Using Command Line**

```bash
mysql -u root -p
```

```sql
CREATE DATABASE south_park_db;
USE south_park_db;
SOURCE database/init.sql;
```

### Step 3: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your configuration
# ADMIN_USERNAME=admin
# ADMIN_PASSWORD=admin123
# JWT_SECRET=south_park_secret_key_2025_super_secure
# PORT=5000
```

### Step 4: Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install
```

---

## 💻 Usage

### Development Mode

Open **two terminal windows**:

**Terminal 1 - Backend:**
```bash
cd backend
node server.js
```

Expected output:
```
Server is running on port 5000
Database connected successfully
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v5.0.0  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Access Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

### Admin Credentials

```
Username: admin
Password: admin123
```

---

## 📚 API Documentation

### Public Endpoints

#### Get All Episodes
```http
GET /api/episodes
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "HUMANCENTiPAD",
    "season": 15,
    "episode": 1,
    "air_date": "2011-04-27",
    "description": "Kyle is intimately involved...",
    "image": "data:image/jpeg;base64,...",
    "wiki_url": "https://southpark.fandom.com/wiki/HUMANCENTiPAD"
  }
]
```

#### Get Episode by ID
```http
GET /api/episodes/:id
```

**Response:**
```json
{
  "id": 1,
  "name": "HUMANCENTiPAD",
  "season": 15,
  "episode": 1,
  "air_date": "2011-04-27",
  "description": "...",
  "image": "data:image/jpeg;base64,...",
  "wiki_url": "..."
}
```

### Authentication

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "username": "admin",
    "role": "admin"
  }
}
```

### Protected Endpoints (Require JWT Token)

**Authorization Header:**
```
Authorization: Bearer <token>
```

#### Create Episode
```http
POST /api/episodes
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Episode Name",
  "season": 20,
  "episode": 5,
  "air_date": "2025-01-01",
  "description": "Episode description",
  "wiki_url": "https://...",
  "image": "data:image/jpeg;base64,..."
}
```

#### Update Episode
```http
PUT /api/episodes/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  ...
}
```

#### Delete Episode
```http
DELETE /api/episodes/:id
Authorization: Bearer <token>
```

---

## 📁 Project Structure

```
south-park-web-app/
├── backend/
│   ├── node_modules/
│   ├── .env                    # Environment variables (not in git)
│   ├── .env.example            # Example env file
│   ├── authMiddleware.js       # JWT authentication middleware
│   ├── db.js                   # MySQL connection configuration
│   ├── package.json
│   └── server.js               # Express server with API routes
│
├── frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EpisodeDetail.jsx
│   │   │   ├── EpisodeList.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── AddEpisode.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── EditEpisode.jsx
│   │   │   ├── Home.jsx
│   │   │   └── Login.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── database/
│   ├── init.sql                # Database initialization
│   └── seed.sql                # Sample data
│
├── docs/
│   └── screenshots/            # Application screenshots
│
├── .gitignore
├── DOCUMENTATION.md            # Full project documentation
├── README.md                   # This file
├── ROADMAP.md                  # Project roadmap
└── SETUP_LAPTOP.md             # Setup guide for different computers
```

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Homepage loads with correct statistics
- [ ] Browse Episodes shows all episodes
- [ ] Search functionality works in real-time
- [ ] Season filter shows correct episodes
- [ ] Year filter shows correct episodes
- [ ] Pagination navigates correctly
- [ ] Random Episode redirects to random episode detail
- [ ] Episode detail page displays all information
- [ ] Admin login works with correct credentials
- [ ] Add Episode creates new episode with Base64 image
- [ ] Edit Episode updates existing episode
- [ ] Delete Episode removes episode after confirmation
- [ ] All navigation links work correctly
- [ ] Responsive design works on mobile/tablet

---

## 🌐 Deployment

### Deploy to Render.com

1. **Create Account**: Sign up at [Render.com](https://render.com)

2. **Deploy Database**:
   - Create new PostgreSQL/MySQL instance
   - Note connection details

3. **Deploy Backend**:
   - New Web Service
   - Connect GitHub repository
   - Build command: `cd backend && npm install`
   - Start command: `node backend/server.js`
   - Add environment variables

4. **Deploy Frontend**:
   - New Static Site
   - Build command: `cd frontend && npm install && npm run build`
   - Publish directory: `frontend/dist`

**Detailed deployment guide**: See [DEPLOYMENT.md](./docs/DEPLOYMENT.md)

---

## 🤝 Contributing

This is a university project, but feedback and suggestions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Vlad Stoica**
- GitHub: [@Vlad1002](https://github.com/Vlad1002)
- Email: vladstoica102@gmail.com

---

## 🙏 Acknowledgments

- **Professor**: Bogdan Florea (bogdan.florea@upb.ro)
- **Course**: Web Technologies - University Politehnica of Bucharest
- **AI Assistant**: Claude Code (Anthropic) - Used for code generation, debugging, and documentation
- **Design Inspiration**: South Park Fandom Wiki
- **Data Source**: South Park episode information

---

## 📖 Additional Documentation

- [DOCUMENTATION.md](./DOCUMENTATION.md) - Full project documentation (5 chapters)
- [ROADMAP.md](./ROADMAP.md) - Project roadmap and sprint planning
- [SETUP_LAPTOP.md](./SETUP_LAPTOP.md) - Detailed setup guide for different computers
- [API_DOCS.md](./docs/API_DOCS.md) - Complete API reference

---

## 🐛 Known Issues

- Base64 images can make response payloads large (consider pagination)
- No rate limiting implemented on API endpoints
- Admin credentials are hardcoded (should use database for production)

---

## 🔮 Future Enhancements

- [ ] User registration and multiple admin accounts
- [ ] Comments system for episodes
- [ ] Rating/favorites functionality
- [ ] Character database integration
- [ ] Episode video player integration
- [ ] Dark mode toggle
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

---

**⭐ If you like this project, please give it a star on GitHub!**

**Made with ❤️ and Claude Code**
