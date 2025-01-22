import { COLORS } from "@shared/lib/styles";
import { TabLink } from "@shared/ui/TabLink";
import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Layout() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.tabsContainer}>
        <TabLink style={{ paddingHorizontal: 19 }} href="/main/check-list">
          Все
        </TabLink>
        <TabLink href="/main/check-list/my">С моими откликами</TabLink>
      </View>
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    gap: 8,
    paddingTop: 16,
    paddingHorizontal: 12,
    paddingBottom: 12,
    backgroundColor: COLORS.white,
  },
  wrapper: {
    flex: 1,
  },
});
