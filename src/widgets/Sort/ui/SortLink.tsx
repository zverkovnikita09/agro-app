import { Link } from "expo-router";
import { StyleSheet, ViewProps } from "react-native";
import { COLORS, SHADOWS } from "@shared/lib/styles";
import { Routes } from "@shared/lib/constants";
import { Button } from "@shared/ui/Button";
import { ArrowDownIcon } from "@images/svg/ArrowDownIcon";

export const SortLink = ({ style }: { style?: ViewProps["style"] }) => {
  return (
    <Link href={Routes.sort} style={[styles.button, style]} asChild>
      <Button>
        <ArrowDownIcon color={COLORS.blackText} height={11} width={21} />
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
  },
});
