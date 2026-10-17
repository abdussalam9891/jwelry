"use client";

import { useEffect, useState } from "react";

import { getCMSPage } from "@/lib/services/contentService";

function Skeleton() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-5 w-1/3 rounded bg-black/10" />
      <div className="space-y-3">
        <div className="h-4 rounded bg-black/10" />
        <div className="h-4 rounded bg-black/10" />
        <div className="h-4 w-4/5 rounded bg-black/10" />
      </div>
      <div className="space-y-3">
        <div className="h-5 w-1/4 rounded bg-black/10" />
        <div className="h-4 rounded bg-black/10" />
        <div className="h-4 rounded bg-black/10" />
        <div className="h-4 w-3/4 rounded bg-black/10" />
      </div>
    </div>
  );
}

// Renders a CMS-managed policy page. Section bodies are admin-authored HTML.
export default function CmsPage({ slug, fallbackTitle }) {
  const [page, setPage] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    getCMSPage(slug)
      .then((data) => {
        if (!data) {
          setStatus("missing");
          return;
        }

        setPage(data);
        setStatus("ready");
        document.title = data.seo?.metaTitle || `${data.title} | Gemora`;
      })
      .catch((error) => {
        console.error(error);
        setStatus("error");
      });
  }, [slug]);

  const sections = [...(page?.sections || [])].sort(
    (a, b) => (a.order || 0) - (b.order || 0),
  );

  let content;

  if (status === "loading") {
    content = <Skeleton />;
  } else if (status === "error") {
    content = (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
        <h2 className="mb-2 text-lg font-semibold text-red-700">
          Unable to load page
        </h2>
        <p className="text-red-600">Please try again later.</p>
      </div>
    );
  } else if (status === "missing") {
    content = (
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="mb-2 text-lg font-semibold">Page Not Found</h2>
        <p className="text-black/60">This page is currently unavailable.</p>
      </div>
    );
  } else if (!sections.length) {
    content = <p className="text-black/60 text-lg">No content available.</p>;
  } else {
    content = sections.map((section, index) => {
      const heading = section.title || section.heading;

      return (
        <section key={section._id || index} className="mb-10">
          {heading && (
            <h2 className="mb-3 text-[1.1rem] font-medium text-black">
              {heading}
            </h2>
          )}
          <div
            className="prose prose-neutral max-w-none leading-relaxed text-black/70"
            dangerouslySetInnerHTML={{ __html: section.content || "" }}
          />
        </section>
      );
    });
  }

  return (
    <section className="bg-[#F9F6F2] py-28 mt-24">
      <div className="container-main max-w-2xl">
        <h1 className="text-[2.4rem] md:text-[2.8rem] font-light leading-tight mb-12">
          {status === "loading" ? "Loading..." : page?.title || fallbackTitle}
        </h1>
        {content}
      </div>
    </section>
  );
}
