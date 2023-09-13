<script lang="ts">
  import { faDiscord } from "@fortawesome/free-brands-svg-icons";
  import { onMount } from "svelte";
  import Fa from "svelte-fa";

  import type { iDiscordUser } from "$lib/discord";

  export let User: iDiscordUser;

  onMount(() => {
    console.log(User);
  });
</script>

<div class="discordEmbed">
  <div class="discordProfile">
    <img class="discordAvatar" src={User.avatar_url} alt={User.displayName} />
    <div class="discordNames">
      <div class="discordDisplayName">
        {User.displayName}
      </div>
      <div class="discordUserName">
        {User.username}
      </div>
    </div>
  </div>
  <div
    class="discordBanner"
    style:background-color={User.banner_color === "unset"
      ? "var(--ctp-surface1)"
      : User.banner_color}
  >
    <div class="discordBadges">
      {#each Object.entries(User.flagImages) as img}
        <img class="discordBadge" src={img[1]} alt={img[0]} />
      {/each}
    </div>
    <a
      class="discordIcon"
      href={`https://discord.com/users/${User.id}`}
      target="_blank"
    >
      <Fa icon={faDiscord} setHeight={false} />
    </a>
  </div>
</div>

<style>
  @font-face {
    font-family: gg sans;
    font-style: normal;
    font-display: swap;
    font-weight: 600;
    src: url(/fonts/gg-sans-600.woff2) format("woff2");
  }
  .discordEmbed {
    width: 340px;
    border-radius: 0.75em;
    display: grid;
    grid-template-columns: 0.75fr 0.25fr;
    height: 48px;
    transition:
      0.2s height,
      0.2s padding-top;
    overflow: hidden;
    font-family: "gg sans";
    height: 128px;
    user-select: none;
  }

  .discordBanner {
    position: relative;
    display: flex;
    flex-direction: column;
    height: auto;
    width: auto;
    object-fit: cover;
  }
  .discordProfile {
    background-color: var(--ctp-surface1);
    color: var(--ctp-text);
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .discordAvatar {
    height: 48px;
    width: 48px;
    border-radius: 50%;
    margin: 12px;
  }
  .discordNames {
    flex-direction: row;
  }
  .discordUserName {
    filter: brightness(0.8);
    font-size: 13px;
  }
  .discordIcon {
    color: #f2f3f5;
    width: 20px;
    height: 16px;
    position: absolute;
    bottom: 8px;
    right: 8px;
    filter: brightness(0.8);
    transition: 0.2s opacity;
    mix-blend-mode: difference;
  }

  .discordBadges {
    height: 32px;
    top: 8px;
    right: 8px;
    position: absolute;
  }
  .discordBadge {
    height: 32px;
    width: 32px;
  }
</style>
