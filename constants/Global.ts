import { Dimensions } from "react-native";
import { moderateScale } from "@helpers";
import {Images} from './Images'

export const WINDOW_WIDTH = Dimensions.get("screen").width;
export const WINDOW_HEIGHT = Dimensions.get("screen").height;

export const FontSize10 = moderateScale(10);
export const FontSize12 = moderateScale(12);
export const FontSize13 = moderateScale(13);
export const FontSize14 = moderateScale(14);
export const FontSize16 = moderateScale(16);
export const FontSize18 = moderateScale(18);
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
      title: "Chequea los datos de tu plan",
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


