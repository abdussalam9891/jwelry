"use client";

import { useEffect, useState } from "react";

import { getAnnouncementBar } from "@/lib/services/contentService";

// Always renders its wrapper (collapsed to 0px when there is no active
// announcement) so the navbar can measure it with a ResizeObserver.
export default function AnnouncementBar({ barRef, style }) {
  const [announcement, setAnnouncement] = useState(null);

  useEffect(() => {
    getAnnouncementBar()
      .then((data) => setAnnouncement(data || null))
      .catch((error) => console.error("[AnnouncementBar]", error));
  }, []);

  return (
    <div
      ref={barRef}
      style={style}
      className={
        announcement
          ? "fixed top-0 left-0 right-0 z-[var(--z-navbar)] h-10 flex items-center justify-center bg-[#6B1A2A] text-white transition-transform duration-300"
          : "hidden"
      }
    >
      {announcement &&
        (announcement.link ? (
          <a href={announcement.link} className="hover:underline">
            {announcement.message}
          </a>
        ) : (
          <span>{announcement.message}</span>
        ))}
    </div>
  );
}
