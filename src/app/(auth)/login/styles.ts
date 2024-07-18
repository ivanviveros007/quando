import { StyleSheet } from "react-native";
import { theme } from "@/src/theme";
import { verticalScale, horizontalScale, moderateScale } from "@/src/helpers";
import { IS_IOS } from "@/src/constants";

export const styles = StyleSheet.create({
  containerLogo: {
    alignSelf: "center",
    marginTop: verticalScale(60),
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: horizontalScale(20),
    marginBottom: IS_IOS ? verticalScale(200) : verticalScale(0),
  },
  containerTitle: {
    alignSelf: "center",
    marginTop: verticalScale(30),
    marginBottom: verticalScale(80),
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
    marginBottom: 70,
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
