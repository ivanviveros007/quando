import React, { FC } from "react";
import { View, StyleSheet, Image } from "react-native";
import { ThemedText } from "../ThemedText";
import { verticalScale, moderateScale, horizontalScale } from "@/src/helpers";
import { Colors } from "@/src/constants";
import { theme } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";
import { parseISO, format } from "date-fns";

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
}

export const CardEvent: FC<CardProps> = ({
  title,
  location,
  date,
  time,
  guests,
}) => {
  const formattedDate = parseISO(date);
  const day = format(formattedDate, "d");
  const month = format(formattedDate, "MMM");

  return (
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
          <ThemedText style={styles.textLocation}>{time}</ThemedText>
        </View>
        <View style={[styles.containerGuests, { marginTop: 5 }]}>
          {guests && guests.length > 0 ? (
            guests.map((guest) => (
              <View key={guest.id} style={styles.guest}>
                {guest.imageAvailable ? (
                  <Image
                    source={{ uri: guest.image.uri }}
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
            ))
          ) : (
            <ThemedText style={styles.noGuestsText}>
              No hay invitados
            </ThemedText>
          )}
        </View>
      </View>
      <View style={styles.containerDate}>
        <View style={styles.date}>
          <View style={{ flexDirection: "column" }}>
            <ThemedText style={styles.number}>{day}</ThemedText>
            <ThemedText style={styles.month}>{month}</ThemedText>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: horizontalScale(282),
    height: verticalScale(135),
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
  containerData: {
    flex: 1.5,
    paddingHorizontal: 10,
  },
  containerDate: {
    // backgroundColor: theme.colors.placeholder,
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
  guest: {
    width: 30,
    height: 30,
    borderRadius: 15,
    overflow: "hidden",
    marginRight: 5,
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
    color: "#5B5B5B",
    fontSize: 14,
  },
  noGuestsText: {
    fontSize: 12,
    color: "#999",
  },
});

// TODO: si el usuario sube una imagen esa imagen de imageBackground sino queda blanco,

//TODO: en invitados, poder agregar varios invitados a la vez, y que se muestren en la cardEvent

//TODO: en la cardEvent si son mas de 4 invitados agregar el + y si son menos agregar la cantidad.

//TODO: en la cardEvent superponer las caras de los invitados y es un solo boton

//TODO: en la cardEvent es un solo adjunto.

//TODO: en confirmation agrupar los invitados como figma con el + y la cantidad de invitados.

//TODO: en confirmation en ir al Inicio enviar al Home

//TODO: ver bug de eventos con fecha de hoy
