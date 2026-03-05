# Migration Guide to Turborepo

This guide will help you migrate your existing projects to the new Turborepo monorepo structure.

## Steps to Complete Migration

### 1. Move Existing Projects

You need to move your existing projects into the `apps/` directory:

```bash
# Move the main proteinbar project
mv proteinbar apps/web

# Move the admin dashboard
mv proteinbar_admin_dashboard apps/admin
```

### 2. Install Dependencies

Install all dependencies from the root:

```bash
npm install
```

This will install dependencies for all workspaces (apps and packages).

### 3. Set Up Environment Variables

For the backend API, create a `.env` file:

```bash
cp apps/api/.env.example apps/api/.env
```

Then edit `apps/api/.env` with your actual values.

### 4. Start MongoDB

Make sure MongoDB is running locally or update the `MONGODB_URI` in your `.env` file:

```bash
# If using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Or install MongoDB locally
# https://www.mongodb.com/docs/manual/installation/
```

### 5. Run Development Servers

Start all apps in development mode:

```bash
npm run dev
```

This will start:
- Web app on http://localhost:3000
- Admin dashboard on http://localhost:3001
- API server on http://localhost:4000

### 6. Build All Apps

To build all apps for production:

```bash
npm run build
```

## Project Structure After Migration

```
proteinbar-monorepo/
├── apps/
│   ├── web/                    # Main customer-facing app (moved from proteinbar/)
│   ├── admin/                  # Admin dashboard (moved from proteinbar_admin_dashboard/)
│   └── api/                    # New Express backend
├── packages/
│   ├── typescript-config/      # Shared TypeScript configs
│   └── eslint-config/          # Shared ESLint configs
├── package.json                # Root package.json with workspaces
├── turbo.json                  # Turborepo configuration
└── README.md
```

## API Endpoints

The backend API provides the following endpoints:

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (authenticated)
- `PUT /api/users/profile` - Update user profile (authenticated)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (authenticated)
- `PUT /api/products/:id` - Update product (authenticated)
- `DELETE /api/products/:id` - Delete product (authenticated)

### Orders
- `GET /api/orders` - Get all orders (authenticated)
- `GET /api/orders/my-orders` - Get user's orders (authenticated)
- `GET /api/orders/:id` - Get order by ID (authenticated)
- `POST /api/orders` - Create order (authenticated)
- `PATCH /api/orders/:id/status` - Update order status (authenticated)

## Troubleshooting

### Port Already in Use

If you get a port conflict error, you can change the ports in:
- `apps/web/package.json` - Change `next dev` port
- `apps/admin/package.json` - Already set to port 3001
- `apps/api/.env` - Change `PORT` variable

### MongoDB Connection Error

Make sure MongoDB is running and the connection string in `apps/api/.env` is correct.

### TypeScript Errors

Run the build command to check for TypeScript errors:

```bash
npm run build
```

## Next Steps

1. Update your frontend apps to connect to the new backend API
2. Add API client utilities in a shared package
3. Set up CI/CD pipelines
4. Configure production environment variables
