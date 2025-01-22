import { store, persistor } from "@app/store";
import { Notifications } from "@entities/Notifications";
import { COLORS } from "@shared/lib/styles";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export default function Layout() {
  const [loaded, error] = useFonts({
    Gilroy: require("@fonts/Gilroy-Regular.ttf"),
    GilroyBold: require("@fonts/Gilroy-Bold.ttf"),
    GilroyMedium: require("@fonts/Gilroy-Medium.ttf"),
    GilroySemiBold: require("@fonts/Gilroy-SemiBold.ttf"),
    GilroyThin: require("@fonts/Gilroy-Thin.ttf"),
  });

  if (!loaded || error) return null;

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SafeAreaProvider>
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
