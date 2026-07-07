import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Lock } from "lucide-react";
import type { WorksheetItem } from "@/content/worksheets";
import type { ResourceSetDefinition } from "@shared/content/resource-sets";
import {
  isResourceSetUnlocked,
  ResourceSetUnlockForm,
} from "@/components/resource-set-unlock-form";

interface WorksheetSetPreviewProps {
  setDef: ResourceSetDefinition;
  worksheetsById: Map<string, WorksheetItem>;
  currentWorksheetId: string;
  dark?: boolean;
}

export function WorksheetSetPreview({
  setDef,
  worksheetsById,
  currentWorksheetId,
  dark = false,
}: WorksheetSetPreviewProps) {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setUnlocked(isResourceSetUnlocked(setDef.id));
  }, [setDef.id]);

  const items = setDef.worksheetIds
    .map((id) => worksheetsById.get(id))
    .filter((w): w is WorksheetItem => Boolean(w));

  if (items.length <= 1) return null;

  const shell = dark
    ? "border-white/15 bg-white/[0.04]"
    : "border-[var(--nb-rule)] bg-[var(--nb-bg-raised)]";
  const muted = dark ? "text-[#f4efe2]/65" : "text-[var(--nb-ink-soft)]";
  const title = dark ? "text-[#f4efe2]" : "text-[var(--nb-ink)]";

  return (
    <section
      className={`py-10 px-6 border-t ${dark ? "border-white/10 bg-[#0f1014]" : "border-neutral-200 bg-neutral-50"}`}
    >
      <div className="max-w-3xl mx-auto">
        <p
          className={`nb-mono-label m-0 mb-2 ${dark ? "text-[hsl(142,76%,52%)]" : ""}`}
          style={dark ? undefined : { color: "var(--nb-accent)" }}
        >
          Preview of the full set
        </p>
        <h2 className={`nb-card-title text-2xl mb-2 ${title}`}>{setDef.label}</h2>
        <p className={`text-sm leading-relaxed m-0 mb-6 max-w-2xl ${muted}`}>{setDef.summary}</p>

        <div className={`rounded-2xl border p-5 md:p-6 ${shell}`}>
          <ul className="m-0 p-0 list-none space-y-3">
            {items.map((sheet, index) => {
              const isPreview = sheet.id === setDef.previewWorksheetId;
              const isCurrent = sheet.id === currentWorksheetId;
              const isOpen = isPreview || unlocked;
              const rowMuted = dark ? "text-[#f4efe2]/55" : "text-[var(--nb-ink-dim)]";

              return (
                <li
                  key={sheet.id}
                  className={`flex items-start justify-between gap-4 pb-3 border-b last:border-0 last:pb-0 ${
                    dark ? "border-white/10" : "border-[var(--nb-rule)]"
                  }`}
                >
                  <div className="min-w-0">
                    <span className={`text-xs font-medium uppercase tracking-wider ${rowMuted}`}>
                      {index + 1} of {items.length}
                      {isCurrent ? " · You are here" : isPreview ? " · Free preview" : ""}
                    </span>
                    <p className={`m-0 mt-1 font-medium ${title}`}>{sheet.title}</p>
                    <p className={`m-0 mt-1 text-sm ${muted}`}>{sheet.description}</p>
                  </div>
                  {isOpen ? (
                    <Link
                      href={sheet.url}
                      className={`shrink-0 text-sm font-medium inline-flex items-center gap-1 no-underline ${
                        dark ? "text-[hsl(142,76%,52%)]" : "text-[var(--nb-accent)]"
                      }`}
                    >
                      Open
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : (
                    <span className={`shrink-0 text-sm font-medium inline-flex items-center gap-1 ${rowMuted}`}>
                      <Lock className="h-3.5 w-3.5" />
                      Locked
                    </span>
                  )}
                </li>
              );
            })}
          </ul>

          {!unlocked && (
            <div className={`mt-6 pt-6 border-t ${dark ? "border-white/10" : "border-[var(--nb-rule)]"}`}>
              <ResourceSetUnlockForm setDef={setDef} onUnlocked={() => setUnlocked(true)} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
