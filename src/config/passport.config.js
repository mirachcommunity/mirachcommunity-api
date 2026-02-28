import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleCallbackURL = process.env.GOOGLE_CALLBACK_URL || '/api/auth/google/callback';

if (!googleClientId || !googleClientSecret) {
  console.warn(
    'Google OAuth not configured: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is missing. Skipping GoogleStrategy registration.'
  );
} else {
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientId,
        clientSecret: googleClientSecret,
        callbackURL: googleCallbackURL,
        scope: ['profile', 'email'],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await prisma.user.findUnique({
            where: { googleId: profile.id },
          });

          if (!user) {
            user = await prisma.user.findUnique({
              where: { email: profile.emails?.[0]?.value },
            });

            if (user) {
              user = await prisma.user.update({
                where: { email: profile.emails[0].value },
                data: { googleId: profile.id },
              });
            } else {
              user = await prisma.user.create({
                data: {
                  googleId: profile.id,
                  name: profile.displayName,
                  email: profile.emails?.[0]?.value,
                },
              });
            }
          }

          if (user && user.password) delete user.password;
          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
}