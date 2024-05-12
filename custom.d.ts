declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

declare module "*.png" {
  const content: any;
  export default content;
}
declare module "theme" {
  import { Theme } from "react-native-paper/lib/typescript/types";

  const theme: Theme;
  export { theme };
}
