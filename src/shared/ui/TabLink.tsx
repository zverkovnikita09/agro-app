import { Navlink, NavlinkProps } from "./NavLink";
import { COLORS } from "@shared/lib/styles";

export const TabLink = ({ style, ...props }: NavlinkProps) => {
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
