import { LinkProps } from "expo-router";
import { Navlink } from "./NavLink";
import { COLORS } from "@shared/lib/styles";

export const TabLink = ({ style, ...props }: LinkProps) => {
  return (
    <Navlink
      {...props}
      style={[
        {
          alignSelf: "baseline",
          paddingVertical: 8,
          paddingHorizontal: 12,
          borderRadius: 12,
        },
        style,
      ]}
      activeColor={COLORS.specialYellow}
    />
  );
};
