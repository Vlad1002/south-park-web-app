# 💻 Setup Guide pentru Laptop / Alt Computer

Acest ghid te ajută să clonezi și să rulezi proiectul South Park Episodes pe un laptop nou pentru prezentare sau dezvoltare.

---

## 📋 Prerequisite (Instalări necesare pe laptop)

Verifică că ai instalate următoarele:

- [ ] **Node.js** (v16 sau mai nou) - [Download](https://nodejs.org/)
- [ ] **MySQL** (XAMPP sau MySQL Workbench) - [Download XAMPP](https://www.apachefriends.org/)
- [ ] **Git** - [Download](https://git-scm.com/)
- [ ] **Browser modern** (Chrome, Edge, Firefox)

**Verificare versiuni:**
```bash
node --version    # Ex: v18.17.0
npm --version     # Ex: 9.6.7
git --version     # Ex: git version 2.40.0
mysql --version   # Ex: mysql Ver 8.0.33
```

---

## 🚀 Setup Complet - Pas cu Pas

### **Partea 1: Clone Repository**

```bash
# 1. Deschide terminal/command prompt
# 2. Navighează unde vrei să salvezi proiectul
cd Desktop
# sau
cd Documents

# 3. Clone repository-ul
git clone https://github.com/Vlad1002/south-park-web-app.git

# 4. Intră în folder
cd south-park-web-app
```

---

### **Partea 2: Setup MySQL Database**

#### **Opțiunea A: Cu XAMPP (Recomandat)**

```bash
# 1. Pornește XAMPP Control Panel
# 2. Start MySQL service
# 3. Click pe "Admin" pentru phpMyAdmin
```

**În phpMyAdmin:**
1. Click pe "New" pentru a crea database nou
2. Nume database: `south_park_db`
3. Collation: `utf8mb4_general_ci`
4. Click "Create"

**Creează tabelul:**
```sql
USE south_park_db;

CREATE TABLE data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data JSON NOT NULL
);
```

#### **Opțiunea B: Cu MySQL Workbench**

```bash
# 1. Deschide MySQL Workbench
# 2. Conectează-te la localhost
# 3. Rulează următoarele comenzi:
```

```sql
CREATE DATABASE south_park_db;
USE south_park_db;

CREATE TABLE data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data JSON NOT NULL
);
```

---

### **Partea 3: Import Database Data**

#### **Dacă ai fișier de backup (`south_park_backup.sql`):**

**Metoda 1: Command Line**
```bash
mysql -u root -p south_park_db < south_park_backup.sql
# Introdu parola MySQL când îți cere
```

**Metoda 2: phpMyAdmin**
1. Selectează database `south_park_db`
2. Click pe tab "Import"
3. Choose File → selectează `south_park_backup.sql`
4. Click "Go"

**Metoda 3: MySQL Workbench**
1. Server → Data Import
2. Import from Self-Contained File
3. Selectează `south_park_backup.sql`
4. Start Import

#### **Dacă ai seed file în repository (`database/seed.sql`):**

```bash
mysql -u root -p south_park_db < database/seed.sql
```

---

### **Partea 4: Setup Backend**

```bash
# 1. Navighează în folderul backend
cd backend

# 2. Instalează dependințele
npm install

# 3. Creează fișierul .env
```

**Windows (Command Prompt):**
```bash
notepad .env
```

**Windows (PowerShell) sau Git Bash:**
```bash
nano .env
# sau
code .env
```

**Conținut fișier `.env`:**
```env
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
JWT_SECRET=south_park_secret_key_2025_super_secure
PORT=5000

# MySQL Configuration (ajustează dacă e nevoie)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=south_park_db
```

**Salvează și închide fișierul!**

---

### **Partea 5: Setup Frontend**

```bash
# 1. Navighează în folderul frontend (din root)
cd ../frontend

# 2. Instalează dependințele
npm install
```

---

### **Partea 6: Rulare Aplicație**

Ai nevoie de **2 terminale/command prompts deschise simultan**:

#### **Terminal 1 - Backend:**
```bash
cd backend
node server.js
```

**Output așteptat:**
```
Server is running on port 5000
Database connected successfully
```

#### **Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Output așteptat:**
```
VITE v5.0.0  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h + enter to show help
```

---

### **Partea 7: Testare Aplicație**

1. **Deschide browser:** `http://localhost:5173`
2. **Ar trebui să vezi:** Homepage cu gradient albastru-violet
3. **Testează:**
   - [ ] Click "Browse Episodes" → vezi lista de episoade
   - [ ] Click "Random Episode" → episod random
   - [ ] Click "Admin Login" → Login: `admin` / `admin123`
   - [ ] În Admin: Add, Edit, Delete episoade

---

## 🔧 Troubleshooting

### **Eroare: "Cannot connect to MySQL"**
```bash
# Verifică că MySQL rulează
# XAMPP: MySQL status = verde
# Task Manager: mysqld.exe running

# Verifică credențialele în .env
# Verifică că database-ul south_park_db există
```

### **Eroare: "Port 5000 already in use"**
```bash
# Windows - Găsește ce folosește portul:
netstat -ano | findstr :5000

# Omoară procesul:
taskkill /PID <PID_NUMBER> /F

# SAU schimbă portul în .env:
PORT=5001
```

### **Eroare: "Port 5173 already in use"**
```bash
# Omoară procesul Vite:
# Windows:
netstat -ano | findstr :5173
taskkill /PID <PID_NUMBER> /F
```

### **Eroare: "Module not found"**
```bash
# Re-instalează dependințele:
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../frontend
rm -rf node_modules package-lock.json
npm install
```

### **Baza de date e goală / nu sunt episoade**
```bash
# Import seed data:
mysql -u root -p south_park_db < database/seed.sql

# SAU adaugă episoade manual prin Admin Panel
```

---

## 📦 Export Database de pe PC Principal

**Înainte să pleci de acasă, exportă baza de date:**

```bash
# Windows (Command Prompt):
cd "C:\xampp\mysql\bin"
mysqldump -u root -p south_park_db > south_park_backup.sql

# Linux/Mac:
mysqldump -u root -p south_park_db > south_park_backup.sql
```

**Copiază `south_park_backup.sql` pe:**
- USB stick
- Google Drive
- Email către tine
- Push în repository (dacă imaginile nu sunt prea mari)

---

## ⚡ Quick Start Script (Windows)

**Creează `start.bat` în root folder:**

```batch
@echo off
echo Starting South Park Episodes App...
echo.

echo [1/2] Starting Backend Server...
start cmd /k "cd backend && node server.js"

timeout /t 3

echo [2/2] Starting Frontend...
start cmd /k "cd frontend && npm run dev"

echo.
echo ✅ Application starting...
echo 🌐 Frontend: http://localhost:5173
echo 🔧 Backend:  http://localhost:5000
echo.
echo Press any key to open browser...
pause > nul

start http://localhost:5173
```

**Rulare:**
```bash
# Double-click pe start.bat
# SAU
start.bat
```

---

## ✅ Checklist Pre-Prezentare

**Cu 15 minute înainte de prezentare:**

- [ ] MySQL pornit (XAMPP verde)
- [ ] Backend pornit (`node server.js`)
- [ ] Frontend pornit (`npm run dev`)
- [ ] Browser deschis pe `localhost:5173`
- [ ] Test login: `admin` / `admin123`
- [ ] Test CRUD: Adaugă un episod de test
- [ ] Test Search: Caută "Tweek"
- [ ] Test Filters: Filtrează Season 15
- [ ] Test Random Episode

**Backup plan:**
- [ ] Screenshot-uri cu aplicația funcțională
- [ ] Video demo de 2-3 minute
- [ ] Prezentare PowerPoint cu capturi de ecran

---

## 📝 Notes

- **Timpul de setup prima dată:** ~15-20 minute
- **Timpul de setup după prima configurare:** ~2 minute
- **Asigură-te că ai `.env` file** - NU e pe GitHub!
- **Testează tot înainte de prezentare!**

---

## 🆘 Contact Urgent

Dacă ceva nu funcționează înainte de prezentare:
1. Verifică că MySQL rulează
2. Verifică că `.env` există și e corect
3. Re-rulează `npm install` în ambele foldere
4. Restart terminal-urile

---

**Good Luck! 🚀**

Generat: 2025-01-09
Proiect: South Park Episodes Database
Autor: Vlad Stoica
