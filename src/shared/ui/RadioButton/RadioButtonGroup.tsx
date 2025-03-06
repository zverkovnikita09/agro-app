import { Pressable, StyleSheet, View } from "react-native";
import { GilroyText } from "../GilroyText";
import { COLORS } from "@shared/lib/styles";
import { RadioButton } from "./RadioButton";

interface RadioButtonGroupProps<T> {
  buttons?: { text?: string; value: T }[];
  onChange?: (value: T) => void;
  value?: T;
}

export const RadioButtonGroup = <T,>({
  onChange,
  buttons,
  value,
}: RadioButtonGroupProps<T>) => {
  if (!buttons?.length) return null;

  return (
    <View style={{ gap: 8 }}>
      {buttons.map(({ text, value: buttonValue }) => (
        <RadioButton
          key={text}
          text={text ?? String(value)}
          isChecked={value === buttonValue}
          onPress={() => onChange?.(buttonValue)}
        />
      ))}
    </View>
  );
};
