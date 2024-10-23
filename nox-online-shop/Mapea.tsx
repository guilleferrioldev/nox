"use client";

import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useTheme } from "next-themes";
import { ISearchResult, IFavorite } from "@/interfaces";
import "leaflet/dist/leaflet.css";
import {
  Button,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Card,
  CardContent,
  CardFooter,
  Loading,
} from "@/components";
import { favoriteServices } from "@/services";
import L from "leaflet";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Star,
  MapPin,
  Trash2,
  Loader2,
  ListFilter,
} from "lucide-react";
import { useDeleteFavorite } from "@/hooks";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const ZoomControl = dynamic(
  () => import("react-leaflet").then((mod) => mod.ZoomControl),
  { ssr: false }
);
const LocationMarker = dynamic(() => import("./LocationMarker"), {
  ssr: false,
});
const CustomControls = dynamic(() => import("./CustomControls"), {
  ssr: false,
});

export default function Component() {
  const [mapTileUrl, setMapTileUrl] = useState(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  );
  const { mutate: deleteFavorite, isPending: isDeletingFavorite } =
    useDeleteFavorite();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);
  const [favorites, setFavorites] = useState<IFavorite[]>([]);
  const [mapCenter, setMapCenter] = useState<[number, number]>([51.505, -0.09]);
  const [activeTab, setActiveTab] = useState("search");
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const mapRef = useRef<L.Map | null>(null);
  const searchParams = useSearchParams();
  const initialLat = searchParams.get("lat");
  const initialLon = searchParams.get("lon");
  const initialAddress = searchParams.get("address");
  const { theme } = useTheme();

  useEffect(() => {
    fetchFavorites();
  }, []);

  useEffect(() => {
    if (initialLat && initialLon) {
      setMapCenter([parseFloat(initialLat), parseFloat(initialLon)]);
      if (initialAddress) {
        setFavorites([
          {
            id: "highlight",
            address: initialAddress,
            latitude: parseFloat(initialLat),
            longitude: parseFloat(initialLon),
            userId: "",
            createdAt: new Date(),
          },
        ]);
      }
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter([latitude, longitude]);
        },
        (error) => {
          console.error("Error obtaining location:", error);
        }
      );
    }
  }, [initialLat, initialLon, initialAddress]);

  useEffect(() => {
    if (theme === "dark") {
      setMapTileUrl(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
      );
    } else {
      setMapTileUrl("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
    }
  }, [theme]);

  const fetchFavorites = async () => {
    setIsLoading(true);
    try {
      const favorites = await favoriteServices.getFavorites();
      setFavorites(favorites);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`
      );
      const results = response.data.map((result: any) => ({
        address: result.display_name,
        latitude: parseFloat(result.lat),
        longitude: parseFloat(result.lon),
      }));
      const filteredResults = results.filter(
        (result: ISearchResult) =>
          !favorites.some(
            (favorite: IFavorite) =>
              favorite.latitude === result.latitude &&
              favorite.longitude === result.longitude
          )
      );
      setSearchResults(filteredResults);
      setActiveTab("search");
      setIsSidebarOpen(true);
    } catch (error) {
      console.error("Error searching for address:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddFavorite = async (result: ISearchResult) => {
    setIsLoading(true);
    try {
      await favoriteServices.addFavorite(result);
      await fetchFavorites();
      setSearchResults(
        searchResults.filter((r) => r.address !== result.address)
      );
      setActiveTab("favorites");
    } catch (error) {
      console.error("Error adding favorite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFavorite = async (id: string) => {
    try {
      deleteFavorite(id, {
        onSuccess: () => {
          setFavorites((prevFavorites) =>
            prevFavorites.filter((fav) => fav.id !== id)
          );
        },
        onError: (error) => {
          console.error("Error removing favorite:", error);
        },
      });
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  const handleCenterMap = (latitude: number, longitude: number) => {
    if (mapRef.current) {
      mapRef.current.setView([latitude, longitude], 15);
    }
  };

  const favoriteIcon = new L.Icon({
    iconUrl: "/leaf-green1.png",
    shadowUrl: "/leaf-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  const LocationCard = ({ item, isFavorite = false }: any) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <p className="text-sm mb-2 line-clamp-2">{item.address}</p>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between p-2 bg-muted space-y-2 sm:space-y-0 sm:space-x-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={() => handleCenterMap(item.latitude, item.longitude)}
          className="w-full sm:w-auto"
        >
          <MapPin size={16} className="mr-1" /> Go to
        </Button>
        {isFavorite ? (
          <Button
            size="sm"
            variant="destructive"
            onClick={() => handleRemoveFavorite(item.id)}
            disabled={isDeletingFavorite}
            className="w-full sm:w-auto"
          >
            {isDeletingFavorite ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <>
                <Trash2 size={16} className="mr-1" /> Remove
              </>
            )}
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={() => handleAddFavorite(item)}
            className="w-full sm:w-auto"
          >
            <Star size={16} className="mr-1" /> Add to Favorites
          </Button>
        )}
      </CardFooter>
    </Card>
  );

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 bg-background shadow-md z-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label={isSidebarOpen ? "Hide results" : "Show results"}
              className="flex items-center space-x-2 min-w-[120px] justify-center"
            >
              <ListFilter className="h-4 w-4" />
              <span>{isSidebarOpen ? "Hide Results" : "Show Results"}</span>
              {(searchResults.length > 0 || favorites.length > 0) && (
                <span className="flex h-2 w-2 rounded-full bg-primary" />
              )}
            </Button>
            <div className="relative flex-grow">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for an address"
                className="pl-10 pr-4 py-2 w-full"
              />
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                size={20}
              />
            </div>
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Search"
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden h-full">
        <div
          className={`${
            isSidebarOpen ? "w-full md:w-1/3 lg:w-1/4" : "w-0"
          } bg-background overflow-hidden border-r border-border transition-all duration-300 ease-in-out flex flex-col`}
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full flex-grow flex flex-col"
          >
            <TabsList className="w-full">
              <TabsTrigger value="search" className="w-1/2">
                Search Results
              </TabsTrigger>
              <TabsTrigger value="favorites" className="w-1/2">
                Favorites
              </TabsTrigger>
            </TabsList>
            <div className="flex-1 overflow-hidden">
              {/* Aquí asegúrate de que el contenido del tab ocupe el espacio restante y tenga scroll */}
              <TabsContent
                value="search"
                className="p-4 h-full overflow-y-auto"
              >
                {isLoading ? (
                  <div className="flex justify-center items-center h-full">
                    <Loading />
                  </div>
                ) : searchResults.length === 0 ? (
                  <p className="text-muted-foreground">No results found</p>
                ) : (
                  <div className="space-y-4">
                    {searchResults.map((result, index) => (
                      <LocationCard key={index} item={result} />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent
                value="favorites"
                className="p-4 h-full overflow-y-auto"
              >
                {isLoading ? (
                  <div className="flex justify-center items-center h-full">
                    <Loading />
                  </div>
                ) : favorites.length === 0 ? (
                  <p className="text-muted-foreground">
                    No favorites added yet
                  </p>
                ) : (
                  <div className="space-y-4">
                    {favorites.map((favorite) => (
                      <LocationCard
                        key={favorite.id}
                        item={favorite}
                        isFavorite={true}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <div
          className={`flex-1 relative z-0 transition-all duration-300 ease-in-out ${
            isSidebarOpen ? "md:flex-[2_2_0%]" : "flex-[1_1_100%]"
          }`}
        >
          <MapContainer
            center={mapCenter}
            zoom={13}
            className="h-full w-full"
            zoomControl={false}
            ref={mapRef}
          >
            <TileLayer url={mapTileUrl} />
            <ZoomControl position="topright" />
            <CustomControls mapTileUrl={mapTileUrl} />
            <LocationMarker />

            {searchResults.map((result, index) => (
              <Marker
                key={index}
                position={[result.latitude, result.longitude]}
              >
                <Popup>
                  <Card className="w-64">
                    <CardContent className="p-4">
                      <p className="text-sm mb-2">{result.address}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between p-2 bg-muted">
                      <Button
                        size="sm"
                        onClick={() => handleAddFavorite(result)}
                      >
                        <Star size={16} className="mr-1" /> Add to Favorites
                      </Button>
                    </CardFooter>
                  </Card>
                </Popup>
              </Marker>
            ))}

            {favorites.map((favorite) => (
              <Marker
                key={favorite.id}
                position={[favorite.latitude, favorite.longitude]}
                icon={favoriteIcon}
              >
                <Popup>
                  <Card className="w-64">
                    <CardContent className="p-4">
                      <p className="text-sm mb-2">{favorite.address}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between p-2 bg-muted">
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleRemoveFavorite(favorite.id)}
                        disabled={isDeletingFavorite}
                      >
                        {isDeletingFavorite ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <Trash2 size={16} className="mr-1" /> Remove from
                            Favorites
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
