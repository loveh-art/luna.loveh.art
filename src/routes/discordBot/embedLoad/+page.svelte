<script lang="ts">
  import type { PageData } from "./$types";

  import Fa from "svelte-fa";

  import {
    faCompactDisc,
    faFolderClosed,
    faMicrophoneLines,
  } from "@fortawesome/free-solid-svg-icons";

  import { faSpotify } from "@fortawesome/free-brands-svg-icons";
  import Spotify from "../../../components/Spotify.svelte";

  export let data: PageData;
</script>

<Spotify Data={data} Rounded={false} Animated={false} />

<style>
  :global(body) {
    margin: 0;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  }
</style>
