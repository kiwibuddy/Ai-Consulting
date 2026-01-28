import type { Express, Request, Response, NextFunction } from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import { authStorage } from "./storage";

export function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

export function registerAuthRoutes(app: Express): void {
  app.get("/api/auth/google", (req, res, next) => {
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      return res.status(503).json({ message: "Google sign-in is not configured" });
    }
    passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
  });

  app.get(
    "/api/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/?login=failed" }),
    (req, res) => {
      const user = req.user as { role?: string };
      if (user?.role === "coach") {
        res.redirect("/coach/dashboard");
      } else {
        res.redirect("/client/dashboard");
      }
    }
  );

  app.post("/api/auth/login", (req, res, next) => {
    passport.authenticate("local", (err: Error | null, user: Express.User | false) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      req.login(user, (loginErr) => {
        if (loginErr) return next(loginErr);
        res.json({ success: true, user });
      });
    })(req, res, next);
  });

  app.post("/api/auth/register", async (req, res) => {
    try {
      const { email, password, firstName, lastName, role } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }
      const existing = await authStorage.getUserByEmail(email);
      if (existing) {
        return res.status(400).json({ message: "An account with this email already exists" });
      }
      const hashed = await bcrypt.hash(password, 10);
      const user = await authStorage.upsertUser({
        email,
        username: email,
        password: hashed,
        firstName: firstName ?? null,
        lastName: lastName ?? null,
        role: role === "coach" ? "coach" : "client",
      });
      req.login(user as Express.User, (err) => {
        if (err) {
          return res.status(500).json({ message: "Registration failed" });
        }
        res.status(201).json({ success: true, user });
      });
    } catch (err) {
      console.error("Registration error:", err);
      res.status(500).json({ message: "Registration failed" });
    }
  });

  const logout = (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
      if (err) return next(err);
      if (req.xhr || req.headers.accept?.includes("application/json")) {
        res.json({ success: true });
      } else {
        res.redirect("/");
      }
    });
  };
  app.post("/api/auth/logout", logout);
  app.get("/api/logout", logout);

  app.get("/api/auth/user", isAuthenticated, async (req, res) => {
    try {
      const user = req.user as { id: string };
      const dbUser = await authStorage.getUser(user.id);
      res.json(dbUser ?? req.user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
}
