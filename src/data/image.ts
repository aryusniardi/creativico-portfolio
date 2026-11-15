export function optimizedImageUrl(src: string, width: number): string {
  if (import.meta.env?.DEV || !src.startsWith("/_emdash/api/media/file/")) return src;
  return `/_image?${new URLSearchParams({ href: src, w: String(width), f: "webp", q: "80" })}`;
}
