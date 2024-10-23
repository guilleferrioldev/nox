"use client";

import { useMap } from "react-leaflet";
import L from "leaflet";
import { Button } from "..";

interface CustomControlsProps {
  mapTileUrl: string;
}

export default function CustomControls({
  mapTileUrl,
}: Readonly<CustomControlsProps>) {
  const map = useMap();

  const handleLocate = () => {
    map.locate({ setView: true });

    L.tileLayer(mapTileUrl, {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([23.1353, -82.3666])
      .addTo(map)
      .bindPopup("El Vedado, La Habana, Cuba")
      .openPopup();
  };

  return (
    <div className="leaflet-top leaflet-left">
      <div className="leaflet-control leaflet-bar">
        <Button variant={"outline"} onClick={handleLocate} title="Locate me">
          📍
        </Button>
      </div>
    </div>
  );
}
