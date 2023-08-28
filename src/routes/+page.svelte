<script lang="ts">
  import { writable } from "svelte/store";
  import type { PageData } from "./$types";
  import { defaultData } from "$lib/spotify";

  import Fa from "svelte-fa";
  console.log("b");

  import { faDiscord, faSpotify } from "@fortawesome/free-brands-svg-icons";
  import {
    faCompactDisc,
    faFolderClosed,
    faMicrophoneLines,
  } from "@fortawesome/free-solid-svg-icons";
  import { onMount } from "svelte";

  export let data: PageData;

  const User = data.User;
  let spotify = writable(defaultData);
  $: spotify.set(data.Spotify);

  onMount(() => {
    async function refreshSpotify() {
      console.log("refreshing spotify");
      const res = await fetch("/spotify");
      const data = await res.json();
      spotify.set(data);
      setTimeout(
        refreshSpotify,
        Math.min(10000, $spotify.song.duration - $spotify.song.time)
      );
    }

    setTimeout(
      refreshSpotify,
      Math.min(10000, $spotify.song.duration - $spotify.song.time)
    );
  });
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

<div class="spotify">
  <div class="spotifyBanner" />
  <img
    class="spotifyAlbumArt"
    src={$spotify.song.image}
    alt={$spotify.song.name}
  />
  <div class="spotifyNames">
    <div class="spotifySong">
      <a class="spotifySongName" href={$spotify.song.albumUrl}
        >{$spotify.song.name}</a
      >
      <div
        class:list={[
          "spotifyArtistSpace",
          !$spotify.song.artist ? "hidden" : "",
        ]}
      >
        &nbsp;-&nbsp;
      </div>
      <a
        class:list={["spotifyArtistUrl", !$spotify.song.artist ? "hidden" : ""]}
        href={$spotify.song.artistUrl}
      >
        <Fa icon={faMicrophoneLines} />
        &nbsp;
        <div class="selector">{$spotify.song.artist}</div>
      </a>
    </div>
    <a
      class:list={[
        "spotifyAlbum",
        $spotify.song.album === $spotify.song.name ? "hidden" : "",
      ]}
      href={$spotify.song.albumUrl}
    >
      <Fa icon={faCompactDisc} />
      &nbsp;
      <div class="selector">
        {$spotify.song.album}
      </div>
    </a>
    <a
      class:list={[
        "spotifyPlaylist",
        !$spotify.song.playlistUrl ? "hidden" : "",
      ]}
      href={$spotify.song.playlistUrl}
    >
      <Fa icon={faFolderClosed} />
      &nbsp;
      <div class="selector">{$spotify.song.playlist}</div>
    </a>
    <br class="spotifyLineBreak" />
    <a class="spotifyIcon" href="https://open.spotify.com">
      <Fa icon={faSpotify} />
    </a>
    <a class="spotifyAvatar" href="https://open.spotify.com">
      <img
        class={$spotify.avatarUrl ? "" : "hidden"}
        alt="Profile"
        src={$spotify.avatarUrl}
      />
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

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }

  .hidden {
    display: none !important;
  }
  .spotify {
    min-width: 340px;
    width: fit-content;
    height: 100px;
    border-radius: 0.75em;
    display: flex;
    position: relative;
    flex-direction: row;
    font-family: "gg sans";
    background-color: #2b2d31;
    color: #ffffff;
  }
  .spotifyBanner {
    border-top-left-radius: 0.75em;
    border-top-right-radius: 0.75em;
    position: absolute;
    top: 0px;
    left: 0px;
    flex-direction: column;
    height: 30px;
    width: 100%;
    object-fit: cover;
    background-color: #2b2d31;
  }
  .spotifyAlbumArt {
    padding-left: 8px;
    padding-right: 8px;
    padding-top: 26px;
    padding-bottom: 26px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    z-index: 2;
    animation: rotate 5s infinite linear;
  }
  .spotifyNames {
    display: flex;
    flex-direction: column;
    color: #ffffff;
    justify-content: end;
    padding-right: 20px;
    padding-bottom: 5px;
    z-index: 2;
  }
  .spotifyNames a {
    color: #ffffff;
    text-decoration: inherit;
    flex-direction: row;
    display: flex;
  }
  .spotifySong,
  .spotifySong a,
  .spotifySong {
    display: inline-flex;
  }

  .spotifyIcon {
    color: #f2f3f5;
    width: 20px;
    height: 16px;
    position: absolute;
    bottom: 8px;
    right: 8px;
    filter: brightness(0.8);
    z-index: 3;
  }
  .spotifyAvatar {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
  }
  .spotifyAvatar img {
    border-radius: 0 0.75em 0 0.75em;
    height: 48px;
    width: 48px;
  }
</style>
