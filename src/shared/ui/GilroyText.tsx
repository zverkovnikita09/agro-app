import { Color, COLORS } from "@shared/lib/styles";
import { useMemo } from "react";
import { StyleSheet, Text, TextProps } from "react-native";

export interface GilroyTextProps extends TextProps {
  fontWeight?: "thin" | "regular" | "medium" | "semi-bold" | "bold";
  fontSize?: number;
  color?: Color;
}

export const GilroyText = ({
  children,
  style,
  fontWeight,
  fontSize = 16,
  color = COLORS.blackText,
  ...props
}: GilroyTextProps) => {
  const fontFamily = useMemo<string>(() => {
    if (fontWeight === "bold") {
      return "GilroyBold";
    }
    if (fontWeight === "medium") {
      return "GilroyMedium";
    }
    if (fontWeight === "semi-bold") {
      return "GilroySemiBold";
    }
    if (fontWeight === "thin") {
      return "GilroyThin";
    }
    return "Gilroy";
  }, [fontWeight]);

  return (
    <Text {...props} style={[{ fontFamily, fontSize, color }, style]}>
      {children}
    </Text>
  );
};
