<script type="ts">
  import { createEventDispatcher } from "svelte";
  import type { Planet } from "../interfaces/interfaces";

  const dispatch = createEventDispatcher();

  let size = 136;
  let zmenseni;
  let visible = true;

  let planetArr: Array<Planet> = [];

  onSizeChange();

  function switchVisible() {
    visible = !visible;
  }

  function onDataChange(val: Planet) {
    dispatch("changeSize", {
      text: val,
    });
  }

  function onSizeChange() {
    zmenseni = 1392700000 / (size / 100);
    let slunceZeme = 149598023000 / zmenseni;
    planetArr = [
      {
        name: "Slunce -> Merkur",
        measures: {
          distance: 57909050000 / zmenseni,
          width: 0,
        },
      },
      {
        name: "Slunce -> Venuse",
        measures: {
          distance: 108208000000 / zmenseni,
          width: 0,
        },
      },
      {
        name: "Slunce -> Zeme",
        measures: {
          distance: slunceZeme,
          width: 0,
        },
      },
      {
        name: "Slunce -> Mars",
        measures: {
          distance: 227939200000 / zmenseni,
          width: 0,
        },
      },
      {
        name: "Slunce -> Jupiter",
        measures: {
          distance: 5.2044 * slunceZeme,
          width: 0,
        },
      },
      {
        name: "Slunce -> Saturn",
        measures: {
          distance: 9.5826 * slunceZeme,
          width: 0,
        },
      },
      {
        name: "Slunce -> Uran",
        measures: {
          distance: 19.2184 * slunceZeme,
          width: 0,
        },
      },
      {
        name: "Slunce -> Neptun",
        measures: {
          distance: 30.07 * slunceZeme,
          width: 0,
        },
      },
      {
        name: "Slunce -> Pluto",
        measures: {
          distance: 49.305 * slunceZeme,
          width: 0,
        },
      },
      {
        name: "Slunce -> Eris",
        measures: {
          distance: 67.864 * slunceZeme,
          width: 0,
        },
      },
    ];
  }
</script>

<div class="overlay">
  <p on:click={switchVisible} class="small">show/hide</p>
  {#if visible}
    <p>Výška (cm)</p>
    <input type="text" size="10" bind:value={size} on:change={onSizeChange} />
    {#each planetArr as planet}
      <p class="size" on:click={() => onDataChange(planet)}>
        {planet.name} : {planet.measures.distance.toFixed(0)} (m)
      </p>
    {/each}
    <button on:click={() => onDataChange(null)}>clear</button>
    <p class="small">
      Created by
      <a href="https://twitter.com/otecfura" target="_blank"> @otecfura </a>
    </p>
    <p class="small">
      There is a <a href="https://github.com/otecfura/maps">repository</a>
    </p>
    <p class="small">
      data from <a
        href="http://michalkasparek.cz/tvorenicko.html"
        target="_blank">Michal Kasparek</a
      >
    </p>
  {/if}
</div>

<style>
  .size:hover {
    background-color: aqua;
  }
  .overlay {
    width: 200px;
    max-height: 100%;

    position: fixed;
    right: 0;
    z-index: 50;
    margin-right: 50px;
    padding: 2px;
    overflow-y: scroll;
    background: #ffffff;
  }
  p {
    font-size: small;
    cursor: pointer;
    padding: 5px;
  }

  .small {
    font-size: x-small;
  }
</style>
