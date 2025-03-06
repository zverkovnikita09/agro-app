import { StyleSheet, View, ViewProps } from "react-native";
import { Spinner } from "./Spinner";
import { GilroyText } from "./GilroyText";

interface LoadingBlockProps {
  style?: ViewProps["style"];
  text?: string;
}

export const LoadingBlock = ({
  style,
  text = "Загрузка...",
}: LoadingBlockProps) => {
  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.loadingBlock}>
        <Spinner />
        <GilroyText fontWeight="medium">{text}</GilroyText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
});
