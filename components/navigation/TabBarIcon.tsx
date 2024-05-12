// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export function TabBarIcon({
  style,
  ...rest
}: IconProps<ComponentProps<typeof FontAwesome>["name"]>) {
  return (
    <FontAwesome size={28} style={[{ marginBottom: -3 }, style]} {...rest} />
  );
}
