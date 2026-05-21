import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { injectOgMeta } from "./og-meta";

const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  const assetsPath = path.join(distPath, "assets");

  if (fs.existsSync(assetsPath)) {
    app.use(
      "/assets",
      express.static(assetsPath, {
        maxAge: ONE_YEAR_MS,
        immutable: true,
        index: false,
      }),
    );
  }

  app.use(
    express.static(distPath, {
      maxAge: ONE_DAY_MS,
      index: false,
      setHeaders(res, filePath) {
        if (filePath.endsWith("index.html")) {
          res.setHeader("Cache-Control", "no-cache");
        }
      },
    }),
  );

  const indexPath = path.resolve(distPath, "index.html");
  const rawHtml = fs.readFileSync(indexPath, "utf-8");

  // fall through to index.html if the file doesn't exist;
  // inject per-route OG tags so social-media crawlers see the right preview
  app.use("/{*path}", (req, res) => {
    const html = injectOgMeta(rawHtml, req.path);
    res
      .status(200)
      .set({
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-cache",
      })
      .end(html);
  });
}
