<script lang="ts">
  import type { iSpotifyData } from "$lib/spotify";
  import { faSpotify } from "@fortawesome/free-brands-svg-icons";
  import {
    faCompactDisc,
    faFolderClosed,
    faMicrophoneLines,
    faMusic,
  } from "@fortawesome/free-solid-svg-icons";
  import { getContext } from "svelte";

  import Fa from "svelte-fa";
  import { writable, type Writable } from "svelte/store";

  export let Data: iSpotifyData | undefined = undefined;

  export let Rounded: boolean = true;
  export let Animated: boolean = true;

  let spotify = getContext<Writable<iSpotifyData>>("spotify");

  if (!spotify && Data) {
    spotify = writable(Data);
  }
</script>

<div
  class="spotify"
  class:rounded={Rounded}
  class:collapsed={$spotify.song.name === "Nothing Playing"}
>
  <img
    class="spotifyAlbumArt"
    class:animated={Animated}

    src={$spotify.song.image}
    alt={$spotify.song.name}
  />
  <div class="spotifyNames">
    <a class="s-text-line" href={$spotify.song.albumUrl}>
      <Fa class="fa-icon" icon={faMusic} />
      &nbsp;
      {$spotify.song.name}
    </a>
    {#if $spotify.song.album && $spotify.song.album !== "Nothing Playing"}
      <a
        class="s-text-line"
        href={$spotify.song.albumUrl}
      >
        <Fa class="fa-icon" icon={faCompactDisc} />
        &nbsp;
          {$spotify.song.album}
      </a>
    {/if}
    {#if $spotify.song.artist}
    <a class="s-text-line" href={$spotify.song.artistUrl}>
      <div class="fa-icon">
        <Fa class="fa-icon" icon={faMicrophoneLines} />
      </div>
      &nbsp;
      {$spotify.song.artist}
    </a>
  {/if}

    {#if $spotify.song.playlist}
      <a
        class="spotifyPlaylist"
        
        href={$spotify.song.playlistUrl}
      >
        <Fa icon={faFolderClosed} />
        &nbsp;
        <div class="selector">{$spotify.song.playlist}</div>
      </a>
    {/if}
    <!-- {#if $spotify.song.duration && $spotify.song.time}
      <div class="spotifyTime">
        {$spotify.song.time / 1000} / {$spotify.song.duration / 1000}
      </div>
    {/if} -->
  </div>
  <div class="spotifyIcons">
    <a class="spotifyIcon" href="https://open.spotify.com">
      <Fa icon={faSpotify} />
    </a>
    {#if $spotify.avatarUrl}
    <a class="spotifyAvatar" href="https://open.spotify.com">
      <img
        alt="Profile"
        src={$spotify.avatarUrl}
      />
    </a>
    {/if}
  </div>
</div>

<style>
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }

  .spotify {
    min-width: 340px;
    width: fit-content;
    height: 128px;
    display: flex;
    position: relative;
    flex-direction: row;
    background-color: var(--ctp-surface1);
    color: #ffffff;
    overflow: hidden;
    transition: height 0.5s ease-in-out;
    align-items: center;
    user-select: none;
  }

  .spotify.collapsed {
    height: 0px;
  }
  .spotify.rounded {
    border-radius: 0.75em;
  }
  .spotifyAlbumArt {
    padding-left: 8px;
    padding-right: 8px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    z-index: 2;
  }

  .spotifyAlbumArt.animated {
    animation: rotate 5s infinite linear;
  }

  .spotifyNames {
    display: flex;
    flex-direction: column;
    color: #ffffff;
    justify-content: end;
    z-index: 2;
    justify-self: center;
  }
  .spotifyNames a {
    color: #ffffff;
    text-decoration: inherit;
    flex-direction: row;
    display: flex;
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
    mix-blend-mode: difference;

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
  .fa-icon {
    width: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    
  }
</style>
