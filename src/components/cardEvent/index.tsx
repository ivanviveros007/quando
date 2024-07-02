import { FC } from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "../ThemedText";
import { verticalScale, moderateScale, horizontalScale } from "@/src/helpers";
import { Colors } from "@/src/constants";
import { theme } from "@/src/theme";
import { Ionicons } from "@expo/vector-icons";

interface CardProps {
  title: string;
  location: string;
  date: string;
  time: string;
  invitations?: [string];
}

export const CardEvent: FC<CardProps> = ({ title, location, date, time }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerData}>
        <View>
          <ThemedText style={styles.title}>{title}</ThemedText>
        </View>
        <View style={styles.containerLocation}>
          <Ionicons
            name="location-outline"
            size={moderateScale(20)}
            color="black"
          />
          <ThemedText style={styles.textLocation} numberOfLines={1}>
            {location}
          </ThemedText>
        </View>
        <View style={[styles.containerLocation, { marginTop: 5 }]}>
          <Ionicons
            name="time-outline"
            size={moderateScale(20)}
            color="black"
          />
          <ThemedText style={styles.textLocation}>
            {date} - {time}
          </ThemedText>
        </View>
      </View>
      <View style={styles.containerDate}>
        <View style={styles.date}>
          <View style={{ flexDirection: "column" }}>
            <ThemedText style={styles.number}>12</ThemedText>
            <ThemedText style={styles.month}>Dic</ThemedText>
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
  },
  containerData: {
    flex: 1.5,
    paddingHorizontal: 10,
  },

  containerDate: {
    backgroundColor: theme.colors.placeholder,
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
  },
});
