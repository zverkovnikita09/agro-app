import { PageContainer } from "@shared/ui/PageContainer";
import { Menu } from "@widgets/Menu";
import { Slot } from "expo-router";
import { StyleSheet } from "react-native";

export default function MainLayout() {
  return (
    <PageContainer style={styles.wrapper}>
      <Slot />
      <Menu style={styles.menu} />
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: "relative",
  },
  menu: {
    marginTop: "auto",
  },
});
