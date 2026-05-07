import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

const projectRoot = import.meta.dirname;
const clientRoot = path.resolve(projectRoot, "client");

/**
 * Vite inlines VITE_* at build time. CI hosts (Vercel, Railway, etc.) inject
 * VITE_BOOKING_URL into process.env — pin it here so the client bundle always
 * picks it up, even if env file resolution is odd with `root: client`.
 */
function bookingUrlFromEnv(mode: string): string {
  const fromRoot = loadEnv(mode, projectRoot, "VITE_");
  const fromClient = loadEnv(mode, clientRoot, "VITE_");
  return (
    process.env.VITE_BOOKING_URL ??
    fromRoot.VITE_BOOKING_URL ??
    fromClient.VITE_BOOKING_URL ??
    ""
  );
}

function publicSiteUrlFromEnv(mode: string): string {
  const fromRoot = loadEnv(mode, projectRoot, "VITE_");
  const fromClient = loadEnv(mode, clientRoot, "VITE_");
  return (
    process.env.VITE_PUBLIC_SITE_URL ??
    fromRoot.VITE_PUBLIC_SITE_URL ??
    fromClient.VITE_PUBLIC_SITE_URL ??
    ""
  );
}

export default defineConfig(({ mode }) => {
  const bookingUrl = bookingUrlFromEnv(mode);
  const publicSiteUrl = publicSiteUrlFromEnv(mode);

  return {
    plugins: [react()],
    define: {
      "import.meta.env.VITE_BOOKING_URL": JSON.stringify(bookingUrl),
      "import.meta.env.VITE_PUBLIC_SITE_URL": JSON.stringify(publicSiteUrl),
    },
    resolve: {
      alias: {
        "@": path.resolve(clientRoot, "src"),
        "@shared": path.resolve(projectRoot, "shared"),
        "@assets": path.resolve(projectRoot, "attached_assets"),
      },
    },
    root: clientRoot,
    build: {
      outDir: path.resolve(projectRoot, "dist/public"),
      emptyOutDir: true,
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
