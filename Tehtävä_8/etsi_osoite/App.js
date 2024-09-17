import { StatusBar, StyleSheet, View } from "react-native";
import Map from "./components/Map";

export default function App() {
  return (
    <View>
      <Map />
      <StatusBar style="auto" />
    </View>
  );
}
