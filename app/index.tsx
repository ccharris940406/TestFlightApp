import { StyleSheet } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import TFAFilter from "@/components/TFAFilter";
import { useState } from "react";
import TFAMap from "@/components/TFAMap";
import { useUserLocation } from "@/hooks/useUserLocation";
import TFAFlightsList from "@/components/TFAFlightsList";
import useNearlyFlights from "@/hooks/useNearlyFlights";
import "expo-router/entry";

export default function HomeScreen() {
  const [filterRadius, setFilterRadius] = useState<number>(5);
  const location = useUserLocation();
  const { flights, loading, error } = useNearlyFlights({
    distance: filterRadius,
    location: location || { latitude: 0, longitude: 0 },
  });
  if (!location) {
    return <ThemedView style={styles.mainContainer}>Loading...</ThemedView>;
  }

  return (
    <ThemedView style={styles.mainContainer}>
      <ThemedView style={styles.topContainer}>
        {loading ? (
          <ThemedView>Loading flights on map...</ThemedView>
        ) : (
          <TFAMap location={location} flights={flights} />
        )}
      </ThemedView>
      <ThemedView style={styles.filterContainer}>
        <TFAFilter value={filterRadius} onChange={setFilterRadius} />
      </ThemedView>
      <ThemedView style={styles.bottomContainer}>
        {loading ? (
          <ThemedView>Loading flights list...</ThemedView>
        ) : error ? (
          <ThemedView>Error: {error}</ThemedView>
        ) : (
          <TFAFlightsList flights={flights} />
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    // backgroundColor: "#000",
  },
  filterContainer: {
    flex: 0.2,
    justifyContent: "center",
  },
  bottomContainer: {
    flex: 1,
  },
});
