# Architecture Overview

## System Architecture

JustARandomWebApp follows a modern full-stack architecture with clear separation of concerns.

```
┌─────────────────┐
│   Frontend      │
│   (React/TS)    │
└────────┬────────┘
         │ HTTP/REST
         │
┌────────▼────────┐
│   Backend API   │
│  (Express/TS)   │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼───┐
│Postgres│ │Redis │
│   DB   │ │Cache │
└────────┘ └──────┘
```

## Frontend Architecture

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **State Management**: Zustand for global state
- **Data Fetching**: React Query (TanStack Query) for server state
- **Routing**: React Router v6
- **Styling**: TailwindCSS for utility-first styling
- **Form Handling**: React Hook Form with Zod validation

### Component Structure

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components
├── api/            # API client and endpoints
├── store/          # State management (Zustand)
├── hooks/          # Custom React hooks
└── utils/          # Utility functions
```

## Backend Architecture

- **Runtime**: Node.js 18+
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL 15+
- **Cache**: Redis 7+
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time**: Socket.io
- **Documentation**: Swagger/OpenAPI

### Backend Structure

```
backend/src/
├── controllers/    # Request handlers
├── routes/         # Route definitions
├── middleware/     # Express middleware
├── database/       # DB connection and migrations
├── utils/          # Utility functions
└── config/         # Configuration files
```

## Database Schema

### Users Table
- `id` (UUID, Primary Key)
- `email` (VARCHAR, Unique)
- `password_hash` (VARCHAR)
- `name` (VARCHAR)
- `role` (VARCHAR)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

### Data Table
- `id` (UUID, Primary Key)
- `title` (VARCHAR)
- `content` (TEXT)
- `metadata` (JSONB)
- `user_id` (UUID, Foreign Key)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## Security

- **Authentication**: JWT-based with refresh tokens
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: Express rate limiter
- **CORS**: Configurable CORS policies
- **Helmet**: Security headers
- **Input Validation**: Zod schemas
- **SQL Injection Prevention**: Parameterized queries

## Deployment

### Docker
- Multi-stage builds for optimized images
- Docker Compose for local development
- Separate containers for frontend, backend, database, and cache

### CI/CD
- GitHub Actions for automated testing
- Automated builds on push/PR
- Test coverage reporting

## Performance Optimizations

- **Frontend**:
  - Code splitting with Vite
  - Lazy loading routes
  - React Query caching
  - Optimized bundle size

- **Backend**:
  - Connection pooling (PostgreSQL)
  - Redis caching
  - Compression middleware
  - Efficient database queries with indexes

## Scalability Considerations

- Stateless API design
- Horizontal scaling ready
- Database connection pooling
- Redis for session/cache management
- Microservices-ready architecture

