import { DiscordUser } from "$lib/server/discord";
import { lastKnownSong } from "$lib/server/spotify";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return lastKnownSong;
};
