import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/src/hooks/useThemeColor";
import { moderateScale } from "../helpers";

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
    fontFamily: "RobotoRegular",
  },
  defaultSemiBold: {
    fontSize: moderateScale(16),
    lineHeight: 24,
    fontWeight: "600",
    fontFamily: "RobotoMedium",
  },
  title: {
    fontSize: moderateScale(25),
    fontWeight: "bold",
    lineHeight: 32,
    fontFamily: "RobotoBold",
  },
  subtitle: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    fontFamily: "RobotoBold",
  },
  link: {
    lineHeight: 30,
    fontSize: moderateScale(16),
    color: "#0a7ea4",
    fontFamily: "RobotoRegular",
  },
});
