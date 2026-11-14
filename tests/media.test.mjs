import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync, existsSync } from "node:fs";
import { mediaKind, mediaDescription, projectMedia } from "../src/data/media.ts";

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
