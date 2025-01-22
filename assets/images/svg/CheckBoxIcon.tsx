import { COLORS } from "@shared/lib/styles";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const CheckBoxIcon = (props: SvgProps) => (
  <Svg fill="none" {...props} viewBox="0 0 16 16 ">
    <Path
      stroke={COLORS.blackText}
      strokeWidth={1}
      fill={COLORS.blackText}
      d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
    />
  </Svg>
);
