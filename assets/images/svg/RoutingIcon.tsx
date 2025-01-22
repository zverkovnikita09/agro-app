import { COLORS } from "@shared/lib/styles";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const RoutingIcon = ({
  color = COLORS.blackGrey,
  ...props
}: SvgProps) => (
  <Svg fill="none" {...props} viewBox="0 0 18 18">
    <Path
      stroke={color}
      strokeWidth={1.5}
      d="M4.10254 6.75C5.55229 6.75 6.72754 5.57475 6.72754 4.125C6.72754 2.67525 5.55229 1.5 4.10254 1.5C2.65279 1.5 1.47754 2.67525 1.47754 4.125C1.47754 5.57475 2.65279 6.75 4.10254 6.75Z"
    />
    <Path
      stroke={color}
      strokeWidth={1.5}
      d="M12.7275 11.25H14.9775C15.8025 11.25 16.4775 11.925 16.4775 12.75V15C16.4775 15.825 15.8025 16.5 14.9775 16.5H12.7275C11.9025 16.5 11.2275 15.825 11.2275 15V12.75C11.2275 11.925 11.9025 11.25 12.7275 11.25Z"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9.00026 3.75H11.0103C12.3978 3.75 13.0428 5.4675 12.0003 6.3825L6.00776 11.625C4.96526 12.5325 5.61026 14.25 6.99026 14.25H9.00026"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4.11381 4.125H4.12247"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M13.8638 13.875H13.8725"
    />
  </Svg>
);
