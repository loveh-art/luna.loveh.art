import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  if (event.request.headers.get("user-agent")?.includes("Discordbot")) {
    throw redirect(302, "/discordBot/" + event.request.url.split("/").pop());
  }
  const response = await resolve(event);
  return response;
};
