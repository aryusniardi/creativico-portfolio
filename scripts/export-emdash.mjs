import {
  cpSync,
  existsSync,
  mkdirSync,
  renameSync,
  writeFileSync,
} from "node:fs";
import { dirname, isAbsolute, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const database = resolve(root, process.env.EMDASH_DB || "./data.db");
const uploads = resolve(root, process.env.EMDASH_UPLOADS || "./uploads");
const output = resolve(root, process.env.EMDASH_CONTENT_OUTPUT || "src/data/content.json");
const mediaOutput = resolve(root, process.env.EMDASH_MEDIA_OUTPUT || "public/media/uploads");
const cli = resolve(root, "node_modules/emdash/dist/cli/index.mjs");
const pendingMedia = new Map();

function exportSeed() {
  const result = spawnSync(process.execPath, [cli, "export-seed", "--database", database, "--cwd", root, "--with-content", "all", "--no-pretty"], { encoding: "utf8" });
  if (result.status !== 0) throw new Error(result.stderr || "EmDash export failed");
  const start = result.stdout.indexOf("{");
  if (start < 0) throw new Error("EmDash returned no seed JSON");
  return JSON.parse(result.stdout.slice(start));
}

const rename = {
  bio_headline: "bioHeadline", portrait_url: "portraitUrl", project_ids: "projectIds", cover_url: "coverUrl",
  talent_ids: "talentIds", my_roles: "myRoles", work_ids: "workIds", published_on: "publishedAt", release_id: "releaseId",
  thumbnail_url: "thumbnailUrl", image_url: "imageUrl", video_url: "videoUrl", poster_url: "posterUrl", external_url: "externalUrl",
  duration_seconds: "durationSeconds", captions_url: "captionsUrl",
};

const copiedMedia = new Map();
const referenceIds = new Map();

function normalizeMedia(input) {
  const url = input?.$media?.url;
  if (typeof url !== "string") return input;
  const marker = "/_emdash/api/media/file/";
  const storageKey = url.includes(marker) ? decodeURIComponent(url.split(marker).at(-1)) : null;
  if (!storageKey) return url;
  if (storageKey.includes("..") || isAbsolute(storageKey)) throw new Error(`Unsafe EmDash media path: ${storageKey}`);
  const source = resolve(uploads, storageKey);
  if (!source.startsWith(uploads + "/") || !existsSync(source)) throw new Error(`Referenced upload is missing: ${storageKey}`);
  const publicUrl = `/media/uploads/${storageKey}`;
  pendingMedia.set(storageKey, { source });
  copiedMedia.set(url, publicUrl);
  return publicUrl;
}

function normalizeValue(input) {
  if (Array.isArray(input)) return input.map(normalizeValue);
  if (input && typeof input === "object") {
    if ("$media" in input) return normalizeMedia(input);
    if ("work_id" in input) return input.work_id;
    if (Object.keys(input).length === 1 && "value" in input) return normalizeValue(input.value);
    return Object.fromEntries(Object.entries(input).map(([key, item]) => [rename[key] || key, normalizeValue(item)]));
  }
  if (typeof input === "string" && input.startsWith("$ref:")) return referenceIds.get(input.slice(5)) || input.split(":").at(-1);
  return input;
}

function record(entry) {
  const data = Object.fromEntries(Object.entries(entry.data || {}).map(([key, item]) => [rename[key] || key, normalizeValue(item)]));
  data.id ||= data.source_id || entry.slug;
  data.slug ||= entry.slug;
  if (typeof data.featured === "number") data.featured = data.featured !== 0;
  delete data.source_id;
  return data;
}

function published(entries, collection, required = true) {
  const rows = (entries || []).filter((entry) => entry.status === "published").map(record);
  if (required && !rows.length) throw new Error(`No published ${collection} content found`);
  return rows;
}

async function validate(content) {
  const { assertValidContent } = await import("../src/data/validation.ts");
  return assertValidContent(content);
}

function copyPendingMedia() {
  for (const [storageKey, { source }] of pendingMedia) {
    const target = resolve(mediaOutput, storageKey);
    mkdirSync(dirname(target), { recursive: true });
    cpSync(source, target);
  }
}

const seed = exportSeed();
for (const entries of Object.values(seed.content || {})) for (const entry of entries) referenceIds.set(entry.id, entry.data?.source_id || entry.slug);
const profiles = published(seed.content?.profiles, "profile");
if (profiles.length !== 1) throw new Error("Keep one published profile in EmDash.");
const content = {
  profile: profiles[0],
  talents: published(seed.content?.talents, "talents", false),
  releases: published(seed.content?.projects, "projects", false),
  works: published(seed.content?.works, "media", false),
};
for (const talent of content.talents) talent.projectIds = content.releases.filter(project => project.talentIds?.includes(talent.id)).map(project => project.id);
for (const work of content.works) work.releaseId = content.releases.find(project => project.workIds?.includes(work.id))?.id;
const canonical = await validate(content);
copyPendingMedia();
mkdirSync(dirname(output), { recursive: true });
const temporaryOutput = `${output}.tmp-${process.pid}`;
writeFileSync(temporaryOutput, `${JSON.stringify(canonical, null, 2)}\n`);
renameSync(temporaryOutput, output);
console.log(`Exported published EmDash content: ${content.releases.length} projects, ${content.works.length} media, ${copiedMedia.size} uploads`);
