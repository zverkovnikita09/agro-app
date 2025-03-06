import { COLORS } from "@shared/lib/styles";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const MinusIcon = (props: SvgProps) => (
  <Svg fill="none" {...props} viewBox="0 0 16 2">
    <Path
      stroke={COLORS.blackText}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.6004 0.999999L1.40039 1"
    />
  </Svg>
);
