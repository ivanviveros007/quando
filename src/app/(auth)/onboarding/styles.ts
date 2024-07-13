import { StyleSheet } from "react-native";
import { verticalScale, horizontalScale, moderateScale } from "@/src/helpers";
import { theme } from "@/src/theme";
import { WINDOW_WIDTH } from "@/src/constants";

export const styles = StyleSheet.create({
  containerRender: {
    width: WINDOW_WIDTH,
    flex: 1,
  },
  image: {
    width: "100%",
    height: verticalScale(500),
  },

  containerTitle: {
    alignSelf: "center",
  },
  title: {
    fontSize: moderateScale(30),
    fontWeight: "bold",

    textAlign: "center",
  },
  containerDescription: {
    alignSelf: "center",
    marginTop: verticalScale(10),
  },
  description: {
    textAlign: "center",
    fontSize: moderateScale(18),
    lineHeight: verticalScale(25),
  },
  container: {
    flex: 1,
  },
  pagination: {
    flexDirection: "row",
    gap: moderateScale(10),
    alignSelf: "center",
    marginTop: verticalScale(30),
  },
  dot: {
    height: verticalScale(10),
    width: horizontalScale(10),
    borderRadius: moderateScale(5),
    backgroundColor: theme.colors.grey,
  },
  activeDot: {
    backgroundColor: theme.colors.light_blue,
  },

  containerButtons: {
    position: "absolute",
    bottom: verticalScale(30),
    gap: moderateScale(30),
    alignItems: "center",
    width: "100%",
    paddingHorizontal: horizontalScale(20),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lastStepButtons: {
    position: "absolute",
    bottom: verticalScale(30),
    gap: moderateScale(30),
    width: "100%",
    paddingHorizontal: horizontalScale(20),
  },
  containerOne: {
    flex: 3,
  },
  containerTwo: {
    flex: 1,
  },
  containerFooterButtons: {
    flexDirection: "column",
    flex: 1,
    gap: 5,
  },
});
