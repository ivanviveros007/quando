import { FormValues } from "./types";
type FormField = {
  name: keyof FormValues;
  label: string;
  keyboardType: "default" | "numeric" | "email-address" | "phone-pad"; // Especificar los tipos posibles
};

export const formFields: FormField[] = [
  { name: "firstName", label: "Nombre", keyboardType: "default" },
  { name: "lastName", label: "Apellido", keyboardType: "default" },
  { name: "email", label: "Correo Electrónico", keyboardType: "email-address" },
];
