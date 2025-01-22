import { Box3DIcon } from "@images/svg/Box3DIcon";
import { BoxIcon } from "@images/svg/BoxIcon";
import { CardCoinIcon } from "@images/svg/CardCoinIcon";
import { RoutingIcon } from "@images/svg/RoutingIcon";
import { COLORS, SHADOWS } from "@shared/lib/styles";
import { GilroyText } from "@shared/ui/GilroyText";
import { PropsWithChildren, useMemo } from "react";
import { View, ViewProps } from "react-native";

interface ApplicationPropProps {
  icon?: "box" | "routing" | "card_coin" | "box_3d" | "gallery";
  style?: ViewProps["style"];
  theme?: "default" | "accent";
}

export const ApplicationProp = ({
  icon,
  style,
  children,
  theme = "default",
}: PropsWithChildren<ApplicationPropProps>) => {
  const iconSize = theme === "default" ? 18 : 26;
  const iconColor =
    theme === "default" ? COLORS.blackGrey : COLORS.primaryYellow;
  const Icon = useMemo<JSX.Element>(() => {
    switch (icon) {
      case "box":
        return <BoxIcon width={iconSize} height={iconSize} color={iconColor} />;
      case "box_3d":
        return (
          <Box3DIcon width={iconSize} height={iconSize} color={iconColor} />
        );
      case "card_coin":
        return (
          <CardCoinIcon width={iconSize} height={iconSize} color={iconColor} />
        );
      case "routing":
        return (
          <RoutingIcon width={iconSize} height={iconSize} color={iconColor} />
        );
      default:
        return <></>;
    }
  }, [icon, theme]);

  return (
    <View
      style={[
        {
          backgroundColor:
            theme === "default" ? COLORS.specialGrey : COLORS.white,
          borderRadius: 12,
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          padding: 12,
          boxShadow: theme === "default" ? "" : SHADOWS.bottom,
        },
        style,
      ]}
    >
      {Icon}
      <GilroyText fontWeight="medium" fontSize={14}>
        {children}
      </GilroyText>
    </View>
  );
};
