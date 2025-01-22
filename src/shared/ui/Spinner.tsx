import { LeafIcon } from "@images/svg/LeafIcon";
import { COLORS } from "@shared/lib/styles";
import { Animated, StyleSheet, View, ViewProps } from "react-native";

export enum SpinnerTheme {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

interface SpinnerProps {
  theme?: SpinnerTheme;
  style?: ViewProps["style"];
}

export const Spinner = ({
  theme = SpinnerTheme.PRIMARY,
  style,
}: SpinnerProps) => {
  const themeColor =
    theme === SpinnerTheme.PRIMARY ? COLORS.primaryYellow : COLORS.white;
  const opacity = [
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
  ];

  opacity.forEach((item, i) =>
    Animated.loop(
      Animated.timing(item, {
        toValue: 0,
        duration: 800,
        delay: 400 + 100 * i,
        useNativeDriver: true,
      })
    ).start()
  );

  return (
    <View style={[styles.spinner, style]}>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 11.4,
          transform: [{ rotate: "45deg" }],
          opacity: opacity[0],
        }}
      >
        <LeafIcon color={themeColor} width={4} height={9} />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          top: 2.08,
          right: 4,
          transform: [{ rotate: "89deg" }],
          opacity: opacity[1],
        }}
      >
        <LeafIcon color={themeColor} width={4} height={9} />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          top: 9.1,
          right: 1.3,
          transform: [{ rotate: "-41deg" }],
          opacity: opacity[2],
        }}
      >
        <LeafIcon color={themeColor} width={4} height={9} />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          bottom: 1.3,
          right: 4.16,
          transform: [{ rotate: "7deg" }],
          opacity: opacity[3],
        }}
      >
        <LeafIcon color={themeColor} width={4} height={9} />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          bottom: -1.56,
          right: 10.92,
          transform: [{ rotate: "39deg" }],
          opacity: opacity[4],
        }}
      >
        <LeafIcon color={themeColor} width={4} height={9} />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          bottom: 1.56,
          left: 4.68,
          transform: [{ rotate: "94deg" }],
          opacity: opacity[5],
        }}
      >
        <LeafIcon color={themeColor} width={4} height={9} />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          bottom: 9.1,
          left: 1.04,
          transform: [{ rotate: "133deg" }],
          opacity: opacity[6],
        }}
      >
        <LeafIcon color={themeColor} width={4} height={9} />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          top: 2.34,
          left: 4.16,
          transform: [{ rotate: "180deg" }],
          opacity: opacity[7],
        }}
      >
        <LeafIcon color={themeColor} width={4} height={9} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  spinner: {
    position: "relative",
    width: 26,
    height: 26,
  },
});
