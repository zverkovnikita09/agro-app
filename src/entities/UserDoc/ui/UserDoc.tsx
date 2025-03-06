import { StyleSheet, View, ViewProps } from "react-native";
import { UserDocType } from "../model/UserDoc.model";
import { useSingDocMutation } from "../model/UserDoc.api";
import { CardContainer } from "@shared/ui/CardContainer";
import { StatusBadge } from "@shared/ui/StatusBadge";
import { GilroyText } from "@shared/ui/GilroyText";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import { openURL } from "expo-linking";
import { useDispatch } from "react-redux";
import { addNotification, NotificationType } from "@entities/Notifications";

export const UserDoc = ({
  is_signed,
  name,
  path_url,
  path,
  style,
}: UserDocType & { style?: ViewProps["style"] }) => {
  const [signDoc, { isLoading }] = useSingDocMutation();
  const dispatch = useDispatch();
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
  const handleSignDoc = async (path: string) => {
    try {
      const response = await signDoc({ path });
      if (!response.data?.message) {
        dispatch(
          addNotification({
            type: NotificationType.ERROR,
            message: "Не удалось подписать документ",
            id: performance.now.toString(),
          })
        );
        return;
      }
      if (!response.data.message.includes("https")) {
        dispatch(
          addNotification({
            type: NotificationType.ERROR,
            message: response.data.message,
            id: performance.now.toString(),
          })
        );
        return;
      }
      openURL(response.data.message).catch((err) => {
        dispatch(
          addNotification({
            type: NotificationType.ERROR,
            message: err,
            id: performance.now.toString(),
          })
        );
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <CardContainer style={styles.wrapper}>
      <Button style={styles.header} onPress={() => openPDF(path_url)}>
        <GilroyText
          numberOfLines={1}
          style={styles.title}
          fontWeight="medium"
          fontSize={16}
        >
          {name ?? "Безымянный документ"}
        </GilroyText>
        <StatusBadge
          fontSize={13}
          style={styles.badge}
          status={is_signed ? "complete" : "inactive"}
        >
          {is_signed ? "Подписан" : "Не подписан"}
        </StatusBadge>
      </Button>
      <Button
        size={ButtonSize.S}
        onPress={() => handleSignDoc(path)}
        theme={ButtonTheme.ACCENT_WITH_BLACK_TEXT}
        disabled={isLoading}
      >
        Подписать
      </Button>
    </CardContainer>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  title: {
    flex: 1,
  },
  badge: {
    marginLeft: "auto",
  },
});
