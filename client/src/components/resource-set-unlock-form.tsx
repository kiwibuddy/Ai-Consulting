import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import type { ResourceSetDefinition } from "@shared/content/resource-sets";

export const unlockStorageKey = (setId: string) => `nb-resource-set-unlock:${setId}`;

export function isResourceSetUnlocked(setId: string): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(unlockStorageKey(setId)) === "1";
}

interface ResourceSetUnlockFormProps {
  setDef: ResourceSetDefinition;
  onUnlocked?: () => void;
  compact?: boolean;
}

export function ResourceSetUnlockForm({ setDef, onUnlocked, compact }: ResourceSetUnlockFormProps) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
      onUnlocked?.();
      setMessage("Check your inbox — the full set is on its way. Links are unlocked here too.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={compact ? "" : "mt-4"}>
      {!compact && (
        <>
          <p className="nb-body m-0 mb-2 font-medium">
            Get the full set ({setDef.worksheetIds.length} worksheets)
          </p>
          <p className="text-sm text-[var(--nb-ink-soft)] m-0 mb-4">
            Enter your email and I&apos;ll send every link in one message — same style as my audit and
            business-pack emails.
          </p>
        </>
      )}
      <form onSubmit={handleUnlock} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 rounded-lg border border-[var(--nb-rule)] bg-[var(--nb-bg)] px-3 py-2 text-sm text-[var(--nb-ink)]"
        />
        <button type="submit" disabled={submitting} className="nb-btn-primary nb-btn-primary--sm whitespace-nowrap">
          {submitting ? "Sending…" : "Email me the full set"}
        </button>
      </form>
      <p className="text-xs text-[var(--nb-ink-dim)] m-0 mt-3">
        One email with your links. Occasional resource updates after that. Unsubscribe any time.
      </p>
      {message && <p className="text-sm text-[var(--nb-accent)] m-0 mt-3">{message}</p>}
      {error && <p className="text-sm text-red-400 m-0 mt-3">{error}</p>}
    </div>
  );
}
