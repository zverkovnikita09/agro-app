import { COLORS } from "@shared/lib/styles";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const SearchIcon = ({
  color = COLORS.blackText,
  ...props
}: SvgProps) => (
  <Svg fill="none" {...props} viewBox="0 0 24 24">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16.9265 17.0396L20.3996 20.3996M11.3996 7.19961C13.3878 7.19961 14.9996 8.81138 14.9996 10.7996M19.2796 11.4396C19.2796 15.7695 15.7695 19.2796 11.4396 19.2796C7.1097 19.2796 3.59961 15.7695 3.59961 11.4396C3.59961 7.1097 7.1097 3.59961 11.4396 3.59961C15.7695 3.59961 19.2796 7.1097 19.2796 11.4396Z"
    />
  </Svg>
);
