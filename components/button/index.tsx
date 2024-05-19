import { PropsWithChildren } from "react";
import { Button as RNPButton } from "react-native-paper";

import { globalStyles } from "@theme";

import { styles } from "./styles";

import { TextStyle } from "react-native";

interface Props {
  title?: string | undefined | null;
  onPress?: () => void;
  mode?: "contained" | "outlined";
  disabled?: boolean;
  customStyle?: React.CSSProperties;
  loading?: boolean;
  labelStyle?: TextStyle;
}

export const Button = ({
  title,
  onPress,
  mode,
  disabled,
  loading,
  labelStyle,
  ...rest
}: PropsWithChildren<Props>) => {
  return (
    <>
      {mode === "contained" && (
        <RNPButton
          style={[styles.container, disabled && styles.disabled]}
          labelStyle={[globalStyles.text_fs16_white, styles.labelStyle, labelStyle]}
          uppercase={false}
          onPress={onPress}
          disabled={disabled}
          loading={loading}
          {...rest}
        >
          {loading ? loading : title}
        </RNPButton>
      )}
      {mode === "outlined" && (
        <RNPButton
          style={[disabled && styles.disabled]}
          labelStyle={[globalStyles.text_fs16_black, labelStyle]}
          uppercase={false}
          onPress={onPress}
          disabled={disabled}
          {...rest}
        >
          {title}
        </RNPButton>
      )}
    </>
  );
};
