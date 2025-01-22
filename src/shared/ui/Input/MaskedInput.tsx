import { forwardRef } from "react";
import { MainInputProps } from ".";
import MaskInput from "react-native-mask-input";
import { StyleSheet, TextInput } from "react-native";
import { COLORS } from "@shared/lib/styles";

interface MaskedInputProps extends MainInputProps {
  mask: (string | RegExp)[];
  error?: string;
}

export const MaskedInput = forwardRef<TextInput, MaskedInputProps>(
  ({ mask, error, style, ...props }, ref) => {
    return (
      <MaskInput
        ref={ref}
        mask={mask}
        {...props}
        selectionColor={COLORS.blackText}
        style={[
          styles.input,
          style,
          { borderColor: error ? COLORS.error : COLORS.blackText },
        ]}
        maskAutoComplete
      />
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
