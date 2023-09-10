<script lang="ts">
  import { defaultData } from "$lib/spotify";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import type { LayoutData } from "./$types";
  import { setContext } from "svelte";
  import Fa from "svelte-fa";
  import { faSpotify } from "@fortawesome/free-brands-svg-icons";
  import Shiggy from "../../components/Shiggy.svelte";

  import getSpotifyData from "$lib/spotify";

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
  <meta content="Luna :3" property="og:title" />
  <meta content="My website!" property="og:description" />
  <meta content="#ffcb82" property="theme-color" />
</svelte:head>

<div class="header">
  {#if $spotify.song.name !== "Nothing Playing"}
    <div class="fa"><Fa icon={faSpotify} /></div>
    <p>{$spotify.song.name} - {$spotify.song.artist}</p>
    <p class="spacer">//</p>
  {/if}
  {#each Object.entries(data.pages) as page}
    <a href={page[0]}>
      {#if page[0] === data.url}
        <p class="bold">{page[1]}</p>
      {:else}
        <p>{page[1]}</p>
      {/if}
    </a>
  {/each}
  <div class="right">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <img
      src="https://shiggy.fun/api/v1/random"
      alt="shiggy"
      on:click={() => {
        numShiggies.update((num) => num + 1);
      }}
    />
  </div>
</div>
<div class="page">
  <slot />
</div>
<Shiggy />

<style>
  :global(body) {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

    background-color: #333;
    color: #fff;
  }
  .header {
    display: flex;
    flex-direction: row;
    vertical-align: middle;
    background-color: #999;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding-left: 10px;
    vertical-align: middle;
  }

  .header .right {
    margin-left: auto;
    margin-right: 10px;
  }

  .header img {
    height: 50px;
    width: 50px;
    margin-left: auto;
    margin-right: auto;
  }

  .header button img {
    height: 50px;
    width: 50px;
  }

  .header .fa {
    display: block;
    margin-top: auto;
    margin-bottom: auto;
    padding: 5px;
  }

  .header .spacer {
    padding-left: 10px;
    padding-right: 10px;
  }

  .header a {
    color: #fff;
    text-decoration: none;
    padding-right: 10px;
    vertical-align: middle;
  }

  .header p.bold {
    font-weight: bold;
  }

  .page {
    padding-top: 50px;
  }
</style>
