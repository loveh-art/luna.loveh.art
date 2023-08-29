import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  console.log(event.request.url, event.request.headers.get("user-agent"));
  if (
    event.request.headers.get("user-agent")?.includes("Discordbot") &&
    !event.url.pathname.startsWith("/discordBot")
  ) {
    throw redirect(302, "/discordBot" + event.url.pathname);
  }
  const response = await resolve(event);
  return response;
};
