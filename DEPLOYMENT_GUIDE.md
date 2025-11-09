# South Park Episodes - Deployment Guide

## 📋 Cuprins
1. [Reinițializare PostgreSQL Database pe Render](#1-reinițializare-postgresql-database-pe-render)
2. [Reconectare Backend la Database Nou](#2-reconectare-backend-la-database-nou)
3. [Setup MySQL Local (pentru prezentare)](#3-setup-mysql-local-pentru-prezentare)
4. [Verificare Deployment Complete](#4-verificare-deployment-complete)

---

## 1. Reinițializare PostgreSQL Database pe Render

### Pas 1.1: Creează Database Nou
1. Du-te la [Render Dashboard](https://dashboard.render.com/)
2. Click pe **"New +"** → **"PostgreSQL"**
3. Configurare:
   - **Name**: `south-park-db` (sau alt nume)
   - **Database**: `south_park_db`
   - **User**: `south_park_db_user` (generat automat)
   - **Region**: **Frankfurt (EU Central)** (același cu backend-ul)
   - **PostgreSQL Version**: **17** (sau ultima versiune)
   - **Plan**: **Free**
4. Click **"Create Database"**
5. **Așteaptă 2-3 minute** până database-ul este creat

### Pas 1.2: Copiază Connection String
1. După ce database-ul este creat, du-te la **Info** tab
2. Găsește **"Internal Database URL"**
3. **Copiază** URL-ul (arată cam așa):
   ```
   postgresql://south_park_db_user:PASSWORD@dpg-xxxxx-a/south_park_db
   ```
4. **Salvează-l** într-un notepad temporar

### Pas 1.3: Importă Date în Database
1. Deschide **Command Prompt** (CMD) pe Windows
2. Setează parola (înlocuiește `YOUR_PASSWORD` cu parola din connection string):
   ```bash
   set PGPASSWORD=YOUR_PASSWORD
   ```
3. Rulează comanda psql pentru import (înlocuiește `YOUR_HOST` și `YOUR_DATABASE`):
   ```bash
   psql -h YOUR_HOST -U south_park_db_user -d YOUR_DATABASE -f seed.sql
   ```

   **Exemplu concret:**
   ```bash
   psql -h dpg-d489d9re5dus73c3o4bg-a.frankfurt-postgres.render.com -U south_park_db_user -d south_park_db -f seed.sql
   ```

4. Ar trebui să vezi:
   ```
   CREATE TABLE
   INSERT 0 1
   INSERT 0 1
   INSERT 0 1
   INSERT 0 1
   INSERT 0 1
   ```

### Pas 1.4: Verifică Import
```bash
psql -h YOUR_HOST -U south_park_db_user -d YOUR_DATABASE -c "SELECT COUNT(*) FROM data;"
```

Ar trebui să returneze `5` (dacă ai 5 episoade în seed.sql).

---

## 2. Reconectare Backend la Database Nou

### Pas 2.1: Update Environment Variables
1. Du-te la [Render Dashboard](https://dashboard.render.com/)
2. Click pe **Web Service** (`south-park-web-app`)
3. Click pe **"Environment"** în sidebar
4. Găsește variabila **`DATABASE_URL`**
5. Click **"Edit"** și înlocuiește cu **Internal Database URL** nou (din Pas 1.2)
6. Click **"Save Changes"**

### Pas 2.2: Redeploy Backend
1. Render va face **auto-deploy** după ce salvezi variabilele
2. SAU click manual pe **"Manual Deploy"** → **"Deploy latest commit"**
3. Așteaptă 2-3 minute până deployment-ul se termină
4. Verifică în **Logs** că serverul pornește fără erori:
   ```
   Server is running on port 10000
   Your service is live 🎉
   ```

### Pas 2.3: Testează Backend
1. Deschide browser și accesează:
   ```
   https://south-park-web-app.onrender.com/api/episodes
   ```
2. Ar trebui să vezi episoadele în format JSON
3. **Notă**: Prima accesare durează 30-50 secunde (backend-ul se trezește din sleep)

---

## 3. Setup MySQL Local (pentru prezentare)

### Pas 3.1: Verifică Branch-ul Git
```bash
git branch --show-current
```
- Ar trebui să fii pe **`main`** sau **`develop`**
- Dacă nu, schimbă cu:
  ```bash
  git checkout main
  ```

### Pas 3.2: Configurează .env pentru MySQL
1. Deschide fișierul `backend/.env`
2. Asigură-te că are următoarele variabile:
   ```env
   # Admin Credentials
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=admin123

   # JWT Secret
   JWT_SECRET=south_park_secret_key_2025_super_secure

   # Server Configuration
   PORT=5000

   # MySQL Database Configuration (for local development)
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=YOUR_MYSQL_PASSWORD
   DB_NAME=south_park_db
   ```
3. **IMPORTANT**: Înlocuiește `YOUR_MYSQL_PASSWORD` cu parola ta MySQL

### Pas 3.3: Creează Database MySQL
1. Deschide **MySQL Workbench** sau **Command Prompt**
2. Conectează-te la MySQL:
   ```bash
   mysql -u root -p
   ```
3. Creează database-ul:
   ```sql
   CREATE DATABASE south_park_db;
   USE south_park_db;
   ```
4. Ieși din MySQL:
   ```sql
   EXIT;
   ```

### Pas 3.4: Importă Date în MySQL
```bash
mysql -u root -p south_park_db < south_park_episodes.sql
```

### Pas 3.5: Pornește Serverul Local
```bash
cd backend
node server.js
```

Ar trebui să vezi:
```
Server is running on port 5000
```

### Pas 3.6: Testează Local
1. Deschide browser: `http://localhost:5000/api/episodes`
2. Ar trebui să vezi episoadele

---

## 4. Verificare Deployment Complete

### 4.1: Verifică Backend Live
```
https://south-park-web-app.onrender.com/api/episodes
```
- Ar trebui să returneze JSON cu episoade
- Prima accesare: așteaptă 30-60 secunde

### 4.2: Verifică Frontend Live
```
https://south-park-web-app.vercel.app
```
- Testează **"Browse Episodes"**
- Testează **"Random Episode"**
- Testează **"Admin Login"** (admin / admin123)

### 4.3: Verifică Local
```
http://localhost:3000 (frontend)
http://localhost:5000 (backend)
```

---

## 🔧 Troubleshooting

### Problemă: Backend returnează "Database not found"
**Soluție:** Verifică că DATABASE_URL în Environment Variables este corect și că ai importat seed.sql.

### Problemă: Frontend returnează "Failed to fetch"
**Soluție:**
1. Backend-ul se trezește din sleep (așteaptă 30-60 secunde)
2. Reîncarcă pagina (F5)
3. Verifică că VITE_API_URL în Vercel este setat corect

### Problemă: MySQL local nu se conectează
**Soluție:**
1. Verifică că MySQL server rulează
2. Verifică parola în `backend/.env`
3. Verifică că database-ul `south_park_db` există

### Problemă: "Access denied for user 'root'@'localhost'"
**Soluție:** Parola MySQL în `.env` este greșită. Actualizează `DB_PASSWORD`.

---

## 📝 Note Importante

### Free Tier Render - Limitări
- **Spin Down**: Backend-ul se oprește după **15 minute** fără trafic
- **Spin Up**: Durează **30-50 secunde** să se trezească
- **Database Expiry**: Database-ul gratuit expiră după **90 zile** (3 luni)
- **Soluție**: Urmează pașii din acest ghid pentru reinițializare

### Git Branching Strategy
- **`main`** sau **`develop`**: Pentru lucru local cu MySQL
- **`feature/postgresql-conversion`**: Pentru production (Render + Vercel)

### Environment Variables

**Backend (Render):**
- `DATABASE_URL`: Connection string PostgreSQL
- `ADMIN_USERNAME`: admin
- `ADMIN_PASSWORD`: admin123
- `JWT_SECRET`: south_park_secret_key_2025_super_secure
- `NODE_ENV`: production

**Frontend (Vercel):**
- `VITE_API_URL`: https://south-park-web-app.onrender.com

---

## 📞 Link-uri Utile

- **Render Dashboard**: https://dashboard.render.com/
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Backend Live**: https://south-park-web-app.onrender.com
- **Frontend Live**: https://south-park-web-app.vercel.app
- **GitHub Repo**: https://github.com/Vlad1002/south-park-web-app

---

## ✅ Checklist Final

- [ ] Database PostgreSQL creat și configurat
- [ ] seed.sql importat în PostgreSQL
- [ ] Backend deploiat pe Render
- [ ] Environment variables setate corect
- [ ] Frontend deploiat pe Vercel
- [ ] Aplicație live testată și funcțională
- [ ] MySQL local configurat pentru prezentare
- [ ] Git repository actualizat

---

🎉 **Succes cu aplicația!**
