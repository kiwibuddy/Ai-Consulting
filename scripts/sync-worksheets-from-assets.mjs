/**
 * Copy worksheet HTML from Assets/ (drafts) → client/public/worksheets/ (live).
 *
 * Rules:
 * - If the live file is missing, copy (first publish).
 * - If both exist, copy only when the Assets file is strictly newer (mtime).
 * - Before writing anything, prints a plan and asks for confirmation (unless --yes).
 *
 * Usage:
 *   npm run sync:worksheets-from-assets
 *   node scripts/sync-worksheets-from-assets.mjs --yes
 *   node scripts/sync-worksheets-from-assets.mjs --dry-run
 */

import fs from "node:fs/promises";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const ASSETS_DIR = path.join(REPO_ROOT, "Assets");
const PUBLIC_WORKSHEETS = path.join(REPO_ROOT, "client", "public", "worksheets");

/** @type {{ src: string; dest: string }[]} */
const MAPPINGS = [
  // AI & Family
  {
    src: "AI Family worksheets/Worksheet_1_Who_Is_Raising_Our_Kids.html",
    dest: "who-is-raising-our-kids.html",
  },
  {
    src: "AI Family worksheets/Worksheet_2_Family_AI_Agreement.html",
    dest: "family-ai-agreement.html",
  },
  {
    src: "AI Family worksheets/Worksheet_3_Attachment_Audit.html",
    dest: "attachment-audit.html",
  },
  {
    src: "AI Family worksheets/Worksheet_4_Rewiring_Family_Rhythms.html",
    dest: "rewiring-family-rhythms.html",
  },
  // Christian growth
  {
    src: "Christian Growth Worksheet/Worksheet_Christian_1_Digital_Liturgy_Audit.html",
    dest: "digital-liturgy-audit.html",
  },
  {
    src: "Christian Growth Worksheet/Worksheet_Christian_2_Think_Without_Assistance.html",
    dest: "think-without-assistance.html",
  },
  {
    src: "Christian Growth Worksheet/Worksheet_Christian_3_Scrolling_to_Sabbath.html",
    dest: "scrolling-to-sabbath.html",
  },
  {
    src: "Christian Growth Worksheet/Worksheet_Christian_4_Healthy_AI_Use.html",
    dest: "healthy-ai-use.html",
  },
  // School / edu
  {
    src: "School Worksheet/Edu_Worksheet_1_VERIFY_Method.html",
    dest: "verify-method.html",
  },
  {
    src: "School Worksheet/Edu_Worksheet_2_Prompt_Engineering.html",
    dest: "prompt-engineering.html",
  },
  {
    src: "School Worksheet/Edu_Worksheet_3_What_Is_School_For.html",
    dest: "what-is-school-for.html",
  },
  // Christian professional (WP)
  {
    src: "Articles/WP_01_Automation_or_Augmentation_Christian.html",
    dest: "christian-professional/wp-01-automation-augmentation.html",
  },
  {
    src: "Articles/WP_02_The_52_Minute_Opportunity_Christian.html",
    dest: "christian-professional/wp-02-52-minute-opportunity.html",
  },
  {
    src: "Articles/WP_03_What_Will_They_Still_Pay_Me_For_Christian.html",
    dest: "christian-professional/wp-03-what-will-they-still-pay-me-for.html",
  },
  {
    src: "Articles/WP_04_Five_Year_Positioning_Map_Christian.html",
    dest: "christian-professional/wp-04-five-year-positioning-map.html",
  },
];

function parseArgs(argv) {
  return {
    yes: argv.includes("--yes") || argv.includes("-y"),
    dryRun: argv.includes("--dry-run"),
  };
}

/**
 * @param {string} absPath
 * @returns {Promise<number | null>}
 */
async function mtimeMs(absPath) {
  try {
    const st = await fs.stat(absPath);
    return st.mtimeMs;
  } catch {
    return null;
  }
}

async function main() {
  const { yes, dryRun } = parseArgs(process.argv.slice(2));

  /** @type {{ src: string; dest: string; reason: 'new' | 'newer' }[]} */
  const planned = [];

  for (const { src, dest } of MAPPINGS) {
    const absSrc = path.join(ASSETS_DIR, src);
    const absDest = path.join(PUBLIC_WORKSHEETS, dest);

    const srcM = await mtimeMs(absSrc);
    if (srcM === null) {
      console.warn(`[skip] Missing source: Assets/${src}`);
      continue;
    }

    const destM = await mtimeMs(absDest);
    if (destM === null) {
      planned.push({ src, dest, reason: "new" });
      continue;
    }

    if (srcM > destM) {
      planned.push({ src, dest, reason: "newer" });
    }
  }

  if (planned.length === 0) {
    console.log("Nothing to sync (no missing live files and no newer Assets copies).");
    return;
  }

  console.log(
    dryRun ? "Dry run — planned copies:\n" : "Planned copies (Assets → client/public/worksheets):\n",
  );
  for (const p of planned) {
    const tag = p.reason === "new" ? "new file" : "overwrite (Assets newer)";
    console.log(`  [${tag}] ${p.src}  →  ${p.dest}`);
  }

  if (dryRun) {
    console.log("\nDry run only; no files written.");
    return;
  }

  if (!yes) {
    const rl = readline.createInterface({ input, output });
    const answer = (await rl.question("\nProceed with these copies? [y/N] ")).trim().toLowerCase();
    rl.close();
    if (answer !== "y" && answer !== "yes") {
      console.log("Aborted; no files written.");
      process.exitCode = 1;
      return;
    }
  }

  for (const p of planned) {
    const absSrc = path.join(ASSETS_DIR, p.src);
    const absDest = path.join(PUBLIC_WORKSHEETS, p.dest);
    await fs.mkdir(path.dirname(absDest), { recursive: true });
    await fs.copyFile(absSrc, absDest);
    console.log(`Copied: ${p.dest}`);
  }

  console.log(`\nDone (${planned.length} file(s)).`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
