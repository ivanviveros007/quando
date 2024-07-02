import { Colors } from "@/src/constants";
import { theme } from "../theme";
import { MD3LightTheme as DefaultTheme } from "react-native-paper";

export const themeTemplate = {
  ...DefaultTheme,
  colors: {
    primary: Colors.primary_pruple,
    placeholder: theme.colors.placeholder,
    background: theme.colors.white,
    outline: Colors.primary_pruple,
    text: Colors.primary_black, // Color del texto principal
  },
  roundness: 10,

  fonts: {
    regular: {
      fontFamily: theme.fonts.regular.fontFamily,
      fontWeight: theme.fonts.regular.fontWeight,
    },
  },
};
