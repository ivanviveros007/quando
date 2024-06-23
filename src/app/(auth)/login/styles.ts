import { StyleSheet } from "react-native";
import { theme } from "@/src/theme";
import { verticalScale, horizontalScale, moderateScale } from "@/src/helpers";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: moderateScale(20),
  },
  containerTitle: {
    alignSelf: "center",
    marginTop: verticalScale(30),
    flex: 1,
    marginBottom: verticalScale(40),
  },
  title: {
    fontFamily: "RobotoBold",
    fontSize: 30,
    color: theme.colors.white,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    color: theme.colors.white,
    textAlign: "center",
    top: verticalScale(20),
  },
  row: {
    flexDirection: "row",
    marginBottom: verticalScale(20),
    alignItems: "center",
    justifyContent: "space-between",
  },
  areaButton: {
    marginRight: horizontalScale(10),
    minWidth: horizontalScale(90),
    borderColor: "white",
    height: verticalScale(50),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  input: {
    flexGrow: 1,
    fontFamily: "RobotoRegular",
    textAlign: "center",
    height: verticalScale(50),
  },
  button: {
    marginBottom: verticalScale(10),
  },
  link: {
    marginTop: verticalScale(10),
  },
  login: {
    flex: 0.1,
  },
  labelLogin: {
    fontFamily: "RobotoMedium",
    fontSize: moderateScale(18),
    color: theme.colors.white,
  },
  register: {
    top: verticalScale(10),
    flex: 0.1,
  },
  labelRegister: {
    fontFamily: "RobotoMedium",
    fontSize: moderateScale(16),
    color: theme.colors.white,
  },
});
