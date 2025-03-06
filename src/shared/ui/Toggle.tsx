import { COLORS } from "@shared/lib/styles";
import React from "react";
import {
  Pressable,
  SafeAreaView,
  View,
  StyleSheet,
  Button,
  ViewProps,
} from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { GilroyText, GilroyTextProps } from "./GilroyText";

interface ToggleProps {
  isChecked: boolean;
  setChecked: (value: boolean) => void;
  style?: ViewProps["style"];
  titlePosition?: "left" | "right";
  title?: string;
  fontWeight?: GilroyTextProps["fontWeight"];
  fontSize?: GilroyTextProps["fontSize"];
}

export const Toggle = ({
  isChecked,
  setChecked,
  style,
  titlePosition = "left",
  title,
  fontSize,
  fontWeight,
}: ToggleProps) => {
  const height = useSharedValue(0);
  const width = useSharedValue(0);

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      Number(isChecked),
      [0, 1],
      [COLORS.disabled, COLORS.primaryYellow]
    );
    const colorValue = withTiming(color, { duration: 100 });

    return {
      backgroundColor: colorValue,
      borderRadius: height.value / 2,
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const moveValue = interpolate(
      Number(isChecked),
      [0, 1],
      [0, width.value - height.value]
    );
    const translateValue = withTiming(moveValue, { duration: 100 });

    return {
      transform: [{ translateX: translateValue }],
      borderRadius: height.value / 2,
    };
  });

  const onCheck = () => {
    setChecked(!isChecked);
  };

  return (
    <Pressable style={[styles.wrapper, style]} onPress={onCheck}>
      {titlePosition === "left" && (
        <GilroyText fontSize={fontSize} fontWeight={fontWeight}>
          {title}
        </GilroyText>
      )}
      <Animated.View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
          width.value = e.nativeEvent.layout.width;
        }}
        style={[styles.checkBlock, trackAnimatedStyle]}
      >
        <Animated.View style={[styles.circle, thumbAnimatedStyle]} />
      </Animated.View>
      {titlePosition === "right" && (
        <GilroyText fontSize={fontSize} fontWeight={fontWeight}>
          {title}
        </GilroyText>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkBlock: {
    width: 40,
    height: 24,
    borderRadius: 500,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 16,
    position: "absolute",
    top: 4,
    left: 4,
    backgroundColor: COLORS.white,
  },
});
