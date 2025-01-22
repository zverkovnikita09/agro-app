import { TextProps, View, ViewProps } from "react-native";
import { Title } from "./Title";
import { GilroyText } from "./GilroyText";
import { PropsWithChildren } from "react";

interface InfoBlockProps {
  icon?: JSX.Element;
  title: string;
  additionalText?: string;
  style?: {
    main?: ViewProps["style"];
    additionalText?: TextProps["style"];
    title?: TextProps["style"];
  };
}

export const InfoBlock = ({
  icon,
  additionalText,
  title,
  style,
  children,
}: PropsWithChildren<InfoBlockProps>) => {
  return (
    <View
      style={[
        { alignItems: "center", justifyContent: "center", gap: 8 },
        style?.main,
      ]}
    >
      {icon}
      <Title
        fontSize={16}
        fontWeight="semi-bold"
        style={[{ marginTop: 8, textAlign: "center" }, style?.title]}
      >
        {title}
      </Title>
      {additionalText && (
        <GilroyText
          fontSize={14}
          style={[{ textAlign: "center" }, style?.additionalText]}
        >
          {additionalText}
        </GilroyText>
      )}
      {children}
    </View>
  );
};
