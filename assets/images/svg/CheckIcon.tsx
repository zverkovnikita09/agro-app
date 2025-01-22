import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const CheckIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke="#11A929"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.6 7a5.6 5.6 0 1 1-3.15-5.037m2.1 1.537-4.9 4.9L5.25 7"
    />
  </Svg>
);
