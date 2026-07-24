#!/usr/bin/env python3
"""Build the AI Policy Starter Kit deliverables and publish the customer bundle.

Source of truth is the Markdown in this folder. This script:
  1. Renders Markdown -> styled HTML
  2. Exports editable .docx (via macOS `textutil`) and styled .pdf (via Chrome)
  3. Copies the CUSTOMER-FACING files into client/public/downloads/ai-policy-starter-kit/
     (served by express.static as an unlisted download path)
  4. Builds ai-policy-starter-kit.zip of the whole customer bundle

Run with the local venv:

    .venv/bin/python build-exports.py

Requires macOS `textutil` (docx) and Google Chrome (pdf).
"""
import shutil
import subprocess
import sys
import zipfile
from pathlib import Path

import markdown  # provided by .venv

ROOT = Path(__file__).parent
EXPORTS = ROOT / "exports"
SECTORS = ROOT / "sectors"
# Published, served location (unlisted download path)
PUBLIC_DIR = ROOT.parents[1] / "client" / "public" / "downloads" / "ai-policy-starter-kit"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# name -> {"docx": bool, "pdf": bool}  (which export formats to produce)
COMPONENTS = {
    "customer-start-here.md": {"docx": False, "pdf": True, "as": "START-HERE"},
    "01-ai-policy-template.md": {"docx": True, "pdf": True},
    "02-traffic-light-data-guide.md": {"docx": True, "pdf": True},
    "03-staff-acknowledgement-form.md": {"docx": True, "pdf": True},
    "05-website-ai-statements.md": {"docx": True, "pdf": True},
}
SECTOR_FILES = ["business.md", "church.md", "nonprofit.md", "school.md"]

# Customer bundle: (source path relative to EXPORTS, dest path relative to PUBLIC_DIR)
CUSTOMER_BUNDLE = [
    ("START-HERE.pdf", "START-HERE.pdf"),
    ("01-ai-policy-template.docx", "01-ai-policy-template.docx"),
    ("01-ai-policy-template.pdf", "01-ai-policy-template.pdf"),
    ("02-traffic-light-data-guide.pdf", "02-traffic-light-data-guide.pdf"),
    ("02-traffic-light-data-guide.docx", "02-traffic-light-data-guide.docx"),
    ("03-staff-acknowledgement-form.docx", "03-staff-acknowledgement-form.docx"),
    ("05-website-ai-statements.docx", "05-website-ai-statements.docx"),
    ("05-website-ai-statements.pdf", "05-website-ai-statements.pdf"),
    ("sectors/business.pdf", "sectors/business.pdf"),
    ("sectors/church.pdf", "sectors/church.pdf"),
    ("sectors/nonprofit.pdf", "sectors/nonprofit.pdf"),
    ("sectors/school.pdf", "sectors/school.pdf"),
]

CSS = """
@page { size: A4; margin: 18mm; }
body { font-family: Georgia, 'Times New Roman', serif; color: #1a1a1a;
       line-height: 1.5; max-width: 720px; margin: 0 auto; }
h1 { font-size: 24pt; color: #0f2f4f; border-bottom: 3px solid #c9a227;
     padding-bottom: 6px; margin-bottom: 4px; }
h2 { font-size: 15pt; color: #0f2f4f; margin-top: 22px; }
h3 { font-size: 12.5pt; color: #345; }
table { border-collapse: collapse; width: 100%; margin: 12px 0; font-size: 10.5pt; }
th, td { border: 1px solid #cfd6dd; padding: 7px 9px; text-align: left;
         vertical-align: top; }
th { background: #0f2f4f; color: #fff; }
tr:nth-child(even) td { background: #f5f7fa; }
blockquote { border-left: 4px solid #c9a227; background: #fbf7ea; margin: 14px 0;
             padding: 8px 14px; color: #333; }
code { background: #eef1f4; padding: 1px 4px; border-radius: 3px;
       font-family: 'SF Mono', Menlo, monospace; font-size: 0.9em; }
em { color: #555; }
hr { border: 0; border-top: 1px solid #dde2e8; margin: 20px 0; }
li { margin: 3px 0; }
"""


def md_to_html(md_path: Path) -> str:
    text = md_path.read_text(encoding="utf-8")
    body = markdown.markdown(text, extensions=["tables", "sane_lists", "attr_list"])
    return (
        f"<!doctype html><html><head><meta charset='utf-8'>"
        f"<title>{md_path.stem}</title><style>{CSS}</style></head>"
        f"<body>{body}</body></html>"
    )


def export_one(src: Path, out_stem: str, want_docx: bool, want_pdf: bool,
               out_dir: Path) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)
    html = md_to_html(src)
    html_path = out_dir / f"{out_stem}.html"
    html_path.write_text(html, encoding="utf-8")
    if want_docx:
        subprocess.run(
            ["textutil", "-convert", "docx", str(html_path),
             "-output", str(out_dir / f"{out_stem}.docx")],
            check=True,
        )
    if want_pdf and Path(CHROME).exists():
        subprocess.run(
            [CHROME, "--headless", "--disable-gpu", "--no-pdf-header-footer",
             f"--print-to-pdf={out_dir / f'{out_stem}.pdf'}", f"file://{html_path}"],
            check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        )
    print(f"  exported {out_stem} (docx={want_docx}, pdf={want_pdf})")


def main() -> int:
    EXPORTS.mkdir(exist_ok=True)
    if not Path(CHROME).exists():
        print("WARN: Chrome not found; PDFs will be skipped.")

    print("Exporting core components...")
    for name, opts in COMPONENTS.items():
        src = ROOT / name
        if not src.exists():
            print(f"  SKIP missing {name}")
            continue
        out_stem = opts.get("as", src.stem)
        export_one(src, out_stem, opts["docx"], opts["pdf"], EXPORTS)

    print("Exporting sector flavours (pdf)...")
    for name in SECTOR_FILES:
        src = SECTORS / name
        if not src.exists():
            print(f"  SKIP missing sectors/{name}")
            continue
        export_one(src, Path(name).stem, False, True, EXPORTS / "sectors")

    print(f"Publishing customer bundle -> {PUBLIC_DIR}")
    if PUBLIC_DIR.exists():
        shutil.rmtree(PUBLIC_DIR)
    (PUBLIC_DIR / "sectors").mkdir(parents=True, exist_ok=True)
    published = []
    for src_rel, dest_rel in CUSTOMER_BUNDLE:
        src = EXPORTS / src_rel
        if not src.exists():
            print(f"  WARN missing bundle file {src_rel}")
            continue
        dest = PUBLIC_DIR / dest_rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dest)
        published.append(dest)

    zip_path = PUBLIC_DIR / "ai-policy-starter-kit.zip"
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for f in published:
            zf.write(f, f"ai-policy-starter-kit/{f.relative_to(PUBLIC_DIR)}")
    print(f"  zip -> {zip_path.name} ({len(published)} files)")

    print("Done. Published files:")
    for f in sorted(PUBLIC_DIR.rglob("*")):
        if f.is_file():
            print(f"  /downloads/ai-policy-starter-kit/{f.relative_to(PUBLIC_DIR)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
