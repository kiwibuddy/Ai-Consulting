#!/usr/bin/env node
/**
 * Embeds hero.jpg and logo.png as base64 into docs/landing-review.html
 * so the file is self-contained for client review.
 * Run from repo root: node docs/embed-review-assets.cjs
 */

const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname);
const htmlPath = path.join(docsDir, 'landing-review.html');
const heroB64Path = path.join(docsDir, 'hero-b64.txt');
const logoB64Path = path.join(docsDir, 'logo-b64.txt');

const heroB64 = fs.readFileSync(heroB64Path, 'utf8').replace(/\s/g, '');
const logoB64 = fs.readFileSync(logoB64Path, 'utf8').replace(/\s/g, '');

let html = fs.readFileSync(htmlPath, 'utf8');

// Replace hero placeholder with embedded hero.jpg
html = html.replace(
  'src="HERO_PLACEHOLDER"',
  `src="data:image/jpeg;base64,${heroB64}"`
);

// Replace logo text-only block with logo img + text
const logoOld = `<a href="#" class="logo-wrap">
        <span class="logo-text">Nathaniel Baldock</span>
        <span class="logo-tag" style="display:block;">AI Consulting</span>
      </a>`;
const logoNew = `<a href="#" class="logo-wrap">
        <img src="data:image/png;base64,${logoB64}" alt="Nathaniel Baldock — AI Consulting" class="logo-img" />
        <span class="logo-block">
          <span class="logo-text">Nathaniel Baldock</span>
          <span class="logo-tag">AI Consulting</span>
        </span>
      </a>`;
html = html.replace(logoOld, logoNew);

// Footer logo (same image, smaller)
html = html.replace(
  'FOOTER_LOGO_PLACEHOLDER',
  `<img src="data:image/png;base64,${logoB64}" alt="Nathaniel Baldock — AI Consulting" style="height:1.5rem;width:auto;" /> `
);

fs.writeFileSync(htmlPath, html);
console.log('Embedded hero.jpg and logo.png into landing-review.html');
