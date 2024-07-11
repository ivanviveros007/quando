import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/src/constants";
import { horizontalScale, moderateScale, verticalScale } from "@/src/helpers";

interface SelectedContactItemProps {
  contact: Contacts.Contact;
  onSelect: (contact: Contacts.Contact) => void;
}

const SelectedContactItem: React.FC<SelectedContactItemProps> = ({
  contact,
  onSelect,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onSelect(contact)}
    >
      {contact.imageAvailable ? (
        <Image source={{ uri: contact.image.uri }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.initial}>{contact.name.charAt(0)}</Text>
          <View style={styles.checkmark}>
            <MaterialIcons
              name="check-circle"
              size={24}
              color={'#8767F2'}
            />
          </View>
        </View>
      )}

      <Text style={styles.name}>{contact.name}</Text>
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
    fontSize: 24,
    color: "#fff",
  },
  checkmark: {
    position: "absolute",
    bottom: 0,
    right: -5,
  },
  name: {
    marginTop: 5,
    textAlign: "center",
  },
});

export default SelectedContactItem;
