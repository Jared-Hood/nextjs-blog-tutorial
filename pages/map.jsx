import Head from "next/head"
import { useEffect, useRef, useState } from "react"
import Layout from "../components/layout"

const loadMapAssets = async (resolve) => {
  const jsUrl = 'https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.js';
  const cssUrl = 'https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.css';

  const mapStyle = document.createElement('link');
  mapStyle.rel = 'stylesheet';
  mapStyle.href = cssUrl;

  const mapScript = document.createElement('script');
  mapScript.src = jsUrl;
  mapScript.onload = () => {
    resolve();
  };

  document.head.appendChild(mapStyle);
  document.head.appendChild(mapScript);
}

export default function Map() {
  const mapContainer = useRef(null);
  const markerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleMarkerClick = () => {
    map.flyTo({center: [-75.62563, 35.252348], zoom: 9});
  }

  useEffect(() => {
    if (!mapLoaded || map) return;

    mapboxgl.accessToken = 'pk.eyJ1IjoiamNvZGVybWFuIiwiYSI6ImNsMmNvamxyaDAwbmwza2xjbzQ1ejh6YmIifQ.YKV97IkuXGc6LXWXBr4dBw';
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/outdoors-v11',
      zoom: 1,
      center: [-98.58, 39.83],
      projection: 'globe'
    });

    map.on('load', () => {
      map.setFog({});
    });

    new mapboxgl.Marker(markerRef.current)
      .setLngLat([-75.62563, 35.252348])
      .addTo(map);

    setMap(map);
  }, [mapLoaded]);

  useEffect(() => {
    const resolve = () => { setMapLoaded(true); }
    loadMapAssets(resolve);
  }, []);

  return (
    <Layout>
      <Head>
        {/* <script src="https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.js"></script>
        <link href="https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.css" rel="stylesheet" /> */}
        <title>Map</title>
      </Head>
      <h1>
        Map
      </h1>
      <div id="map" ref={mapContainer} style={{height: 400}}></div>
      <div ref={markerRef} onClick={handleMarkerClick} style={{cursor: "pointer"}}>
        <svg display="block" height="41px" width="27px" viewBox="0 0 27 41"><defs><radialGradient id="shadowGradient"><stop offset="10%" stopOpacity="0.4"></stop><stop offset="100%" stopOpacity="0.05"></stop></radialGradient></defs><ellipse cx="13.5" cy="34.8" rx="10.5" ry="5.25" fill="url(#shadowGradient)"></ellipse><path fill="#3FB1CE" d="M27,13.5C27,19.07 20.25,27 14.75,34.5C14.02,35.5 12.98,35.5 12.25,34.5C6.75,27 0,19.22 0,13.5C0,6.04 6.04,0 13.5,0C20.96,0 27,6.04 27,13.5Z"></path><path opacity="0.25" d="M13.5,0C6.04,0 0,6.04 0,13.5C0,19.22 6.75,27 12.25,34.5C13,35.52 14.02,35.5 14.75,34.5C20.25,27 27,19.07 27,13.5C27,6.04 20.96,0 13.5,0ZM13.5,1C20.42,1 26,6.58 26,13.5C26,15.9 24.5,19.18 22.22,22.74C19.95,26.3 16.71,30.14 13.94,33.91C13.74,34.18 13.61,34.32 13.5,34.44C13.39,34.32 13.26,34.18 13.06,33.91C10.28,30.13 7.41,26.31 5.02,22.77C2.62,19.23 1,15.95 1,13.5C1,6.58 6.58,1 13.5,1Z"></path><circle fill="white" cx="13.5" cy="13.5" r="5.5"></circle></svg>
      </div>
    </Layout>
  )
}