import React from "react";
import { Chip } from "react-native-paper";
import { StyleSheet } from "react-native";
import { moderateScale, horizontalScale, verticalScale } from "@/src/helpers";

interface ChipComponentProps {
  name: string;
  isSelected: boolean;
  onPress: () => void;
}

const ChipComponent: React.FC<ChipComponentProps> = ({
  name,
  isSelected,
  onPress,
}) => (
  <Chip
    style={[styles.chip, isSelected && styles.selectedChip]}
    onPress={onPress}
    textStyle={{
      color: isSelected ? "#fff" : "rgba(91, 91, 91, 1)",
      fontSize: moderateScale(10),
      bottom: 2,
    }}
    theme={{ roundness: 6 }}
  >
    {name}
  </Chip>
);

const styles = StyleSheet.create({
  chip: {
    marginRight: horizontalScale(10),
    backgroundColor: "white",
    height: verticalScale(30),
    borderWidth: 1,
    borderColor: "#8767F2",
  },
  selectedChip: {
    backgroundColor: "rgba(135, 103, 242, 0.49)",
  },
});

export default ChipComponent;
