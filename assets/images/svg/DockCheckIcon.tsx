import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const DockCheckIcon = (props: SvgProps) => (
  <Svg fill="none" {...props} viewBox="0 0 24 24">
    <Path
      stroke="#11A929"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.3519 9.84852L10.8004 14.4L9.24892 12.8485M12.0004 2.39999C6.69846 2.39999 2.40039 6.69806 2.40039 12C2.40039 17.3019 6.69846 21.6 12.0004 21.6C17.3023 21.6 21.6004 17.3019 21.6004 12C21.6004 6.69806 17.3023 2.39999 12.0004 2.39999Z"
    />
  </Svg>
);
