import { COLORS } from "@shared/lib/styles";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const CheckBoxIcon = (props: SvgProps) => (
  <Svg fill="none" {...props} viewBox="0 0 11 8">
    <Path
      strokeWidth={1.5}
      stroke={COLORS.blackText}
      d="M1.25 3.99992L4.08 6.82992L9.75 1.16992"
    />
  </Svg>
);
