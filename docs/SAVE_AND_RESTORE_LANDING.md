# Save and restore: landing page

Use these when you want to try a new theme (e.g. Tesoro-style) and be able to return to the current design.

## Current save point (committed)

- **Branch:** `landing-pre-tesoro-theme`  
  Same commit as current `main` (all latest landing content + carousel/grid).
- **Tag:** `landing-content-v2`  
  Points at the same commit.

## How to restore to this state

If you change the landing page (e.g. apply a new theme) and want to go back:

```bash
# Option A: Restore entire repo to this commit
git checkout landing-content-v2

# Option B: Restore only the landing file from this commit
git checkout landing-content-v2 -- client/src/pages/landing.tsx
```

To continue working on `main` again after restoring:

```bash
git checkout main
```

## Other references

- **Tag `landing-v1`** – State before the first content alignment (original “Who I help” / “Services” / “Why work with me” layout).
- **Branch `landing-pre-content-update`** – Same as `landing-v1` (pre–content alignment).
