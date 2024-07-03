import { create } from "zustand";

const useFormStore = create((set) => ({
  // Aquí tus estados iniciales
  planType: "",
  title: "",
  date: "",
  time: "",
  location: "",
  guests: [],
  description: "",
  // Acción para restablecer el estado
  resetForm: () =>
    set({
      planType: "",
      title: "",
      date: "",
      time: "",
      location: "",
      guests: [],
      description: "",
    }),
}));

export default useFormStore;
