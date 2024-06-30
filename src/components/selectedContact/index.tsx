import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import * as Contacts from "expo-contacts";
import { moderateScale, horizontalScale, verticalScale } from "@/src/helpers";

interface SelectedContactItemProps {
  contact: Contacts.Contact;
}

const SelectedContactItem: React.FC<SelectedContactItemProps> = ({
  contact,
}) => (
  <View style={styles.selectedContact}>
    {contact.imageAvailable ? (
      <Image source={{ uri: contact.image.uri }} style={styles.image} />
    ) : (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>
          {contact.name[0].toUpperCase()}
        </Text>
      </View>
    )}
    <Text style={styles.contactName}>{contact.name}</Text>
  </View>
);

const styles = StyleSheet.create({
  selectedContact: {
    alignItems: "center",
    marginRight: horizontalScale(10),
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
    backgroundColor: "#EBEBEB",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholderText: {
    color: "#5B5B5B",
    fontSize: moderateScale(24),
  },
  contactName: {
    fontSize: moderateScale(16),
    textAlign: "center",
    marginTop: verticalScale(5),
  },
});

export default SelectedContactItem;
