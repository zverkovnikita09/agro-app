import { TextInput, TextInputProps } from "react-native";
import { DefaultInput } from "./DefaultInput";
import { forwardRef, useMemo } from "react";
import { TextFieldModal } from "../TextFileldModal";
import { InputWithLabel } from "./InputWithLabel";
import { useModalState } from "@shared/hooks/useModalState";
import { MaskedInput } from "./MaskedInput";
import { Optional } from "@shared/lib/types";

export interface MainInputProps extends TextInputProps {
  error?: string;
  isModal?: boolean;
  disabled?: boolean;
}

interface AdditionalInputProps {
  mask: (string | RegExp)[];
  label: string;
}

type InputProps = MainInputProps &
  (
    | ({ type: "mask" } & Optional<AdditionalInputProps, "label">)
    | ({ type: "label" } & Optional<AdditionalInputProps, "mask">)
    | ({ type?: "text" } & Optional<AdditionalInputProps, "label" | "mask">)
  );

export const Input = forwardRef<TextInput, InputProps>(
  ({ type = "text", isModal, mask, label = "", ...props }, ref) => {
    const [isModalOpen, openModal, closeModal] = useModalState();

    const Component = () => {
      switch (type) {
        case "mask":
          return <MaskedInput mask={mask ?? []} {...props} ref={ref} />;
        case "text": {
          return <DefaultInput {...props} ref={ref} />;
        }
        case "label":
          return (
            <InputWithLabel label={label} mask={mask} {...props} ref={ref} />
          );
        default:
          return <></>;
      }
    };

    if (isModal) {
      return <TextFieldModal>{Component()}</TextFieldModal>;
    }

    return Component();
  }
);
