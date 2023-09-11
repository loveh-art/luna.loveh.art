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
    }, 15);
  });
</script>

<div class="shiggyWrapper">
  {#each $shigList as shiggy}
    <div
    on:click={() => {
      numShiggies.update((num) => num + 1);
    }}
    on:keypress={() => {
      numShiggies.update((num) => num + 1);
    }}
    role="button"
    style="display: contents;"
    tabindex="-1"
    >
      <img
        src={`https://shiggy.fun/api/v2/random?cachebust=${Math.random()}`}
        alt="shiggy"
        class="shiggy"

        style={`left: ${shiggy.x}px; top: ${shiggy.y}px;`}
      />
    </div>
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
    transition: all 0.1s ease-in-out;
  }

  .shiggy {
    width: 50px;
    height: 50px;
    position: absolute;
    pointer-events: all;
  }
</style>
