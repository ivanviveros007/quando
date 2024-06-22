import { StyleSheet } from "react-native";
import { theme } from "@/src/theme";
import { moderateScale, verticalScale, horizontalScale } from "@/src/helpers";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.white,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
    backgroundColor: theme.colors.light_blue,
    height: verticalScale(50),
    borderRadius: 10,
    justifyContent: "center",
  },
  labelStyle: {
    letterSpacing: 0,
    fontSize: moderateScale(16),
  },
  errorText: {
    color: "red",
  },
});
