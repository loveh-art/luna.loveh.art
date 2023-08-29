import { getData } from "$lib/server/spotify";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
  return await getData();
};
