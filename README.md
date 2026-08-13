# AI Fitness Coach — Backend API

REST API powering an AI-driven fitness coaching platform. Handles user
authentication, personalized workout and meal-plan management, and a
separate admin console for managing the platform's content (exercises,
meals, equipment, muscles, and users).

Built with **Node.js, TypeScript, Express, and MongoDB**, with JWT-based
auth, request validation, auto-generated Swagger API docs, and a
convention-based controller auto-loader.

---

## Tech Stack

- **Runtime:** Node.js 18, TypeScript
- **Framework:** Express
- **Database:** MongoDB (via Mongoose)
- **Auth:** JWT (jsonwebtoken, bcrypt)
- **Validation:** Joi (express-joi-validation)
- **Docs:** Swagger / OpenAPI (swagger-ui-express)
- **Media storage:** Cloudinary
- **Dev tooling:** ts-node-dev, tsc-alias, path aliases (`tsconfig-paths`)
- **Containerization:** Docker

---

## Architecture

The API is split into two independent domains that share the same
codebase and database:

- **`users`** — the end-user-facing API (registration/login, workouts,
  meal plans, exercise & ingredient browsing, activity tracking, home feed)
- **`console`** — the admin-facing API (admin auth, and CRUD over
  exercises, workouts, meals, meal plans, equipment, muscles, ingredients,
  and admin accounts)

Each module follows the same internal structure:

```
modules/<domain>/modules/<feature>/
├── controllers/     # Route handlers, extend BaseController
├── services/        # Business logic
├── models/          # Mongoose schemas
├── validations/      # Joi request schemas
└── serializers/      # Response shaping
```

**Controllers are auto-discovered.** On startup, the app globs every
`*.controller.ts` file under `src/`, and any class extending
`BaseController` is automatically registered onto the router under its
declared prefix — new features don't require manually wiring up routes
in a central file.

---

## Key Features

- **Dual authentication** — separate JWT-based auth flows for end users
  and admin console users, each with its own login/guard logic
- **Modular domain structure** — 20+ feature modules (workouts, meals,
  meal plans, exercises, ingredients, equipment, muscles, activities,
  user-registered workouts/meal-plans, admins) each self-contained with
  its own controller, service, model, and validation layer
- **Auto-generated API documentation** — live Swagger UI at `/api/v1/docs`,
  built from a central swagger registry rather than hand-written per route
- **Centralized error handling** — a single error-handling middleware and
  a consistent `JsonResponse` wrapper for success/error responses
- **Database seeding** — a full seeder suite (`npm run seed`) that
  populates admins, users, muscles, equipment, exercises, workouts, meals,
  meal plans, and activities with realistic fake data (via `@faker-js/faker`),
  making the API demoable without manual data entry
- **Path aliases** — clean imports (`@lib/...`) instead of relative
  `../../../` chains, resolved at build time via `tsc-alias`

---

## Project Structure

```
ai-fitness-coach-backend/
├── src/
│   ├── index.ts              # App entry point — DB connection + server bootstrap
│   ├── routes.ts             # Controller auto-loader, docs, error handling
│   ├── configs/               # Environment & database configuration
│   ├── common/                 # Shared enums, interfaces, base models, validations
│   ├── lib/
│   │   ├── controllers/       # BaseController
│   │   ├── guards/             # Auth guards
│   │   ├── services/           # Shared services
│   │   ├── swagger/            # Swagger doc registry
│   │   └── responses/          # JsonResponse wrapper
│   ├── middlewares/            # Error handling, etc.
│   ├── modules/
│   │   ├── users/               # End-user-facing domain
│   │   └── console/             # Admin-facing domain
│   └── seeder/
│       ├── seed.ts
│       └── seeders/            # 12 seeders covering the full data model
├── Dockerfile
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18.x
- MongoDB instance (local or hosted)

### Setup

```bash
# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Then fill in: PORT, HOST, DB_URI, JWT_SECRET, JWT_EXPIRES_IN,
# MODELS_SERVER_URL, SWAGGER_SERVER, SALT_ROUNDS, NODE_ENV

# Run in development (hot reload)
npm run start:dev

# Seed the database with sample data
npm run seed
# or reset and reseed
npm run seed:reset

# Build & run in production
npm run build
npm start
```

The API runs on `/api/v1`, with a health check at `/api/v1/health` and
interactive API docs at `/api/v1/docs`.

### Docker

```bash
docker build -t ai-fitness-coach-backend .
docker run -p 7860:7860 --env-file .env ai-fitness-coach-backend
```

---

## Part of a Larger System

This backend is one of three services in the AI Fitness Coach project:

- **Backend API** (this repo) — core application logic and data layer
- [**Model Server**](../ai-fitness-coach-model-server) — Flask microservice
  serving the ML models that generate personalized workout and nutrition plans
- [**Admin Panel**](../ai-fitness-coach-admin-panel) — Next.js dashboard
  built on top of the console API for managing platform content

The mobile app (Android) that consumes this API's `users` domain was
built by a teammate and isn't part of this repo.
