import { Color, COLORS } from "@shared/lib/styles";
import { Link, LinkProps, usePathname } from "expo-router";

interface NavlinkProps extends LinkProps {
  activeColor?: Color;
  inactiveColor?: Color;
  activeCondition?: boolean;
}

export const Navlink = ({
  children,
  href,
  inactiveColor = COLORS.white,
  activeColor = COLORS.primaryYellow,
  activeCondition,
  style,
  ...props
}: NavlinkProps) => {
  const path = usePathname();
  const condition =
    activeCondition === undefined ? path === href : activeCondition;
  return (
    <Link
      style={[
        {
          backgroundColor: condition ? activeColor : inactiveColor,
        },
        ,
        style,
      ]}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
};
