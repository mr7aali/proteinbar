# Proteinbar Monorepo

A Turborepo monorepo containing the Proteinbar frontend, admin dashboard, and backend API.

## Structure

```
├── apps
│   ├── web                 # Main customer-facing Next.js app
│   ├── admin              # Admin dashboard Next.js app
│   └── api                # Express/MongoDB/TypeScript backend
├── packages
│   ├── typescript-config  # Shared TypeScript configurations
│   └── eslint-config      # Shared ESLint configurations
└── turbo.json            # Turborepo configuration
```

## Getting Started

### Install dependencies

```bash
npm install
```

### Development

Run all apps in development mode:

```bash
npm run dev
```

### Build

Build all apps:

```bash
npm run build
```

### Lint

Lint all apps:

```bash
npm run lint
```

## Apps

- **web**: Customer-facing website (http://localhost:3000)
- **admin**: Admin dashboard (http://localhost:3001)
- **api**: Backend API (http://localhost:4000)
