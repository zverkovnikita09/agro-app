import { COLORS } from "@shared/lib/styles";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const PaperIcon = (props: SvgProps) => (
  <Svg fill="none" {...props} viewBox="0 0 20 20">
    <Path
      stroke={COLORS.primaryYellow}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18.3327 11.6663V7.49967C18.3327 3.33301 16.666 1.66634 12.4993 1.66634H7.49935C3.33268 1.66634 1.66602 3.33301 1.66602 7.49967V12.4997C1.66602 16.6663 3.33268 18.333 7.49935 18.333H11.666"
    />
    <Path
      stroke={COLORS.primaryYellow}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18.3327 11.6663H14.9993C12.4993 11.6663 11.666 12.4997 11.666 14.9997V18.333L18.3327 11.6663Z"
    />
  </Svg>
);
