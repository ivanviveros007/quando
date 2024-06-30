import { StyleSheet } from "react-native";
import { moderateScale, verticalScale } from "@/src/helpers";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(20),
  },
  searchBar: {
    padding: moderateScale(10),
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(20),
  },
  contactItem: {
    padding: moderateScale(10),
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  contactName: {
    fontSize: moderateScale(16),
  },
  contactNumber: {
    color: "#555",
  },
});
