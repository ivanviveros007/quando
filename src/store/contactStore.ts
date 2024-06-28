import { create } from "zustand";

interface Contact {
  id: string;
  name: string;
  phoneNumbers?: { number: string }[];
  photo?: string;
  selectedPhoneNumber?: string;
  imageAvailable?: boolean;
  image?: { uri: string };
}

interface ContactsState {
  contacts: Contact[];
  selectedContacts: Contact[];
  setContacts: (contacts: Contact[]) => void;
  addContact: (contact: Contact) => void;
  updateContactAtIndex: (index: number, contact: Contact) => void;
  removeContact: (contact: Contact) => void;
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
