import { lastKnownSong } from "$lib/spotify";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ url }) => {
  return {
    lastKnownSong,

    pages: {
      "/": "Home",
      "/test": "Test",
    },
    url: url.pathname,
  };
};
