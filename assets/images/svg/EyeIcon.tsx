import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const EyeIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke="#CCCCCC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.6854 9.00043C11.6854 10.4854 10.4854 11.6854 9.00043 11.6854C7.51543 11.6854 6.31543 10.4854 6.31543 9.00043C6.31543 7.51543 7.51543 6.31543 9.00043 6.31543C10.4854 6.31543 11.6854 7.51543 11.6854 9.00043Z"
    />
    <Path
      stroke="#CCCCCC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.99988 15.2025C11.6474 15.2025 14.1149 13.6425 15.8324 10.9425C16.5074 9.88504 16.5074 8.10754 15.8324 7.05004C14.1149 4.35004 11.6474 2.79004 8.99988 2.79004C6.35238 2.79004 3.88488 4.35004 2.16738 7.05004C1.49238 8.10754 1.49238 9.88504 2.16738 10.9425C3.88488 13.6425 6.35238 15.2025 8.99988 15.2025Z"
    />
  </Svg>
);
