import { store, persistor } from "@app/store";
import { Notifications } from "@entities/Notifications";
import { COLORS } from "@shared/lib/styles";
import { useFonts } from "expo-font";
import { Slot, SplashScreen, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import * as ExpoNotifications from "expo-notifications";
import { UpdateModal } from '@src/modals/UpdateModal';
import { checkAppVersion } from '@shared/lib/checkAppVersion';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [modalVisible, setModalVisible] = useState(false);
  const [storeUrl, setStoreUrl] = useState('');

  const [loaded, error] = useFonts({
    Gilroy: require("@fonts/Gilroy-Regular.ttf"),
    GilroyBold: require("@fonts/Gilroy-Bold.ttf"),
    GilroyMedium: require("@fonts/Gilroy-Medium.ttf"),
    GilroySemiBold: require("@fonts/Gilroy-SemiBold.ttf"),
    GilroyThin: require("@fonts/Gilroy-Thin.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }

    let isMounted = true;

    (async () => {
      const result = await checkAppVersion();
      if (isMounted && result?.needsUpdate && result?.storeUrl) {
        setStoreUrl(result.storeUrl);
        setTimeout(() => { // Таймер нужен чтобы UpdateModal корректно отображался
          setModalVisible(true);
        }, 1000)
      }
    })();

    // Слушатель нажатий по уведомлению
    const responseSubscription = ExpoNotifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;

      const orderId = data.order_id;
      const type = data.type;

      if (type === 'order' && orderId) { // order || regular
        router.push(`/main/application/${orderId}`);
      }
    });

    return () => {
      isMounted = false;
      responseSubscription.remove()
    };

  }, [loaded]);

  if (!loaded || error) return null;

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
          <UpdateModal
              isVisible={modalVisible}
              onClose={() => setModalVisible(false)}
              storeUrl={storeUrl}
          />
          <Notifications />
          <StatusBar style="auto" />
          <View style={styles.container}>
            <Slot />
          </View>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    position: "relative",
    zIndex: 0,
  },
});
