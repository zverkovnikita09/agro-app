import { COLORS } from "@shared/lib/styles";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const ArrowIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke={COLORS.blackText}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.8333 18L5 12M5 12L10.8333 6M5 12H19"
    />
  </Svg>
);
