import { PropsWithChildren, FC } from "react";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const Background: FC<PropsWithChildren<{}>> = ({ children }) => {
  const colors = ["#00B2EE", "#8767F2", "#8767F2", "#682BF1", "#101010"];

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={colors} style={{ flex: 1 }}>
        {children}
      </LinearGradient>
    </View>
  );
};
