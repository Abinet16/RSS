# RSS Reader

A modern, full-stack RSS feed reader built with Next.js, TypeScript, and Go.

## Features

- **User Authentication** - Secure login and registration system
- **RSS Feed Management** - Add, organize, and manage your favorite RSS feeds
- **Post Tracking** - Mark articles as read or favorite for later
- **Search & Filter** - Find content quickly with built-in search
- **Responsive Design** - Works seamlessly on desktop and mobile
- **Modern UI** - Clean, professional interface with Tailwind CSS

## Tech Stack

### Frontend
- [Next.js 14](https://nextjs.org) - React framework with App Router
- [TypeScript](https://www.typescriptlang.org) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [React Hook Form](https://react-hook-form.com) - Performant form handling
- [Zod](https://zod.dev) - TypeScript-first schema validation

### Backend
- [Go](https://go.dev) - Modern, scalable backend language
- [chi](https://github.com/go-chi/chi) - Lightweight HTTP router
- [lib/pq](https://github.com/lib/pq) - Pure Go PostgreSQL driver
- [godotenv](https://github.com/joho/godotenv) - Environment variable management

## Getting Started

### Prerequisites

- Node.js 18+ 
- Go 1.21+
- PostgreSQL database

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Copy the environment file and configure your database:
   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your database credentials:
   ```
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=your_user
   DB_PASSWORD=your_password
   DB_NAME=rss_reader
   PORT=8080
   ```

4. Run the backend server:
   ```bash
   go run main.go
   ```

   The API will be available at `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file (optional):
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8080
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
rss/
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   │   ├── login/       # Login page
│   │   │   ├── register/    # Registration page
│   │   │   ├── feed/        # Main feed page
│   │   │   └── api/         # API routes
│   │   ├── components/     # Reusable React components
│   │   ├── contexts/       # React Context providers
│   │   ├── lib/            # Utility functions & API client
│   │   └── types/          # TypeScript type definitions
│   └── package.json
│
├── backend/                  # Go backend API
│   ├── main.go              # Application entry point
│   ├── handlers/           # HTTP request handlers
│   ├── models/             # Data models
│   ├── repository/         # Database operations
│   ├── middleware/         # HTTP middleware
│   └── go.mod
│
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login
- `POST /api/users/logout` - User logout
- `GET /api/users/me` - Get current user

### Feeds
- `GET /api/feeds` - Get all feeds for user
- `POST /api/feeds` - Add a new RSS feed
- `DELETE /api/feeds/:id` - Remove a feed

### Posts
- `GET /api/posts` - Get posts from subscribed feeds
- `POST /api/posts/:id/read` - Mark post as read
- `POST /api/posts/:id/favorite` - Toggle favorite status

## Environment Variables

### Backend (.env)
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_NAME=rss_reader
PORT=8080
JWT_SECRET=your-secret-key
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Development

### Running Tests
```bash
# Frontend
cd frontend
npm run test

# Backend
cd backend
go test ./...
```

### Building for Production
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
go build -o rss-reader
```

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
