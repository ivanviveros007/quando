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
import { useRouter } from "expo-router";
import ContactItem from "@/src/components/contactItem";
import SelectedContactItem from "@/src/components/selectedContact";
import ChipComponent from "@/src/components/chip";
import { Divider } from "react-native-paper";

const numColumns = 3;

const ContactsScreen: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [filteredContacts, setFilteredContacts] = useState<Contacts.Contact[]>(
    []
  );
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [selectedTempContacts, setSelectedTempContacts] = useState<
    Contacts.Contact[]
  >([]);

  const contacts = useContactsStore((state) => state.contacts);
  const selectedContacts = useContactsStore((state) => state.selectedContacts);
  const setContacts = useContactsStore((state) => state.setContacts);
  const addContacts = useContactsStore((state) => state.addContacts);

  const router = useRouter();

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  useEffect(() => {
    if (search) {
      const filtered = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredContacts(filtered);
    } else if (selectedFilter) {
      const filtered = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(selectedFilter.toLowerCase())
      );
      setFilteredContacts(filtered);
    } else {
      setFilteredContacts(contacts);
    }
  }, [search, selectedFilter, contacts]);

  const handleFilterPress = (filter: string) => {
    if (selectedFilter === filter) {
      setSelectedFilter("");
    } else {
      setSelectedFilter(filter);
    }
  };

  const handleAddSelectedContacts = () => {
    addContacts(selectedTempContacts);
    router.back();
  };

  const filters = [
    // { id: "1", name: "Mejores amigos" },
    { id: "2", name: "Recientes" },
    // { id: "3", name: "Favoritos" },
    // { id: "4", name: "Fútbol" },
  ];

  const handleSelectContact = (contact: Contacts.Contact) => {
    if (selectedTempContacts.some((c) => c.id === contact.id)) {
      setSelectedTempContacts(
        selectedTempContacts.filter((c) => c.id !== contact.id)
      );
    } else {
      setSelectedTempContacts([...selectedTempContacts, contact]);
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
      <ScrollView
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
      </ScrollView>
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
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  searchBar: {
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
  },
  chipsContainer: {
    flexDirection: "row",
    marginBottom: 10,
    height: 60,
  },
  contactList: {
    paddingBottom: 500, // Ajusta este valor para mover la lista más cerca de los chips
  },
  button: {
    backgroundColor: "black",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  selectedContactsContainer: {
    height: 240,
  },
});

export default ContactsScreen;
