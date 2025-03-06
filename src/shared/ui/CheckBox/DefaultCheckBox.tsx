import { View, ViewProps } from "react-native";
import { PropsWithChildren } from "react";
import { COLORS } from "@shared/lib/styles";
import { CheckBoxIcon } from "@images/svg/CheckBoxIcon";
import { Button } from "../Button";
import { GilroyText } from "../GilroyText";
import { ErrorText } from "../ErrorText";
import { CheckBoxProps } from ".";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export const DefaultCheckBox = ({
  isChecked,
  children,
  error,
  onChange,
  style,
}: PropsWithChildren<CheckBoxProps>) => {
  // const opacity = useSharedValue(isChecked ? 1 : 0);

  // const animatedStyles = useAnimatedStyle(() => {
  //   return {
  //     opacity: opacity.value,
  //   };
  // });

  // const handleChange = () => {
  //   const newValue = !isChecked;
  //   opacity.value = withTiming(newValue ? 1 : 0, {
  //     duration: 100,
  //     easing: Easing.ease,
  //   });
  //   onChange?.(newValue);
  // };

  return (
    <>
      <Button
        onPress={() => onChange?.(!isChecked)}
        style={[
          {
            flexDirection: "row",
            gap: 8,
            alignItems: "flex-start",
            alignSelf: "baseline",
          },
          style,
        ]}
      >
        <View
          style={{
            marginTop: 2,
            width: 20,
            height: 20,
            borderWidth: 1,
            borderColor: COLORS.blackText,
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          <Animated.View
            style={[
              {
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: COLORS.primaryYellow,
                opacity: isChecked ? 1 : 0,
              },
              // animatedStyles,
            ]}
          >
            <CheckBoxIcon width={11} height={8} />
          </Animated.View>
        </View>
        <GilroyText>{children}</GilroyText>
      </Button>
      {error && <ErrorText>{error}</ErrorText>}
    </>
  );
};
