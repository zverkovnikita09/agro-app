import { COLORS } from "@shared/lib/styles";
import { Animated, View, ViewProps } from "react-native";

interface InputCaretProps {
  style?: ViewProps["style"];
}

export const InputCaret = ({ style }: InputCaretProps) => {
  const opacity = new Animated.Value(1);

  Animated.loop(
    Animated.timing(opacity, {
      toValue: 0,
      duration: 900,
      useNativeDriver: true,
    })
  ).start();

  return (
    <Animated.View
      style={[
        {
          bottom: 14,
          width: 17,
          height: 2,
          backgroundColor: COLORS.blackText,
          opacity,
        },
        style,
      ]}
    />
  );
};
