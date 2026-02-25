"use client";

import React, { useState, useCallback } from "react";

export interface ArticleShareProps {
  url: string;
  title: string;
  /** Optional short description or quote for Twitter/LinkedIn. */
  description?: string;
}

function openSharePopup(href: string, w = 550, h = 420) {
  const left = Math.round((window.screen.width - w) / 2);
  const top = Math.round((window.screen.height - h) / 2);
  window.open(
    href,
    "share",
    `width=${w},height=${h},left=${left},top=${top},scrollbars=yes,resizable=yes`
  );
}

export function ArticleShare({ url, title, description }: ArticleShareProps) {
  const [copied, setCopied] = useState(false);

  const shareText = description ? `${title} — ${description}` : title;

  const shareX = useCallback(() => {
    const params = new URLSearchParams({
      url,
      text: shareText.slice(0, 200),
    });
    openSharePopup(`https://twitter.com/intent/tweet?${params.toString()}`);
  }, [url, shareText]);

  const shareLinkedIn = useCallback(() => {
    const params = new URLSearchParams({ url });
    openSharePopup(`https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`);
  }, [url]);

  const shareFacebook = useCallback(() => {
    const params = new URLSearchParams({ u: url });
    openSharePopup(`https://www.facebook.com/sharer/sharer.php?${params.toString()}`);
  }, [url]);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [url]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <span className="text-sm font-medium text-neutral-600">Share this article</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={shareX}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-600 transition hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[hsl(142,76%,42%)]/40"
          aria-label="Share on X (Twitter)"
        >
          <XIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={shareLinkedIn}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-600 transition hover:border-neutral-400 hover:bg-neutral-50 hover:text-[#0A66C2] focus:outline-none focus:ring-2 focus:ring-[hsl(142,76%,42%)]/40"
          aria-label="Share on LinkedIn"
        >
          <LinkedInIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={shareFacebook}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-600 transition hover:border-neutral-400 hover:bg-neutral-50 hover:text-[#1877F2] focus:outline-none focus:ring-2 focus:ring-[hsl(142,76%,42%)]/40"
          aria-label="Share on Facebook"
        >
          <FacebookIcon className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-600 transition hover:border-neutral-400 hover:bg-neutral-50 hover:text-[hsl(142,76%,42%)] focus:outline-none focus:ring-2 focus:ring-[hsl(142,76%,42%)]/40"
          aria-label={copied ? "Link copied" : "Copy link"}
        >
          {copied ? (
            <CheckIcon className="h-4 w-4 text-[hsl(142,76%,42%)]" />
          ) : (
            <LinkIcon className="h-4 w-4" />
          )}
        </button>
      </div>
      {copied && (
        <span className="text-xs text-[hsl(142,76%,42%)] font-medium">Link copied</span>
      )}
    </div>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
