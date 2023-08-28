<script lang="ts">
  import { defaultData } from "$lib/spotify";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import type { LayoutData } from "./$types";
  import { setContext } from "svelte";
  import Fa from "svelte-fa";
  import { faSpotify } from "@fortawesome/free-brands-svg-icons";

  export let data: LayoutData;

  let spotify = writable(defaultData);
  $: spotify.set({song: data.lastKnownSong});
  setContext("spotify", spotify);

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
    refreshSpotify();
  });
</script>

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
</div>
<div class="page">
  <slot />
</div>

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
