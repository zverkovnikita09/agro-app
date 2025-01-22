import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const InfoIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke="#F2B430"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M6.998 7V4.2m0 4.875V9.1m5.6-2.1a5.6 5.6 0 1 1-11.2 0 5.6 5.6 0 0 1 11.2 0Z"
    />
  </Svg>
);
