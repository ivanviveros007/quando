import { create } from "zustand";

export const useLocationStore = create((set) => ({
  selectedLocation: null,
  searchResults: [],
  address: "",
  setSelectedLocation: (location) => set({ selectedLocation: location }),
  setSearchResults: (results) => set({ searchResults: results }),
  setAddress: (address) => set({ address }),
}));
