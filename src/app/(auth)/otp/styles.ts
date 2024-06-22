import { StyleSheet } from "react-native";
import { moderateScale, verticalScale, horizontalScale } from "@/src/helpers";
import { theme } from "@/src/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: horizontalScale(20),
    backgroundColor: theme.colors.white,
  },
  containerTitle: {
    marginTop: verticalScale(50),
    alignItems: "center",
    paddingHorizontal: horizontalScale(20),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: "bold",
    color: theme.colors.black,
  },
  subtitle: {
    fontSize: moderateScale(16),
    color: theme.colors.grey,
    textAlign: "center",
    marginVertical: verticalScale(20),
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: verticalScale(30),
  },
  otpInput: {
    fontSize: moderateScale(24),
    width: horizontalScale(40),
    backgroundColor: "white",
    color: theme.colors.black,
  },
  buttonContainer: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  button: {
    flex: 1,
    width: "100%",
  },
  buttonLabel: {
    fontSize: 16,
  },

  underlineStyle: {
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(10),
    borderColor: "grey",
  },

  cointainerButton: {
    flex: 1,
    width: "100%",
  },
  errorText: {
    color: theme.colors.error,
    textAlign: "center",
    fontSize: moderateScale(16),
    bottom: verticalScale(10),
  },
});
