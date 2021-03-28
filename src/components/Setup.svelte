<script type="ts">
  import { createEventDispatcher } from "svelte";
  import type { Planet } from "../interfaces/interfaces";

  const dispatch = createEventDispatcher();

  let size = 190;
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
          width: 488000000 / zmenseni,
        },
      },
      {
        name: "Slunce -> Venuse",
        measures: {
          distance: 108208000000 / zmenseni,
          width: 1210300000 / zmenseni,
        },
      },
      {
        name: "Slunce -> Zeme",
        measures: {
          distance: slunceZeme,
          width: 1274200000 / zmenseni,
        },
      },
      {
        name: "Slunce -> Mars",
        measures: {
          distance: 227939200000 / zmenseni,
          width: 677900000 / zmenseni,
        },
      },
      {
        name: "Slunce -> Jupiter",
        measures: {
          distance: 5.2044 * slunceZeme,
          width: 13982200000 / zmenseni,
        },
      },
      {
        name: "Slunce -> Saturn",
        measures: {
          distance: 9.5826 * slunceZeme,
          width: 11646400000 / zmenseni,
        },
      },
      {
        name: "Slunce -> Uran",
        measures: {
          distance: 19.2184 * slunceZeme,
          width: 5072400000 / zmenseni,
        },
      },
      {
        name: "Slunce -> Neptun",
        measures: {
          distance: 30.07 * slunceZeme,
          width: 4924400000 / zmenseni,
        },
      },
      {
        name: "Slunce -> Pluto",
        measures: {
          distance: 49.305 * slunceZeme,
          width: 237660000 / zmenseni,
        },
      },
      {
        name: "Slunce -> Eris",
        measures: {
          distance: 67.864 * slunceZeme,
          width: 232600000 / zmenseni,
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
        <br />
        <code class="small">šířka: {planet.measures.width.toFixed(2)} (cm)</code
        >
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
    width: 240px;
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
