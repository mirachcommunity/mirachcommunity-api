import express from 'express';
import cors from 'cors';
import passport from 'passport';
import { errorHandler } from './middlewares/error.middleware.js';
import authRoutes from './routes/auth.route.js';
import './config/passport.config.js'; 

const app = express();

app.use(cors());
app.use(express.json());

app.use(passport.initialize());

app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Welcome to Mirach Community API V1!'
  })
})

app.use('/api/auth', authRoutes);

app.use(errorHandler);

export default app;