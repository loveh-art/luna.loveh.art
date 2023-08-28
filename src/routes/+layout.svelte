<script lang="ts">
  import { defaultData } from "$lib/spotify";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import type { PageData } from "./$types";
  import { setContext } from "svelte";
  import Fa from "svelte-fa";
  import { faSpotify } from "@fortawesome/free-brands-svg-icons";

  export let data: PageData;
  let spotify = writable(defaultData);
  $: spotify.set(data);

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

    setTimeout(
      refreshSpotify,
      Math.min(10000, $spotify.song.duration - $spotify.song.time)
    );
  });
</script>

<div class="header">
  <div class="fa"><Fa icon={faSpotify} /></div>
  <p>{$spotify.song.name} - {$spotify.song.artist}</p>
</div>
<div class="page">
  <slot />
</div>

<style>
  :root {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
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
    vertical-align: middle;
  }
  .header .fa {
    display: block;
    margin-top: auto;
  }
  .page {
    padding-top: 100px;
  }
</style>
