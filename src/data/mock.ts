import seed from "./content.json";
import { assertValidContent, type ContentDocument } from "./validation";

/**
 * Local seed fallback. During development `loadContent` can replace this with
 * the EmDash SQLite content; these exports keep the existing view imports safe.
 */
export const CONTENT: ContentDocument = assertValidContent(seed);
export const PROFILE = CONTENT.profile;
export const TALENTS = CONTENT.talents;
export const RELEASES = CONTENT.releases;
export const WORKS = CONTENT.works;
