import { COLORS } from "@shared/lib/styles";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { StyleSheet, TextInput } from "react-native";
import { ErrorText } from "../ErrorText";
import { MainInputProps } from ".";

export const DefaultInput = forwardRef<TextInput, MainInputProps>(
  ({ style, error, onChangeText, ...props }, ref) => {
    const inputRef = useRef<TextInput>(null);
    useImperativeHandle(ref, () => inputRef.current!, []);

    return (
      <>
        <TextInput
          ref={inputRef}
          {...props}
          style={[
            styles.input,
            { borderColor: error ? COLORS.error : COLORS.blackText },
            style,
          ]}
          selectionColor={COLORS.blackText}
          onChangeText={onChangeText}
        />
        {error && <ErrorText style={styles.error}>{error}</ErrorText>}
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
