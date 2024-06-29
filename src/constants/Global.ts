import { Dimensions } from "react-native";
import { moderateScale } from "@/src/helpers";
import { Images } from "./Images";

export const WINDOW_WIDTH = Dimensions.get("screen").width;
export const WINDOW_HEIGHT = Dimensions.get("screen").height;

export const FontSize10 = moderateScale(10);
export const FontSize12 = moderateScale(12);
export const FontSize13 = moderateScale(13);
export const FontSize14 = moderateScale(14);
export const FontSize16 = moderateScale(16);
export const FontSize18 = moderateScale(18);
export const FontSize20 = moderateScale(20);
export const FontSize24 = moderateScale(24);
export const FontSize32 = moderateScale(32);

export const DATA_CAROUSEL_ONBOARDING = [
  {
    id: 1,
    title: "Crea un evento",
    description: "e invita de forma rápida \na tus contactos",
    image: Images.Onboarding.Onboarding1,
  },
  {
    id: 2,
    title: "Chequea los \ndatos de tu plan",
    description: "Quién, cuándo, dónde",
    image: Images.Onboarding.Onboarding2,
  },
  {
    id: 3,
    title: "Sincroniza tu agenda",
    description: "Para que no se te pase \nningún plan",
    image: Images.Onboarding.Onboarding3,
  },
  {
    id: 4,
    title: "¿Empezamos?",
    description: "y personaliza tu experiencia en la app",
    image: Images.Onboarding.Onboarding4,
  },
];

export const planTypes = [
  { label: "Comida", value: "food" },
  { label: "Cena", value: "dinner" },
  { label: "Fiesta", value: "fest" },
  { label: "Viaje", value: "travel" },
  { label: "Deporte", value: "sports" },
  { label: "Dia de juego", value: "game" },
  { label: "Cumpleaños", value: "birthday" },
  { label: "Plan cultural", value: "culture" },
  { label: "Cita", value: "date" },
  { label: "Otro", value: "other" },
];
