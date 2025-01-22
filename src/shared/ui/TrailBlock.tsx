import { StyleSheet, View, ViewProps } from "react-native";
import { GilroyText } from "./GilroyText";
import { COLORS } from "@shared/lib/styles";

interface TrailBlockProps {
  destinationFrom: string;
  destinationTo: string;
  style?: ViewProps["style"];
}

export const TrailBlock = ({
  destinationFrom,
  destinationTo,
  style,
}: TrailBlockProps) => {
  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.line} />
      <View style={styles.item}>
        <View
          style={[
            styles.circle,
            { top: 11 / 2, left: 0, backgroundColor: COLORS.primaryYellow },
          ]}
        />
        <GilroyText fontSize={15}>{destinationFrom}</GilroyText>
      </View>
      <View style={[styles.item, { paddingTop: 12 }]}>
        <View
          style={[
            styles.circle,
            { bottom: 11 / 2, left: 0, backgroundColor: COLORS.white },
          ]}
        />
        <GilroyText fontSize={15}>{destinationTo}</GilroyText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  line: {
    position: "absolute",
    borderWidth: 1,
    top: 0,
    bottom: 0,
    left: 2.5,
    marginTop: 8,
    marginBottom: 8,
    borderStyle: "dashed",
    borderColor: COLORS.disabled,
  },
  circle: {
    width: 7,
    height: 7,
    position: "absolute",
    borderWidth: 1,
    borderColor: COLORS.blackText,
    borderRadius: 7,
  },
  item: {
    position: "relative",
    paddingLeft: 12,
  },
});
