<script lang="ts">
  import { onMount } from "svelte";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  import { defaultData } from "$lib/spotify";
  import getSpotifyData from "$lib/spotify";

  import Shiggy from "../../components/Shiggy.svelte";
  import type { LayoutData } from "./$types";

  export let data: LayoutData;

  let spotify = writable(defaultData);
  $: spotify.set({ song: data.lastKnownSong });
  setContext("spotify", spotify);

  let timeout = 10000;

  onMount(() => {
    async function refreshSpotify() {
      console.log("refreshing spotify");
      spotify.set(await getSpotifyData());
      if ($spotify.song.name === "Nothing Playing") timeout = 20000;
      else timeout = 10000;
      setTimeout(
        refreshSpotify,
        Math.min(timeout, $spotify.song.duration - $spotify.song.time),
      );
    }
    refreshSpotify();

    // setInterval(() => {
    //   spotify.update((spotify) => {
    //     spotify.song.time += 1000;
    //     return spotify;
    //   });
    // }, 1000);
  });

  const numShiggies = writable(0);
  setContext("numShiggies", numShiggies);
</script>

<svelte:head>
  <title>Luna's Site</title>
  <meta content="Luna :3" property="og:title" />
  <meta content="My website!" property="og:description" />
  <meta content="#ffcb82" property="theme-color" />
  <link rel="stylesheet" href="/theme.css" />
</svelte:head>
<Shiggy />
<div id="app-root">
  <slot />
</div>

<style lang="scss">
  #app-root {
    background-color: var(--ctp-surface0);
    color: var(--ctp-text);
    width: fit-content;
    padding: 10px;
    border-radius: 50px;
    margin: 0;
  }
  :global(body) {
    margin: 0;
    padding: 0;
  }
  :global(#svelte) {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

    background-color: var(--ctp-base);
    color: #cdd6f4;
  }
</style>
