import { COLORS } from "@shared/lib/styles";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const InfoCircleIcon = ({
  color = COLORS.blackGrey,
  ...props
}: SvgProps) => (
  <Svg fill="none" {...props} viewBox="0 0 46 46">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M23 42.1668C33.5417 42.1668 42.1667 33.5418 42.1667 23.0002C42.1667 12.4585 33.5417 3.8335 23 3.8335C12.4583 3.8335 3.83333 12.4585 3.83333 23.0002C3.83333 33.5418 12.4583 42.1668 23 42.1668Z"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M23 15.3335V24.9168"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M22.9888 30.6665H23.006"
    />
  </Svg>
);
