import { TextInput, TextInputProps } from "react-native";
import { DefaultInput } from "./DefaultInput";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { InputWithLabel } from "./InputWithLabel";
import { MaskedInput } from "./MaskedInput";
import { Optional } from "@shared/lib/types";
import { ErrorText } from "../ErrorText";
import { InputModal } from "./InputModal";

export interface MainInputProps extends TextInputProps {
  error?: string;
  isModal?: boolean;
  disabled?: boolean;
}

interface AdditionalInputProps {
  mask: (string | RegExp)[];
  label: string;
  clearable?: boolean;
}

type InputProps = MainInputProps &
  (
    | ({ type: "mask" } & Optional<AdditionalInputProps, "label">)
    | ({ type: "label" } & Optional<AdditionalInputProps, "mask">)
    | ({ type?: "text" } & Optional<AdditionalInputProps, "label" | "mask">)
  );

export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      type = "text",
      isModal,
      mask,
      label = "",
      autoFocus,
      error,
      value = "",
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<TextInput>(null);
    useImperativeHandle(ref, () => inputRef.current!, []);

    useEffect(() => {
      if (autoFocus) {
        setTimeout(() => {
          inputRef?.current?.focus();
        }, 100);
        return;
      }
    }, [autoFocus, inputRef]);

    const Component = () => {
      switch (type) {
        case "mask":
          return (
            <MaskedInput
              value={value}
              mask={mask ?? []}
              {...props}
              ref={inputRef}
            />
          );
        case "text": {
          return <DefaultInput value={value} ref={inputRef} {...props} />;
        }
        case "label":
          return (
            <InputWithLabel
              value={value}
              label={label}
              mask={mask}
              {...props}
              ref={inputRef}
              error={error}
            />
          );
        default:
          return <></>;
      }
    };

    if (isModal) {
      return <InputModal error={error}>{Component()}</InputModal>;
    }

    return (
      <>
        {Component()}
        {error && <ErrorText>{error}</ErrorText>}
      </>
    );
  }
);
