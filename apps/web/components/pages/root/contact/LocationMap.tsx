'use client';

import { useEffect, useRef, useState } from 'react';
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

const LIGHT_ICON = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgNjQwIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIHY3LjEuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLi0tPjxwYXRoIGQ9Ik0xMjggMjUyLjZDMTI4IDE0OC40IDIxNCA2NCAzMjAgNjRDNDI2IDY0IDUxMiAxNDguNCA1MTIgMjUyLjZDNTEyIDM3MS45IDM5MS44IDUxNC45IDM0MS42IDU2OS40QzMyOS44IDU4Mi4yIDMxMC4xIDU4Mi4yIDI5OC4zIDU2OS40QzI0OC4xIDUxNC45IDEyNy45IDM3MS45IDEyNy45IDI1Mi42ek0zMjAgMzIwQzM1NS4zIDMyMCAzODQgMjkxLjMgMzg0IDI1NkMzODQgMjIwLjcgMzU1LjMgMTkyIDMyMCAxOTJDMjg0LjcgMTkyIDI1NiAyMjAuNyAyNTYgMjU2QzI1NiAyOTEuMyAyODQuNyAzMjAgMzIwIDMyMHoiLz48L3N2Zz4=`;
const DARK_ICON = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NDAgNjQwIj48IS0tIUZvbnQgQXdlc29tZSBGcmVlIHY3LjEuMCBieSBAZm9udGF3ZXNvbWUgLSBodHRwczovL2ZvbnRhd2Vzb21lLmNvbSBMaWNlbnNlIC0gaHR0cHM6Ly9mb250YXdlc29tZS5jb20vbGljZW5zZS9mcmVlIENvcHlyaWdodCAyMDI2IEZvbnRpY29ucywgSW5jLi0tPjxwYXRoIGZpbGw9IiNlNmViZjQiIGQ9Ik0xMjggMjUyLjZDMTI4IDE0OC40IDIxNCA2NCAzMjAgNjRDNDI2IDY0IDUxMiAxNDguNCA1MTIgMjUyLjZDNTEyIDM3MS45IDM5MS44IDUxNC45IDM0MS42IDU2OS40QzMyOS44IDU4Mi4yIDMxMC4xIDU4Mi4yIDI5OC4zIDU2OS40QzI0OC4xIDUxNC45IDEyNy45IDM3MS45IDEyNy45IDI1Mi42ek0zMjAgMzIwQzM1NS4zIDMyMCAzODQgMjkxLjMgMzg0IDI1NkMzODQgMjIwLjcgMzU1LjMgMTkyIDMyMCAxOTJDMjg0LjcgMTkyIDI1NiAyMjAuNyAyNTYgMjU2QzI1NiAyOTEuMyAyODQuNyAzMjAgMzIwIDMyMHoiLz48L3N2Zz4=`

const LocationMap = () => {
  const position: LatLngExpression = [23.723044, 90.410555];
  const { theme } = useTheme();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [isClient, setIsClient] = useState(false);

  const mapMarkerIcon = L.icon({
    iconUrl: theme === 'dark' ? DARK_ICON : LIGHT_ICON,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !mapRef.current) return;

    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapRef.current, {
      center: position,
      zoom: 6.5,
      minZoom: 1.3,
      maxZoom: 18,
    });

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add marker
    L.marker(position, { icon: mapMarkerIcon }).addTo(map).bindPopup(`
        <div>
          <h5 style="font-weight: bold; margin-bottom: 4px;">Find us here</h5>
          <p style="margin: 0;">Dhaka, Bangladesh 🌏</p>
        </div>
      `);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isClient, position, mapMarkerIcon]);

  useEffect(() => {
    if (!mapInstanceRef.current || !isClient) return;

    const map = mapInstanceRef.current;
    const filter = theme === 'dark' ? DARK_FILTER : LIGHT_FILTER;

    // Remove existing tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    (L.tileLayer as any)('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: null,
      transparent: true,
      colorFilter: filter,
    }).addTo(map);
  }, [theme, isClient]);

  if (!isClient) {
    return (
      <div className="min-h-75 lg:min-h-125 rounded-md w-full border border-neutral-300 shadow bg-gray-100 flex items-center justify-center">
        <p>Loading map...</p>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className="min-h-75 lg:min-h-125 rounded-md w-full border border-neutral-300 shadow z-0"
    />
  );
};

export default LocationMap;
