import { StyleSheet } from "react-native";
import { moderateScale, verticalScale, horizontalScale } from "@/src/helpers";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  button: {
    backgroundColor: "black",
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    justifyContent: "center",
    alignItems: "center",
    height: verticalScale(50),
    paddingHorizontal: horizontalScale(40),
    alignSelf: "center",
    position: "absolute",
    bottom: verticalScale(20),
  },
  label: {
    color: "white",
  },
  close: {
    position: "absolute",
    height: verticalScale(50),
    width: horizontalScale(50),
    backgroundColor: "#BDBDBD",
    top: verticalScale(10),
    right: horizontalScale(10),
    borderRadius: moderateScale(50),
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    position: "absolute",
    top: verticalScale(70),
    width: "100%",
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: "#FFF",
    height: verticalScale(40),
    borderRadius: moderateScale(5),
    paddingHorizontal: horizontalScale(10),
  },
});
