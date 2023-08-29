import { getData } from "$lib/server/spotify";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return await getData();
};
