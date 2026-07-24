import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/queryClient";

const unlockStorageKey = (magnetId: string) => `nb-lead-magnet-unlock:${magnetId}`;

function isUnlocked(magnetId: string): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(unlockStorageKey(magnetId)) === "1";
}

interface LeadMagnetUnlockFormProps {
  magnetId: string;
  /** Public path to the PDF, revealed after unlock. */
  pdfPath: string;
  downloadLabel?: string;
}

export function LeadMagnetUnlockForm({
  magnetId,
  pdfPath,
  downloadLabel = "Download the free sample (PDF)",
}: LeadMagnetUnlockFormProps) {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [submitting, setSubmitting] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setUnlocked(isUnlocked(magnetId));
  }, [magnetId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await apiRequest("POST", "/api/lead-magnet-request", {
        email: email.trim(),
        magnetId,
        website,
      });
      window.localStorage.setItem(unlockStorageKey(magnetId), "1");
      setUnlocked(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (unlocked) {
    return (
      <div className="rounded-xl border border-[var(--nb-accent)]/40 bg-[var(--nb-bg-raised)] p-6">
        <p className="nb-mono-label text-[11px] m-0 mb-3" style={{ color: "var(--nb-accent)" }}>
          Unlocked — check your inbox too
        </p>
        <a
          href={pdfPath}
          target="_blank"
          rel="noopener noreferrer"
          className="nb-btn-primary whitespace-nowrap inline-block"
        >
          {downloadLabel} →
        </a>
        <p className="text-xs text-[var(--nb-ink-dim)] m-0 mt-3">
          I&apos;ve also emailed you the link so you can find it later.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-[var(--nb-rule)] bg-[var(--nb-bg-raised)] p-6"
    >
      <p className="nb-body m-0 mb-2 font-medium">Get the free sample</p>
      <p className="text-sm text-[var(--nb-ink-soft)] m-0 mb-4">
        Enter your email and I&apos;ll send the sample straight to your inbox — and unlock the
        download here.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 rounded-lg border border-[var(--nb-rule)] bg-[var(--nb-bg)] px-3 py-2 text-sm text-[var(--nb-ink)]"
        />
        <button
          type="submit"
          disabled={submitting}
          className="nb-btn-primary nb-btn-primary--sm whitespace-nowrap"
        >
          {submitting ? "Sending…" : "Email me the sample"}
        </button>
      </div>
      {/* Honeypot: hidden from users, catches bots */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="hidden"
        aria-hidden="true"
      />
      <p className="text-xs text-[var(--nb-ink-dim)] m-0 mt-3">
        One email with your sample. Occasional resource updates after that. Unsubscribe any time.
      </p>
      {error && <p className="text-sm text-red-400 m-0 mt-3">{error}</p>}
    </form>
  );
}
