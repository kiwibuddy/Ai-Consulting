"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageSEO } from "@/components/page-seo";
import { ArticleShare } from "@/components/article-share";
import { ArrowLeft, Printer } from "lucide-react";
import {
  getChristianProfessionalWorksheetBySlug,
} from "@/content/christian-professional-worksheets";

const DEFAULT_OG = "/images/teens-algorithm-header.png";

export default function ChristianProfessionalWorksheetPage() {
  const params = useParams<{ slug: string }>();
  const meta = getChristianProfessionalWorksheetBySlug(params.slug);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeHeight, setIframeHeight] = useState(1200);

  const syncIframeHeight = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe?.contentDocument?.body) return;
    try {
      const doc = iframe.contentDocument;
      const h = Math.max(
        doc.body.scrollHeight,
        doc.documentElement?.scrollHeight ?? 0
      );
      if (h > 0) setIframeHeight(h + 32);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!meta) return;
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
  }, [meta, syncIframeHeight]);

  if (!meta) {
    return (
      <div
        data-theme="site"
        className="min-h-screen bg-neutral-50 text-neutral-900 font-sans"
      >
        <SiteHeader currentPage="resources" />
        <div className="max-w-xl mx-auto px-6 py-24 text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            Worksheet not found
          </h1>
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

  const canonicalPath = `/resources/christian-professional/${meta.slug}`;
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
        title={`${meta.title} — Worksheet`}
        description={meta.description}
        canonicalPath={canonicalPath}
        image={DEFAULT_OG}
        ogType="article"
      />
      <SiteHeader currentPage="resources" />

      <main>
        <section className="bg-white border-b border-neutral-200 px-6 py-5">
          <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-3">
            <p className="text-sm text-neutral-600 text-center">
              Fill in the worksheet below. Use{" "}
              <strong className="font-medium text-neutral-800">Print / Save PDF</strong>{" "}
              in the worksheet footer, or print from here.
            </p>
            <button
              type="button"
              onClick={printWorksheet}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-50 px-4 py-2.5 text-sm font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-100 hover:border-[hsl(142,76%,42%)]/50 hover:text-[hsl(142,76%,42%)] focus:outline-none focus:ring-2 focus:ring-[hsl(142,76%,42%)]/40"
            >
              <Printer className="h-4 w-4" />
              Print worksheet
            </button>
          </div>
        </section>

        <section className="bg-white border-b border-neutral-200 px-6 py-4">
          <div className="max-w-3xl mx-auto">
            <ArticleShare
              url={canonicalUrl}
              title={meta.title}
              description={meta.shareDescription}
            />
          </div>
        </section>

        <section className="py-6 px-3 sm:px-4 md:px-6 bg-[hsl(218,20%,88%)]">
          <p className="text-center text-xs text-neutral-600 mb-3 uppercase tracking-wider">
            Working Professionals · {meta.seriesPart}
          </p>
          <iframe
            ref={iframeRef}
            title={meta.title}
            src={meta.iframeSrc}
            className="w-full max-w-[900px] mx-auto block rounded-2xl shadow-lg border border-neutral-200/80 bg-white"
            style={{ height: iframeHeight, minHeight: 600 }}
          />
        </section>

        <section className="py-12 px-6 border-t border-neutral-200 bg-neutral-50">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 justify-center sm:justify-start">
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 text-[hsl(142,76%,42%)] font-medium hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Resources
              </Link>
              <a
                href={meta.iframeSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-500 hover:text-neutral-700 underline"
              >
                Open worksheet in new tab
              </a>
            </div>
            <Button asChild>
              <a
                href="https://www.nathanielbaldock.com/#contact"
                className="tesoro-cta-gradient"
              >
                Book a free 30-min consultation
              </a>
            </Button>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
