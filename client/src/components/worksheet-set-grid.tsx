import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Lock } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { WorksheetItem } from "@/content/worksheets";
import type { ResourceSetDefinition } from "@shared/content/resource-sets";
import {
  cardSlideUpContainerVariants,
  cardSlideUpItemVariants,
  cinematicEase,
  landingViewportReveal,
} from "@/lib/animations";

const unlockStorageKey = (setId: string) => `nb-resource-set-unlock:${setId}`;

function formatResourceDate(iso: string): string {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-NZ", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return iso;
  }
}

function worksheetCtaLabel(format: string | undefined): string {
  switch (format) {
    case "Presentation":
      return "Start Presentation";
    case "Reflection":
      return "Open reflection";
    case "Workflow":
      return "Open workflow";
    case "Printable":
      return "Open printable";
    default:
      return "Open worksheet";
  }
}

interface WorksheetSetGridProps {
  setDef: ResourceSetDefinition;
  worksheetsById: Map<string, WorksheetItem>;
}

export function WorksheetSetGrid({ setDef, worksheetsById }: WorksheetSetGridProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setUnlocked(window.localStorage.getItem(unlockStorageKey(setDef.id)) === "1");
  }, [setDef.id]);

  const items = setDef.worksheetIds
    .map((id) => worksheetsById.get(id))
    .filter((w): w is WorksheetItem => Boolean(w));

  async function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setMessage(null);
    try {
      await apiRequest("POST", "/api/resource-set-request", {
        email: email.trim(),
        setId: setDef.id,
        website: "",
      });
      window.localStorage.setItem(unlockStorageKey(setDef.id), "1");
      setUnlocked(true);
      setMessage("Check your inbox for the full set. Links are unlocked here too.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mb-10 last:mb-0">
      <h3 className="nb-card-title mb-4">{setDef.label}</h3>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={landingViewportReveal}
        variants={cardSlideUpContainerVariants}
      >
        {items.map((sheet) => {
          const isPreview = sheet.id === setDef.previewWorksheetId;
          const isOpen = isPreview || unlocked;
          const thumbSrc = sheet.thumbnail ?? sheet.shareImage;
          const fmt = sheet.format?.trim() || "Interactive";

          const cardInner = (
            <>
              {thumbSrc ? (
                <img src={thumbSrc} alt="" className="aspect-video w-full object-cover shrink-0" />
              ) : (
                <div className="aspect-video bg-[var(--nb-bg-panel)] flex items-center justify-center shrink-0">
                  <FileText className="h-12 w-12 text-[var(--nb-ink-dim)]" />
                </div>
              )}
              <div className="p-5 flex-1 flex flex-col">
                <h4 className="nb-card-title text-[clamp(18px,1.6vw,22px)] mb-2">{sheet.title}</h4>
                <p className="text-sm text-[var(--nb-ink-soft)] leading-relaxed flex-1 mb-4">
                  {sheet.description}
                </p>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs text-[var(--nb-ink-dim)]">
                    {fmt} · {formatResourceDate(sheet.date)}
                  </span>
                  {isOpen ? (
                    <span className="text-sm font-medium text-[var(--nb-accent)] inline-flex items-center gap-1">
                      {worksheetCtaLabel(sheet.format)}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-[var(--nb-ink-dim)] inline-flex items-center gap-1">
                      <Lock className="h-3.5 w-3.5" />
                      Locked
                    </span>
                  )}
                </div>
              </div>
            </>
          );

          return (
            <motion.div
              key={sheet.id}
              variants={cardSlideUpItemVariants}
              whileHover={isOpen ? { y: -6, transition: { duration: 0.3, ease: cinematicEase } } : undefined}
              className={`flex flex-col rounded-2xl border border-[var(--nb-rule)] bg-[var(--nb-bg-raised)] overflow-hidden shadow-sm h-full ${
                isOpen ? "hover:shadow-lg transition-shadow duration-300" : "opacity-90"
              }`}
            >
              {isOpen ? (
                <Link href={sheet.url} className="flex flex-col flex-1 no-underline text-inherit cursor-pointer">
                  {cardInner}
                </Link>
              ) : (
                <div className="flex flex-col flex-1">{cardInner}</div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {!unlocked && items.length > 1 && (
        <div className="mt-6 rounded-2xl border border-[var(--nb-rule)] bg-[var(--nb-bg-raised)] p-5 md:p-6 max-w-xl">
          <p className="nb-body m-0 mb-2 font-medium">
            This is a set of {items.length}. The first is open now.
          </p>
          <p className="text-sm text-[var(--nb-ink-soft)] m-0 mb-4">
            Enter your email and I&apos;ll send you the full set.
          </p>
          <form onSubmit={handleUnlock} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-lg border border-[var(--nb-rule)] bg-[var(--nb-bg)] px-3 py-2 text-sm text-[var(--nb-ink)]"
            />
            <button type="submit" disabled={submitting} className="nb-btn-primary nb-btn-primary--sm">
              {submitting ? "Sending…" : "Email me the set"}
            </button>
          </form>
          <p className="text-xs text-[var(--nb-ink-dim)] m-0 mt-3">
            One email with your links. The occasional resource update after that. Unsubscribe any time.
          </p>
          {message && <p className="text-sm text-[var(--nb-accent)] m-0 mt-3">{message}</p>}
          {error && <p className="text-sm text-red-400 m-0 mt-3">{error}</p>}
        </div>
      )}
    </div>
  );
}
