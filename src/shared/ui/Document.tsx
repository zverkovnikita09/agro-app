import { PropsWithChildren } from "react";
import { CardContainer } from "./CardContainer";
import { GilroyText } from "./GilroyText";
import { ImageIcon } from "@images/svg/ImageIcon";
import { Pressable, ViewProps } from "react-native";
import { Gallery } from "./Gallery";
import { useDispatch } from "react-redux";
import { addNotification, NotificationType } from "@entities/Notifications";
import { openURL } from "expo-linking";

export const Document = ({
  children,
  style,
  url,
}: PropsWithChildren<{ url: string; style?: ViewProps["style"] }>) => {
  const dispatch = useDispatch();

  const Component = (openUrl: (url: string) => void) => {
    return (
      <Pressable onPress={() => openUrl(url)}>
        <CardContainer
          style={[
            {
              paddingHorizontal: 12,
              paddingVertical: 18,
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
      </Pressable>
    );
  };

  if (url.includes(".pdf") || url.includes(".doc")) {
    const openPDF = (url: string) => {
      openURL(url).catch((err) => {
        dispatch(
          addNotification({
            type: NotificationType.ERROR,
            message: err,
            id: performance.now.toString(),
          })
        );
      });
    };
    return Component(openPDF);
  }
  return <Gallery>{(openImage) => Component(openImage)}</Gallery>;
};
