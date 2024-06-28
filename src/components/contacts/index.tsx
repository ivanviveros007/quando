// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
// import { useRouter } from "expo-router";
// import useContactsStore from "@/src/store/contactStore";

// const InviteContacts: React.FC = () => {
//   const router = useRouter();
//   const selectedContacts = useContactsStore((state) => state.selectedContacts);

//   const handleAddContact = () => {
//     router.push("(tabs)/create_events/contacts");
//   };

//   const slots = new Array(4).fill(null);
//   selectedContacts.forEach((contact, index) => {
//     slots[index] = contact;
//   });

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Invitados</Text>
//       <View style={styles.contactsContainer}>
//         {slots.map((slot, index) =>
//           slot ? (
//             <View key={index} style={styles.contact}>
//               {slot.imageAvailable ? (
//                 <Image
//                   source={{ uri: slot.image?.uri }}
//                   style={styles.contactImage}
//                 />
//               ) : (
//                 <View style={styles.contactPlaceholder}>
//                   <Text style={styles.contactInitial}>
//                     {slot.name.charAt(0)}
//                   </Text>
//                 </View>
//               )}
//             </View>
//           ) : (
//             <TouchableOpacity
//               key={index}
//               onPress={handleAddContact}
//               style={styles.addButton}
//             >
//               <Text style={styles.addButtonText}>+</Text>
//             </TouchableOpacity>
//           )
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginVertical: 10,
//     paddingHorizontal: 30,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   contactsContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   contact: {
//     alignItems: "center",
//     marginRight: 10,
//   },
//   contactImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//   },
//   contactPlaceholder: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "#ccc",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   contactInitial: {
//     fontSize: 24,
//     color: "#fff",
//   },
//   contactName: {
//     marginTop: 5,
//     fontSize: 14,
//   },
//   addButton: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: "white",
//     borderWidth: 2,
//     borderColor: "#8e44ad",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 10,
//   },
//   addButtonText: {
//     fontSize: 24,
//     color: "#8e44ad",
//   },
// });

// export default InviteContacts;
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import useContactsStore from "@/src/store/contactStore";
import * as Contacts from "expo-contacts";

const InviteContacts: React.FC = () => {
  const router = useRouter();
  const selectedContacts = useContactsStore((state) => state.selectedContacts);
  const updateContactAtIndex = useContactsStore(
    (state) => state.updateContactAtIndex
  );

  const handleAddContact = (index: number | null = null) => {
    router.push({
      pathname: "(tabs)/create_events/contacts",
      params: { index },
    });
  };

  const slots = new Array(4).fill(null);
  selectedContacts.forEach((contact, index) => {
    slots[index] = contact;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Invitados</Text>
      <View style={styles.contactsContainer}>
        {slots.map((slot, index) =>
          slot ? (
            <TouchableOpacity
              key={index}
              onPress={() => handleAddContact(index)}
              style={styles.contact}
            >
              {slot.imageAvailable ? (
                <Image
                  source={{ uri: slot.image?.uri }}
                  style={styles.contactImage}
                />
              ) : (
                <View style={styles.contactPlaceholder}>
                  <Text style={styles.contactInitial}>
                    {slot.name.charAt(0)}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              key={index}
              onPress={() => handleAddContact(index)}
              style={styles.addButton}
            >
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          )
        )}
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
    marginRight: 8,
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
  contactName: {
    marginTop: 5,
    fontSize: 14,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#8e44ad",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  addButtonText: {
    fontSize: 24,
    color: "#8e44ad",
  },
});

export default InviteContacts;
