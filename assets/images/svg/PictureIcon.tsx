import { COLORS } from "@shared/lib/styles";
import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const PictureIcon = (props: SvgProps) => (
  <Svg fill="none" {...props} viewBox="0 0 20 20">
    <Path
      stroke={COLORS.primaryYellow}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7.49935 1.66634H12.4993C16.666 1.66634 18.3327 3.33301 18.3327 7.49967V12.4997C18.3327 16.6663 16.666 18.333 12.4993 18.333H7.49935C3.33268 18.333 1.66602 16.6663 1.66602 12.4997V7.49967C1.66602 3.33301 3.33268 1.66634 7.49935 1.66634Z"
    />
    <Path
      stroke={COLORS.primaryYellow}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7.50065 11.6667C8.42113 11.6667 9.16732 12.4129 9.16732 13.3333C9.16732 14.2538 8.42113 15 7.50065 15C6.58018 15 5.83398 14.2538 5.83398 13.3333C5.83398 12.4129 6.58018 11.6667 7.50065 11.6667Z"
    />
    <Path
      stroke={COLORS.primaryYellow}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.22461 4.2082L6.33294 6.96654C6.99128 7.4082 7.94128 7.3582 8.53294 6.84987L8.80794 6.6082C9.45794 6.04987 10.5079 6.04987 11.1579 6.6082L14.6246 9.5832C15.2746 10.1415 16.3246 10.1415 16.9746 9.5832L18.3329 8.41654"
    />
  </Svg>
);
