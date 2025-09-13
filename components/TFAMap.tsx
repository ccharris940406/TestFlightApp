import React, { useRef } from "react";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import { type UserLocation } from "@/hooks/useUserLocation";
import { type Flight } from "@/hooks/useNearlyFlights";
import { ThemedView } from "./ThemedView";

interface Props {
  location: UserLocation;
  flights: Flight[];
}

function normalizeDir(dir?: number, offset = 0) {
  const d = typeof dir === "number" && !isNaN(dir) ? dir : 0;
  const r = d + offset;
  return ((r % 360) + 360) % 360;
}

export default function TFAMap({ location, flights }: Props) {
  const mapRef = useRef<MapView>(null);

  if (!location) return null;

  return (
    <ThemedView style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.5, // zoom inicial
          longitudeDelta: 0.5,
        }}
      >
        {/* 🔹 Marcador del usuario */}
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="You are here"
          pinColor="blue"
        />

        {/* 🔹 Marcadores de vuelos */}
        {flights
          .filter(
            (f) =>
              f.hex &&
              typeof f.lat === "number" &&
              typeof f.lng === "number" &&
              !isNaN(f.lat) &&
              !isNaN(f.lng),
          )
          .map((flight) => (
            <Marker
              key={flight.hex}
              coordinate={{
                latitude: flight.lat,
                longitude: flight.lng,
              }}
              title={flight.reg_number || "Unknown aircraft"}
              description={`Flag: ${flight.flag || "??"}`}
              anchor={{ x: 0.5, y: 0.5 }} // centra la rotación
            >
              <ThemedView
                style={{
                  transform: [
                    { rotate: `${normalizeDir(flight.dir, -90)}deg` },
                  ],
                }}
              >
                <MaterialCommunityIcons name="airplane" size={28} color="red" />
              </ThemedView>
            </Marker>
          ))}
      </MapView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
