import express from 'express';
import cors from 'cors';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';

// Import Middlewares & Routes
import { errorHandler } from './middlewares/error.middleware.js';
import authRoutes from './routes/auth.route.js';
import profileRoutes from './routes/profile.route.js';

// Import Configurations
import './config/passport.config.js'; 
import swaggerSpec from './config/swagger.config.js'

const app = express();

/**
 * Global Middlewares
 */
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

/**
 * Route: API Documentation (Swagger UI)
 */
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customCss:
      '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; font-weight: bold; }',
    customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css",
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js'
    ]
  })
);

/**
 * Route: Root / Welcome
 */
app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Welcome to Mirach Community API V1!'
  });
});

/**
 * API Routes
 */
app.use('/api/auth', authRoutes); // Route untuk registrasi, login, dan verifikasi email
app.use('/api/profile', profileRoutes); // Route untuk pengelolaan data profil pengguna

/**
 * Error Handling Middleware
 */
app.use(errorHandler);

export default app;