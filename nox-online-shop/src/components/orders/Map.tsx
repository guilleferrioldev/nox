"use client"

import { LatLngExpression, LatLngTuple } from 'leaflet';

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import dynamic from "next/dynamic";
import { useRef } from 'react';
import { Button, Flex, Heading, Stack } from '@chakra-ui/react';
import { MarkerLocation } from '@/types';
import { useDetails, useLocation } from '@/context';

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
  zoom: 16,
};

const markerLocations: MarkerLocation[] = [
  {
   position: [23.115706, -82.418451], 
   direction: "Calle 30 e/27 y 29 Siboney Playa #3892",
   product: "Café molido" 
  },
  {
   position: [23.111706, -82.422451], 
   direction: "Calle 44 e/21 y 23 Siboney Playa #4212",
   product: "Hamburguesas"
  },
  {
   position: [23.113706, -82.416451], 
   direction: "Calle 33 e/34 y 36 Siboney Playa #6040",
   product: "Libros"
  },
  {
   position: [23.113706, -82.424451], 
   direction: "Calle 17 e/42 y 36 Siboney Playa #5053",
   product: "Fruta fresca"
  },
  {
   position: [23.114706, -82.420451], 
   direction: "Calle 25 e/34 y 36 Siboney Playa #4578",
   product: "Pan"
  },
];  

const Map = ({ posix, zoom = defaults.zoom }: MapProps) => {
  const { toggleDetails } = useDetails();
  const { setLocation } = useLocation();
  const mapRef = useRef<L.Map | null>(null);

  const mapMarkers = markerLocations.map((markerLocation, index) => (
    <Marker key={index} position={markerLocation.position} draggable={false}>
      <Popup maxWidth={200}>
        <Stack spacing={2}>
          <Heading as="h2" size="small" color="#737791" fontWeight="normal" mb={3}> 
              {markerLocation.direction} 
          </Heading>
          <Heading as="h3" size="small" color="#05004E" mb={3}>
              {markerLocation.product}
          </Heading>
          <Flex w="full" alignItems="center" justifyContent="space-between" gap={2}>
            <Button variant="outline" borderRadius="20px" borderColor="#FF7500"  color="#FF7500" h={7} fontSize="sm" w="50%" 
                    onClick={() => {toggleDetails(); setLocation(markerLocation)}}>
                View Details
            </Button>
            <Button variant="solid" borderRadius="20px" bg="#FF7500"  color="white" h={7} fontSize="sm" w="50%">
                Assing
            </Button>
          </Flex>
        </Stack>
      </Popup>
    </Marker>
  ));

  return (
    <Flex
      w="full"
      h="90%"
      flexDirection="column" 
      p={6}
      gap={4}
        >
      <MapContainer
        center={posix}
        zoom={zoom}
        scrollWheelZoom={false}
        className="h-full w-full"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
        />
        {mapMarkers}
      </MapContainer>
    </Flex>
  );
};


export default Map;

