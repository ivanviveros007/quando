import { StyleSheet } from "react-native";
import { moderateScale, verticalScale, horizontalScale } from "@/src/helpers";

export const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginBottom: 30,
  },
  dropAndTitle: {
    flexDirection: "column",
    gap: 20,
  },
  positionArrow: {
    position: "absolute",
    right: 10,
    top: 20,
  },
  container: {
    paddingTop: 16,
    paddingBottom: 106,
    paddingHorizontal: 20,
  },
  containerDateTime: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 10,
  },
  date: {
    width: "50%",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "black",
    borderRadius: 5,
    paddingHorizontal: 5,
    backgroundColor: "white",
  },
  errorsDate: {
    flexDirection: "row",
    gap: 50,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    marginBottom: 16,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    justifyContent: "center",
  },
  datePicker: {
    width: "100%",
  },
  error: {
    color: "red",
    marginBottom: 16,
  },
  imageCount: {
    fontSize: 14,
    marginBottom: 16,
    color: "grey",
  },
  descriptionInput: {
    height: 100,
  },
  selectedContacts: {
    marginTop: 10,
  },
});
