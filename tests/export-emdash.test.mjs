import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";
import { assertValidContent } from "../src/data/validation.ts";

const root = new URL("..", import.meta.url).pathname;

function setup() {
  const dir = mkdtempSync(join(tmpdir(), "creativico-export-"));
  const database = join(dir, "data.db");
  const output = join(dir, "content.json");
  execFileSync(process.execPath, ["scripts/seed-emdash.mjs"], {
    cwd: root,
    env: { ...process.env, EMDASH_DB: database, EMDASH_UPLOADS: join(dir, "uploads") },
    stdio: "ignore",
  });
  return { dir, database, output, uploads: join(dir, "uploads"), mediaOutput: join(dir, "public-media") };
}

test("exports published content without changing the repository seed", () => {
  const { dir, database, output } = setup();
  try {
    execFileSync(process.execPath, ["scripts/export-emdash.mjs"], {
      cwd: root,
      env: { ...process.env, EMDASH_DB: database, EMDASH_CONTENT_OUTPUT: output, EMDASH_UPLOADS: join(dir, "uploads"), EMDASH_MEDIA_OUTPUT: join(dir, "public") },
      stdio: "ignore",
    });
    const content = JSON.parse(readFileSync(output, "utf8"));
    assertValidContent(content);
    assert.equal(content.releases.length, 3);
    assert.equal(content.works.length, 15);
    assert.equal(typeof content.profile.links[0].url, "string");
    assert.equal(content.releases[1].workIds.length, 9);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("rejects an incomplete published set before overwriting output", () => {
  const { dir, database, output } = setup();
  try {
    writeFileSync(output, '{"sentinel":true}\n');
    const db = new DatabaseSync(database);
    db.prepare("UPDATE ec_projects SET status = 'draft' WHERE slug = ?").run("rel-hitam-mv");
    assert.throws(() => execFileSync(process.execPath, ["scripts/export-emdash.mjs"], {
      cwd: root,
      env: { ...process.env, EMDASH_DB: database, EMDASH_CONTENT_OUTPUT: output, EMDASH_UPLOADS: join(dir, "uploads"), EMDASH_MEDIA_OUTPUT: join(dir, "public") },
      stdio: "pipe",
    }));
    assert.equal(readFileSync(output, "utf8"), '{"sentinel":true}\n');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("copies EmDash media while preserving nested storage keys", () => {
  const { dir, database, output, uploads, mediaOutput } = setup();
  try {
    mkdirSync(join(uploads, "avatars"), { recursive: true });
    writeFileSync(join(uploads, "avatars", "vico.jpg"), "test-image");
    const db = new DatabaseSync(database);
    db.prepare("INSERT INTO media (id, filename, mime_type, storage_key, status) VALUES (?, ?, ?, ?, 'ready')")
      .run("media-test", "vico.jpg", "image/jpeg", "avatars/vico.jpg");
    db.prepare("UPDATE ec_profiles SET portrait_url = ? WHERE slug = ?")
      .run(JSON.stringify({ id: "media-test" }), "profile");
    execFileSync(process.execPath, ["scripts/export-emdash.mjs"], {
      cwd: root,
      env: { ...process.env, EMDASH_DB: database, EMDASH_UPLOADS: uploads, EMDASH_CONTENT_OUTPUT: output, EMDASH_MEDIA_OUTPUT: mediaOutput },
      stdio: "ignore",
    });
    const content = JSON.parse(readFileSync(output, "utf8"));
    assert.equal(content.profile.portraitUrl, "/media/uploads/avatars/vico.jpg");
    assert.equal(existsSync(join(mediaOutput, "avatars", "vico.jpg")), true);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
