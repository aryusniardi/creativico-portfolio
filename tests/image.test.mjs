import assert from "node:assert/strict";
import test from "node:test";
import { optimizedImageUrl } from "../src/data/image.ts";

test("requests size-bound WebP for CMS images and preserves other sources", () => {
  const source = "/_emdash/api/media/file/folder/artwork.jpg";
  const url = new URL(optimizedImageUrl(source, 768), "https://example.com");
  assert.equal(url.pathname, "/_image");
  assert.equal(url.searchParams.get("href"), source);
  assert.equal(url.searchParams.get("w"), "768");
  assert.equal(url.searchParams.get("f"), "webp");
  assert.equal(url.searchParams.get("q"), "80");
  for (const source of ["/media/portfolio/photo.webp", "https://example.com/photo.jpg"]) {
    assert.equal(optimizedImageUrl(source, 128), source);
  }
});
