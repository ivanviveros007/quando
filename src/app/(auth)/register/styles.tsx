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
    height: verticalScale(50),
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
    fontSize: moderateScale(12),
  },
  row: {
    flexDirection: "row",
    marginBottom: verticalScale(20),
    alignItems: "center",
    justifyContent: "space-between",
    gap: horizontalScale(20),
  },
  areaButton: {
    minWidth: horizontalScale(90),
    borderColor: "black",
    height: verticalScale(49),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: moderateScale(10),
  },
  outlineStyle: {
    borderWidth: 1,
  },
  containerError: {
    position: "absolute",
    top: 60,
  },
  menuItem:{
    backgroundColor: theme.colors.white,
  
  }
});
