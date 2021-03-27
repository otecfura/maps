<script lang="ts">
  import L from "leaflet";
  import { onMount } from "svelte";
  import Setup from "./components/Setup.svelte";
  import type { Planet } from "./interfaces/interfaces";
  import { getData, setData } from "./tools/utils";

  let map;
  let lat;
  let layerGroup;
  let locationGroup;
  let arr = getData() || [];
  let firstTime = true;

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
    locate();
  });

  function locate() {
    map.locate({ setView: true, maxZoom: 16, watch: false });
  }

  function onLocationFound(e) {
    if (firstTime) {
      map.locate({ setView: false, maxZoom: 16, watch: true });
      firstTime = !firstTime;
      addCircle(false);
    }
    lat = e;
    locationGroup.clearLayers();
    var currentZoom = map.getZoom() * 2;
    var icon = L.icon({
      iconUrl: "android/android-launchericon-48-48.png",
      iconSize: [currentZoom, currentZoom],
      iconAnchor: [currentZoom / 2, currentZoom / 2],
    });
    L.marker(e.latlng, { icon: icon }).addTo(locationGroup);
    L.circle(e.latlng, e.accuracy, {
      color: "red",
      fillOpacity: 0.1,
      weight: 1,
      interactive: false,
    }).addTo(locationGroup);
  }

  function onLocationError(e) {
    alert(e.message);
  }

  function handleMessage(message) {
    let latCopy = { ...lat.latlng };
    console.log(latCopy);
    let planet = message.detail.text as Planet;
    arr.push([latCopy, planet]);
    setData(arr);
    addCircle(planet == null);
  }

  function addCircle(clear) {
    if (!clear) {
      arr.forEach((cachedEl) => {
        if (layerGroup.getLayers().length == 0) {
          createSun(cachedEl);
        }
        createOrbit(cachedEl);
      });
    } else {
      arr = [];
      setData(arr);
      layerGroup.clearLayers();
    }
  }

  function createOrbit(cachedEl) {
    L.circle(cachedEl[0], cachedEl[1].measures.distance, {
      fill: false,
      weight: 5,
    })
      .bindPopup(cachedEl[1].name)
      .addTo(layerGroup);
  }

  function createSun(cachedEl) {
    var currentZoom = map.getZoom() * 2;
    var icon = L.icon({
      iconUrl: "sun.png",
      iconSize: [currentZoom, currentZoom],
      iconAnchor: [currentZoom / 2, currentZoom / 2],
    });
    L.marker(cachedEl[0], { icon: icon }).addTo(layerGroup);
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
