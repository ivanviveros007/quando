import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { ThemedText } from "../ThemedText";
import { verticalScale, moderateScale, horizontalScale } from "@/src/helpers";
import { Colors } from "@/src/constants";
import { Ionicons } from "@expo/vector-icons";
import { parse, format, parseISO } from "date-fns";
import FastImage from "react-native-fast-image";
import storage from "@react-native-firebase/storage";
import * as Sentry from "@sentry/react-native";
import { IS_ANDROID } from "@/src/constants";

interface Guest {
  id: string;
  name: string;
  imageAvailable: boolean;
  image?: { uri: string };
}
interface CardProps {
  title: string;
  location: string;
  date: string;
  time: string;
  guests?: Guest[];
  imageUri?: string;
  onPress?: () => void;
}

export const CardEvent: FC<CardProps> = ({
  title,
  location,
  date,
  time,
  guests = [],
  imageUri,
  onPress,
}) => {
  const formattedDate = parseISO(date);
  const day = format(formattedDate, "d");
  const month = format(formattedDate, "MMM");
  const parsedTime = parse(time, "HH:mm", new Date());
  const formattedTime = format(parsedTime, "HH:mm");

  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  useEffect(() => {
    if (imageUri) {
      const fetchImageUrl = async () => {
        try {
          const url = await storage().ref(imageUri).getDownloadURL();
          setDownloadUrl(url);
        } catch (error) {
          console.error("Error getting image URL:", error);
          Sentry.captureException({
            message: "Error al obtener la URL de la imagen",
            error,
          });
        }
      };

      fetchImageUrl();
    }
  }, [imageUri]);

  const renderGuests = () => {
    const maxGuestsToShow = 4;
    const guestsToShow = guests.slice(0, maxGuestsToShow);
    const extraGuestsCount = guests.length - maxGuestsToShow;

    return (
      <View style={styles.guestContainer}>
        {guestsToShow.map((guest, index) => (
          <View key={guest.id} style={[styles.guest, { left: index * 20 }]}>
            {guest.imageAvailable ? (
              <FastImage
                source={{
                  uri: guest.image.uri,
                  priority: FastImage.priority.normal,
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
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.containerData}>
          <View>
            <ThemedText
              style={styles.title}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </ThemedText>
          </View>
          <View style={styles.containerLocation}>
            <Ionicons
              name="location-outline"
              size={moderateScale(20)}
              color="black"
            />
            <ThemedText
              style={styles.textLocation}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {location}
            </ThemedText>
          </View>
          <View style={[styles.containerLocation, { marginTop: 5 }]}>
            <Ionicons
              name="time-outline"
              size={moderateScale(20)}
              color="black"
            />
            <ThemedText style={styles.textLocation}>{formattedTime}</ThemedText>
          </View>
          <View style={[styles.containerGuests, { marginTop: 5 }]}>
            {renderGuests()}
          </View>
        </View>
        <View style={styles.containerDate}>
          {downloadUrl && (
            <FastImage
              source={{
                uri: downloadUrl,
                priority: FastImage.priority.high,
                cache: FastImage.cacheControl.immutable,
              }}
              style={styles.eventImage}
              resizeMode={FastImage.resizeMode.cover}
            />
          )}
          <View style={styles.date}>
            <View style={{ flexDirection: "column" }}>
              <ThemedText style={styles.number}>{day}</ThemedText>
              <ThemedText style={styles.month}>{month}</ThemedText>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: horizontalScale(282),
    height: IS_ANDROID ? verticalScale(160) : verticalScale(135),
    backgroundColor: "white",
    shadowColor: Colors.primary_black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    borderRadius: 10,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: Colors.primary_pruple,
  },
  eventImage: {
    width: horizontalScale(104),
    height: IS_ANDROID ? verticalScale(158) : verticalScale(132),
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: -1,
    borderEndEndRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  containerData: {
    flex: 1.5,
    paddingHorizontal: 10,
  },
  containerDate: {
    backgroundColor: "white",
    flex: 1,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
  },
  date: {
    backgroundColor: "white",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 5,
    right: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
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
  title: {
    fontSize: 20,
    fontFamily: "RobotoBold",
    marginTop: 10,
  },
  containerLocation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  textLocation: {
    fontSize: 12,
    fontFamily: "ManjariRegular",
    maxWidth: "80%",
  },
  containerGuests: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  guestContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    top: 15,
    left: -1,
  },
  guest: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: 15,
    overflow: "hidden",
    position: "absolute",
  },
  guestImage: {
    width: "100%",
    height: "100%",
  },
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
  noGuestsText: {
    fontSize: 12,
    color: "#999",
  },
});
