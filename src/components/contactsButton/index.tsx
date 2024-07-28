import { FC, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import useContactsStore from "@/src/store/contactStore";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/src/constants";
import { horizontalScale, moderateScale, verticalScale } from "@/src/helpers";
import * as Sentry from "@sentry/react-native";
import { IS_ANDROID } from "@/src/constants";
import { Contact } from "@/src/store/planStore"; // Asegúrate de importar correctamente

interface InviteContactsProps {
  setFieldValue: (field: string, value: any) => void;
  isEditMode?: boolean;
  initialGuests?: Contact[];
}

const InviteContacts: FC<InviteContactsProps> = ({
  setFieldValue,
  isEditMode = false,
  initialGuests = [],
}) => {
  const router = useRouter();
  const selectedContacts = useContactsStore((state) => state.selectedContacts);
  const clearSelectedContacts = useContactsStore(
    (state) => state.clearSelectedContacts
  );
  const addContacts = useContactsStore((state) => state.addContacts);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current) {
      if (isEditMode) {
        addContacts(initialGuests);
        setFieldValue("guests", initialGuests);
      } else {
        clearSelectedContacts();
      }
      hasInitialized.current = true;
    }
  }, [
    isEditMode,
    initialGuests,
    addContacts,
    clearSelectedContacts,
    setFieldValue,
  ]);

  useEffect(() => {
    if (!isEditMode) {
      setFieldValue("guests", selectedContacts);
    }
  }, [selectedContacts, setFieldValue, isEditMode]);

  const handleAddContact = () => {
    try {
      router.push("(tabs)/create_events/contacts");
    } catch (error) {
      console.error("Error navigating to contacts:", error);
    }
  };

  const contactsToShow = isEditMode ? initialGuests : selectedContacts;

  return (
    <View style={styles.container}>
      <View style={{ top: 5 }}>
        <ThemedText style={styles.label}>Invitados{"  "}</ThemedText>
      </View>
      <View style={styles.contactsContainer}>
        {contactsToShow.slice(0, 4).map((contact, index) => (
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
        {contactsToShow.length > 4 && (
          <View style={styles.moreContacts}>
            <ThemedText style={styles.moreContactsText}>
              +{contactsToShow.length - 4}
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
    width: horizontalScale(50),
    height: verticalScale(50),
    borderRadius: moderateScale(25),
  },
  contactPlaceholder: {
    width: horizontalScale(50),
    height: verticalScale(50),
    borderRadius: moderateScale(25),
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  contactInitial: {
    fontSize: 24,
    color: "#fff",
  },
  moreContacts: {
    width: horizontalScale(50),
    height: verticalScale(50),
    borderRadius: moderateScale(25),
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
    width: horizontalScale(50),
    height: verticalScale(50),
    borderRadius: moderateScale(25),
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
    top: IS_ANDROID ? null : -8,
  },
});

export default InviteContacts;
