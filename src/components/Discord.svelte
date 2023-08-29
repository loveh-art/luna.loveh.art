<script lang="ts">
  import { faDiscord } from "@fortawesome/free-brands-svg-icons";

  import Fa from "svelte-fa";

  export let User: iDiscordUser;
</script>

<div class="discordEmbed">
  <div class="discordBanner" style:background-color={User.banner_color}>
    <a
      class="discordIcon top"
      href={`https://discord.com/users/${User.id}`}
      target="_blank"
    >
      <Fa icon={faDiscord} setHeight={false} />
    </a>
    <div class="discordBadges">
      {#each Object.entries(User.flagImages) as img}
        <img class="discordBadge" src={img[1]} alt={img[0]} />
      {/each}
    </div>
  </div>
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
    display: block;
    height: 48px;
    transition: 0.2s height, 0.2s padding-top;
    overflow: hidden;
    font-family: "gg sans";
  }

  .discordEmbed {
    padding-top: 10px;
    height: 128px;
  }
  .discordEmbed .discordBanner .discordIcon {
    opacity: 0;
  }
  .discordBanner {
    border-top-left-radius: 0.75em;
    border-top-right-radius: 0.75em;
    position: relative;
    display: flex;
    flex-direction: column;
    height: 48px;
    width: 340px;
    object-fit: cover;
  }
  .discordProfile {
    background-color: #2b2d31;
    color: #f2f3f5;
    overflow: hidden;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom-left-radius: 0.75em;
    border-bottom-right-radius: 0.75em;
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
  }
  .discordIcon.top {
    top: 16px;
    left: 8px;
    bottom: auto;
    right: auto;
    position: absolute;
    color: #777;
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
