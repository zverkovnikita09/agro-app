import { PropsWithChildren, useMemo } from "react";
import { View, ViewProps } from "react-native";
import { GilroyText } from "./GilroyText";
import { Color, COLORS } from "@shared/lib/styles";

export type Statuses = "active" | "inactive" | "in_progress" | "complete";

interface StatusBageProps {
  status: Statuses;
  style?: ViewProps["style"];
  icon?: JSX.Element;
  children?: string;
  fontSize?: number;
}

export const StatusBadge = ({
  status,
  children,
  style,
  icon,
  fontSize = 11,
}: PropsWithChildren<StatusBageProps>) => {
  const theme = useMemo<{ color: Color; backgroundColor: Color }>(() => {
    switch (status) {
      case "active":
        return {
          color: COLORS.primaryYellow,
          backgroundColor: COLORS.specialYellow,
        };
      case "complete":
        return {
          color: COLORS.specialGreen,
          backgroundColor: COLORS.specialGreenLight,
        };
      case "in_progress":
        return {
          color: COLORS.blackText,
          backgroundColor: COLORS.primaryYellow,
        };
      case "inactive":
        return {
          color: COLORS.blackGrey,
          backgroundColor: COLORS.specialGrey2,
        };
    }
  }, [status]);

  const Content = icon ? (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
      {icon}
      <GilroyText fontSize={fontSize} fontWeight="medium" color={theme.color}>
        {children}
      </GilroyText>
    </View>
  ) : (
    <GilroyText fontSize={fontSize} fontWeight="medium" color={theme.color}>
      {children}
    </GilroyText>
  );

  return (
    <View
      style={[
        {
          paddingHorizontal: 8,
          paddingVertical: 6,
          borderRadius: 6,
          alignSelf: "flex-start",
          backgroundColor: theme.backgroundColor,
        },
        style,
      ]}
    >
      {Content}
    </View>
  );
};
