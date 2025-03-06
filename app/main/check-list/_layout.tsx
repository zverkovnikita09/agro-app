import { FiltersLink } from "@widgets/Filters";
import { SortLink } from "@widgets/Sort";
import { Routes } from "@shared/lib/constants";
import { TabLink } from "@shared/ui/TabLink";
import { Title } from "@shared/ui/Title";
import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function Layout() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Title>Заявки</Title>
        <View style={styles.filters}>
          <FiltersLink />
          <SortLink />
        </View>
      </View>
      <View style={styles.tabsContainer}>
        <TabLink style={{ paddingHorizontal: 19 }} href={Routes.checkList}>
          Все
        </TabLink>
        <TabLink href={Routes.myCheckList}>С моими откликами</TabLink>
      </View>
      <Slot />
    </View>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 12,
    paddingBottom: 12,
    marginTop: 8,
  },
  wrapper: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    paddingBottom: 8,
    paddingTop: 16,
    paddingHorizontal: 12,
    justifyContent: "space-between",
    alignItems: "center",
  },
  filters: {
    flexDirection: "row",
    gap: 8,
  },
});
