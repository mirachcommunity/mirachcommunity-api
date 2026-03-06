import path from 'path';
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
  servers: [
      {
        url: 'https://mirachcommunity-api.vercel.app/',
        description: 'Staging server',
      },
    ],
    apis: [path.join(process.cwd(), 'src/routes/*.js'), path.join(process.cwd(), 'src/app.js')],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(cors());
app.use(express.json());

app.use(passport.initialize());

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