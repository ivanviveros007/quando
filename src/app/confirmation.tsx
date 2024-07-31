import { useGlobalSearchParams, router } from "expo-router";
import { View, TouchableOpacity, StyleSheet, Image, Text } from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { Background } from "@/src/components/container";

import useContactsStore from "@/src/store/contactStore";
import { Colors } from "@/src/constants";
import { useLocationStore } from "../store/locationStore";

const Confirmation = () => {
  const selectedContacts = useContactsStore((state) => state.selectedContacts);

  const { planName, editPlan } = useGlobalSearchParams();

  const resetLocation = useLocationStore((state) => state.resetLocation);
  const resetContacts = useContactsStore((state) => state.resetContacts);

  const goHome = async () => {
    try {
      await resetLocation();
      await resetContacts();
      router.replace("(tabs)/home");
    } catch (error) {
      console.error("Error al restablecer los contactos y la ubicación", error);
    }
  };

  return (
    <Background>
      <View
        style={{
          position: "absolute",
          zIndex: 1000,
          top: 90,
          alignSelf: "center",
        }}
      >
        <ThemedText
          style={{
            textAlign: "center",
            color: "black",
            fontFamily: "RobotoRegular",
            fontSize: 40,
          }}
          type="title"
        >
          Quando
        </ThemedText>
      </View>
      <View
        style={{
          width: "100%",
          height: 500,
          backgroundColor: "white",
          opacity: 0.8,
          borderRadius: 200,
          position: "absolute",
          top: -200,
        }}
      />
      <View style={{ flex: 1, justifyContent: "center", marginTop: 250 }}>
        <ThemedText
          style={{ textAlign: "center", color: "white" }}
          type="title"
        >
          ¡Hecho!
        </ThemedText>

        <View style={{ paddingHorizontal: 30, marginTop: 40 }}>
          <ThemedText
            style={{ textAlign: "center", color: "white", fontSize: 16 }}
          >
            Tu plan {planName} fue creado con éxito
          </ThemedText>
        </View>

        <View style={{ paddingHorizontal: 30, marginTop: 40 }}>
          <ThemedText
            style={{ textAlign: "center", color: "white", fontSize: 16 }}
          >
            Te avisaremos cuando tus invitados respondan.
          </ThemedText>
        </View>

        <View style={styles.contactsContainer}>
          {selectedContacts.slice(0, 4).map((contact, index) => (
            <View key={`${contact.id}-${index}`} style={styles.contactWrapper}>
              {contact.imageAvailable ? (
                <Image
                  source={{ uri: contact.image.uri }}
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
            <View key="extra-contacts" style={styles.contactWrapper}>
              <View style={styles.contactPlaceholder}>
                <Text style={styles.contactInitial}>
                  +{selectedContacts.length - 4}
                </Text>
              </View>
            </View>
          )}
        </View>

        <View style={{ justifyContent: "flex-end", top: 10 }}>
          <TouchableOpacity onPress={goHome}>
            <ThemedText
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 16,
                marginTop: 40,
              }}
            >
              Ir al inicio
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  contactsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  contactWrapper: {
    marginHorizontal: -10, // Ajusta este valor según sea necesario para el solapamiento
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
    backgroundColor: "grey",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: Colors.white,
  },
  contactInitial: {
    fontSize: 18,
    color: Colors.white,
  },
});

export default Confirmation;
