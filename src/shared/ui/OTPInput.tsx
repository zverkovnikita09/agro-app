import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  ViewProps,
} from "react-native";
import { ErrorText } from "./ErrorText";
import { Input } from "./Input";
import { useEffect, useRef, useState } from "react";
import { COLORS } from "@shared/lib/styles";
import { GilroyText } from "./GilroyText";
import { InputCaret } from "./InputCaret";

interface OTPInputProps {
  error?: string;
  length?: number;
  onChange: (code: string) => void;
  otp: string;
  setPinReady?: () => void;
  style?: ViewProps["style"];
  onSubmit?: () => void;
}

export const OTPInput = ({
  error,
  length = 5,
  onChange,
  otp = "",
  style,
  onSubmit,
}: OTPInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const onOtpBlockClick = () => {
    inputRef.current?.blur();
    inputRef?.current?.focus();
  };

  useEffect(() => {
    if (otp.length === length) {
      onSubmit?.();
    }
  }, [otp]);

  return (
    <>
      <Input
        value={otp}
        onChangeText={onChange}
        ref={inputRef}
        maxLength={length}
        keyboardType="number-pad"
        autoComplete="sms-otp"
        textContentType="oneTimeCode"
        onSubmitEditing={onSubmit}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={styles.input}
        autoFocus
      />
      <Pressable style={[styles.otpBlock, style]} onPress={onOtpBlockClick}>
        {[...new Array(length)].map((_, i) => {
          return (
            <View key={i} style={[styles.inputCell]}>
              {i === otp?.length && isFocused ? (
                <InputCaret style={styles.caret} />
              ) : (
                <GilroyText fontSize={32}>{otp?.[i] ?? ""}</GilroyText>
              )}
            </View>
          );
        })}
      </Pressable>
      {error && <ErrorText style={styles.error}>{error}</ErrorText>}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 1,
    width: 1,
    position: "absolute",
    opacity: 0,
  },
  otpBlock: {
    flexDirection: "row",
    gap: 12,
  },
  inputCell: {
    borderWidth: 1,
    borderColor: COLORS.blackText,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: 51,
    height: 56,
    borderRadius: 6,
  },
  caret: {
    position: "absolute",
  },
  error: {
    marginTop: 5,
  },
});
