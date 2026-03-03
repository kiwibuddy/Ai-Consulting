# SEO: Pre-rendering / SSR (Optional)

The site is currently a client-rendered SPA. Search engine crawlers receive the initial HTML with an empty `<div id="root"></div>` and then rely on JavaScript to render content. Modern crawlers (e.g. Google) often execute JS, but pre-rendering or SSR can improve indexing and speed.

## Options

1. **Pre-render at build time**  
   Use a plugin such as `vite-plugin-prerender` to generate static HTML for public routes (`/`, `/speaking`, `/resources`, `/privacy`, `/terms`, `/intake`) at build time. The crawler receives full HTML without relying on JS.

2. **Vite SSR**  
   Run the app with Vite’s server-side rendering so that each request for a public route returns server-rendered HTML. More setup (Node server, hydration) but keeps content always up to date.

3. **Leave as-is**  
   With sitemap, robots.txt, and JSON-LD in place, many crawlers will still index the site. Consider pre-rendering or SSR if you see indexing or ranking issues.

No pre-render or SSR has been implemented in this repo; this doc is for future reference.
