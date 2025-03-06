import { COLORS } from "@shared/lib/styles";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const PlusIcon = (props: SvgProps) => (
  <Svg fill="none" {...props} viewBox="0 0 14 14">
    <Path
      stroke={COLORS.blackText}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 1.5L7 12.5M12.5 7L1.5 7"
    />
  </Svg>
);
