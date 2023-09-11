<script lang="ts">
  import type { PageData } from "./$types";

  import * as AboutMe from "$lib/aboutMe";

  import Discord from "../../components/Discord.svelte";
  import Spotify from "../../components/Spotify.svelte";
  import type { iSpotifyData } from "$lib/spotify";
  import { getContext, setContext } from "svelte";
  import type { Writable } from "svelte/store";

  export let data: PageData;

  const spotify = getContext<Writable<iSpotifyData>>("spotify");
  $: spotify.set(data.Spotify);

  const numShiggies = getContext<Writable<number>>("numShiggies");

  
</script>
<div class="container-flex col">
  
  <div class="container-flex row">
    <span class="bold-title">hi, im luna :3</span>
    <div id="shiggy-activator" class="flex-rightalign" 
    on:click={() => {numShiggies.update((num) => num + 1);}}
    on:keypress={() => {numShiggies.update((num) => num + 1);}}
    aria-label="shiggy activator" tabindex="-1"
    role="button"
    style={`
    background-image: url(https://shiggy.fun/api/v2/random?cachebust=${Math.random()});
    background-size: cover;
    background-position: center;
    border-radius: 50%;
    `}
    >
    </div>
  </div>
  <div class="container-flex col low-spacing">
    <span class="not-as-bold-title">i am...</span>
    <ul class="cool-list">
      {#each AboutMe.attributes as attribute}
        <li >{attribute}</li>
      {/each}
    </ul>
  </div>
  <div class="container-flex row">
    
    <Discord User={data.User} /> 
    <Spotify />
    
  </div>

  <div class="container-flex row">
    {#each Object.entries(AboutMe.links) as link}
      <a href={link[1]} target="_blank" class="even-less-bold-title">{link[0]}</a>
    {/each}
  </div>
</div>

<style lang="scss">
  .bold-title {
    font-size: 2.5em;
  }
  .not-as-bold-title {
    font-size: 1.7em;
  }
  .even-less-bold-title {
    font-size: 1.3em;
  }
  .container-flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap:10px;
  }
  .container-flex.col {
    flex-direction: column;
  }
  .container-flex.row {
    flex-direction: row;
  }
  .container-flex > * {
    margin: 10px;
  }
  a {
    color: var(--ctp-text);
    text-decoration: none;
    background-color: var(--ctp-surface1);
    padding: 5px;
    border-radius: 5px;
    transition: all 0.2s;
    &:hover {
      background-color: var(--ctp-surface2);
    }
  }
  .low-spacing {
    margin-top: 0px;
    margin-bottom: 0px;
  }
  .low-spacing > * {
    margin-top: 0px;
    margin-bottom: 0px;
  }
  .cool-list {
    list-style-type: none;
    padding-left: 0px;
    display: flex;
    flex-direction: column;
    gap: 2px;
    align-items: center;;
    user-select: none;
  }
  :has(.flex-rightalign) {

    .flex-rightalign {
      margin-left: auto;
    }

  }
  #shiggy-activator {
    position: relative;
    width: 50px;
    height: 50px;
    margin-left: auto;
    margin-right: 0px;
    margin-top: 0px;
    margin-bottom: 0px;
    background: var(--ctp-surface2);
  }
</style>
