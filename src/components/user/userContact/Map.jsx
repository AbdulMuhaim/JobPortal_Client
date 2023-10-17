
import { useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

const locations = [
  { latitude: 12.9716, longitude: 77.5946, name: 'Bangalore' },
  { latitude: 9.9312, longitude: 76.2673, name: 'Kochi' },
  { latitude: 11.2588, longitude: 75.7804, name: 'Calicut' },
  { latitude: 13.0827, longitude: 80.2707, name: 'Chennai' },
];

const MapComponent = ({ locations }) => {
  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoibXVoYWltMjUiLCJhIjoiY2xua2dyMm5oMGwxYjJycnp1anFlaGQ2ZCJ9.YmYBTuY9ozBqujUmiUa-Kw';

    const map = new mapboxgl.Map({
      container: 'map-container',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [locations[0].longitude, locations[0].latitude],
      zoom: 5, // Adjust the zoom level as needed
    });

    locations.forEach(location => {
      new mapboxgl.Marker({ color: 'red' }).setLngLat([location.longitude, location.latitude]).addTo(map);
    });

    return () => map.remove();
  }, [locations]);

  return (
    <div className="relative w-full">
      <div id="map-container" className="h-72"></div>
    </div>
  );
};

const YourComponent = () => {
  return (
    <div className="flex justify-center items-center p-10 gap-10">
      <MapComponent locations={locations} />
    </div>
  );
};

export default YourComponent;
