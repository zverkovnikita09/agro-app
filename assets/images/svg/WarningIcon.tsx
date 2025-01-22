import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const WarningIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke="#F2B430"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7.398 7.9h7.2m-7.2 4.8h4.2m9-1.2c0 1.38-.29 2.692-.815 3.878l.817 5.721-4.903-1.226a9.556 9.556 0 0 1-4.699 1.227 9.6 9.6 0 0 1-9.6-9.6 9.6 9.6 0 0 1 19.2 0Z"
    />
  </Svg>
);
