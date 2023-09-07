<script lang="ts">
  import { writable, type Writable } from "svelte/store";
  import { getContext, onMount } from "svelte";

  const numShiggies = getContext<Writable<number>>("numShiggies");

  interface Shiggy {
    x: number;
    y: number;
  }

  const shigList = writable<Shiggy[]>([]);
  onMount(() => {
    numShiggies.subscribe((num) => {
      shigList.update((list) => {
        const newList = [...list];
        if (num > newList.length)
          for (let i = newList.length; i < num; i++) {
            newList.push({
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            });
          }
        else if (newList.length > num)
          for (let i = newList.length; i > num; i--) {
            newList.pop();
          }
        return newList;
      });
    });

    setInterval(() => {
      shigList.update((list) => {
        const newList = [...list];
        for (const shiggy of newList) {
          shiggy.x += Math.round(Math.random()) ? 1 : -1;
          shiggy.y += Math.round(Math.random()) ? 1 : -1;
        }
        return newList;
      });
    }, 10);
  });
</script>

<div class="shiggyWrapper">
  {#each $shigList as shiggy}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <img
      src={`https://shiggy.fun/api/v1/random?cachebust=${Math.random()}`}
      alt="shiggy"
      class="shiggy"
      on:click={() => {
        numShiggies.update((num) => num + 1);
      }}
      style={`left: ${shiggy.x}px; top: ${shiggy.y}px;`}
    />
  {/each}
</div>

<style>
  .shiggyWrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    z-index: 9999;
    pointer-events: none;
    overflow: hidden;
  }

  .shiggy {
    width: 50px;
    height: 50px;
    position: absolute;
    pointer-events: all;
  }
</style>
