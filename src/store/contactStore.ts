import { create } from "zustand";
import * as Contacts from "expo-contacts";

interface CustomContact extends Contacts.Contact {
  selectedPhoneNumber?: string;
}

interface ContactsState {
  contacts: CustomContact[];
  selectedContacts: CustomContact[];
  setContacts: (contacts: CustomContact[]) => void;
  addContact: (contact: CustomContact) => void;
  updateContactAtIndex: (index: number, contact: CustomContact) => void;
  removeContact: (contact: CustomContact) => void;
}

const useContactsStore = create<ContactsState>((set) => ({
  contacts: [],
  selectedContacts: [],
  setContacts: (contacts) => set({ contacts }),
  addContact: (contact) =>
    set((state) => {
      if (state.selectedContacts.some((c) => c.id === contact.id)) {
        return state; // Si el contacto ya está en la lista, no lo agregues
      }
      return {
        selectedContacts: [...state.selectedContacts, contact],
      };
    }),
  updateContactAtIndex: (index, contact) =>
    set((state) => {
      const updatedContacts = [...state.selectedContacts];
      updatedContacts[index] = contact;
      return { selectedContacts: updatedContacts };
    }),
  removeContact: (contact) =>
    set((state) => ({
      selectedContacts: state.selectedContacts.filter(
        (c) => c.id !== contact.id
      ),
    })),
}));

export default useContactsStore;
