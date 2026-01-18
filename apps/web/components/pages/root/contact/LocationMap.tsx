'use client';

import { useEffect } from 'react';
import { MapContainer, Marker, Popup, useMap } from 'react-leaflet';
import { useTheme } from 'next-themes';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet.tilelayer.colorfilter';
import 'leaflet/dist/leaflet.css';

const DARK_FILTER = [
  'invert:85%',
  'grayscale:50%',
  'bright:70%',
  'contrast:120%',
  'hue:220deg',
  'saturate:300%',
];
const LIGHT_FILTER = [
  'bright:105%',
  'contrast:105%',
  'hue:40deg',
  'saturate:150%',
];

const LocationMap = () => {
  const position: LatLngExpression = [23.723044, 90.410555];
  const { theme } = useTheme();

  const mapMarkerIcon = L.icon({
    iconUrl: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgNjQwIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIHY3LjEuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLi0tPjxwYXRoIGQ9Ik0xMjggMjUyLjZDMTI4IDE0OC40IDIxNCA2NCAzMjAgNjRDNDI2IDY0IDUxMiAxNDguNCA1MTIgMjUyLjZDNTEyIDM3MS45IDM5MS44IDUxNC45IDM0MS42IDU2OS40QzMyOS44IDU4Mi4yIDMxMC4xIDU4Mi4yIDI5OC4zIDU2OS40QzI0OC4xIDUxNC45IDEyNy45IDM3MS45IDEyNy45IDI1Mi42ek0zMjAgMzIwQzM1NS4zIDMyMCAzODQgMjkxLjMgMzg0IDI1NkMzODQgMjIwLjcgMzU1LjMgMTkyIDMyMCAxOTJDMjg0LjcgMTkyIDI1NiAyMjAuNyAyNTYgMjU2QzI1NiAyOTEuMyAyODQuNyAzMjAgMzIwIDMyMHoiLz48L3N2Zz4=`,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  return (
    <MapContainer
      zoom={6.5}
      minZoom={1.3}
      maxZoom={18}
      center={position}
      className="min-h-75 lg:min-h-125 rounded-md w-full border border-neutral-300 shadow"
    >
      <Marker position={position} icon={mapMarkerIcon}>
        <Popup>
          <h5>Find use here </h5>
          <p>Dhaka, Bangladesh 🌏</p>
        </Popup>
      </Marker>
      <MapEffect filter={theme === 'dark' ? DARK_FILTER : LIGHT_FILTER} />
    </MapContainer>
  );
};

export default LocationMap;

const MapEffect = ({ filter }: { filter: string[] }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const tileLayer = (L.tileLayer as any)(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: null,
        transparent: true,
        colorFilter: filter,
      },
    ).addTo(map);

    // Cleanup on unmount
    return () => {
      tileLayer.remove();
    };
  }, [map, filter]);

  return null;
};
