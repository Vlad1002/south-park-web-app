# South Park Episodes Database

A full-stack web application for browsing and managing South Park episodes, built as a university project for the Web Technologies course.

## Project Overview

The application allows users to browse South Park episodes with search, filtering, and pagination features. An admin panel provides full CRUD (Create, Read, Update, Delete) functionality protected by JWT authentication.

**Main Features:**
- Episode browsing with search and filters (season, year)
- Pagination with configurable items per page (10/25/50)
- Detailed episode pages with images and descriptions
- Admin panel for content management
- JWT-based authentication

## Technologies Used

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | React 19 | UI components and state management |
| | Vite | Build tool and dev server |
| | Tailwind CSS | Styling |
| | Axios | HTTP requests |
| | React Router | Client-side routing |
| **Backend** | Node.js | Runtime environment |
| | Express.js | REST API framework |
| | JWT | Authentication tokens |
| **Database** | MySQL | Data persistence |

## Data Structure

The database contains a single table `data` with the following structure:

| Field | Type | Description |
|-------|------|-------------|
| `id` | INT | Primary key, auto-increment |
| `data` | JSON | Episode data object |

**JSON object fields:**

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Episode title |
| `season` | number | Season number (1-26) |
| `episode` | number | Episode number within season |
| `air_date` | string | Original air date (YYYY-MM-DD) |
| `description` | string | Episode plot summary |
| `image` | string | Episode thumbnail (Base64 Data URI) |
| `wiki_url` | string | Link to South Park Wiki |

## Use of Artificial Intelligence

This project was developed with assistance from **Claude AI** (Anthropic). The AI was used for:

- **Code Generation:** Creating React components, Express routes, and database queries
- **Problem Solving:** Debugging issues with CORS, JWT authentication, and MySQL connections
- **Learning:** Explaining concepts like JWT tokens, React hooks, middleware patterns, and SQL injection prevention
- **Setup Assistance:** Configuring the development environment on macOS (MySQL, Node.js, environment variables)

All AI-generated code was reviewed and understood before implementation.

## Conclusions

### Challenges Encountered

1. **Port Conflict:** macOS uses port 5000 for AirPlay, requiring backend to run on port 5001
2. **Base64 Images:** Large payload sizes (~287MB total) due to images stored as Data URI
3. **Client-side Pagination:** Works for 314 episodes but would need server-side pagination for larger datasets
4. **Environment Setup:** Different configurations needed between Windows (development) and macOS (presentation)

### Solutions Implemented

- Changed backend port and updated frontend configuration accordingly
- Increased body-parser limit to 50MB for Base64 image handling
- Implemented efficient client-side filtering with React state management
- Created environment variables (.env) for flexible configuration

### Personal Takeaways

This project provided hands-on experience with full-stack development, from database design to frontend UI. Key learnings include REST API design, JWT authentication flow, React state management with Context API, and the importance of proper error handling throughout the application stack.

---

## Quick Start

```bash
# 1. Start MySQL
brew services start mysql

# 2. Start Backend (Terminal 1)
cd backend && node server.js

# 3. Start Frontend (Terminal 2)
cd frontend && npm run dev

# 4. Open http://localhost:5173
# Admin login: admin / admin123
```