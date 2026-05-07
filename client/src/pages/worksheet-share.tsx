"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, Printer } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageSEO } from "@/components/page-seo";
import { ArticleShare } from "@/components/article-share";
import { WorksheetLeadCTA } from "@/components/worksheet-lead-cta";
import { getWorksheetById } from "@/content/worksheets";
import { getDeepDiveById } from "@/content/deep-dives";

const DEFAULT_OG = "/Nathaniel_Portrait.png";

/** Hard ceiling on the auto-grow iframe so any future runaway is bounded. */
const MAX_IFRAME_HEIGHT = 8000;

export default function WorksheetSharePage() {
  const params = useParams<{ id: string }>();
  const worksheet = getWorksheetById(params.id);
  const deepDive = getDeepDiveById(params.id);
  const resource = worksheet ?? deepDive;
  const isDeepDive = Boolean(!worksheet && deepDive);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(1200);
  const fitViewport =
    !isDeepDive && (worksheet?.displayMode === "fit-viewport");
  /** Tauranga SME HTML decks — 16∶9 iframe so letterboxed slides match the host frame */
  const cinematicPresentation =
    worksheet != null &&
    worksheet.displayMode === "fit-viewport" &&
    worksheet.id.startsWith("tauranga-sme-presentation-");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [params.id]);

  const syncIframeHeight = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentDocument?.body) return;
    try {
      const doc = iframe.contentDocument;
      const h = Math.max(doc.body.scrollHeight, doc.documentElement?.scrollHeight ?? 0);
      if (h <= 0) return;
      const next = Math.min(h + 32, MAX_IFRAME_HEIGHT);
      setIframeHeight((prev) => (Math.abs(prev - next) < 8 ? prev : next));
    } catch {
      /* ignore cross-origin restrictions */
    }
  }, []);

  useEffect(() => {
    if (!resource?.iframeSrc) return;
    if (fitViewport) return;
    const iframe = iframeRef.current;
    if (!iframe) return;

    let ro: ResizeObserver | null = null;
    const disconnect = () => {
      ro?.disconnect();
      ro = null;
    };

    const onLoad = () => {
      disconnect();
      syncIframeHeight();
      const body = iframe.contentDocument?.body;
      if (body) {
        ro = new ResizeObserver(() => syncIframeHeight());
        ro.observe(body);
      }
    };

    iframe.addEventListener("load", onLoad);
    return () => {
      iframe.removeEventListener("load", onLoad);
      disconnect();
    };
  }, [resource?.iframeSrc, syncIframeHeight, fitViewport]);

  if (!resource || !resource.iframeSrc) {
    return (
      <div data-theme="site" className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
        <SiteHeader currentPage="resources" />
        <div className="max-w-xl mx-auto px-6 py-24 text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">Worksheet not found</h1>
          <Link
            href="/resources"
            className="text-[hsl(142,76%,42%)] font-medium hover:underline inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Resources
          </Link>
        </div>
        <SiteFooter />
      </div>
    );
  }

  const canonicalPath = resource.url;
  const origin =
    typeof window !== "undefined" ? window.location.origin : "https://www.nathanielbaldock.com";
  const canonicalUrl = `${origin}${canonicalPath}`;

  const printWorksheet = () => {
    try {
      iframeRef.current?.contentWindow?.focus();
      iframeRef.current?.contentWindow?.print();
    } catch {
      /* ignore */
    }
  };

  return (
    <div
      data-theme="site"
      className="min-h-screen bg-neutral-50 text-neutral-900 font-sans overflow-x-hidden"
    >
      <PageSEO
        title={`${resource.title} — ${isDeepDive ? "Deep Dive" : "Worksheet"}`}
        description={resource.description}
        canonicalPath={canonicalPath}
        image={resource.shareImage ?? DEFAULT_OG}
        ogType="article"
        article={{
          author: "Nathaniel Baldock",
          authorUrl: "https://www.nathanielbaldock.com/about",
          publishedDate: resource.date,
          modifiedDate: resource.date,
        }}
      />
      <SiteHeader currentPage="resources" />

      <main>
        <section className="bg-white border-b border-neutral-200 px-6 py-5">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-neutral-600 text-center">
              {isDeepDive ? "Use the deep dive below." : "Fill in the worksheet below."} Use{" "}
              <strong className="font-medium text-neutral-800">Print / Save PDF</strong>{" "}
              in the page footer, or use{" "}
              <strong className="font-medium text-neutral-800">
                {isDeepDive ? "Print deep dive" : "Print worksheet"}
              </strong>{" "}
              at the bottom of this page after you finish.
            </p>
          </div>
        </section>

        <section className="bg-white border-b border-neutral-200 px-6 py-4">
          <div className="max-w-3xl mx-auto">
            <ArticleShare
              url={canonicalUrl}
              title={resource.title}
              description={resource.description}
            />
          </div>
        </section>

        <section
          className={
            cinematicPresentation
              ? "py-4 px-2 sm:px-4 md:py-6 bg-[hsl(218,20%,88%)]"
              : "py-6 px-3 sm:px-4 md:px-6 bg-[hsl(218,20%,88%)]"
          }
        >
          {cinematicPresentation ? (
            <div
              className="relative mx-auto w-full max-sm:h-[min(92dvh,920px)] sm:aspect-[16/9] sm:w-[min(100%,calc((100dvh-11rem)*16/9))] sm:max-h-[92dvh] rounded-2xl shadow-lg border border-neutral-200/80 bg-[#090c14] overflow-hidden"
            >
              <iframe
                ref={iframeRef}
                title={resource.title}
                src={resource.iframeSrc}
                className="absolute inset-0 w-full h-full border-0 block bg-[#090c14]"
                allowFullScreen
                allow="fullscreen"
              />
            </div>
          ) : (
            <iframe
              ref={iframeRef}
              title={resource.title}
              src={resource.iframeSrc}
              className="w-full max-w-[900px] mx-auto block rounded-2xl shadow-lg border border-neutral-200/80 bg-white"
              allowFullScreen
              allow="fullscreen"
              style={
                fitViewport
                  ? { height: "clamp(600px, 88vh, 1080px)" }
                  : { height: iframeHeight, minHeight: 600 }
              }
            />
          )}
        </section>

        <WorksheetLeadCTA
          headline={
            isDeepDive
              ? "Want to talk through what this means for your situation?"
              : "Want help turning this into a clear next step?"
          }
          body={
            isDeepDive
              ? "A 30-minute call can help you work out what this deep dive actually means for your family, church, school, or organisation — without the jargon or the sales pitch."
              : "A 30-minute call can help you turn this worksheet into a concrete plan for your family, church, school, or team — tailored to your specific situation."
          }
        />

        <section className="py-10 px-6 border-t border-neutral-200 bg-neutral-50">
          <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center sm:justify-between gap-3 sm:gap-4">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-[hsl(142,76%,42%)] font-medium hover:underline"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Resources
            </Link>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <a
                href={resource.iframeSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-500 hover:text-neutral-700 underline"
              >
                {isDeepDive ? "Open deep dive in new tab" : "Open worksheet in new tab"}
              </a>
              <button
                type="button"
                onClick={printWorksheet}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-50 hover:border-[hsl(142,76%,42%)]/50 hover:text-[hsl(142,76%,42%)] focus:outline-none focus:ring-2 focus:ring-[hsl(142,76%,42%)]/40"
              >
                <Printer className="h-4 w-4" />
                {isDeepDive ? "Print deep dive" : "Print worksheet"}
              </button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
