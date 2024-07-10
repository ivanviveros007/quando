import React from "react";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { Colors } from "@/src/constants";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";

const PlanDetail = () => {
  const {
    id,
    title,
    location,
    time,
    guests,
    date,
    imageUri,
    organizerName,
    organizerImage,
    description,
  } = useLocalSearchParams();

  console.log("PlanDetail", {
    id,
    title,
    location,
    time,
    guests,
    date,
    imageUri,
    organizerName,
    organizerImage,
    description,
  });

  const parsedGuests = JSON.parse(guests); // Parsear guests de nuevo a un array

  const renderGuest = ({ item }) => (
    <View style={styles.guestContainer}>
      <Image source={{ uri: item.imageUri }} style={styles.guestImage} />
    </View>
  );

  const renderGuests = () => {
    const maxGuestsToShow = 4;
    const guestsToShow = Array.isArray(parsedGuests)
      ? parsedGuests.slice(0, maxGuestsToShow)
      : [];
    const extraGuestsCount = Array.isArray(parsedGuests)
      ? parsedGuests.length - maxGuestsToShow
      : 0;

    return (
      <View style={styles.guestContainer}>
        {guestsToShow.map((guest, index) => (
          <View key={guest.id} style={[styles.guest, { left: index * 20 }]}>
            {guest.imageUri ? (
              <Image
                source={{
                  uri: guest.imageUri.toString(),
                  cacheKey: guest.imageUri.toString(),
                }}
                style={styles.guestImage}
              />
            ) : (
              <View style={styles.guestPlaceholder}>
                <ThemedText style={styles.guestPlaceholderText}>
                  {guest.name[0].toUpperCase()}
                </ThemedText>
              </View>
            )}
          </View>
        ))}
        {extraGuestsCount > 0 && (
          <View style={[styles.guest, { left: guestsToShow.length * 20 }]}>
            <View style={styles.guestPlaceholder}>
              <ThemedText style={styles.guestPlaceholderText}>
                +{extraGuestsCount}
              </ThemedText>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        {title}
      </ThemedText>

      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image
            source={{
              uri: imageUri.toString(),
              cacheKey: imageUri.toString(),
            }}
            style={styles.image}
          />
        ) : (
          <View style={styles.imagePlaceholder}>
            <ThemedText style={styles.imagePlaceholderText}>Imagen</ThemedText>
          </View>
        )}
        <View style={styles.dateContainer}>
          <ThemedText style={styles.dateText}>15</ThemedText>
          <ThemedText style={styles.monthText}>Abril</ThemedText>
        </View>
        <View style={styles.organizerContainer}>
          {/* <Image
            source={{ uri: organizerImage.toString() }}
            style={styles.organizerImage}
            onError={(error) =>
              console.log(
                "Organizer image load error:",
                error.nativeEvent.error
              )
            }
          /> */}
          <ThemedText style={styles.organizerText}>
            {organizerName} organizador
          </ThemedText>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <MaterialIcons
            name="location-on"
            size={20}
            color={Colors.primary_black}
          />
          <ThemedText style={styles.detailText}>{location}</ThemedText>
        </View>
        <View style={styles.detailRow}>
          <MaterialIcons
            name="access-time"
            size={20}
            color={Colors.primary_black}
          />
          <ThemedText style={styles.detailText}>{time}</ThemedText>
        </View>
      </View>

      <View style={styles.descriptionContainer}>
        <ThemedText style={styles.descriptionText}>{description}</ThemedText>
      </View>

      <View style={styles.guestsContainer}>
        <View style={styles.guestsHeader}>
          <ThemedText style={styles.guestsTitle}>Invitados</ThemedText>
          <TouchableOpacity
            onPress={() => {
              /* navega al detalle de invitados */
            }}
          >
            <ThemedText style={styles.guestsDetailLink}>Ver detalle</ThemedText>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={Array.isArray(parsedGuests) ? parsedGuests : []} // Asegurar que guests es un array
          renderItem={renderGuest}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          } // Usar id o índice como clave
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.guestList}
        />
        {renderGuests()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    zIndex: 1,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 16,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 16,
    backgroundColor: "lightgray",
    width: "100%",
    height: 200,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 8,
  },
  dateContainer: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: Colors.white,
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  dateText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  monthText: {
    fontSize: 16,
  },
  organizerContainer: {
    position: "absolute",
    bottom: 16,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 8,
    borderRadius: 4,
  },
  organizerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  organizerText: {
    fontSize: 16,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 16,
  },
  descriptionContainer: {
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 16,
  },
  guestsContainer: {
    marginBottom: 16,
  },
  guestsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  guestsTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  guestsDetailLink: {
    fontSize: 14,
    color: Colors.primary_pruple,
  },
  guestList: {
    paddingLeft: 16,
  },
  guestContainer: {
    marginRight: 8,
  },
  guestImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  guest: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: "hidden",
    position: "absolute",
  },
  // guestImage: {
  //   width: "100%",
  //   height: "100%",
  // },
  guestPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: "#EBEBEB",
    justifyContent: "center",
    alignItems: "center",
  },
  guestPlaceholderText: {
    color: Colors.primary_black,
    fontSize: 12,
  },
});

export default PlanDetail;
