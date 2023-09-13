import getDiscordData from "$lib/discord";
import getSpotifyData from "$lib/spotify";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return {
    User: await getDiscordData(),
    Spotify: await getSpotifyData(),
  };
};
