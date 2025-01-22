import { COLORS } from "@shared/lib/styles";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const Box3DIcon = ({ color = COLORS.blackGrey, ...props }: SvgProps) => (
  <Svg fill="none" {...props} viewBox="0 0 18 18">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      d="M1.5 6.75V5.25C1.5 3 3 1.5 5.25 1.5H12.75C15 1.5 16.5 3 16.5 5.25V6.75"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      d="M1.5 11.25V12.75C1.5 15 3 16.5 5.25 16.5H12.75C15 16.5 16.5 15 16.5 12.75V11.25"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      d="M5.02539 6.94531L9.00039 9.24782L12.9454 6.96033"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      d="M9 13.3277V9.24023"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      d="M8.06968 4.71742L5.66968 6.05244C5.12968 6.35244 4.67969 7.10994 4.67969 7.73244V10.2749C4.67969 10.8974 5.12218 11.6549 5.66968 11.9549L8.06968 13.2899C8.57968 13.5749 9.41968 13.5749 9.93718 13.2899L12.3372 11.9549C12.8772 11.6549 13.3272 10.8974 13.3272 10.2749V7.73244C13.3272 7.10994 12.8847 6.35244 12.3372 6.05244L9.93718 4.71742C9.41968 4.42492 8.57968 4.42492 8.06968 4.71742Z"
    />
  </Svg>
);
