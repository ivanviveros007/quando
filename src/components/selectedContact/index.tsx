import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/src/constants";
import { horizontalScale, moderateScale, verticalScale } from "@/src/helpers";
import { ThemedText } from "../ThemedText";

interface SelectedContactItemProps {
  contact: Contacts.Contact;
  onSelect: (contact: Contacts.Contact) => void;
}

const SelectedContactItem: React.FC<SelectedContactItemProps> = ({
  contact,
  onSelect,
}) => {
  const truncateName = (name: string, maxLength: number) => {
    return name.length > maxLength
      ? name.substring(0, maxLength) + "..."
      : name;
  };

  const displayName = truncateName(contact.name, 7);
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onSelect(contact)}
    >
      {contact.imageAvailable ? (
        <Image source={{ uri: contact.image.uri }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <ThemedText style={styles.initial}>
            {contact.name.charAt(0)}
          </ThemedText>
          <View style={styles.checkmark}>
            <MaterialIcons name="check-circle" size={24} color={"#8767F2"} />
          </View>
        </View>
      )}

      <View style={styles.nameContainer}>
        <ThemedText style={styles.name}>{displayName}</ThemedText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 5,
    position: "relative",
  },
  image: {
    width: horizontalScale(60),
    height: verticalScale(60),
    borderRadius: moderateScale(30),
  },
  placeholder: {
    width: horizontalScale(60),
    height: verticalScale(60),
    borderRadius: moderateScale(30),
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  initial: {
    fontSize: moderateScale(20),
    color: "#fff",
  },
  checkmark: {
    position: "absolute",
    bottom: 0,
    right: -5,
  },
  nameContainer: {
    width: horizontalScale(70),
    alignItems: "center",
  },
  name: {
    marginTop: 5,
    textAlign: "center",
    color: Colors.primary_black,
    fontSize: moderateScale(14),
  },
});

export default SelectedContactItem;
