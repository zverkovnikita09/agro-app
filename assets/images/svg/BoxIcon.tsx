import { COLORS } from "@shared/lib/styles";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const BoxIcon = ({ color = COLORS.blackGrey, ...props }: SvgProps) => (
  <Svg fill="none" {...props} viewBox="0 0 18 18">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M2.37695 5.58008L8.99944 9.41257L15.5769 5.60255"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.99902 16.2078V9.40527"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7.44698 1.86L3.44198 4.08752C2.53448 4.59002 1.79199 5.85001 1.79199 6.88501V11.1225C1.79199 12.1575 2.53448 13.4175 3.44198 13.92L7.44698 16.1475C8.30198 16.62 9.70447 16.62 10.5595 16.1475L14.5645 13.92C15.472 13.4175 16.2145 12.1575 16.2145 11.1225V6.88501C16.2145 5.85001 15.472 4.59002 14.5645 4.08752L10.5595 1.86C9.69697 1.38 8.30198 1.38 7.44698 1.86Z"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.7503 9.93021V7.18523L5.63281 3.0752"
    />
  </Svg>
);
