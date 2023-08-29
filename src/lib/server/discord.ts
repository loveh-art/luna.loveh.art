import * as env from "$env/static/private";

import { type APIUser, UserFlags } from "discord-api-types/v10";
import type { iDiscordUser } from "../../types/Discord";

interface iClientModBadge {
  name: string;
  badge: string;
}

const flagToImage = {
  ActiveDeveloper: "activedeveloper",
  BugHunterLevel1: "bughunterlevel1",
  BugHunterLevel2: "bughunterlevel2",
  CertifiedModerator: "certifiedmod",
  HypeSquadOnlineHouse1: "hypesquadbravery",
  HypeSquadOnlineHouse2: "hypesquadbrilliance",
  HypeSquadOnlineHouse3: "hypesquadbalance",
  Hypesquad: "hypesquadevents",
  Partner: "discordpartner",
  PremiumEarlySupporter: "earlysupporter",
  Staff: "discordstaff",
  VerifiedDeveloper: "earlyverifiedbotdev",
};

export let DiscordUser: iDiscordUser = {
  username: "Loading...",
  displayName: "Loading...",
  banner_color: "#27292b",
  avatar_url:
    "https://canary.discord.com/assets/1f0bfc0865d324c2587920a7d80c609b.png",
  flagImages: {},
  id: "0",
};

interface objResponse {
  badge: string;
  name: string;
}
interface badgeApiResponse {
  [key: string]: string[] | objResponse[];
}
async function updateData() {
  const data = await fetch(
    `https://discord.com/api/v10/users/${env.DISCORD_OWNER_ID}`,
    {
      headers: {
        Authorization: `Bot ${env.DISCORD_BOT_TOKEN}`,
      },
    },
  );
  const json = (await data.json()) as APIUser;
  const _DiscordUser: iDiscordUser = {
    username: json.username,
    displayName: json.global_name || json.username,
    banner_color: `#${json.accent_color?.toString(16)}` || "#27292b",
    avatar_url:
      `https://cdn.discordapp.com/avatars/${json.id}/${json.avatar}.png` ||
      "https://canary.discord.com/assets/1f0bfc0865d324c2587920a7d80c609b.png",
    flagImages: {},
    id: json.id,
  };
  if (json.flags) {
    Object.keys(UserFlags)
      .filter((key) => json.flags! & UserFlags[key])
      .map(
        (image) =>
          (_DiscordUser.flagImages[
            image
          ] = `https://raw.githubusercontent.com/efeeozc/discord-badges/main/png/${flagToImage[image]}.png`),
      );
  }

  const modBadges = (await fetch(
    `https://clientmodbadges-api.herokuapp.com/users/${_DiscordUser.id}`,
  ).then((res) => res.json())) as badgeApiResponse;
  Object.entries(modBadges).forEach((data) => {
    data[1].forEach((badge: string | iClientModBadge) => {
      if (typeof badge === "string") {
        _DiscordUser.flagImages[
          badge
        ] = `https://clientmodbadges-api.herokuapp.com/badges/${data[0]}/${badge}`;
      } else {
        _DiscordUser.flagImages[badge.name] = badge.badge;
      }
    });
  });

  DiscordUser = _DiscordUser;
}
await updateData();
setInterval(updateData, 1000 * 60); // 10 minutes
