# Proteinbar API

Express.js backend API with MongoDB and TypeScript, built with a modular architecture.

## Features

- Express.js with TypeScript
- MongoDB with Mongoose
- JWT Authentication
- Modular architecture (Controller → Service → Model)
- Error handling middleware
- CORS enabled
- Helmet security headers

## Project Structure

```
src/
├── config/           # Configuration files
│   ├── index.ts     # Environment config
│   └── database.ts  # MongoDB connection
├── middlewares/     # Express middlewares
│   ├── index.ts     # Middleware setup
│   ├── auth.ts      # Authentication middleware
│   └── errorHandler.ts
├── modules/         # Feature modules
│   ├── products/
│   │   ├── model.ts
│   │   ├── service.ts
│   │   ├── controller.ts
│   │   └── routes.ts
│   ├── orders/
│   └── users/
├── routes/          # Route aggregation
└── index.ts         # App entry point
```

## Getting Started

### Prerequisites

- Node.js >= 18
- MongoDB running locally or connection string

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file:

```env
NODE_ENV=development
PORT=4000
MONGODB_URI=mongodb://localhost:27017/proteinbar
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

## API Endpoints

See the main README.md for complete API documentation.
