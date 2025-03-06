import { GilroyText } from "@shared/ui/GilroyText";
import { Link } from "expo-router";
import { StyleSheet, View, ViewProps } from "react-native";
import { FiltersSelectors } from "../model/Filters.selectors";
import { useSelector } from "react-redux";
import { FilterIcon } from "@images/svg/FilterIcon";
import { COLORS, SHADOWS } from "@shared/lib/styles";
import { Routes } from "@shared/lib/constants";
import { Button } from "@shared/ui/Button";

export const FiltersLink = ({ style }: { style?: ViewProps["style"] }) => {
  const savedFilters = useSelector(FiltersSelectors.selectFilters);
  const filtersCount = Object.values(savedFilters).filter((item) => {
    if (Array.isArray(item)) {
      return !!item.length;
    }
    if (typeof item === "number") return true;
    return !!item;
  }).length;

  return (
    <Link href={Routes.filters} style={[styles.button, style]} asChild>
      <Button>
        {!!filtersCount && (
          <View style={styles.count}>
            <GilroyText fontWeight="semi-bold" fontSize={12}>
              {filtersCount}
            </GilroyText>
          </View>
        )}
        <FilterIcon height={24} width={25} />
      </Button>
    </Link>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 4,
    borderRadius: 12,
    width: 44,
    height: 44,
    backgroundColor: COLORS.white,
    boxShadow: SHADOWS.bottom,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  count: {
    width: 17,
    height: 17,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: COLORS.primaryYellow,
    borderRadius: 17,
    zIndex: 2,
    top: -5,
    right: -5,
  },
});
