import { getData } from "$lib/server/spotify";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
  const data = await getData();

  return new Response(JSON.stringify(data), {
    headers: {
      "content-type": "application/json",
    },
  });
};
