import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useLocationStore } from "@/src/store/locationStore";
import { useRouter } from "expo-router";
import { ThemedText } from "@/src/components/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import { moderateScale } from "@/src/helpers";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { geocodeCoordinates } from "@/src/services/"; // Importa el servicio de geocodificación

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const selectedLocation = useLocationStore((state) => state.selectedLocation);
  const setSelectedLocation = useLocationStore(
    (state) => state.setSelectedLocation
  );
  const setAddress = useLocationStore((state) => state.setAddress);
  const router = useRouter();
  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permiso para acceder a ubicación fue denegado");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const currentLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setLocation(currentLocation);
      setSelectedLocation(currentLocation);
    })();
  }, []);

  const handleSelectLocation = async (event) => {
    const coordinate = event.nativeEvent.coordinate;
    setSelectedLocation(coordinate);
    const address = await geocodeCoordinates(
      coordinate.latitude,
      coordinate.longitude
    );
    setAddress(address);
    mapRef.current.animateToRegion(
      {
        ...coordinate,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      1000
    );
  };

  const handleSaveLocation = () => {
    if (selectedLocation) {
      router.back();
    }
  };

  const handleSearchLocation = async (data, details) => {
    const { lat, lng } = details.geometry.location;
    const newLocation = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    setLocation(newLocation);
    setSelectedLocation(newLocation);
    const address = await geocodeCoordinates(lat, lng);
    setAddress(address);
    mapRef.current.animateToRegion(newLocation, 1000);
  };

  return (
    <>
      <View style={styles.container}>
        <GooglePlacesAutocomplete
          placeholder="Buscar"
          fetchDetails
          onPress={handleSearchLocation}
          query={{
            key: "AIzaSyCIMQgM_9Ew_Z6LjdDsPhxY9pfPyyDRmag",
            language: "es",
          }}
          styles={{
            container: styles.searchContainer,
            textInput: styles.searchInput,
          }}
        />
        {location ? (
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={location}
            onPress={handleSelectLocation}
            provider={PROVIDER_GOOGLE}
            paddingAdjustmentBehavior="never"
          >
            {selectedLocation && (
              <Marker
                title="Ubicación seleccionada"
                coordinate={selectedLocation}
              />
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
        <MaterialIcons name="close" size={moderateScale(24)} color="black" />
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
    top: 80,
    right: 20,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    position: "absolute",
    top: 10,
    width: "100%",
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: "#FFF",
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

export default MapScreen;
