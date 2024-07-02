import { useCallback } from "react";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import { View, TouchableOpacity } from "react-native";
import { ThemedText } from "@/src/components/ThemedText";
import { Background } from "@/src/components/container";
import { useNavigation } from "@react-navigation/native";
import useContactsStore from "@/src/store/contactStore";
import ContactsItem from "@/src/components/contactItem";
import { Images } from "@/src/constants";

const Confirmation = () => {
  const navigation = useNavigation();
  const selectedContacts = useContactsStore((state) => state.selectedContacts);

  const { planName } = useLocalSearchParams();
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      // Hide the tab bar when this screen is focused
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: "none",
        },
      });

      return () => {
        // Show the tab bar again when this screen is unfocused
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            display: "flex",
          },
        });
      };
    }, [navigation, router])
  );

  return (
    <Background>
      <View
        style={{
          position: "absolute",
          zIndex: 1000,
          // backgroundColor: "red",
          top: 90,
          alignSelf: "center",
        }}
      >
        <Images.Plans.LogoBlack width={100} height={60} />
        <ThemedText
          style={{
            textAlign: "center",
            color: "black",
            fontFamily: "RobotoRegular",
            fontSize: 40,
          }}
          type="title"
        ></ThemedText>
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

        <View style={{ alignSelf: "center", flexDirection: "row" }}>
          {selectedContacts.map((contact) => (
            <ContactsItem key={contact.id} item={contact} />
          ))}
        </View>

        <View style={{ justifyContent: "flex-end", top: 10 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
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

export default Confirmation;
