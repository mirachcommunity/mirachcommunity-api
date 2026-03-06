import express from 'express';
import cors from 'cors';
import passport from 'passport';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { errorHandler } from './middlewares/error.middleware.js';
import authRoutes from './routes/auth.route.js';
import profileRoutes from './routes/profile.route.js';
import './config/passport.config.js'; 

const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mirach Community API',
      version: '1.0.0',
      description: 'Official REST API documentation for the Mirach Community platform.',
    },
  },
  apis: ['./src/**/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(cors());
app.use(express.json());

app.use(passport.initialize());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Welcome to Mirach Community API V1!'
  })
})

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

app.use(errorHandler);

export default app;