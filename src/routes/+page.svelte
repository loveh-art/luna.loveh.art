<script lang="ts">
  import type { PageData } from "./$types";

  import * as AboutMe from "$lib/aboutMe";

  import Discord from "../components/Discord.svelte";
  import Spotify from "../components/Spotify.svelte";

  export let data: PageData;
</script>

<h1>Luna :3</h1>

<h3>I am...</h3>
<ul>
  {#each AboutMe.attributes as attribute}
    <li>{attribute}</li>
  {/each}
</ul>
<h3>Links</h3>
<div class="links">
  {#each Object.entries(AboutMe.links) as link}
    <a href={link[1]} target="_blank">{link[0]}</a>
  {/each}
</div>

<Discord User={data.User} />

<Spotify Data={data.Spotify} />

<style lang="scss">
  .links a {

      color: unset;
      text-decoration: unset;
    display: inline;
    height: 10px;
    padding: 5px;
    margin: 2px;
    background-color: #444;

    cursor: pointer;

    &:hover {
      background-color: #666;
      cursor: pointer;
    }
  }
</style>
