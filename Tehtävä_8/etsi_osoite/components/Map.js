import { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Keyboard,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { fetchCoordinates } from "../services/mapApi";

export default function Map() {
  const [address, setAddress] = useState("");
  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });
  const [marker, setMarker] = useState(null);

  const handlePress = async () => {
    Keyboard.dismiss();

    const data = await fetchCoordinates({ address });
    if (data && data.length > 0) {
      const { lat, lon } = data[1];
      const newCoordinates = {
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
      };

      setRegion({
        ...newCoordinates,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
      });
      setMarker(newCoordinates);
    } else {
      Alert.alert("Location not found", "Please enter a valid address.");
    }

    setAddress("");
  };

  return (
    <View>
      <MapView style={styles.mapView} loadingEnabled={true} region={region}>
        {marker && <Marker coordinate={marker} title="Location" />}
      </MapView>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchField}
          placeholder={"Enter address"}
          placeholderTextColor={"#666"}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <View style={styles.buttonWrapper}>
          <Button title="Search" onPress={handlePress} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapView: {
    height: "100%",
    width: "100%",
  },
  searchContainer: {
    position: "absolute",
    top: 10,
    width: "100%",
    flexDirection: "row",
  },
  searchField: {
    borderRadius: 10,
    margin: 10,
    color: "#000",
    borderColor: "#666",
    backgroundColor: "#FFF",
    borderWidth: 1,
    height: 45,
    paddingHorizontal: 10,
    fontSize: 18,
    width: 270,
  },
  buttonWrapper: {
    justifyContent: "center",
  },
});
