import { useGetUserDataQuery } from "@entities/User";
import { ListIcon } from "@images/svg/ListIcon";
import { MapIcon } from "@images/svg/MapIcon";
import { ProfileIcon } from "@images/svg/ProfileIcon";
import { SearchIcon } from "@images/svg/SearchIcon";
import { Routes } from "@shared/lib/constants";
import { COLORS, SHADOWS } from "@shared/lib/styles";
import { Navlink } from "@shared/ui/NavLink";
import { usePathname } from "expo-router";
import { StyleSheet, View, ViewProps } from "react-native";

interface MenuProps {
  style?: ViewProps["style"];
}

export const Menu = ({ style }: MenuProps) => {
  const path = usePathname();
  const { data } = useGetUserDataQuery();

  if (!data) return null;

  return (
    <View style={[styles.wrapper, style]}>
      <Navlink href={Routes.main} style={styles.link}>
        <MapIcon width={24} height={24} />
      </Navlink>
      <Navlink
        href={Routes.checkList}
        style={styles.link}
        activeCondition={
          path.includes("check-list") || path.includes("application")
        }
      >
        <ListIcon width={24} height={24} />
      </Navlink>
      <Navlink href={Routes.search} style={styles.link}>
        <SearchIcon width={24} height={24} />
      </Navlink>
      <Navlink
        href={Routes.profile(data.id)}
        style={styles.link}
        activeCondition={path.includes("profile")}
      >
        <ProfileIcon width={24} height={24} />
      </Navlink>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    backgroundColor: COLORS.white,
    paddingTop: 8,
    paddingBottom: 12,
    paddingHorizontal: 16,
    boxShadow: SHADOWS.top,
    justifyContent: "space-between",
  },
  link: {
    padding: 8,
    borderRadius: 12,
  },
});
