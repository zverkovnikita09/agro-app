import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const CloseIcon = (props: SvgProps) => (
  <Svg fill="none" {...props} viewBox="0 0 18 18">
    <Path
      stroke="#CCC"
      strokeLinecap="round"
      strokeWidth={2}
      d="m13 1.5-12 12m12 0L1 1.5"
    />
  </Svg>
);
