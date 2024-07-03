import { create } from "zustand";

interface Location {
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
}

interface LocationStoreState {
  selectedLocation: Location | null;
  searchResults: any[]; // Puedes ajustar esto a un tipo más específico si sabes la estructura de los resultados de búsqueda
  address: string;
  setSelectedLocation: (location: Location | null) => void;
  setSearchResults: (results: any[]) => void; // Ajusta `any` a un tipo más específico si sabes la estructura
  setAddress: (address: string) => void;
  resetLocation: () => void;
}

export const useLocationStore = create<LocationStoreState>((set) => ({
  selectedLocation: null,
  searchResults: [],
  address: "",
  setSelectedLocation: (location: Location | null) =>
    set({ selectedLocation: location }),
  setSearchResults: (results: any[]) => set({ searchResults: results }),
  setAddress: (address: string) => set({ address }),
  resetLocation: () => set({ selectedLocation: null, address: "" }),
}));
