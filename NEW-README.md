# Iqamati Platform

A property management platform with separated frontend and backend.

## Project Structure

```
├── frontend/          # React frontend (JSX)
├── backend/           # Express.js backend (JavaScript)
├── root-package.json  # Root package for managing both
└── README.md
```

## Quick Start

### Option 1: Run both together
```bash
# Install concurrently first
npm install -g concurrently

# Install all dependencies
npm run install:all

# Run both frontend and backend
npm run dev
```

### Option 2: Run separately

**Backend (Port 3001):**
```bash
cd backend
npm install
npm run dev
```

**Frontend (Port 3000):**
```bash
cd frontend  
npm install
npm run dev
```

## Architecture

- **Frontend**: React with JSX, Vite, Tailwind CSS, React Router
- **Backend**: Express.js with JavaScript, CORS enabled
- **API**: RESTful API with `/api` prefix
- **Database**: Optional PostgreSQL (currently using in-memory storage)

## API Endpoints

- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/user/profile` - Get user profile
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/payments` - Get payments
- `GET /api/voting` - Get voting data
- `GET /api/complaints` - Get complaints
- `POST /api/complaints` - Create complaint

## Development

The frontend runs on port 3000 and proxies API calls to the backend on port 3001.

## Features

- ✅ **Separated Architecture**: Clear separation between frontend and backend
- ✅ **JavaScript/JSX**: Converted from TypeScript to JavaScript
- ✅ **CORS Enabled**: Proper cross-origin resource sharing
- ✅ **Hot Reload**: Both frontend and backend support hot reloading
- ✅ **Multilingual**: Support for Arabic, French, English, and Tamazight
- ✅ **Mock Data**: Ready for development with mock data
- ✅ **Role-Based**: Owner, Agent, Supervisor roles
