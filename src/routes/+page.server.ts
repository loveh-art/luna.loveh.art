import { DiscordUser } from "$lib/server/discord";
import { getData } from "$lib/server/spotify";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return {
    User: DiscordUser,
    Spotify: await getData(),
  };
};
