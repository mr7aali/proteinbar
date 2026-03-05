# Backend Architecture

This document explains the modular architecture pattern used in the Proteinbar API.

## Architecture Pattern

The API follows a **modular, layered architecture** with clear separation of concerns:

```
Request → Routes → Controller → Service → Model → Database
                      ↓
                  Middleware
                      ↓
                Error Handler
```

## Layer Responsibilities

### 1. Routes (`routes.ts`)
- Define HTTP endpoints and methods
- Map URLs to controller functions
- Apply middleware (authentication, validation)
- **Does NOT contain business logic**

```typescript
router.get('/', productController.getAllProducts);
router.post('/', authenticate, productController.createProduct);
```

### 2. Controllers (`controller.ts`)
- Handle HTTP request/response
- Extract data from request
- Call service layer
- Format response
- Handle errors with try-catch
- **Does NOT contain business logic**

```typescript
export const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({ status: 'success', data: product });
  } catch (error) {
    next(error);
  }
};
```

### 3. Services (`service.ts`)
- **Contains ALL business logic**
- Orchestrates data operations
- Handles complex operations
- Interacts with models
- Can call other services
- Reusable across different controllers

```typescript
export const createProduct = async (data) => {
  // Business logic here
  const product = new Product(data);
  return await product.save();
};
```

### 4. Models (`model.ts`)
- Define database schema
- Data validation
- Database operations (CRUD)
- Instance methods
- Static methods

```typescript
const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 }
});
```

### 5. Middlewares (`middlewares/`)
- Cross-cutting concerns
- Authentication/Authorization
- Request validation
- Error handling
- Logging

## Module Structure

Each feature is organized as a self-contained module:

```
modules/
└── products/
    ├── model.ts       # Database schema
    ├── service.ts     # Business logic
    ├── controller.ts  # Request handlers
    └── routes.ts      # Route definitions
```

## Benefits of This Architecture

1. **Separation of Concerns**: Each layer has a single responsibility
2. **Testability**: Easy to unit test each layer independently
3. **Maintainability**: Changes in one layer don't affect others
4. **Reusability**: Services can be reused across different controllers
5. **Scalability**: Easy to add new features as modules
6. **Type Safety**: TypeScript ensures type correctness across layers

## Data Flow Example

Creating a new product:

```
1. POST /api/products
   ↓
2. routes.ts → authenticate middleware
   ↓
3. productController.createProduct()
   - Extracts req.body
   - Calls service
   ↓
4. productService.createProduct(data)
   - Validates business rules
   - Creates model instance
   ↓
5. Product.save()
   - Validates schema
   - Saves to MongoDB
   ↓
6. Returns through layers
   ↓
7. Controller formats response
   ↓
8. JSON response to client
```

## Error Handling

Errors bubble up through layers:

```typescript
// Service throws error
throw new AppError('Product not found', 404);

// Controller catches and passes to error handler
catch (error) {
  next(error);
}

// Error handler middleware responds
errorHandler(err, req, res, next) {
  res.status(err.statusCode).json({
    status: 'error',
    message: err.message
  });
}
```

## Adding a New Module

To add a new feature (e.g., "reviews"):

1. Create `modules/reviews/` directory
2. Create `model.ts` with schema
3. Create `service.ts` with business logic
4. Create `controller.ts` with request handlers
5. Create `routes.ts` with endpoints
6. Import routes in `routes/index.ts`

Example:

```typescript
// routes/index.ts
import reviewRoutes from '../modules/reviews/routes';
router.use('/reviews', reviewRoutes);
```

## Best Practices

1. **Keep controllers thin**: Only handle HTTP concerns
2. **Keep services fat**: All business logic goes here
3. **Use TypeScript interfaces**: Define types for all data
4. **Validate input**: Use express-validator or similar
5. **Handle errors properly**: Use custom error classes
6. **Use async/await**: For cleaner asynchronous code
7. **Document your code**: Add JSDoc comments
8. **Write tests**: Unit tests for services, integration tests for routes

## Configuration

All configuration is centralized in `config/`:

- `config/index.ts` - Environment variables
- `config/database.ts` - MongoDB connection

## Security

- JWT authentication in `middlewares/auth.ts`
- Helmet for security headers
- CORS configuration
- Password hashing with bcrypt
- Input validation

## Future Enhancements

- Add request validation with express-validator
- Implement rate limiting
- Add logging with Winston
- Set up API documentation with Swagger
- Add caching with Redis
- Implement file upload handling
- Add email service
- Set up background jobs with Bull
