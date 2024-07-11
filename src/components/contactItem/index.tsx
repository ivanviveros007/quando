import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import * as Contacts from "expo-contacts";
import { moderateScale, verticalScale, horizontalScale } from "@/src/helpers";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/src/constants";

const { width } = Dimensions.get("window");
const numColumns = 3;
const itemWidth = width / numColumns - 20;

interface ContactItemProps {
  item: Contacts.Contact;
  onSelect: (contact: Contacts.Contact) => void;
  isSelected: boolean;
}

const ContactItem: React.FC<ContactItemProps> = ({
  item,
  onSelect,
  isSelected,
}) => (
  <View style={{ width: itemWidth, padding: moderateScale(10) }}>
    <TouchableOpacity style={styles.contactItem} onPress={() => onSelect(item)}>
      {item.imageAvailable ? (
        <Image source={{ uri: item.image.uri }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>
            {item.name[0].toUpperCase()}
          </Text>
          {isSelected && (
            <View style={styles.checkmark}>
              <MaterialIcons
                name="check-circle"
                size={24}
                color={'#8767F2'}
              />
            </View>
          )}
        </View>
      )}

      <Text style={styles.contactName}>{item.name}</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  contactItem: {
    alignItems: "center",
    paddingVertical: horizontalScale(10),
  },
  contactName: {
    fontSize: moderateScale(16),
    textAlign: "center",
    marginTop: verticalScale(5),
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
  checkmark: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});

export default ContactItem;
