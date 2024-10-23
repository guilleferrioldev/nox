"use client";

import { useState } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";

const locationIcon = new L.Icon({
  iconUrl: "/imgs/marker.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function LocationMarker() {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      L.circle(e.latlng, {
        color: "green",
        fillColor: "#d3ffce",
        fillOpacity: 0.5,
        radius: 100,
      }).addTo(map);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={locationIcon}>
      <Popup className="text-center text-muted-foreground antialiased font-semibold">
        You are here
      </Popup>
    </Marker>
  );
}
