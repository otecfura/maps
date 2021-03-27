<script lang="ts">
  import L from "leaflet";
  import { onMount } from "svelte";
  import Setup from "./components/Setup.svelte";
  import type { Planet } from "./interfaces/interfaces";

  let map;
  let lat;
  let layerGroup;
  let locationGroup;

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
  }

  onMount(async () => {
    map = L.map("map").fitWorld();
    layerGroup = L.layerGroup().addTo(map);
    locationGroup = L.layerGroup().addTo(map);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    }).addTo(map);

    map.on("locationfound", onLocationFound);
    map.on("locationerror", onLocationError);
    locate(true);
    setInterval(() => locate(false), 10000);
  });

  function locate(setView) {
    map.locate({ setView: setView, maxZoom: 16 });
  }

  function onLocationFound(e) {
    lat = e;
    locationGroup.clearLayers();
    var currentZoom = map.getZoom() * 2;
    console.log(currentZoom);
    var icon = L.icon({
      iconUrl: "android/android-launchericon-48-48.png",
      iconSize: [currentZoom, currentZoom],
      iconAnchor: [currentZoom / 2, currentZoom / 2],
    });
    L.marker(e.latlng, { icon: icon }).addTo(locationGroup);
  }

  function onLocationError(e) {
    alert(e.message);
  }

  function handleMessage(event) {
    let planet = event.detail.text as Planet;
    if (planet) {
      L.circle(lat.latlng, planet.measures.distance, {
        fill: false,
        weight: 5,
      })
        .bindPopup(planet.name)
        .addTo(layerGroup);
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
