import { Color, COLORS } from "@shared/lib/styles";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const LeafIcon = ({ color, ...props }: SvgProps & { color: Color }) => (
  <Svg fill="none" {...props}>
    <Path
      fill={color}
      d="m1.52 0 1.196 2.94A5.188 5.188 0 0 1 1.58 8.57L.384 5.63A5.191 5.191 0 0 1 1.52 0Z"
    />
  </Svg>
);
