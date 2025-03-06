import { Pressable, TextInput, View } from "react-native";
import { TextFieldModal } from "../TextFileldModal";
import {
  Children,
  cloneElement,
  isValidElement,
  PropsWithChildren,
  useRef,
  useState,
} from "react";
import { useModalState } from "@shared/hooks/useModalState";
import { MainInputProps } from ".";
import { ErrorText } from "../ErrorText";

export const InputModal = ({
  children,
  error,
}: PropsWithChildren<Pick<MainInputProps, "error">>) => {
  const [value, setValue] = useState("");
  const [isModalOpen, openModal, closeModal] = useModalState();

  const child = Children.only(children);

  const inputRef = useRef<TextInput>(null);

  const InputTrigger = () => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        //@ts-ignore
        editable: false,
      });
    }
    return null;
  };

  const ModalInnerInput = () => {
    if (isValidElement(child)) {
      //@ts-ignore
      return cloneElement<TextInput>(child, {
        onChangeText: (text: string) => setValue(text),
        value,
        onSubmitEditing: () => {
          child.props.onChangeText(value);
          closeModal();
        },
        ref: inputRef,
      });
    }
    return null;
  };

  const handleOpenModal = () => {
    openModal();
    if (isValidElement(child)) {
      setValue(child.props.value);
    }
    setTimeout(() => {
      inputRef?.current?.focus();
    }, 300);
  };

  return (
    <View>
      <TextFieldModal isOpen={isModalOpen} onClose={closeModal}>
        {ModalInnerInput()}
      </TextFieldModal>
      <Pressable onPress={handleOpenModal}>{InputTrigger()}</Pressable>
      {error && <ErrorText>{error}</ErrorText>}
    </View>
  );
};
