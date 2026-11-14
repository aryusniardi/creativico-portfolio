import type { Release, Work, MediaKind } from "../types/content";

export function mediaKind(work: Work): MediaKind {
  return work.kind ?? (work.videoUrl ? "video" : work.externalUrl ? "external" : "image");
}

export function projectMedia(release: Release, works: Work[]): Work[] {
  return release.workIds.flatMap((id) => {
    const work = works.find((item) => item.id === id);
    return work ? [work] : [];
  });
}

export function platformName(platform?: Work["platform"]): string {
  return platform ? ({ youtube: "YouTube", instagram: "Instagram", tiktok: "TikTok", other: "original" })[platform] : "original";
}

export function mediaDescription(work: Work): string {
  if (mediaKind(work) === "image") return "Image";
  if (mediaKind(work) === "external")
    return work.platform ? `View on ${platformName(work.platform)}` : "External media";
  const seconds = work.durationSeconds;
  return seconds
    ? `Video · ${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`
    : "Video";
}
