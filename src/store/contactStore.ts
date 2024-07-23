import { create } from "zustand";
import * as Contacts from "expo-contacts";


interface ContactsState {
  contacts: Contacts.Contact[];
  selectedContacts: Contacts.Contact[];
  setContacts: (contacts: Contacts.Contact[]) => void;
  addContact: (contact: Contacts.Contact) => void;
  addContacts: (contacts: Contacts.Contact[]) => void; // Nueva acción
  updateContactAtIndex: (index: number, contact: Contacts.Contact) => void;
  resetContacts: () => void;
}

const useContactsStore = create<ContactsState>((set) => ({
  contacts: [],
  selectedContacts: [],
  setContacts: (contacts) => set({ contacts }),
  addContact: (contact) =>
    set((state) => ({
      selectedContacts: [...state.selectedContacts, contact],
    })),
  addContacts: (contacts) =>
    set((state) => ({
      selectedContacts: [...state.selectedContacts, ...contacts],
    })), // Nueva acción
  updateContactAtIndex: (index, contact) =>
    set((state) => {
      const updatedContacts = [...state.selectedContacts];
      updatedContacts[index] = contact;
      return { selectedContacts: updatedContacts };
    }),
  resetContacts: () => set({ selectedContacts: [] }),
}));

export default useContactsStore;
