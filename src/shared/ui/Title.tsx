import { PropsWithChildren } from "react";
import { StyleProp, TextStyle } from "react-native";
import { GilroyText, GilroyTextProps } from "./GilroyText";

interface TitleProps {
  style?: StyleProp<TextStyle>;
  fontSize?: number;
  fontWeight?: GilroyTextProps["fontWeight"];
}

export const Title = ({
  style,
  children,
  fontSize = 24,
  fontWeight = "medium",
}: PropsWithChildren<TitleProps>) => {
  return (
    <GilroyText style={style} fontSize={fontSize} fontWeight={fontWeight}>
      {children}
    </GilroyText>
  );
};
