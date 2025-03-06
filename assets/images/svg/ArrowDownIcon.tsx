import { COLORS } from "@shared/lib/styles";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const ArrowDownIcon = ({
  color = COLORS.blackGrey,
  ...props
}: SvgProps) => (
  <Svg fill="none" {...props} viewBox="0 0 19 9">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M17.42.95 10.9 7.47c-.77.77-2.03.77-2.8 0L1.58.95"
    />
  </Svg>
);
