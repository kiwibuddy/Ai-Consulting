import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { injectOgMeta } from "./og-meta";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  const indexPath = path.resolve(distPath, "index.html");
  const rawHtml = fs.readFileSync(indexPath, "utf-8");

  // fall through to index.html if the file doesn't exist;
  // inject per-route OG tags so social-media crawlers see the right preview
  app.use("/{*path}", (req, res) => {
    const html = injectOgMeta(rawHtml, req.path);
    res.status(200).set({ "Content-Type": "text/html" }).end(html);
  });
}
