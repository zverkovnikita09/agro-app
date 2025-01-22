import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const SuccessIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke="#11A929"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.598 11.5a9.6 9.6 0 1 1-19.2 0 9.6 9.6 0 0 1 9.6-9.6c1.507 0 2.932.347 4.2.965m3.6 2.635-8.4 8.4-2.4-2.4"
    />
  </Svg>
);
