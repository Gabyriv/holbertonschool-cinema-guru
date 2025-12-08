# Cinema Guru 🎬

A modern movie discovery and tracking application built with React. Browse movies, add them to your favorites, and create a watch later list.

## Features

- **User Authentication** - Register and login to access personalized features
- **Movie Discovery** - Browse and search movies with advanced filtering options
- **Favorites** - Save your favorite movies for quick access
- **Watch Later** - Create a list of movies you want to watch
- **Activity Feed** - Track recent activity across the platform
- **Responsive Sidebar** - Collapsible navigation with hover expansion

## Tech Stack

- **Frontend**: React 19, React Router DOM 7
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Icons**: FontAwesome
- **Styling**: CSS (custom styles)

## Prerequisites

- Node.js (v18 or higher)
- Yarn or npm
- Docker & Docker Compose (for backend)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/holbertonschool-cinema-guru.git
cd holbertonschool-cinema-guru
```

### 2. Install dependencies

```bash
yarn install
# or
npm install
```

### 3. Set up the backend

Clone and run the backend API:

```bash
git clone https://github.com/hs-hq/holbertonschool-cinema-guru-API.git
cd holbertonschool-cinema-guru-API
docker-compose up --build
```

The API will be available at `http://localhost:8000`

### 4. Start the development server

```bash
yarn dev
# or
npm run dev
```

The app will be available at `http://localhost:3000`

## Project Structure

```txt
src/
├── components/
│   ├── general/          # Reusable UI components (Button, Input, SearchBar, SelectInput)
│   ├── movies/           # Movie-related components (MovieCard, Filter, Tag)
│   └── navigation/       # Navigation components (Header, Sidebar)
├── routes/
│   ├── auth/             # Authentication pages (Login, Register)
│   └── dashboard/        # Dashboard pages (HomePage, Favorites, WatchLater)
├── App.jsx               # Main app component with routing
├── main.jsx              # Entry point
└── index.css             # Global styles
```

## API Endpoints

The app communicates with the backend API:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Register a new user |
| `/api/auth/login` | POST | Login user |
| `/api/titles/advancedsearch` | GET | Search movies with filters |
| `/api/titles/favorite/` | GET/POST/DELETE | Manage favorite movies |
| `/api/titles/watchlater/` | GET/POST/DELETE | Manage watch later list |
| `/api/activity` | GET | Get recent activities |

## Screenshots

### Home Page

Browse and filter movies by genre, year, and more.

### Favorites & Watch Later

View your saved movies with a beautiful centered title design.

## Author

- **Gabriel Rivera** - Holberton School

## License

This project is part of the Holberton School curriculum.
