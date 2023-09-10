import { lastKnownSong } from "$lib/spotify";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ url }) => {
  return {
    lastKnownSong,

    pages: {
      "/": "Home",
      "/shiggy": "Shiggy",
    },
    url: url.pathname,
  };
};
