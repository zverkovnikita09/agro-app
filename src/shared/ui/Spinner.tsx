import { LeafIcon } from "@images/svg/LeafIcon";
// import { COLORS } from "@shared/lib/styles";
// import { useEffect } from "react";
import { ViewProps } from "react-native";

export enum SpinnerTheme {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

interface SpinnerProps {
  theme?: SpinnerTheme;
  style?: ViewProps["style"];
}

// export const Spinner = ({
//   theme = SpinnerTheme.PRIMARY,
//   style,
// }: SpinnerProps) => {
//   const themeColor =
//     theme === SpinnerTheme.PRIMARY ? COLORS.primaryYellow : COLORS.white;
//   const opacity = [
//     new Animated.Value(1),
//     new Animated.Value(1),
//     new Animated.Value(1),
//     new Animated.Value(1),
//     new Animated.Value(1),
//     new Animated.Value(1),
//     new Animated.Value(1),
//     new Animated.Value(1),
//   ];

//   useEffect(() => {
//     opacity.forEach((item, i) =>
//       Animated.loop(
//         Animated.timing(item, {
//           toValue: 0,
//           duration: 800,
//           delay: 400 + 100 * i,
//           useNativeDriver: true,
//         })
//       ).start()
//     );
//   }, []);

//   return (
//     <View style={[styles.spinner, style]}>
//
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   spinner: {
//     position: "relative",
//     width: 26,
//     height: 26,
//   },
// });

const ITEMS_STYLES = [
  { position: { top: 0, left: 11.4 }, rotate: "45deg" },
  { position: { top: 2.08, right: 4 }, rotate: "89deg" },
  { position: { top: 9.1, right: 1.3 }, rotate: "-41deg" },
  { position: { bottom: 1.3, right: 4.16 }, rotate: "7deg" },
  { position: { bottom: -1.56, right: 10.92 }, rotate: "39deg" },
  { position: { bottom: 1.56, left: 4.68 }, rotate: "94deg" },
  { position: { bottom: 9.1, left: 1.04 }, rotate: "133deg" },
  { position: { top: 2.34, left: 4.16 }, rotate: "180deg" },
];

import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { COLORS } from "@shared/lib/styles";
export const Spinner = ({
  theme = SpinnerTheme.PRIMARY,
  style,
}: SpinnerProps) => {
  const duration = 800;
  const themeColor =
    theme === SpinnerTheme.PRIMARY ? COLORS.primaryYellow : COLORS.white;
  const progress = useSharedValue(1);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(0, { duration, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const elements = Array.from({ length: ITEMS_STYLES.length }).map(
    (_, index) => {
      const animatedStyle = useAnimatedStyle(() => {
        const opacity = (progress.value + index / ITEMS_STYLES.length) % 1;
        return {
          opacity: opacity < 0.5 ? opacity * 2 : (1 - opacity) * 2,
        };
      });

      return (
        <Animated.View
          key={index}
          style={[
            styles.element,
            {
              ...ITEMS_STYLES[index].position,
              transform: [{ rotate: ITEMS_STYLES[index].rotate }],
            },
            animatedStyle,
          ]}
        >
          <LeafIcon color={themeColor} width={4} height={9} />
        </Animated.View>
      );
    }
  );

  return <View style={[styles.container, style]}>{elements}</View>;
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: 26,
    height: 26,
  },
  element: {
    position: "absolute",
  },
});
