import { COLORS } from "@shared/lib/styles";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const PenIcon = (props: SvgProps) => (
  <Svg fill="none" {...props} viewBox="0 0 47 46">
    <Path
      stroke={COLORS.blackGrey}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M21.5835 3.83301H17.7502C8.16683 3.83301 4.3335 7.66634 4.3335 17.2497V28.7497C4.3335 38.333 8.16683 42.1663 17.7502 42.1663H29.2502C38.8335 42.1663 42.6668 38.333 42.6668 28.7497V24.9163"
    />
    <Path
      stroke={COLORS.blackGrey}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M31.2431 5.78906L16.1398 20.8924C15.5648 21.4674 14.9898 22.5982 14.8748 23.4224L14.0506 29.1916C13.7439 31.2807 15.2198 32.7374 17.3089 32.4499L23.0781 31.6257C23.8831 31.5107 25.0139 30.9357 25.6081 30.3607L40.7114 15.2574C43.3181 12.6507 44.5448 9.6224 40.7114 5.78906C36.8781 1.95573 33.8498 3.1824 31.2431 5.78906Z"
    />
    <Path
      stroke={COLORS.blackGrey}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={3}
      d="M29.0776 7.95508C30.3618 12.5359 33.946 16.1201 38.546 17.4234"
    />
  </Svg>
);
