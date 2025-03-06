import { Pressable, StyleSheet, View } from "react-native";
import { GilroyText } from "../GilroyText";
import { COLORS } from "@shared/lib/styles";

interface RadioButtonProps {
  text?: string;
  isChecked?: boolean;
  onPress?: () => void;
}

export const RadioButton = ({ text, isChecked, onPress }: RadioButtonProps) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View
        style={[
          styles.circleWrapper,
          {
            borderColor: isChecked ? COLORS.primaryYellow : COLORS.blackText,
          },
        ]}
      >
        <View style={[styles.circle, { opacity: Number(isChecked) }]} />
      </View>
      <GilroyText fontWeight="medium">{text}</GilroyText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  circle: {
    width: 11,
    height: 11.5,
    borderRadius: 10,
    backgroundColor: COLORS.primaryYellow,
  },
  circleWrapper: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
