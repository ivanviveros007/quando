import { StyleSheet } from "react-native";
import { moderateScale, verticalScale, horizontalScale } from "@/src/helpers";

export const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginBottom: verticalScale(30),
  },
  dropAndTitle: {
    flexDirection: "column",
    gap: moderateScale(20),
  },
  positionArrow: {
    position: "absolute",
    right: horizontalScale(10),
    top: verticalScale(20),
  },
  container: {
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(106),
    paddingHorizontal: horizontalScale(20),
  },
  containerDateTime: {
    flexDirection: "row",
    gap: moderateScale(20),
    marginBottom: verticalScale(10),
  },
  date: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: verticalScale(50),
    alignItems: "center",
    borderWidth: moderateScale(0.5),
    borderColor: "black",
    borderRadius: moderateScale(5),
    paddingHorizontal: horizontalScale(5),
    backgroundColor: "white",
  },
  errorsDate: {
    flexDirection: "row",
    gap: moderateScale(50),
  },
  label: {
    fontSize: moderateScale(16),
    marginBottom: verticalScale(8),
  },
  input: {
    marginBottom: verticalScale(16),
  },
  inputContainer: {
    borderWidth: moderateScale(1),
    borderColor: "#ddd",
    borderRadius: moderateScale(5),
    padding: moderateScale(10),
    justifyContent: "center",
  },
  datePicker: {
    width: "100%",
  },
  error: {
    color: "red",
    marginBottom: verticalScale(16),
  },
  imageCount: {
    fontSize: moderateScale(14),
    marginBottom: verticalScale(16),
    color: "grey",
  },
  descriptionInput: {
    height: verticalScale(100),
  },
  selectedContacts: {
    marginTop: verticalScale(10),
  },
});
