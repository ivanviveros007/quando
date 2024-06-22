import { StyleSheet } from "react-native";

import {
  FontSize12,
  FontSize16,
  FontSize20,
  FontSize18,
} from "@/src/constants";

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
    text_fs20_black: {
      fontSize: FontSize20,
      color: theme.colors.black,
      ...theme.fonts.medium,
    },
    text_fs18_black: {
      fontSize: FontSize18,
      color: theme.colors.black,
      ...theme.fonts.medium,
    },
    text_fs20_black_bold: {
      fontSize: FontSize20,
      color: theme.colors.black,
      ...theme.fonts.bold,
    },
    text_fs18_black_bold: {
      fontSize: FontSize18,
      color: theme.colors.black,
      ...theme.fonts.bold,
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
    flex: {
      flex: 1,
    },
  });
