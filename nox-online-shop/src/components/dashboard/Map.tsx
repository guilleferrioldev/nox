"use client"

import { LatLngExpression, LatLngTuple } from 'leaflet';

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import dynamic from "next/dynamic";
import { Suspense, useRef } from 'react';

const MapContainer = dynamic(
  async () => await(import("react-leaflet")).then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  async () => await(import("react-leaflet")).then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  async () => await(import("react-leaflet")).then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(async () => await(import("react-leaflet")).then((mod) => mod.Popup), {
  ssr: false,
});

interface MapProps {
  posix: LatLngExpression | LatLngTuple;
  zoom?: number;
}

const defaults = {
  zoom: 19,
};

const Map = ({ posix, zoom = defaults.zoom }: MapProps) => {
  const mapRef = useRef<L.Map | null>(null);

  return (
    <Suspense>
      <MapContainer
        center={posix}
        zoom={zoom}
        scrollWheelZoom={false}
        className="h-full w-full"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={posix} draggable={false}>
          <Popup>Hey ! I study here</Popup>
        </Marker>
      </MapContainer>
    </Suspense>
  );
};

export default Map;

