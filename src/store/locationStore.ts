import { create } from "zustand";

export const useLocationStore = create((set) => ({
  selectedLocation: null,
  setSelectedLocation: (location) => set({ selectedLocation: location }),
}));
