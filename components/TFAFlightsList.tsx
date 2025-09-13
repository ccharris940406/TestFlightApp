import { FlatList } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { type Flight } from "@/hooks/useNearlyFlights";

interface Props {
  flights: Flight[];
}

export default function TFAFlightsList({ flights }: Props) {
  if (!flights || flights.length === 0) {
    return (
      <ThemedView>
        <ThemedText>No flights found</ThemedText>
      </ThemedView>
    );
  }
  return (
    <ThemedView>
      <FlatList
        data={flights}
        renderItem={({ item }) => (
          <ThemedText>{item.hex + " " + item.dir}</ThemedText>
        )}
      />
    </ThemedView>
  );
}
