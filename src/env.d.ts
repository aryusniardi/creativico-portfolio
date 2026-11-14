/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly DEV: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "astro:content" {
  export function defineLiveCollection<T = unknown>(config: { loader: unknown }): T;
}
