import { setRefreshToken, headlessStates } from "$lib/server/spotify";
import { Logger } from "$lib/server/logger";
import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import * as env from "$env/static/private";

const logger = new Logger("spotify/auth", import.meta.url, true, 0x00ff00);

export const prerender = false;

export const GET: RequestHandler = async ({ request }) => {
  const queryParams = new URLSearchParams(new URL(request.url).search);
  const success = await setRefreshToken(queryParams.get("code")!);
  const isHeadless = headlessStates.includes(queryParams.get("state")!);
  if (success) {
    if (isHeadless) {
      logger.log("Headless auth success");
      return new Response(null, { status: 200 });
    }
    logger.log("The token was accepted!");
    throw redirect(302, "/");
  } else {
    logger.log(
      `# <@${env.DISCORD_OWNER_ID}> The ${
        isHeadless ? " headless" : ""
      }token was **not** accepted!`,
      { color: 0xff0000 },
    );
    if (isHeadless) return new Response(null, { status: 500 });
    throw redirect(302, "/");
  }
};
