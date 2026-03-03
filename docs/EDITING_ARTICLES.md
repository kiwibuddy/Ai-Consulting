# Editing Article Content

You have three ways to update article text and meta without restructuring the site.

---

## Option 1: Edit in GitHub (recommended, no setup)

Each article’s content lives in a single file. You can edit it in the browser on GitHub.

### Steps

1. Open the repo: **https://github.com/kiwibuddy/Ai-Consulting**
2. Go to the file for the article you want to change:
   - **Raising Humans in the Age of the Digital God**  
     `client/src/content/article-raising-humans.ts`
   - **Discipleship and Missions in an AI Age**  
     `client/src/content/article-discipleship-missions-ai.ts`
   - **Outsourcing the Holy Spirit to AI**  
     `client/src/content/article-outsourcing-holy-spirit.ts`
3. Click the **pencil (Edit)** icon.
4. Edit the text. Keep the structure the same:
   - `articleMeta` — title, subtitle, description, dates, image, etc.
   - `articleSummary` — one-page summary (headings, paragraphs, bullets).
   - `articleSections` — main body: each section has `id`, `title`, and `blocks`.  
     Blocks are `{ type: "paragraph", text: "..." }`, `{ type: "subheading", text: "..." }`, or `{ type: "discussion", questions: ["...", "..."] }`.
5. Scroll down, add a short commit message (e.g. “Update intro paragraph”), and click **Commit changes**.

After you push (or merge), your next deploy will show the new content. No need to tell the AI the new text—you edit the file directly.

**Tip:** On each article page there is an **“Edit this article”** link in the footer that opens the right file on GitHub in edit mode.

---

## Option 2: Edit in your editor (Cursor / VS Code)

Same files as above, but you edit locally:

- `client/src/content/article-raising-humans.ts`
- `client/src/content/article-discipleship-missions-ai.ts`
- `client/src/content/article-outsourcing-holy-spirit.ts`

Then commit and push as usual. This is the same as Option 1, just from your machine.

---

## Option 3: Edit on the website (admin UI) — future

To edit articles in a form on the site (e.g. at `/admin`), you’d add a small **content editor** that writes back to the repo. Common approaches:

- **Decap CMS (Netlify CMS)** — browser-based editor that commits to GitHub. Usually used with content stored as **Markdown** in a folder like `content/articles/`. That would mean converting each article into a Markdown file and having the site load from those files. One-time migration, then you edit in the browser.
- **Custom admin page** — a simple form (title, description, sections) that only you can access, saving either to the repo via GitHub API or to a small backend.

If you want to pursue Option 3, the next step is to choose Markdown + Decap CMS (no backend, edits go to Git) or a custom admin (would need a small backend or GitHub token setup).

---

## Summary

| Method              | Where you edit     | Setup        |
|---------------------|--------------------|-------------|
| **Edit in GitHub**  | GitHub website     | None        |
| **Edit in Cursor**  | This repo locally  | None        |
| **Edit on website** | Future /admin UI   | Migration + CMS or custom admin |

Right now, use **Option 1 or 2** and the **“Edit this article”** link on each article to open the correct file.
