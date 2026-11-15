import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync, existsSync } from "node:fs";
import { mediaKind, mediaDescription, projectMedia, youtubeEmbedUrl } from "../src/data/media.ts";

const content = JSON.parse(
  readFileSync(new URL("../src/data/content.json", import.meta.url), "utf8"),
);
test("projects preserve their editorial mixed-media order", () => {
  const project = content.releases[0];
  const media = projectMedia(project, [...content.works].reverse());
  assert.deepEqual(
    media.map((work) => work.id),
    project.workIds,
  );
  assert.equal(mediaKind(media[0]), "external");
  assert.equal(mediaKind(media[1]), "image");
});
test("embeds supported YouTube URLs without accepting arbitrary iframe sources", () => {
  for (const url of [
    "https://youtu.be/0ERR5BCTcYo?t=10",
    "https://www.youtube.com/watch?v=0ERR5BCTcYo",
    "https://m.youtube.com/shorts/0ERR5BCTcYo",
    "https://youtube.com/live/0ERR5BCTcYo",
    "https://www.youtube-nocookie.com/embed/0ERR5BCTcYo",
  ]) {
    const embed = new URL(youtubeEmbedUrl(url));
    assert.equal(embed.origin, "https://www.youtube-nocookie.com");
    assert.equal(embed.pathname, "/embed/0ERR5BCTcYo");
    assert.equal(embed.searchParams.get("autoplay"), "1");
    assert.equal(embed.searchParams.get("mute"), "1");
  }
  assert.equal(new URL(youtubeEmbedUrl("https://youtube.com/playlist?list=PL_test-123")).searchParams.get("list"), "PL_test-123");
  for (const url of ["https://youtube.com.evil.test/watch?v=0ERR5BCTcYo", "https://evil.test/youtube.com/watch?v=0ERR5BCTcYo", "javascript:alert(1)", "https://youtu.be/invalid", "https://youtube.com/@channel", "/video.mp4"]) {
    assert.equal(youtubeEmbedUrl(url), null, url);
  }
});
test("direct videos and images have clear media labels", () => {
  assert.equal(mediaKind({ videoUrl: "/clip.mp4" }), "video");
  assert.equal(mediaDescription({ kind: "video", durationSeconds: 125 }), "Video · 2:05");
  assert.equal(mediaDescription({ kind: "image" }), "Image");
  assert.equal(mediaDescription({ kind: "external", platform: "youtube" }), "View on YouTube");
});
test("portfolio uses extracted local assets and real original releases", () => {
  assert.ok(content.talents.length >= 8);
  assert.equal(
    content.talents.some((talent) => talent.name === "Theo Supple"),
    true,
  );
  assert.equal(
    content.talents.some((talent) => talent.name === "Abby Latip"),
    true,
  );
  assert.equal(content.profile.disciplines.length, 5);
  const serialized = JSON.stringify(content);
  assert.doesNotMatch(serialized, /unsplash|mixkit|3x Faster|cinematic praise/i);
  for (const work of content.works) {
    assert.ok(existsSync(`public${work.thumbnailUrl}`), work.thumbnailUrl);
    if (work.kind === "external")
      assert.match(work.externalUrl, /^https:\/\/(www\.instagram\.com|youtu\.be|youtube\.com)\//);
  }
});
