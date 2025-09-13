import { useEffect, useState } from "react";
import Constants from "expo-constants";

const { airlabsApiKey, apiUrl } = Constants.expoConfig?.extra as {
  airlabsApiKey: string;
  apiUrl: string;
};

export interface Flight {
  hex: string;
  reg_number: string;
  flag: string;
  lat: number;
  lng: number;
  dir: number;
}

export default function useNearlyFlights({
  distance,
  location,
}: {
  distance: number;
  location: { latitude: number; longitude: number } | null;
}) {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function getBBox(lat: number, lng: number, radius: number) {
    const deltaLat = radius / 111.32;
    const deltaLng = radius / (111.32 * Math.cos((lat * Math.PI) / 180));
    return {
      minLat: lat - deltaLat,
      maxLat: lat + deltaLat,
      minLng: lng - deltaLng,
      maxLng: lng + deltaLng,
    };
  }

  useEffect(() => {
    if (!location) return; // espera a tener la ubicación

    const fetchFlights = async () => {
      try {
        setLoading(true);
        setError(null);

        const { minLat, maxLat, minLng, maxLng } = getBBox(
          location.latitude,
          location.longitude,
          distance,
        );

        const url = `${apiUrl}/flights?api_key=${airlabsApiKey}&bbox=${minLat},${minLng},${maxLat},${maxLng}`;
        const response = await fetch(url);

        if (!response.ok) throw new Error("Error fetching flights");

        const data = await response.json();

        setFlights(data.response ?? []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [location, distance]);
  return { flights, loading, error };
}
