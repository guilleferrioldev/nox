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
  onOpen?: () => void,
  zoom?: number;
  markerLocations: MarkerLocation[];
  marketsWithButtons?: boolean;
}

const defaults = {
  zoom: 16,
};

const Map = ({ posix, onOpen, markerLocations, zoom = defaults.zoom, marketsWithButtons = true}: MapProps) => {
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
          {marketsWithButtons && <Flex w="full" alignItems="center" justifyContent="space-between" gap={2}>
            <Button variant="outline" borderRadius="20px" borderColor="#FF7500"  color="#FF7500" h={7} fontSize="sm" w="50%" 
                    onClick={() => {toggleDetails(); setLocation(markerLocation)}}>
                View Details
            </Button>
            <Button variant="solid" borderRadius="20px" bg="#FF7500"  color="white" h={7} fontSize="sm" w="50%"
                onClick={onOpen}>
                Assign
            </Button>
          </Flex>}
        </Stack>
      </Popup>
    </Marker>
  ));

  return (
    <Flex
      w="full"
      h="full"
      flexDirection="column" 
      gap={4}
    >
      <Flex 
        w="full" 
        h="full"
        position="relative"
      >
        <MapContainer
          center={posix}
          zoom={zoom}
          scrollWheelZoom={false}
          style={{ width: "100%", height: "100%", padding: 3}} 
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
          />
          {mapMarkers}
        </MapContainer>
      </Flex>
    </Flex>
  );
};

export default Map;
