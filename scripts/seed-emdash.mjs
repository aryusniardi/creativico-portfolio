import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const database = resolve(root, process.env.EMDASH_DB || "./data.db");
const uploads = resolve(root, process.env.EMDASH_UPLOADS || "./uploads");
const seedPath = resolve(root, ".emdash-seed.generated.json");
const emdashCli = resolve(root, "node_modules/emdash/dist/cli/index.mjs");
const source = JSON.parse(readFileSync(resolve(root, "src/data/content.json"), "utf8"));

const field = (slug, label, type = "text", validation) => ({
  slug,
  label,
  type,
  ...(validation ? { validation } : {}),
});
const select = (slug, label, options) => field(slug, label, "select", { options });
const repeater = (slug, label, subFields) => field(slug, label, "repeater", { subFields });
const reference = (slug, label, targetCollection, multiple = false, relation, relationSide) => field(slug, label, "reference", { targetCollection, multiple, ...(relation ? { relation, relationSide } : {}) });

const listRepeater = (slug, label) => repeater(slug, label, [field("value", "Value")]);

const collections = [
  {
    slug: "profiles",
    supports: ["revisions"],
    titleField: "name",
    admin: { quickCreate: false },
    label: "Profiles",
    labelSingular: "Profile",
    routable: false,
    fields: [
      field("name", "Name"),
      field("nickname", "Nickname"),
      field("headline", "Headline"),
      field("bio_headline", "Bio headline"),
      field("bio", "Bio"),
      field("location", "Location"),
      field("email", "Email"),
      field("phone", "Phone"),
      field("linkedin", "LinkedIn"),
      field("portrait_url", "Portrait", "image"),
      listRepeater("tags", "Tags"),
      repeater("awards", "Awards", [field("title", "Title"), field("issuer", "Issuer"), field("desc", "Description", "text")]),
      repeater("disciplines", "Disciplines", [field("title", "Title"), field("description", "Description", "text")]),
      repeater("links", "Links", [field("label", "Label"), field("url", "URL", "url")]),
    ],
  },
  {
    slug: "talents",
    supports: ["revisions"],
    titleField: "name",
    label: "Talents",
    labelSingular: "Talent",
    routable: false,
    fields: [
      field("name", "Name"),
      select("category", "Category", ["creator", "musician", "actor", "other"]),
      field("portrait_url", "Portrait", "image"),
      field("cover_url", "Cover", "image"),
      field("bio", "Bio"),
      reference("project_ids", "Projects", "projects", true, "project_talents", "child"),
    ],
  },
  {
    slug: "projects",
    supports: ["revisions"],
    label: "Projects",
    labelSingular: "Project",
    routable: false,
    fields: [
      field("title", "Title"),
      field("year", "Year", "integer"),
      reference("talent_ids", "Talents", "talents", true, "project_talents", "parent"),
      field("brand", "Brand"),
      select("category", "Category", ["campaign", "series", "brand-collab", "bts"]),
      field("cover_url", "Cover", "image"),
      field("summary", "Summary"),
      field("objective", "Objective"),
      field("insight", "Insight"),
      field("concept", "Concept"),
      field("execution", "Execution"),
      field("outcome", "Outcome"),
      listRepeater("my_roles", "Roles"),
      repeater("credits", "Credits", [field("name", "Name"), field("role", "Role")]),
      repeater("metrics", "Metrics", [field("label", "Label"), field("value", "Value"), field("context", "Context")]),
      reference("work_ids", "Ordered media", "works", true, "project_media", "parent"),
      field("featured", "Featured", "boolean"),
      field("published_on", "Published at", "datetime"),
    ],
  },
  {
    slug: "works",
    supports: ["revisions"],
    label: "Media",
    labelSingular: "Media item",
    routable: false,
    fields: [
      field("title", "Title"),
      reference("release_id", "Project", "projects", false, "project_media", "child"),
      reference("talent_ids", "Talents", "talents", true),
      select("kind", "Kind", ["image", "video", "external"]),
      field("thumbnail_url", "Thumbnail", "image"),
      field("image_url", "Image", "image"),
      field("video_url", "Video", "file", { allowedMimeTypes: ["video/mp4", "video/webm", "video/quicktime"] }),
      field("poster_url", "Poster", "image"),
      field("external_url", "External URL", "url"),
      field("alt", "Alt text"),
      field("duration_seconds", "Duration", "integer"),
      select("platform", "Platform", ["instagram", "tiktok", "youtube", "other"]),
      field("description", "Description"),
      listRepeater("my_roles", "Roles"),
      field("captions_url", "Captions URL", "url"),
    ],
  },
];

const keyMap = {
  bioHeadline: "bio_headline",
  portraitUrl: "portrait_url",
  projectIds: "project_ids",
  coverUrl: "cover_url",
  talentIds: "talent_ids",
  myRoles: "my_roles",
  workIds: "work_ids",
  publishedAt: "published_on",
  releaseId: "release_id",
  thumbnailUrl: "thumbnail_url",
  imageUrl: "image_url",
  videoUrl: "video_url",
  posterUrl: "poster_url",
  externalUrl: "external_url",
  durationSeconds: "duration_seconds",
  captionsUrl: "captions_url",
};
const toCmsData = (record, fallbackSlug) =>
  Object.fromEntries(
    Object.entries(record)
      .filter(([key]) => !["id", "releaseId", "projectIds"].includes(key))
      .map(([key, value]) => {
        if (["portraitUrl", "coverUrl", "thumbnailUrl", "imageUrl", "posterUrl", "videoUrl"].includes(key) && typeof value === "string" && value.startsWith("/media/") && existsSync(resolve(root, "public" + value))) {
          return [keyMap[key] || key, { $media: { file: "public" + value, alt: record.alt || record.name || record.title || "Portfolio image" } }];
        }
        const cmsKey = keyMap[key] || key;
        if (["talentIds", "workIds"].includes(key)) return [cmsKey, value.map((id) => `$ref:${id}`)];
        if (["tags", "myRoles"].includes(key)) return [cmsKey, value.map((item) => ({ value: item }))];
        return [cmsKey, value];
      }),
  );
const entry = (record, fallbackSlug) => {
  const { id, ...data } = record;
  return {
    id: id || fallbackSlug,
    slug: id || fallbackSlug,
    status: "published",
    data: toCmsData(data, fallbackSlug),
  };
};

const seed = {
  version: "1",
  defaultLocale: "en",
  meta: {
    name: "Creativico portfolio",
    description: "Editable creative portfolio content",
    author: source.profile.name,
  },
  collections,
  relations: [
    { slug: "project_media", parentCollection: "projects", childCollection: "works", parentLabel: "Project", childLabel: "Media", maxParentsPerChild: 1 },
    { slug: "project_talents", parentCollection: "projects", childCollection: "talents", parentLabel: "Projects", childLabel: "Talents" },
  ],
  content: {
    profiles: [entry(source.profile, "profile")],
    talents: source.talents.map((item) => entry(item, item.id)),
    works: source.works.map((item) => entry(item, item.id)),
    projects: source.releases.map((item) => entry(item, item.id)),
  },
};

mkdirSync(resolve(root, ".emdash"), { recursive: true });
writeFileSync(seedPath, `${JSON.stringify(seed, null, 2)}\n`);

function run(args) {
  const result = spawnSync(process.execPath, [emdashCli, ...args], { cwd: root, stdio: "inherit" });
  if (result.status !== 0) process.exit(result.status || 1);
}

if (!existsSync(database)) run(["init", "--cwd", root, "--database", database]);
run([
  "seed",
  seedPath,
  "--cwd",
  root,
  "--database",
  database,
  "--on-conflict",
  "skip",
  "--uploads-dir",
  uploads,
]);
rmSync(seedPath, { force: true });
console.log(`EmDash content seeded in ${database}`);
