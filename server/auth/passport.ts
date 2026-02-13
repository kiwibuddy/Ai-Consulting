import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import type { Express } from "express";
import { authStorage } from "./storage";

export function configurePassport(app: Express) {
  app.use(passport.initialize());
  app.use(passport.session());

  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: `${process.env.APP_URL || "http://localhost:3000"}/api/auth/google/callback`,
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            const user = await authStorage.findOrCreateUserByGoogle({
              id: profile.id,
              email: profile.emails?.[0]?.value,
              given_name: profile.name?.givenName,
              family_name: profile.name?.familyName,
              picture: profile.photos?.[0]?.value,
            });
            return done(null, user as Express.User);
          } catch (err) {
            return done(err as Error);
          }
        }
      )
    );
  }

  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async (email, password, done) => {
        try {
          const user = await authStorage.getUserByEmail(email);
          if (!user || !user.password) {
            return done(null, false, { message: "Invalid email or password" });
          }
          const valid = await bcrypt.compare(password, user.password);
          if (!valid) {
            return done(null, false, { message: "Invalid email or password" });
          }
          return done(null, user as Express.User);
        } catch (err) {
          return done(err as Error);
        }
      }
    )
  );

  passport.serializeUser((user: Express.User, cb) => {
    cb(null, (user as { id: string }).id);
  });

  passport.deserializeUser(async (id: string, cb) => {
    try {
      const user = await authStorage.getUser(id);
      cb(null, (user ?? undefined) as Express.User);
    } catch (err) {
      cb(err as Error);
    }
  });
}
