interface iDiscordUser {
  username: string;
  displayName: string;
  banner_color: string;
  avatar_url: string;
  flagImages: { [key: string]: string };
  id: string;
}
