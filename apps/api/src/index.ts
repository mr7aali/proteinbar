import express from 'express';
import { config } from './config';
import { connectDatabase } from './config/database';
import { errorHandler } from './middlewares/errorHandler';
import { setupMiddlewares } from './middlewares';
import routes from './routes';

const app = express();

// Setup middlewares
setupMiddlewares(app);

// Routes
app.use('/api', routes);

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    await connectDatabase();
    
    app.listen(config.port, () => {
      console.log(`🚀 Server running on port ${config.port}`);
      console.log(`📝 Environment: ${config.nodeEnv}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
