import { MD3LightTheme as DefaultTheme } from "react-native-paper";
import { Font } from "react-native-paper/lib/typescript/types";

import { createGlobalStyles } from "./globalStyles";

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    white: "#FFFFFF",
    black: "#000000",
    grey: "grey",
    blue: "#1A73E7",
    orange: "#fd7100",
    transparent: "transparent",
    error: "#BC3C5A",
    backdropColor: "rgba(0, 0, 0, 0.3)",
    light_blue: "#00B2EE",
    purple: "#8767F2",
  },

  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      fontFamily: "RobotoRegular",
      fontWeight: "400" as Font["fontWeight"],
    },
    medium: {
      fontFamily: "RobotoMedium",
      fontWeight: "500" as Font["fontWeight"],
    },
    light: {
      fontFamily: "RobotoLight",
      fontWeight: "300" as Font["fontWeight"],
    },
    bold: {
      fontFamily: "RobotoBold",
      fontWeight: "600" as Font["fontWeight"],
    },
    black: {
      fontFamily: "RobotoBlack",
      fontWeight: "700" as Font["fontWeight"],
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 15,
    lg: 24,
    xl: 40,
    xxl: 64,
  },
  general_spacing: {
    md: 10,
    lg: 20,
  },

  icon: {
    width: 32,
    height: 32,
  },
};

export const globalStyles = createGlobalStyles(theme);
