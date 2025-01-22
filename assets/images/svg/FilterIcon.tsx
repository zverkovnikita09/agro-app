import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const FilterIcon = (props: SvgProps) => (
  <Svg fill="none" {...props} viewBox="0 0 24 25">
    <Path
      stroke="#0A0A0A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M5.40039 2.59961H18.6004C19.7004 2.59961 20.6004 3.49961 20.6004 4.59961V6.79961C20.6004 7.59961 20.1004 8.59961 19.6004 9.09961L15.3004 12.8996C14.7004 13.3996 14.3004 14.3996 14.3004 15.1996V19.4996C14.3004 20.0996 13.9004 20.8996 13.4004 21.1996L12.0004 22.0996C10.7004 22.8996 8.90039 21.9996 8.90039 20.3996V15.0996C8.90039 14.3996 8.50039 13.4996 8.10039 12.9996L4.30039 8.99961C3.80039 8.49961 3.40039 7.59961 3.40039 6.99961V4.69961C3.40039 3.49961 4.30039 2.59961 5.40039 2.59961Z"
    />
    <Path
      stroke="#0A0A0A"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M10.93 2.59961L6 10.4996"
    />
  </Svg>
);
