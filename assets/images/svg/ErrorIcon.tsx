import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const ErrorIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke="#E94C4C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.998 11.47V6.634m0 8.424v.043m6.048 4.03H4.951a3.63 3.63 0 0 1-3.486-2.616c-.187-.645.043-1.316.395-1.888L7.908 3.598c1.417-2.303 4.764-2.303 6.18 0l6.049 11.028c.352.572.582 1.243.395 1.888a3.63 3.63 0 0 1-3.486 2.615Z"
    />
  </Svg>
);
