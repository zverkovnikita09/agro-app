import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const ArrowLeftIcon = (props: SvgProps) => (
  <Svg fill="none" {...props} viewBox="0 0 10 18">
    <Path
      stroke="#1F1F1F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 17L1 9L9 0.999999"
    />
  </Svg>
);
