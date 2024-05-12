import { StyleSheet } from "react-native";

import { theme } from "@theme";
import { verticalScale, moderateScale, horizontalScale } from "@helpers";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.light_blue,
    height: verticalScale(50),
    borderRadius: 10,
    justifyContent: "center",
    flex:1,
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
});
