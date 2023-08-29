<script lang="ts">
  import type { iSpotifyData } from "$lib/spotify";
  import { faSpotify } from "@fortawesome/free-brands-svg-icons";
  import {
    faCompactDisc,
    faFolderClosed,
    faMicrophoneLines,
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

<div class={`spotify ${Rounded ? "rounded" : ""}`}>
  <div class="spotifyBanner" />
  <img
    class={`spotifyAlbumArt ${Animated ? "animated" : ""}`}
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
    display: flex;
    position: relative;
    flex-direction: row;
    background-color: #2b2d31;
    color: #ffffff;
  }
  .spotify.rounded {
    border-radius: 0.75em;
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
  }

  .spotifyAlbumArt.animated {
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
