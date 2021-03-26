<script lang="ts">
  import L from "leaflet";
  import { onMount } from "svelte";
  import Setup from "./components/Setup.svelte";

  export let name: string;
  let map;
  let lat;
  var layerGroup;

  onMount(async () => {
    map = L.map("map").fitWorld();
    layerGroup = L.layerGroup().addTo(map);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    }).addTo(map);

    map.on("locationfound", onLocationFound);
    map.on("locationerror", onLocationError);
    setInterval(locate, 3000);
  });
  function locate() {
    map.locate({ setView: true, maxZoom: 16 });
  }

  // call locate every 3 seconds... forever

  function onLocationFound(e) {
    var radius = e.accuracy;
    lat = e;

    L.circle(e.latlng, radius, { color: "red", opacity: 0.5 }).addTo(map);
  }

  function onLocationError(e) {
    alert(e.message);
  }

  function handleMessage(event) {
    if (event.detail.text) {
      L.circle(lat.latlng, event.detail.text).addTo(layerGroup);
    } else {
      layerGroup.clearLayers();
    }
  }
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    crossorigin=""
  />
</svelte:head>

<div class="container">
  <div id="map" class="box" />
  <Setup on:changeSize={handleMessage} />
</div>

<style>
  .container {
    height: 100%;
    width: 100vw;
  }

  .box {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.7;
    background: #0057e3;
  }
</style>
