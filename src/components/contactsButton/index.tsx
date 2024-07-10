import { FC, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import useContactsStore from "@/src/store/contactStore";
import { ThemedText } from "../ThemedText";

import { Colors } from "@/src/constants";

interface InviteContactsProps {
  setFieldValue: (field: string, value: any) => void;
}

const InviteContacts: FC<InviteContactsProps> = ({ setFieldValue }) => {
  const router = useRouter();
  const selectedContacts = useContactsStore((state) => state.selectedContacts);

  const handleAddContact = () => {
    router.push("(tabs)/create_events/contacts");
  };

  useEffect(() => {
    setFieldValue("guests", selectedContacts);
  }, [selectedContacts, setFieldValue]);

  return (
    <View style={styles.container}>
      <View style={{ top: 5 }}>
        <ThemedText style={styles.label}>Invitados{"  "}</ThemedText>
      </View>

      <View style={styles.contactsContainer}>
        {selectedContacts.slice(0, 4).map((contact, index) => (
          <View key={index} style={styles.contact}>
            {contact.imageAvailable ? (
              <Image
                source={{ uri: contact.image?.uri }}
                style={styles.contactImage}
              />
            ) : (
              <View style={styles.contactPlaceholder}>
                <Text style={styles.contactInitial}>
                  {contact.name.charAt(0)}
                </Text>
              </View>
            )}
          </View>
        ))}
        {selectedContacts.length > 4 && (
          <View style={styles.moreContacts}>
            <ThemedText style={styles.moreContactsText}>
              +{selectedContacts.length - 4}
            </ThemedText>
          </View>
        )}
        <TouchableOpacity onPress={handleAddContact} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingHorizontal: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  contactsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  contact: {
    alignItems: "center",
    marginRight: -10, // Solapado de avatares
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
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  contactInitial: {
    fontSize: 24,
    color: "#fff",
  },
  moreContacts: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -10, // Solapado de avatares
  },
  moreContactsText: {
    fontSize: 16,
    color: Colors.primary_black,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#825FF1",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -10, // Solapado de avatares
  },
  addButtonText: {
    fontSize: 50,
    color: "#8e44ad",
    position: "absolute",
    fontWeight: "200",
    textAlign: "center",
    zIndex: 1,
    top: -8,
  },
});

export default InviteContacts;
