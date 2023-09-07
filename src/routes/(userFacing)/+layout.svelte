<script lang="ts">
  import { defaultData } from "$lib/spotify";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import type { LayoutData } from "./$types";
  import { setContext } from "svelte";
  import Fa from "svelte-fa";
  import { faSpotify } from "@fortawesome/free-brands-svg-icons";
  import Shiggy from "../../components/Shiggy.svelte";

  export let data: LayoutData;

  let spotify = writable(defaultData);
  $: spotify.set({ song: data.lastKnownSong });
  setContext("spotify", spotify);

  let timeout = 10000;

  onMount(() => {
    async function refreshSpotify() {
      console.log("refreshing spotify");
      const res = await fetch("https://spotifyapi.lvna.gay");
      const data = await res.json();
      spotify.set(data);
      if ($spotify.song.name === "Nothing Playing") timeout = 20000;
      else timeout = 10000;
      setTimeout(
        refreshSpotify,
        Math.min(timeout, $spotify.song.duration - $spotify.song.time),
      );
    }
    refreshSpotify();
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
  <div class="fa"><Fa icon={faSpotify} /></div>
  <p>{$spotify.song.name} - {$spotify.song.artist}</p>
  <!-- <div>
    { #each Object.entries(data.pages) as page}
      <a href={page[1]}>
        {#if page[0] === data.url}
          <b>{page[0]}</b>
        {:else}
          {page[0]}
        {/if}
      </a>
    {/each}
  </div> -->
  <div class="right">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <img
      src="/img/bigshiggy.gif"
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
  .page {
    padding-top: 50px;
  }
</style>
