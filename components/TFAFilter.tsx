import { ThemedView } from "./ThemedView";
import Slider from "@react-native-community/slider";
import { ThemedText } from "./ThemedText";

interface FilterProps {
  value: number;
  onChange: (value: number) => void;
}

export default function TFAFilter({ value, onChange }: FilterProps) {
  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Slider
        style={{ width: 200, height: 40 }}
        value={value}
        onValueChange={onChange}
        minimumValue={5}
        step={1}
        maximumValue={1000}
        minimumTrackTintColor="#FF0FF"
        maximumTrackTintColor="#000000"
      />
      <ThemedText>{value} km</ThemedText>
    </ThemedView>
  );
}
