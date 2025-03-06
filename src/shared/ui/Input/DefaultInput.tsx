import { COLORS } from "@shared/lib/styles";
import { forwardRef } from "react";
import { StyleSheet, TextInput } from "react-native";
import { MainInputProps } from ".";

export const DefaultInput = forwardRef<TextInput, MainInputProps>(
  ({ style, error, onChangeText, disabled, ...props }, ref) => {
    return (
      <>
        <TextInput
          ref={ref}
          editable={!disabled}
          {...props}
          style={[
            styles.input,
            {
              borderColor: error
                ? COLORS.error
                : disabled
                ? COLORS.blackGrey
                : COLORS.blackText,
              color: disabled ? COLORS.blackGrey : COLORS.blackText,
            },
            style,
          ]}
          selectionColor={COLORS.blackText}
          onChangeText={onChangeText}
        />
      </>
    );
  }
);

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 20,
    paddingVertical: 17,
    fontSize: 14,
    borderWidth: 1,
    width: "100%",
    borderRadius: 10,
    fontFamily: "Gilroy",
  },
  error: {
    marginTop: 5,
  },
});
