import { defineLiveCollection } from "astro:content";

const collections = import.meta.env.DEV
  ? {
      _emdash: defineLiveCollection({
        loader: (await import(/* @vite-ignore */ "emdash/runtime")).emdashLoader(),
      }),
    }
  : {};

export { collections };
