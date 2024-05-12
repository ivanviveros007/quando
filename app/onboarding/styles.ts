import { StyleSheet } from "react-native";
import { verticalScale, horizontalScale, moderateScale } from "@helpers";
import { theme } from "@theme";
import { WINDOW_WIDTH } from "@constants";

export const styles = StyleSheet.create({
  containerRender: {
    width: WINDOW_WIDTH,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: verticalScale(500),
  },
  containerDescription: {
    marginTop: verticalScale(30),
    alignSelf: "center",
    paddingHorizontal: horizontalScale(50),
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    marginTop: verticalScale(10),
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    fontSize: moderateScale(18),
    top: verticalScale(5),
    lineHeight: verticalScale(25),
  },
  container: {
    flex: 1,
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    gap: moderateScale(10),
    alignSelf: "center",
    bottom: verticalScale(160),
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
});
