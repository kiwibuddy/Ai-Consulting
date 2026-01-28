import type { Express } from "express";
import { getSession } from "./session";
import { configurePassport } from "./passport";

export { getSession } from "./session";
export { configurePassport } from "./passport";
export { registerAuthRoutes, isAuthenticated } from "./routes";
export { authStorage } from "./storage";

export function setupAuth(app: Express): void {
  app.set("trust proxy", 1);
  app.use(getSession());
  configurePassport(app);
}
