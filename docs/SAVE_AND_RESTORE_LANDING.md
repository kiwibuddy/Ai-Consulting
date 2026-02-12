# Save and restore: landing page

Use these when you want to try changes and be able to return to a known good state.

## Current save point (Tesoro landing — use before making further site changes)

- **Tag:** `landing-tesoro-savepoint`  
  Tesoro-style landing: hero portrait, Problems title + shimmer, How I help colored cards with scroll animation, Who this is for (3 sections with images), Why work with me (centered), Proof, Get started. All assets included.

## How to restore to this save point

If you change the site and want to return to this version:

```bash
# Option A: Restore entire repo to this commit (detached HEAD)
git checkout landing-tesoro-savepoint

# Option B: Restore only landing-related files from this tag
git checkout landing-tesoro-savepoint -- client/src/pages/landing.tsx client/src/index.css client/src/lib/animations.ts
```

To get back to `main` and keep working:

```bash
git checkout main
```

To create a new branch from the save point and work there:

```bash
git checkout -b my-experiment landing-tesoro-savepoint
```

## Older references

- **Tag `landing-content-v2`** / **Branch `landing-pre-tesoro-theme`** – Pre–Tesoro theme (earlier landing content + carousel/grid).
- **Tag `landing-v1`** – Before first content alignment (original “Who I help” / “Services” / “Why work with me” layout).
- **Branch `landing-pre-content-update`** – Same as `landing-v1`.
