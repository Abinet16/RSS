# RSS Reader - Frontend

A modern Next.js frontend for the RSS Reader application.

## Features

- **User Authentication** - Secure login and registration with form validation
- **RSS Feed Management** - Add and manage RSS feeds via modal interface
- **Post Display** - View articles with read/favorite tracking
- **Search & Filter** - Quick search and category filtering
- **Responsive Design** - Mobile-friendly with Tailwind CSS

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Hook Form + Zod
- Context API for state management

## Getting Started

### Prerequisites

- Node.js 18+
- Running backend server (port 8080)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## Pages

- `/` - Homepage
- `/login` - Login page
- `/register` - Registration page
- `/feed` - Main feed with posts
