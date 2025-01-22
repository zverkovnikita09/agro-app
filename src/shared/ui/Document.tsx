import { PropsWithChildren } from "react";
import { CardContainer } from "./CardContainer";
import { GilroyText } from "./GilroyText";
import { ImageIcon } from "@images/svg/ImageIcon";
import { ViewProps } from "react-native";

export const Document = ({
  children,
  style,
}: PropsWithChildren<{ link?: string; style?: ViewProps["style"] }>) => {
  return (
    <CardContainer
      style={[
        {
          padding: 12,
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        },
        style,
      ]}
    >
      <ImageIcon width={22} height={22} />
      <GilroyText fontWeight="medium" fontSize={13}>
        {children}
      </GilroyText>
    </CardContainer>
  );
};
