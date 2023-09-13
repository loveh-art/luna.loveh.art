export interface iDiscordUser {
  username: string;
  displayName: string;
  banner_color: string;
  avatar_url: string;
  flagImages: { [key: string]: string };
  id: string;
}

export default async function getDiscordData(): Promise<iDiscordUser> {
  const data: iDiscordUser = await fetch(
    "https://website-api.loveh.art/discord/luna",
  ).then((res) => res.json());
  return data;
}
