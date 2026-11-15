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
  if (mediaKind(work) !== "image" && youtubeEmbedUrl(mediaKind(work) === "video" ? work.videoUrl : work.externalUrl)) return "YouTube video";
  if (mediaKind(work) === "image") return "Image";
  if (mediaKind(work) === "external")
    return work.platform ? `View on ${platformName(work.platform)}` : "External media";
  const seconds = work.durationSeconds;
  return seconds
    ? `Video · ${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`
    : "Video";
}

export function youtubeEmbedUrl(value?: string): string | null {
  if (!value) return null;
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;
  const host = url.hostname.toLowerCase();
  const youtube = [
    "youtube.com",
    "www.youtube.com",
    "m.youtube.com",
    "youtube-nocookie.com",
    "www.youtube-nocookie.com",
  ].includes(host);
  const short = host === "youtu.be";
  if (!youtube && !short) return null;
  const parts = url.pathname.split("/").filter(Boolean);
  const id = short
    ? parts[0]
    : url.pathname === "/watch"
      ? url.searchParams.get("v")
      : ["embed", "shorts", "live"].includes(parts[0])
        ? parts[1]
        : null;
  const params = new URLSearchParams({ autoplay: "1", mute: "1", playsinline: "1", rel: "0" });
  if (id && /^[\w-]{11}$/.test(id)) return `https://www.youtube-nocookie.com/embed/${id}?${params}`;
  const list = url.searchParams.get("list");
  if (
    youtube &&
    ["/playlist", "/embed/videoseries"].includes(url.pathname) &&
    list &&
    /^[\w-]+$/.test(list)
  ) {
    params.set("list", list);
    return `https://www.youtube-nocookie.com/embed/videoseries?${params}`;
  }
  return null;
}
