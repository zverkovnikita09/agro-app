import { useSelector } from "react-redux";
import { NotificationSelectors } from "../model/Notifications.selectors";
import { Dimensions, StyleSheet, View } from "react-native";
import { NotificationItem } from "./NotificationItem";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface NotificationsProps {
  timeout?: number;
}

export const Notifications = ({ timeout = 2000 }: NotificationsProps) => {
  const insets = useSafeAreaInsets();
  const notifications = useSelector(
    NotificationSelectors.selectAllNotifications
  );

  if (!notifications.length) {
    return null;
  }

  return (
    <View
      style={{
        position: "absolute",
        zIndex: 9999,
        top: insets.top + 16,
        width: Dimensions.get("screen").width,
        paddingHorizontal: 9,
      }}
    >
      {notifications.map((notification, i) => (
        <NotificationItem
          key={i}
          {...notification}
          timeout={notification.timeout ?? timeout}
        />
      ))}
    </View>
  );
};
