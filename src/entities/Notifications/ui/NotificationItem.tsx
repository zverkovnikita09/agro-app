import { Notification, NotificationType } from "../model/Notifications.model";
import { useEffect, useMemo, JSX } from "react";
import { removeNotification } from "../model/Notifications.slice";
import { StyleSheet, View } from "react-native";
import { GilroyText } from "@shared/ui/GilroyText";
import { Color, COLORS, SHADOWS } from "@shared/lib/styles";
import { SuccessIcon } from "@images/svg/SuccessIcon";
import { ErrorIcon } from "@images/svg/ErrorIcon";
import { WarningIcon } from "@images/svg/WarningIcon";
import { CloseButton } from "@shared/ui/CloseButton";
import { useAppDispatch } from "@app/store";

interface NotificationOptionsObj {
  icon: JSX.Element;
  color: Color;
  iconColor: Color;
}

export const NotificationItem = ({
  message,
  type,
  id,
  timeout,
}: Notification) => {
  const dispatch = useAppDispatch();

  const onRemove = (id: string) => {
    dispatch(removeNotification(id));
  };

  useEffect(() => {
    const timeoutId: NodeJS.Timeout = setTimeout(() => {
      onRemove(id);
    }, timeout);
    return () => clearTimeout(timeoutId);
  }, [id]);

  const NotificationOptions = useMemo<NotificationOptionsObj>(() => {
    switch (type) {
      case NotificationType.ERROR:
        return {
          color: COLORS.error,
          iconColor: COLORS.specialRedLight,
          icon: <ErrorIcon width={22} height={22} />,
        };
      case NotificationType.WARNING:
        return {
          color: COLORS.blackText,
          iconColor: COLORS.specialYellow,
          icon: <WarningIcon width={22} height={24} />,
        };
      case NotificationType.SUCCESS:
        return {
          color: COLORS.specialGreen,
          iconColor: COLORS.specialGreenLight,
          icon: <SuccessIcon width={22} height={22} />,
        };
    }
  }, [type]);

  return (
    <View
      style={[styles.wrapper, { borderColor: NotificationOptions.iconColor }]}
    >
      <CloseButton style={styles.closeButton} onPress={() => onRemove(id)} />
      <View
        style={[
          { backgroundColor: NotificationOptions.iconColor },
          styles.iconWrapper,
        ]}
      >
        {NotificationOptions.icon}
      </View>
      <GilroyText
        numberOfLines={2}
        color={NotificationOptions.color}
        style={styles.text}
      >
        {message}
      </GilroyText>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    boxShadow: SHADOWS.bottom,
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 34,
    gap: 16,
    marginBottom: 10,
    borderRadius: 12,
    alignItems: "center",
    position: "relative",
    backgroundColor: COLORS.white,
    borderWidth: 1,
  },
  text: {
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  iconWrapper: {
    borderRadius: 12,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
