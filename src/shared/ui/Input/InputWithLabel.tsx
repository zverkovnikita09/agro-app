import {
  NativeSyntheticEvent,
  TextInput,
  TextInputFocusEventData,
  View,
  ViewProps,
} from "react-native";
import { Input, MainInputProps } from ".";
import { GilroyText } from "../GilroyText";
import { forwardRef, useEffect, useState } from "react";
import { COLORS } from "@shared/lib/styles";
import { DefaultInput } from "./DefaultInput";
import { MaskedInput } from "./MaskedInput";

interface InputWithLabelProps extends MainInputProps {
  label: string;
  disabled?: boolean;
  inputStyle?: ViewProps["style"];
  mask?: (string | RegExp)[];
}

export const InputWithLabel = forwardRef<TextInput, InputWithLabelProps>(
  (
    {
      label,
      disabled,
      style,
      inputStyle,
      onFocus,
      onBlur,
      value,
      onChange,
      mask,
      ...props
    },
    ref
  ) => {
    const [fixedLabel, setFixedLabel] = useState(false);

    const onInputFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFixedLabel(true);
      onFocus?.(e);
    };

    const onInputBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFixedLabel(!!value);
      onBlur?.(e);
    };

    useEffect(() => {
      if (!value) return;
      setFixedLabel(true);
    }, [value]);

    return (
      <View style={style}>
        <GilroyText
          style={{
            position: "absolute",
            left: 20,
            top: 15,
            transform: [{ translateY: fixedLabel ? -7 : 0 }],
          }}
          color={fixedLabel || disabled ? COLORS.blackGrey : COLORS.blackText}
          fontSize={fixedLabel ? 12 : 16}
        >
          {label}
        </GilroyText>
        {mask ? (
          <MaskedInput
            mask={mask}
            editable={!disabled}
            value={value}
            ref={ref}
            style={[
              {
                paddingTop: 24,
                paddingBottom: 6,
                borderColor: disabled ? COLORS.blackGrey : COLORS.blackText,
                color: disabled ? COLORS.blackGrey : COLORS.blackText,
              },
              inputStyle,
            ]}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            placeholder=""
            {...props}
          />
        ) : (
          <DefaultInput
            editable={!disabled}
            value={value}
            onChange={onChange}
            placeholder=""
            ref={ref}
            style={[
              {
                paddingTop: 24,
                paddingBottom: 6,
                borderColor: disabled ? COLORS.blackGrey : COLORS.blackText,
                color: disabled ? COLORS.blackGrey : COLORS.blackText,
              },
              inputStyle,
            ]}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            {...props}
          />
        )}
      </View>
    );
  }
);
