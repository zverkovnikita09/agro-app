import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

export const ImageIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      stroke="#F2B430"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.75004 20.1668H14.25C18.8334 20.1668 20.6667 18.3335 20.6667 13.7502V8.25016C20.6667 3.66683 18.8334 1.8335 14.25 1.8335H8.75004C4.16671 1.8335 2.33337 3.66683 2.33337 8.25016V13.7502C2.33337 18.3335 4.16671 20.1668 8.75004 20.1668Z"
    />
    <Path
      stroke="#F2B430"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.74996 9.16667C9.76248 9.16667 10.5833 8.34586 10.5833 7.33333C10.5833 6.32081 9.76248 5.5 8.74996 5.5C7.73744 5.5 6.91663 6.32081 6.91663 7.33333C6.91663 8.34586 7.73744 9.16667 8.74996 9.16667Z"
    />
    <Path
      stroke="#F2B430"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M2.94751 17.3707L7.46668 14.3365C8.19084 13.8507 9.23584 13.9057 9.88668 14.4649L10.1892 14.7307C10.9042 15.3449 12.0592 15.3449 12.7742 14.7307L16.5875 11.4582C17.3025 10.844 18.4575 10.844 19.1725 11.4582L20.6667 12.7415"
    />
  </Svg>
);
