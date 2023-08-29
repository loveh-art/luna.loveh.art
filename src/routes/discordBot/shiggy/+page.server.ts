import { DiscordUser } from "$lib/server/discord";
import { getData } from "$lib/server/spotify";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  throw redirect(302, "/img/bigshiggy.gif");
};
