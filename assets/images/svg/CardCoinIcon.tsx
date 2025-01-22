import { COLORS } from "@shared/lib/styles";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const CardCoinIcon = ({
  color = COLORS.blackGrey,
  ...props
}: SvgProps) => (
  <Svg fill="none" {...props} viewBox="0 0 18 18">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      stroke-miterlimit={10}
      d="M1.5 12.7949H9"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.16498 10.125H7.33502C8.67002 10.125 9 10.455 9 11.775V14.8575C9 16.1775 8.67002 16.5075 7.33502 16.5075H3.16498C1.82998 16.5075 1.5 16.1775 1.5 14.8575V11.775C1.5 10.455 1.82998 10.125 3.16498 10.125Z"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16.5 11.25C16.5 14.1525 14.1525 16.5 11.25 16.5L12.0375 15.1875"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M1.5 6.75C1.5 3.8475 3.8475 1.5 6.75 1.5L5.96251 2.8125"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      stroke-miterlimit={10}
      d="M13.875 8.25C15.739 8.25 17.25 6.73896 17.25 4.875C17.25 3.01104 15.739 1.5 13.875 1.5C12.011 1.5 10.5 3.01104 10.5 4.875C10.5 6.73896 12.011 8.25 13.875 8.25Z"
    />
  </Svg>
);
