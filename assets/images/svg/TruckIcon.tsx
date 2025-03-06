import { COLORS } from "@shared/lib/styles";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const TruckIcon = ({ color = COLORS.blackGrey, ...props }: SvgProps) => (
  <Svg fill="none" {...props} viewBox="0 0 47 47">
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M23.4997 27.3335H25.4164C27.5247 27.3335 29.2497 25.6085 29.2497 23.5002V4.3335H11.9997C9.12469 4.3335 6.61388 5.92431 5.31055 8.26264"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M4.33301 33.0835C4.33301 36.2652 6.90134 38.8335 10.083 38.8335H11.9997C11.9997 36.7252 13.7247 35.0002 15.833 35.0002C17.9413 35.0002 19.6663 36.7252 19.6663 38.8335H27.333C27.333 36.7252 29.058 35.0002 31.1663 35.0002C33.2747 35.0002 34.9997 36.7252 34.9997 38.8335H36.9163C40.098 38.8335 42.6663 36.2652 42.6663 33.0835V27.3335H36.9163C35.8622 27.3335 34.9997 26.471 34.9997 25.4168V19.6668C34.9997 18.6127 35.8622 17.7502 36.9163 17.7502H39.3888L36.1114 12.0193C35.4214 10.831 34.1564 10.0835 32.7764 10.0835H29.2497V23.5002C29.2497 25.6085 27.5247 27.3335 25.4163 27.3335H23.4997"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M15.8333 42.6667C17.9504 42.6667 19.6667 40.9504 19.6667 38.8333C19.6667 36.7162 17.9504 35 15.8333 35C13.7162 35 12 36.7162 12 38.8333C12 40.9504 13.7162 42.6667 15.8333 42.6667Z"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M31.1663 42.6667C33.2834 42.6667 34.9997 40.9504 34.9997 38.8333C34.9997 36.7162 33.2834 35 31.1663 35C29.0492 35 27.333 36.7162 27.333 38.8333C27.333 40.9504 29.0492 42.6667 31.1663 42.6667Z"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M42.6667 23.5V27.3333H36.9167C35.8625 27.3333 35 26.4708 35 25.4167V19.6667C35 18.6125 35.8625 17.75 36.9167 17.75H39.3891L42.6667 23.5Z"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M4.33301 15.8335H15.833"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M4.33301 21.5835H11.9997"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M4.33301 27.3335H8.16634"
    />
  </Svg>
);
