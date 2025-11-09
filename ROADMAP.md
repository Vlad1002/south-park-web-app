# South Park Episodes - Project Roadmap

## 📊 Status Curent

### ✅ Completat (Sesiunea 1)
- [x] Setup proiect monorepo (backend + frontend)
- [x] Backend Express + MySQL cu CRUD API
- [x] Bază de date MySQL cu 3 episoade (imagini Base64)
- [x] Frontend React + Vite + Tailwind CSS
- [x] Componentă EpisodeList pentru afișare episoade
- [x] Git workflow (main → develop → feature branches)
- [x] GitHub repository cu PR-uri

### 🔄 În Progress
- [ ] React Router pentru navigare între pagini

---

## 🎯 Cerințe Obligatorii Proiect

### 1. Panou de Control Admin
**Cerință:** Panou accesibil doar pe baza unui cont de utilizator

**Tasks:**
- [ ] **Autentificare**
  - [ ] Backend: endpoint `/api/auth/login` (username + password hardcoded)
  - [ ] Backend: JWT token generation
  - [ ] Backend: middleware pentru protejare rute admin
  - [ ] Frontend: pagină de Login
  - [ ] Frontend: salvare token în localStorage
  - [ ] Frontend: redirect la login dacă nu ești autentificat

- [ ] **CRUD Operations în Admin Panel**
  - [ ] Pagină Admin Dashboard cu listă episoade
  - [ ] Formular pentru ADĂUGARE episod nou (cu upload imagine Base64)
  - [ ] Formular pentru EDITARE episod existent
  - [ ] Buton pentru ȘTERGERE episod (cu confirmare)
  - [ ] Toate operațiile trebuie să funcționeze cu imagini Base64

**Prioritate:** HIGH
**Estimare:** 4-6 ore

---

### 2. Frontend Public - Funcționalități

#### 2.1 React Router (Navigare)
**Cerință:** Pagini separate pentru listă și detalii

**Rute necesare:**
```
/ - Homepage cu lista de episoade
/episodes/:id - Pagina de detaliu pentru un episod
/admin - Panou de control (protejat cu autentificare)
/admin/login - Pagina de login
/admin/episodes/new - Adaugă episod nou
/admin/episodes/:id/edit - Editează episod
```

**Tasks:**
- [ ] Instalează React Router DOM (✅ deja instalat)
- [ ] Configurează BrowserRouter în App.jsx
- [ ] Creează componente pentru fiecare pagină
- [ ] Implementează navigare între pagini
- [ ] Protected routes pentru admin

**Prioritate:** HIGH
**Estimare:** 2-3 ore

---

#### 2.2 Paginare
**Cerință:** Afișare date cu funcție de paginare și selectare număr elemente

**Tasks:**
- [ ] Backend: modifică GET `/api/episodes` să accepte query params:
  - `?page=1&limit=10`
  - returnează: `{ data: [...], total: 50, page: 1, totalPages: 5 }`
- [ ] Frontend: componentă Pagination
- [ ] Frontend: dropdown pentru selectare număr elemente (10, 20, 50)
- [ ] Frontend: butoane Previous/Next și numerotare pagini

**Prioritate:** MEDIUM
**Estimare:** 2-3 ore

---

#### 2.3 Căutare Generală (Search Bar)
**Cerință:** Căutare text în campuri relevante din baza de date

**Câmpuri relevante pentru căutare:**
- `name` (numele episodului)
- `description` (descrierea episodului)
- `season` (sezonul)
- `episode` (numărul episodului)

**Tasks:**
- [ ] Backend: modifică GET `/api/episodes` să accepte `?search=text`
  - Implementează query SQL cu LIKE pentru căutare în JSON
- [ ] Frontend: input Search bar în header
- [ ] Frontend: debounce pentru search (nu căuta la fiecare tastă)
- [ ] Frontend: afișare rezultate în timp real

**Prioritate:** MEDIUM
**Estimare:** 2-3 ore

---

#### 2.4 Filtrare pe Butoane
**Cerință:** Filtrare pe baza unor butoane asociate cu campuri relevante

**Filtre necesare:**
- **Season** (Sezon 4, 15, 19, etc.)
- **Air Date** (Year: 2000, 2011, 2015)
- **Clear Filters** (resetare toate filtrele)

**Tasks:**
- [ ] Backend: modifică GET `/api/episodes` să accepte:
  - `?season=15`
  - `?year=2011`
  - Multiple filtre combinate
- [ ] Frontend: butoane pentru filtrare după sezon
- [ ] Frontend: dropdown sau butoane pentru anul difuzării
- [ ] Frontend: combină paginare + search + filtre
- [ ] Frontend: Clear all filters button

**Prioritate:** MEDIUM
**Estimare:** 3-4 ore

---

#### 2.5 Pagină de Detaliu
**Cerință:** Fiecare element are o pagină unde sunt prezentate toate informațiile

**Informații de afișat:**
- Imagine mare (Base64)
- Titlu episod
- Sezon și număr episod
- Data difuzării
- Descriere completă (nu truncată)
- Link către Wiki
- (Optional) Informații suplimentare

**Tasks:**
- [ ] Frontend: componentă EpisodeDetail.jsx
- [ ] Frontend: rutare către `/episodes/:id`
- [ ] Frontend: fetch date pentru un singur episod
- [ ] Frontend: design atractiv pentru pagina de detaliu
- [ ] Frontend: buton "Back to List"

**Prioritate:** HIGH
**Estimare:** 2-3 ore

---

## 🚀 Deployment

### 3.1 Hosting
**Opțiuni:**
- **Render.com** (recomandat, free tier)
- **Railway.app** (alternativă)
- **Vercel** (frontend) + **Railway** (backend + DB)

**Tasks:**
- [ ] Deploy backend pe Render
- [ ] Deploy MySQL database (ClearDB sau PlanetScale)
- [ ] Deploy frontend pe Render (servit de Express)
- [ ] Configurare variabile de mediu (environment variables)
- [ ] Test aplicație deployed

**Prioritate:** MEDIUM (după ce toate features sunt gata)
**Estimare:** 2-3 ore

---

### 3.2 Git Repository pentru Profesor
**Cerință:** Proiect încărcat pe GitLab (sau similar) + adăugat profesor ca Maintainer

**Tasks:**
- [ ] Verifică că tot codul e pe GitHub (✅ deja făcut)
- [ ] (Opțional) Migrează pe GitLab dacă se cere explicit
- [ ] Adaugă `bogdan.florea@upb.ro` ca Maintainer
- [ ] Scrie README.md complet cu instrucțiuni de rulare
- [ ] Creează tag pentru versiunea finală (`v1.0.0`)

**Prioritate:** HIGH (înainte de deadline)
**Estimare:** 1 oră

---

## 📝 Documentație (10 puncte)

### 4. Documentație Proiect
**Format:** PDF sau Markdown

**Capitole obligatorii:**

#### 4.1 Descrierea Generală a Proiectului
- Ce face aplicația?
- Context și motivație
- Funcționalități principale

#### 4.2 Tehnologii Utilizate
- **Backend:** Node.js, Express, MySQL, mysql2, body-parser, cors
- **Frontend:** React, Vite, Tailwind CSS, axios, react-router-dom
- **Database:** MySQL 8.0
- **Version Control:** Git, GitHub
- **Deployment:** Render.com (sau altă platformă)
- **Development Tools:** VS Code, MySQL Workbench, Postman (pentru testare API)

#### 4.3 Structura Datelor
**Tabelul `data`:**
```sql
CREATE TABLE `data` (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
  data JSON
);
```

**Câmpuri JSON:**
- `name` (string) - Numele episodului
- `season` (number) - Numărul sezonului
- `episode` (number) - Numărul episodului
- `air_date` (string, format: YYYY-MM-DD) - Data difuzării
- `description` (string) - Descrierea episodului
- `image` (string, Base64 Data URI) - Imaginea episodului
- `wiki_url` (string) - Link către pagina Wiki

#### 4.4 Utilizarea Inteligenței Artificiale
**Detaliere obligatorie:** Cum a fost folosit AI-ul (Claude, ChatGPT, etc.)

**Exemple de utilizare:**
- Design și structurare aplicație
- Generare cod backend (API endpoints, error handling)
- Generare cod frontend (componente React, styling Tailwind)
- Debugging și rezolvare erori (JSON parsing, Git workflow)
- Optimizare cod și best practices
- Scriere documentație

**IMPORTANT:** Trebuie să fii onest și să detaliezi exact cum a fost folosit AI-ul!

#### 4.5 Concluzii
- Ce am învățat din proiect?
- Dificultăți întâmpinate și soluții implementate
- Îmbunătățiri viitoare

**Tasks:**
- [ ] Scrie fiecare capitol
- [ ] Adaugă diagrame (arhitectură, flow-uri)
- [ ] Adaugă screenshot-uri din aplicație
- [ ] Review și corectare gramaticală
- [ ] Export în PDF

**Prioritate:** HIGH (înainte de deadline)
**Estimare:** 4-6 ore

---

## 📅 Planning și Priorități

### Sprint 1 (Sesiunea 2) - React Router + Pagină Detaliu
**Obiectiv:** Navigare între pagini
- [ ] Configurare React Router
- [ ] Pagină de detaliu pentru episod
- [ ] Navigare între listă și detaliu

**Estimare:** 3-4 ore

---

### Sprint 2 - Autentificare + Admin Panel (CRUD)
**Obiectiv:** Panou de control funcțional
- [ ] Backend: Login API + JWT
- [ ] Frontend: Pagină login
- [ ] Frontend: Admin dashboard
- [ ] CRUD operations (Add, Edit, Delete)

**Estimare:** 6-8 ore

---

### Sprint 3 - Search + Filtrare + Paginare
**Obiectiv:** Funcționalități frontend avansate
- [ ] Implementare paginare
- [ ] Search bar funcțional
- [ ] Butoane de filtrare

**Estimare:** 6-8 ore

---

### Sprint 4 - Polish + Deployment + Documentație
**Obiectiv:** Finalizare și livrare
- [ ] Bug fixes și optimizări
- [ ] Deploy pe Render/Railway
- [ ] Scriere documentație completă
- [ ] Adăugare profesor pe repository
- [ ] Final testing

**Estimare:** 8-10 ore

---

## 📦 Backlog / Future Enhancements (Optional)

### User Management în Baza de Date
**Dacă avem timp, putem extinde autentificarea:**
- [ ] Creează tabel `users` în MySQL
  ```sql
  CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  ```
- [ ] Instalează bcrypt pentru hashing parole: `npm install bcrypt`
- [ ] Endpoint `/api/auth/register` pentru înregistrare
- [ ] Validare username/password (lungime minimă, etc.)
- [ ] Hash parole cu bcrypt înainte de salvare
- [ ] Verificare password hash la login
- [ ] (Optional) Roluri: admin vs. user simplu

**Prioritate:** LOW (doar dacă e timp după toate features obligatorii)
**Estimare:** 3-4 ore

---

## 🎨 Design Improvements (Optional)

- [ ] Logo South Park în header
- [ ] Animații smooth (transitions, loading states)
- [ ] Responsive design îmbunătățit
- [ ] Dark mode toggle
- [ ] Toast notifications pentru acțiuni (success/error)
- [ ] Skeleton loaders pentru imagini

---

## ⚠️ Notițe Importante

1. **Toate imaginile sunt Base64** - ✅ deja implementat
2. **Best practices Git** - ✅ workflow GitFlow implementat
3. **Code quality** - urmărim best practices peste tot
4. **Testing** - testează manual toate funcționalitățile înainte de predare
5. **Deadline-uri** - verifică data limită de predare și planifică în consecință

---

## 📊 Punctaj Total: 100p

- **10p** Documentație
- **40p** Funcționalitate
- **50p** Întrebări (examinare orală)

**Pentru maximizare punctaj:**
1. Toate funcționalitățile obligatorii implementate
2. Cod curat și organizat
3. Documentație completă și detaliată
4. Înțelegere profundă a codului (pentru întrebări)

---

## 🔗 Link-uri Utile

- [GitHub Repository](https://github.com/Vlad1002/south-park-web-app)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [React Router Docs](https://reactrouter.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Express.js Docs](https://expressjs.com/)

---

**Ultima actualizare:** 9 noiembrie 2025
**Status:** In Progress - Sprint 1 urmează (React Router)
