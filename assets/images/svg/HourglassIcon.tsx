import { COLORS } from "@shared/lib/styles";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const HourglassIcon = ({
  color = COLORS.blackGrey,
  ...props
}: SvgProps) => (
  <Svg fill="none" {...props} viewBox="0 0 16 16">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5.478 10.68h3.04m1.6 1.92h-6.24a.64.64 0 0 1-.64-.64v-1.71a.64.64 0 0 1 .125-.38l1.836-2.49a.64.64 0 0 0 0-.76L3.363 4.13a.64.64 0 0 1-.125-.38V2.04a.64.64 0 0 1 .64-.64h6.08a.64.64 0 0 1 .64.64v1.722a.64.64 0 0 1-.112.361L8.775 6.625a.64.64 0 0 0 .013.74l1.845 2.506a.64.64 0 0 1 .125.38v1.709a.64.64 0 0 1-.64.64Z"
    />
  </Svg>
);
