<script lang="ts">
  import type { LayoutData } from "./$types";

  export let data: LayoutData;
</script>

<svelte:head>
  <meta content={data.song.name} property="og:title" />
  <meta content="https://lvna.gay/discordBot/embed" property="og:image" />
  <meta content={data.song.albumUrl} property="og:url" />
  <meta content={data.song.artist} property="og:description" />
  <meta content="#ffcb82" property="theme-color" />
</svelte:head>
