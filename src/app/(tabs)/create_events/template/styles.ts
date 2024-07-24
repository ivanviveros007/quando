import { StyleSheet } from "react-native";
import { moderateScale, verticalScale, horizontalScale } from "@/src/helpers";
import { Colors } from "@/src/constants";

export const styles = StyleSheet.create({
  backgroundSafeArea: {
    backgroundColor: "#FDF9FC",
  },
  title: {
    textAlign: "center",
    marginBottom: verticalScale(30),
    fontFamily:'RobotoBold'
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
    backgroundColor: "#FDF9FC",
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
    borderColor: Colors.primary_pruple,
    borderRadius: moderateScale(10),
    paddingHorizontal: horizontalScale(5),
    backgroundColor: "white",
  },
  dateText:{
    fontFamily:'RobotoRegular'
  },
  errorsDate: {
    flexDirection: "row",
    gap: moderateScale(55),
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
    marginBottom: verticalScale(5),
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
  outlineStyle: {
    borderWidth: 1,
    borderColor: Colors.primary_pruple,
  },
});
