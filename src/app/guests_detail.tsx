import { View, StyleSheet, FlatList, ListRenderItem } from "react-native";
import { ThemedText } from "../components/ThemedText";
import { useLocalSearchParams } from "expo-router";

import FastImage from "react-native-fast-image";

import { verticalScale, moderateScale, horizontalScale } from "../helpers";

interface PhoneNumber {
  countryCode: string;
  id: string;
  digits: string;
  label: string;
  number: string;
}

interface Guest {
  lastName: string;
  contactType: string;
  jobTitle?: string;
  imageAvailable: boolean;
  middleName?: string;
  company?: string;
  id: string;
  name: string;
  phoneNumbers: PhoneNumber[];
  firstName: string;
  imageUri?: string;
}

interface LocalSearchParams {
  guests?: string;
}

export default function GuestsDetail() {
  const { guests }: LocalSearchParams = useLocalSearchParams();
  const numColumns = 3;

  const parsedGuests: Guest[] =
    typeof guests === "string" ? JSON.parse(guests) : guests;

  const confirmedGuests: Guest[] = [];
  const pendingGuests: Guest[] = Array.isArray(parsedGuests)
    ? parsedGuests
    : [];
  const declinedGuests: Guest[] = [];

  const renderGuest: ListRenderItem<Guest> = ({ item }) => (
    <View style={styles.guestContainer} key={item.id}>
      {item.imageAvailable ? (
        <FastImage source={{ uri: item.imageUri }} style={styles.guestImage} />
      ) : (
        <View style={styles.guestPlaceholder}>
          <ThemedText style={styles.guestPlaceholderText}>
            {item.firstName ? item.firstName[0].toUpperCase() : "N/A"}
          </ThemedText>
        </View>
      )}
      <ThemedText style={styles.guestName}>
        {item.firstName} {item.lastName}
      </ThemedText>
    </View>
  );

  const renderSectionHeader = (title: string, count: number) => (
    <View style={styles.sectionHeader}>
      <ThemedText style={styles.subHeader}>{title}</ThemedText>
      <ThemedText style={styles.attendanceCount}>
        {count}{" "}
        {title === "Pendientes"
          ? "en espera"
          : title === "Confirmados"
          ? "asistentes"
          : "rechazos"}
      </ThemedText>
    </View>
  );
  return (
    <View style={styles.container}>
      {renderSectionHeader("Confirmados", confirmedGuests.length)}
      <FlatList
        data={confirmedGuests}
        renderItem={renderGuest}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={numColumns}
        contentContainerStyle={styles.contactList}
      />

      {renderSectionHeader("Pendientes", pendingGuests.length)}
      <FlatList
        data={pendingGuests}
        renderItem={renderGuest}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.contactList}
      />

      {renderSectionHeader("No asisten", declinedGuests.length)}
      <FlatList
        data={declinedGuests}
        renderItem={renderGuest}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={numColumns}
        contentContainerStyle={styles.contactList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(20),
    backgroundColor: "#f9f9f9",
    marginTop: verticalScale(70),
  },
  header: {
    fontSize: moderateScale(24),
    fontWeight: "bold",
    marginBottom: verticalScale(20),
  },
  subHeader: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    fontFamily:'RobotoBold'
  },
  attendanceCount: {
    fontSize: moderateScale(16),
  },
  sectionHeader: {
    marginBottom: verticalScale(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contactList: {
    paddingBottom: verticalScale(20),
  },
  guestContainer: {
    flex: 1,
    alignItems: "center",
    margin: moderateScale(10),
    maxWidth: "30%", // para asegurar que sean tres columnas
  },
  guestImage: {
    width: horizontalScale(60),
    height: verticalScale(60),
    borderRadius: moderateScale(30),
  },
  guestPlaceholder: {
    width: horizontalScale(60),
    height: verticalScale(60),
    borderRadius: moderateScale(30),
    backgroundColor: "#EBEBEB",
    justifyContent: "center",
    alignItems: "center",
  },
  guestPlaceholderText: {
    color: "#000",
    fontSize: moderateScale(16),
  },
  guestName: {
    marginTop: verticalScale(5),
    fontSize: moderateScale(14),
    textAlign: "center",
  },
});
