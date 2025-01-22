import { PropsWithChildren } from "react";
import { GilroyText } from "./GilroyText";
import { StyleProp, TextStyle } from "react-native";
import { COLORS } from "@shared/lib/styles";

interface ErrorTextProps {
  style?: StyleProp<TextStyle>;
  noMargin?: boolean;
}

export const ErrorText = ({
  children,
  style,
  noMargin,
}: PropsWithChildren<ErrorTextProps>) => {
  return (
    <GilroyText
      style={[{ color: COLORS.error, marginTop: noMargin ? 0 : 5 }, style]}
    >
      {children}
    </GilroyText>
  );
};
