import { StyleSheet } from "react-native";

import { theme } from "@/src/theme";
import { verticalScale, moderateScale } from "@/src/helpers";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.light_blue,
    height: verticalScale(50),
    borderRadius: 10,
    justifyContent: "center",
    flex: 1,
  },
  labelStyle: {
    letterSpacing: 0,
    fontSize: moderateScale(16),
  },
  disabled: {
    opacity: 0.3,
  },
  outlined: {
    fontSize: moderateScale(12),
  },

  variant: {
    backgroundColor: theme.colors.black,
    height: verticalScale(50),
    borderRadius: 10,
    justifyContent: "center",
    flex: 1,
  },
});
