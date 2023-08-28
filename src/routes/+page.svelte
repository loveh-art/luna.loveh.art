<script lang="ts">
  import type { PageData } from "./$types";

  import Discord from "../components/Discord.svelte";
  import Spotify from "../components/Spotify.svelte";

  export let data: PageData;
</script>

<Discord User={data.User} />

<Spotify Data={data.Spotify}/>