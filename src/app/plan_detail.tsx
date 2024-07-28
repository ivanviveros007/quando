import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { Colors } from "@/src/constants";
import { MaterialIcons } from "@expo/vector-icons";
import { parseISO, format } from "date-fns";
import storage from "@react-native-firebase/storage";
import FastImage from "react-native-fast-image";
import { moderateScale, horizontalScale, verticalScale } from "../helpers";
import { usePlansStore } from "../store/planStore";
import { router } from "expo-router";
import { IS_ANDROID } from "@/src/constants";

const PlanDetail = () => {
  const { id, title, location, time, guests, date, imageUri, description } =
    useLocalSearchParams();

  const formattedDate = parseISO(date);
  const day = format(formattedDate, "d");
  const month = format(formattedDate, "MMM");

  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (imageUri) {
      const fetchImageUrl = async () => {
        try {
          const url = await storage().ref(imageUri).getDownloadURL();
          setDownloadUrl(url);
        } catch (error) {
          console.error("Error getting image URL:", error);
        }
      };

      fetchImageUrl();
    }
  }, [imageUri]);

  const parsedGuests = JSON.parse(guests); // Parsear guests de nuevo a un array

  console.log('pasrsedGuests en plan detail', parsedGuests);

  const renderGuests = () => {
    const maxGuestsToShow = 4;
    const guestsToShow = Array.isArray(parsedGuests)
      ? parsedGuests.slice(0, maxGuestsToShow)
      : [];
    const extraGuestsCount = Array.isArray(parsedGuests)
      ? parsedGuests.length - maxGuestsToShow
      : 0;

    return (
      <View style={styles.contactsContainer}>
        {guestsToShow.map((guest, index) => (
          <View key={`${guest.id}-${index}`} style={styles.contactWrapper}>
            {guest.imageAvailable ? (
              <FastImage
                source={{
                  uri: guest.image.uri,
                  priority: FastImage.priority.normal,
                }}
                style={styles.contactImage}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : (
              <View style={styles.contactPlaceholder}>
                <ThemedText style={styles.contactInitial}>
                  {guest.name.charAt(0)}
                </ThemedText>
              </View>
            )}
          </View>
        ))}
        {extraGuestsCount > 0 && (
          <View key="extra-contacts" style={styles.contactWrapper}>
            <View style={styles.contactPlaceholder}>
              <ThemedText style={styles.contactInitial}>
                +{extraGuestsCount}
              </ThemedText>
            </View>
          </View>
        )}
      </View>
    );
  };

  const renderGuest = ({ item }) => (
    <View style={styles.guestContainer}>
      <FastImage source={{ uri: item.imageUri }} style={styles.guestImage} />
    </View>
  );

  const chunkLocation = (location: string) => {
    if (location.length > 20) {
      return location.slice(0, 35) + "...";
    }
    return location;
  };

  const confirmDelete = () => {
    try {
      Alert.alert(
        "Eliminar plan",
        "¿Estás seguro de que deseas eliminar este plan?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Eliminar",
            onPress: async () => {
              await usePlansStore.getState().deletePlan(id); // Asegúrate de llamar al método correcto
              router.back();
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  const handleEditPress = (planId: string | string[] | undefined) => {
    router.push({
      pathname: "edit_plan",
      params: {
        planId,
      },
    });
  };


  const viewDetailGuests = () => {
    router.push({
      pathname: "guests_detail",
      params: {
         guests: JSON.stringify(parsedGuests)
        // guests
      },
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.paddingScreen}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            {title}
          </ThemedText>
          <View
            style={{
              flexDirection: "row",
              gap: 30,
              alignSelf: "flex-end",
              top: -30,
            }}
          >
            <TouchableOpacity onPress={() => handleEditPress(id)}>
              <MaterialIcons
                name="edit"
                size={24}
                color={Colors.primary_black}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={confirmDelete}>
              <MaterialIcons
                name="delete"
                size={24}
                color={Colors.primary_black}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.card1}>
          <View style={styles.imageContainer}>
            {downloadUrl ? (
              <>
                {loading && <ActivityIndicator size="large" color="#0000ff" />}
                <FastImage
                  style={styles.image}
                  source={{
                    uri: downloadUrl,
                    priority: FastImage.priority.high,
                    cache: FastImage.cacheControl.immutable,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                  onLoadStart={() => setLoading(true)}
                  onLoadEnd={() => setLoading(false)}
                  onError={(error) => {
                    setLoading(false);
                    console.log("Error al cargar la imagen", error);
                  }}
                />
              </>
            ) : (
              <View style={styles.placeholderImage} />
            )}
            <View style={styles.date}>
              <View style={{ flexDirection: "column" }}>
                <ThemedText style={styles.number}>{day}</ThemedText>
                <ThemedText style={styles.month}>{month}</ThemedText>
              </View>
            </View>
          </View>

          <View style={styles.containerOrganizer}>
            <View style={styles.placeholderOrganizer} />
            <ThemedText style={{ fontSize: moderateScale(10) }}>
              Organizador
            </ThemedText>
          </View>

          <View style={styles.containerFooterDetail}>
            <View style={styles.detail}>
              <MaterialIcons
                name="location-on"
                size={20}
                color={Colors.primary_black}
              />
              <ThemedText style={{ fontSize: moderateScale(12) }}>
                {location ? chunkLocation(location) : "Ubicación no disponible"}
              </ThemedText>
            </View>
            <View style={styles.detail}>
              <MaterialIcons
                name="access-time"
                size={20}
                color={Colors.primary_black}
              />
              <ThemedText style={{ fontSize: moderateScale(12) }}>
                {time}
              </ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.card2}>
          <ThemedText style={{ fontSize: moderateScale(12) }}>
            {description ? description : "Descripción no disponible"}
          </ThemedText>
        </View>

        <View style={styles.card2}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ThemedText style={{ fontSize: moderateScale(12) }}>
              Invitados
            </ThemedText>

            <TouchableOpacity onPress={viewDetailGuests}>
              <ThemedText
                style={{
                  fontSize: moderateScale(12),
                  color: Colors.purple_dark,
                }}
              >
                Ver detalle
              </ThemedText>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            data={Array.isArray(parsedGuests) ? parsedGuests : []} 
            renderItem={renderGuest}
            keyExtractor={(item, index) =>
              item.id?.toString() || index.toString()
            } // Usar id o índice como clave
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.guestList}
          />
          {renderGuests()}
        </View>
      </View>
    </SafeAreaView>
  );
};

const shadow = {
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  paddingScreen: {
    paddingHorizontal: horizontalScale(20),
  },
  header: {
    marginTop: IS_ANDROID ? verticalScale(60) : 0,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
  },

  card1: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    ...shadow,
  },

  imageContainer: {
    position: "relative",
    backgroundColor: "lightgray",
    width: "100%",
    height: verticalScale(132),
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },

  date: {
    backgroundColor: "white",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: -30,
    left: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    ...shadow,
  },
  number: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "RobotoBold",
    textAlign: "center",
  },
  month: {
    fontSize: 16,
    fontFamily: "RobotoRegular",
    textAlign: "center",
  },
  containerFooterDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 50,
    marginBottom: 20,
  },
  detail: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  placeholderImage: {
    flex: 1,
    backgroundColor: "lightgrey",
  },

  containerOrganizer: {
    width: horizontalScale(146),
    backgroundColor: Colors.primary_pruple,
    borderRadius: 100,
    height: verticalScale(24),
    alignSelf: "flex-end",
    top: verticalScale(5),
    alignItems: "center",
    flexDirection: "row",
    gap: 30,
    right: 10,
  },
  placeholderOrganizer: {
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    backgroundColor: "grey",
  },

  card2: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    ...shadow,
    marginTop: verticalScale(20),
    minHeight: verticalScale(100),
    paddingHorizontal: horizontalScale(20),
    paddingVertical: verticalScale(10),
  },

  contactsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  contactWrapper: {
    marginHorizontal: -10, // Ajusta este valor según sea necesario para el solapamiento
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  contactPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFF",
  },
  contactInitial: {
    fontSize: 18,
    color: "#FFF",
  },
  guestList: {
    marginTop: 10,
  },
});

export default PlanDetail;
