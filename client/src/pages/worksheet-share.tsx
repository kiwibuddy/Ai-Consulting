"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageSEO } from "@/components/page-seo";
import { ArticleShare } from "@/components/article-share";
import { getWorksheetById } from "@/content/worksheets";
import { getDeepDiveById } from "@/content/deep-dives";

const DEFAULT_OG = "/Nathaniel_Portrait.png";

export default function WorksheetSharePage() {
  const params = useParams<{ id: string }>();
  const worksheet = getWorksheetById(params.id);
  const deepDive = getDeepDiveById(params.id);
  const resource = worksheet ?? deepDive;
  const isDeepDive = Boolean(!worksheet && deepDive);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(1200);

  const syncIframeHeight = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentDocument?.body) return;
    try {
      const doc = iframe.contentDocument;
      const h = Math.max(doc.body.scrollHeight, doc.documentElement?.scrollHeight ?? 0);
      if (h > 0) setIframeHeight(h + 32);
    } catch {
      /* ignore cross-origin restrictions */
    }
  }, []);

  useEffect(() => {
    if (!resource?.iframeSrc) return;
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
  }, [resource?.iframeSrc, syncIframeHeight]);

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

        <section className="py-6 px-3 sm:px-4 md:px-6 bg-[hsl(218,20%,88%)]">
          <iframe
            ref={iframeRef}
            title={resource.title}
            src={resource.iframeSrc}
            className="w-full max-w-[900px] mx-auto block rounded-2xl shadow-lg border border-neutral-200/80 bg-white"
            style={{ height: iframeHeight, minHeight: 600 }}
          />
        </section>

        <section className="py-12 px-6 border-t border-neutral-200 bg-neutral-50">
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-center sm:justify-start">
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-2 text-[hsl(142,76%,42%)] font-medium hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Resources
                </Link>
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
              <Button asChild className="w-full sm:w-auto shrink-0">
                <a href="https://www.nathanielbaldock.com/#contact" className="tesoro-cta-gradient">
                  Book a free 30-min consultation
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
