import express from 'express';
import passport from 'passport';
import { register, login, googleCallback, verifyEmail } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { loginSchema, registerSchema } from '../validators/user.validation.js';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);

router.get('/google', passport.authenticate('google'));
router.get('/google/callback', passport.authenticate('google', { session: false }), googleCallback);

router.get('/verify-email', verifyEmail);

export default router;