import { StyleSheet } from "react-native";

import { FontSize12, FontSize16 } from "@constants";

export const createGlobalStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    text_fs12: {
      fontSize: FontSize12,
      color: theme.colors.white,
      ...theme.fonts.regular,
    },
    text_fs16_white: {
      fontSize: FontSize16,
      color: theme.colors.white,
      ...theme.fonts.medium,
    },
    text_fs16_black: {
      fontSize: FontSize16,
      color: theme.colors.black,
      ...theme.fonts.medium,
    },

    containerTitle: {
      alignSelf: "center",
    },
    title: {
      textAlign: "center",
    },

    row: {
      flexDirection: "row",
      alignItems: "center",
    },

    jcontent: {
      justifyContent: "space-between",
    },
    flex:{
      flex: 1,
    
    }
  });
