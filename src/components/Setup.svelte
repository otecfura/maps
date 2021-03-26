<script type="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  let size = 128;
  let zmenseni;

  let SlunceMerkur = 0;
  let SlunceVenuse = 0;
  let SlunceZeme = 0;
  let ZemeMesic = 0;
  let SlunceMars = 0;
  let SlunceJupiter = 0;
  let SlunceSaturn = 0;
  let SlunceUran = 0;
  let SlunceNeptun = 0;
  let SluncePluto = 0;
  let SlunceEris = 0;

  let arr = [
    ["Slunce -> Merkur", SlunceMerkur],
    ["Slunce -> Venuse", SlunceVenuse],
    ["Slunce -> Zeme", SlunceZeme],
    ["Zeme -> Mesic", ZemeMesic],
    ["Slunce -> Mars", SlunceMars],
    ["Slunce -> Jupiter", SlunceJupiter],
    ["Slunce -> Saturn", SlunceSaturn],
    ["Slunce -> Uran", SlunceUran],
    ["Slunce -> Neptun", SlunceNeptun],
    ["Slunce -> Pluto", SluncePluto],
    ["Slunce -> Eris", SlunceEris],
  ];

  onSizeChange();

  function onDataChange(val) {
    dispatch("changeSize", {
      text: val,
    });
  }

  function onSizeChange() {
    zmenseni = 1392700000 / (size / 100);
    SlunceMerkur = 57909050000 / zmenseni;
    SlunceVenuse = 108208000000 / zmenseni;
    SlunceZeme = 149598023000 / zmenseni;
    ZemeMesic = 38439900000 / zmenseni;
    SlunceMars = 227939200000 / zmenseni;
    SlunceJupiter = 5.2044 * size;
    SlunceSaturn = 9.5826 * size;
    SlunceUran = 19.2184 * size;
    SlunceNeptun = 30.07 * size;
    SluncePluto = 49.305 * size;
    SlunceEris = 67.864 * size;
    arr = [
      ["Slunce -> Merkur", SlunceMerkur],
      ["Slunce -> Venuse", SlunceVenuse],
      ["Slunce -> Zeme", SlunceZeme],
      ["Zeme -> Mesic", ZemeMesic],
      ["Slunce -> Mars", SlunceMars],
      ["Slunce -> Jupiter", SlunceJupiter],
      ["Slunce -> Saturn", SlunceSaturn],
      ["Slunce -> Uran", SlunceUran],
      ["Slunce -> Neptun", SlunceNeptun],
      ["Slunce -> Pluto", SluncePluto],
      ["Slunce -> Eris", SlunceEris],
    ];
  }
</script>

<div class="overlay">
  <p>Výška</p>
  <input type="text" size="10" bind:value={size} on:change={onSizeChange} />
  {#each arr as cat}
    <p class="size" on:click={() => onDataChange(cat[1])}>
      {cat[0]} : {cat[1].toFixed(2)} (m)
    </p>
  {/each}
  <button on:click={() => onDataChange(null)}>clear</button>
</div>

<style>
  .size:hover {
    background-color: aqua;
  }
  .overlay {
    width: 250px;

    position: fixed;
    right: 0;
    z-index: 50;
    margin-right: 50px;
    padding: 10px;
    background: #ffffff;
  }
  p {
    font-size: medium;
    cursor: pointer;
    padding: 5px;
  }
</style>
