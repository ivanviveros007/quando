import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/src/hooks/useThemeColor";
import { moderateScale } from "../helpers";
import { Colors } from "../constants";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: moderateScale(16),
    lineHeight: 24,
    fontFamily: "ManjariRegular",
    color: Colors.primary_black,
  },
  defaultSemiBold: {
    fontSize: moderateScale(16),
    lineHeight: 24,
    fontWeight: "600",
    fontFamily: "RobotoMedium",
    color: Colors.primary_black,
  },
  title: {
    fontSize: moderateScale(25),
    fontWeight: "bold",
    fontFamily: "ManjariBold",
    color: Colors.primary_black,
  },
  subtitle: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    fontFamily: "RobotoBold",
    color: Colors.primary_black,
  },
  link: {
    lineHeight: 30,
    fontSize: moderateScale(16),
    color: Colors.primary_black,
    fontFamily: "RobotoRegular",
    
  },
});
