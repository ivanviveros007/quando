import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import * as Contacts from "expo-contacts";
import useContactsStore from "@/src/store/contactStore";
import { useRouter, useGlobalSearchParams } from "expo-router";
import ContactItem from "@/src/components/contactItem";
import SelectedContactItem from "@/src/components/selectedContact";
// import ChipComponent from "@/src/components/chip";
import { Divider } from "react-native-paper";
import * as Sentry from "@sentry/react-native";
import { IS_ANDROID } from "@/src/constants";
import { verticalScale, moderateScale } from "@/src/helpers";
const numColumns = 3;

const EditContacts: React.FC = () => {
  const { initialGuests } = useGlobalSearchParams();
  const [search, setSearch] = useState<string>("");
  const [filteredContacts, setFilteredContacts] = useState<Contacts.Contact[]>(
    []
  );
  const [selectedTempContacts, setSelectedTempContacts] = useState<
    Contacts.Contact[]
  >(typeof initialGuests === "string" ? JSON.parse(initialGuests) : []);

  const [selectedFilter, setSelectedFilter] = useState<string>("");

  const contacts = useContactsStore((state) => state.contacts);
  const setContacts = useContactsStore((state) => state.setContacts);
  const addContacts = useContactsStore((state) => state.addContacts);
  const setSelectedContacts = useContactsStore((state) => state.setSelectedContacts);

  const router = useRouter();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === "granted") {
          const { data } = await Contacts.getContactsAsync({
            fields: [
              Contacts.Fields.Name,
              Contacts.Fields.PhoneNumbers,
              Contacts.Fields.ImageAvailable,
              Contacts.Fields.Image,
            ],
          });
          setContacts(data);
          setFilteredContacts(data);
        }
      } catch (error) {
        console.error("[useEffect - fetchContacts] ", error);
        Sentry.captureException({
          message: "Error al obtener los contactos [fetchContacts]",
          error,
        });
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    try {
      if (search) {
        const filtered = contacts.filter((contact) =>
          contact.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredContacts(filtered);
      } else {
        setFilteredContacts(contacts);
      }
    } catch (error) {
      console.error("[useEffect - filterContacts] ", error);
      Sentry.captureException({
        message: "Error al filtrar los contactos [filterContacts]",
        error,
      });
    }
  }, [search, contacts]);

  const handleAddSelectedContacts = () => {
    setSelectedContacts(selectedTempContacts);
    router.back();
  };

  // const handleSelectContact = (contact: Contacts.Contact) => {
  //   if (selectedTempContacts.some((c) => c.id === contact.id)) {
  //     setSelectedTempContacts(
  //       selectedTempContacts.filter((c) => c.id !== contact.id)
  //     );
  //   } else {
  //     setSelectedTempContacts([...selectedTempContacts, contact]);
  //   }
  // };
  const handleSelectContact = (contact: Contacts.Contact) => {
    if (selectedTempContacts.some((c) => c.id === contact.id)) {
      setSelectedTempContacts(
        selectedTempContacts.filter((c) => c.id !== contact.id)
      );
    } else {
      setSelectedTempContacts([...selectedTempContacts, contact]);
    }
  };


  const filters = [
    // { id: "1", name: "Mejores amigos" },
    { id: "2", name: "Recientes" },
    // { id: "3", name: "Favoritos" },
    // { id: "4", name: "Fútbol" },
  ];

  const handleFilterPress = (filter: string) => {
    try {
      if (selectedFilter === filter) {
        setSelectedFilter("");
      } else {
        setSelectedFilter(filter);
      }
    } catch (error) {
      console.error("[handleFilterPress] ", error);
      Sentry.captureException({
        message: "Error al seleccionar un filtro [handleFilterPress]",
        error,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invita a tus contactos</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar"
        value={search}
        onChangeText={setSearch}
      />
      {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.chipsContainer}
      >
        {filters.map((filter) => (
          <ChipComponent
            key={filter.id}
            name={filter.name}
            isSelected={selectedFilter === filter.name}
            onPress={() => handleFilterPress(filter.name)}
          />
        ))}
      </ScrollView> */}
      {selectedTempContacts.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.selectedContactsContainer}
        >
          {selectedTempContacts.map((contact, index) => (
            <SelectedContactItem
              key={index}
              contact={contact}
              onSelect={handleSelectContact}
            />
          ))}
        </ScrollView>
      )}
      {selectedTempContacts.length > 0 && <Divider style={{ bottom: 10 }} />}
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id ?? ""}
        numColumns={numColumns}
        contentContainerStyle={styles.contactList}
        renderItem={({ item }) => (
          <ContactItem
            item={item}
            onSelect={handleSelectContact}
            isSelected={selectedTempContacts.some((c) => c.id === item.id)}
          />
        )}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleAddSelectedContacts}
      >
        <Text style={styles.buttonText}>Agregar invitados</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(20),
    backgroundColor: "white",
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: "bold",
    marginBottom: verticalScale(20),
    textAlign: "center",
  },
  searchBar: {
    padding: moderateScale(10),
    borderColor: "#ccc",
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(20),
  },
  contactList: {
    paddingBottom: verticalScale(500),
  },
  button: {
    backgroundColor: "black",
    padding: moderateScale(15),
    borderRadius: moderateScale(10),
    alignItems: "center",
    marginTop: verticalScale(20),
    marginBottom: IS_ANDROID ? verticalScale(50) : verticalScale(20),
  },
  buttonText: {
    color: "white",
    fontSize: moderateScale(16),
  },
  selectedContactsContainer: {
    height: verticalScale(240),
  },
  chipsContainer: {
    flexDirection: "row",
    height: verticalScale(80),
    top: -10,
  },
});

export default EditContacts;
