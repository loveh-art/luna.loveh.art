import { updateData } from "$lib/server/discord";
import { getData } from "$lib/spotify";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ platform }) => {
  return {
    User: updateData(
      platform!.env.DISCORD_OWNER_ID!,
      platform!.env.DISCORD_BOT_TOKEN!,
    ),
    Spotify: await getData(),
  };
};
