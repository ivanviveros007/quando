import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useLocationStore } from "@/src/store/locationStore";
import { useRouter } from "expo-router";
import { ThemedText } from "@/src/components/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import { moderateScale } from "@/src/helpers";

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const selectedLocation = useLocationStore((state) => state.selectedLocation);
  const setSelectedLocation = useLocationStore(
    (state) => state.setSelectedLocation
  );
  const router = useRouter();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permiso para acceder a ubicación fue denegado");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  const handleSelectLocation = (event) => {
    setSelectedLocation(event.nativeEvent.coordinate);
  };

  const handleSaveLocation = () => {
    if (selectedLocation) {
      router.back();
    }
  };

  return (
    <>
      <View style={styles.container}>
        {location ? (
          <MapView
            style={styles.map}
            initialRegion={location}
            onPress={handleSelectLocation}
          >
            {selectedLocation && (
              <Marker title="Selected Location" coordinate={selectedLocation} />
            )}
          </MapView>
        ) : (
          <Text>Cargando mapa...</Text>
        )}
      </View>
      <TouchableOpacity onPress={handleSaveLocation} style={styles.button}>
        <ThemedText style={styles.label}>Guardar Ubicación</ThemedText>
      </TouchableOpacity>
      <Pressable style={styles.close} onPress={() => router.back()}>
        <MaterialIcons
          name="close"
          size={moderateScale(24)}
          color="black"
          onPress={() => router.back()}
        />
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    paddingHorizontal: 40,
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
  },
  label: {
    color: "white",
  },
  close: {
    position: "absolute",
    height: 50,
    width: 50,
    backgroundColor: "#BDBDBD",
    top: 20,
    right: 20,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MapScreen;
