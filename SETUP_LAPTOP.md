# Setup Guide

Quick setup guide for running the project on a new machine.

## Prerequisites

- Node.js (v16+)
- MySQL
- Git

## Setup Steps

### 1. Clone Repository

```bash
git clone https://github.com/Vlad1002/south-park-web-app.git
cd south-park-web-app
```

### 2. Database Setup

```bash
# Start MySQL
brew services start mysql   # macOS
# or start XAMPP on Windows

# Create database and import data
mysql -u root -e "CREATE DATABASE south_park_db;"
mysql -u root south_park_db < south_park_episodes.sql
```

### 3. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
JWT_SECRET=south_park_secret_key_2025_super_secure
PORT=5001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=south_park_db
```

### 4. Frontend Setup

```bash
cd ../frontend
npm install
```

## Running the Application

**Terminal 1 - Backend:**
```bash
cd backend
node server.js
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Open:** http://localhost:5173

**Admin login:** `admin` / `admin123`

## Troubleshooting

| Issue | Solution |
|-------|----------|
| MySQL not running | `brew services start mysql` |
| Port 5000 in use | Change PORT to 5001 in .env |
| Module not found | Delete `node_modules` and run `npm install` again |