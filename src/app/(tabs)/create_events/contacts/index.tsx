import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert, // Importa Alert
} from "react-native";
import * as Contacts from "expo-contacts";
import useContactsStore from "@/src/store/contactStore"; // Ajusta la ruta según tu estructura de archivos
import { useRouter, useLocalSearchParams } from "expo-router";

const ContactsScreen: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [filteredContacts, setFilteredContacts] = useState<Contacts.Contact[]>(
    []
  );
  const contacts = useContactsStore((state) => state.contacts);
  const selectedContacts = useContactsStore((state) => state.selectedContacts); // Obtén selectedContacts del store
  const setContacts = useContactsStore((state) => state.setContacts);
  const addContact = useContactsStore((state) => state.addContact);
  const updateContactAtIndex = useContactsStore(
    (state) => state.updateContactAtIndex
  );

  const router = useRouter();
  const { index } = useLocalSearchParams();
  const contactIndex =
    index !== undefined && index !== null ? Number(index) : null;

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
    } else {
      setFilteredContacts(contacts);
    }
  }, [search, contacts]);

  const handleSelectContact = (contact: Contacts.Contact) => {
    if (selectedContacts.some((c) => c.id === contact.id)) {
      Alert.alert("Error", "Este contacto ya ha sido seleccionado.");
      return;
    }

    if (contactIndex !== null) {
      updateContactAtIndex(contactIndex, contact);
    } else {
      addContact(contact);
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => handleSelectContact(item)}
          >
            <Text style={styles.contactName}>{item.name}</Text>
            {item.phoneNumbers && item.phoneNumbers.length > 0 && (
              <Text style={styles.contactNumber}>
                {item.phoneNumbers[0].number}
              </Text>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchBar: {
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
  },
  contactItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  contactName: {
    fontSize: 16,
  },
  contactNumber: {
    color: "#555",
  },
});

export default ContactsScreen;
