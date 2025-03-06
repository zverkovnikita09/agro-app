import { COLORS } from "@shared/lib/styles";
import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  TextInputChangeEventData,
  TextInputProps,
} from "react-native";
import { useEffect, useMemo, useState } from "react";
import { ArrowDownIcon } from "@images/svg/ArrowDownIcon";
import { useModalState } from "@shared/hooks/useModalState";
import { TextFieldModal } from "../TextFileldModal";
import { Input } from "../Input";

interface SelectWithSearchProps<T> {
  label: string;
  options?: T[];
  isModal?: boolean;
  disabled?: boolean;
  inputKeyboard?: TextInputProps["keyboardType"];
  value?: string;
  setValue?: (value: T extends Array<any> ? T[number] : T) => void;
  children?: (
    elements: T[],
    setSelectValue: (value: T extends Array<any> ? T[number] : T) => void
  ) => JSX.Element;
  searchByKey?: keyof T;
  error?: string;
}

export const SelectWithSearch = <T,>({
  label,
  disabled,
  inputKeyboard,
  children,
  value,
  setValue,
  options,
  isModal = true,
  searchByKey,
  error,
}: SelectWithSearchProps<T>) => {
  const [inputValue, setInputValue] = useState("");

  const filteredOptions = useMemo<T[] | undefined>(() => {
    if (searchByKey)
      return options?.filter((item) =>
        typeof item[searchByKey] === "string"
          ? item[searchByKey].includes(inputValue)
          : item
      );
    return options?.filter((item) =>
      typeof item === "string" ? item.includes(inputValue) : item
    );
  }, [inputValue, options]);

  const [isFocused, setIsFocused] = useState(false);
  const [isModalOpen, openModal, closeModal] = useModalState(false);

  const onInputChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setInputValue(e.nativeEvent.text);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const onSelectOption = (
    optionValue: T extends Array<any> ? T[number] : T
  ) => {
    setValue?.(optionValue);
    closeModal();
  };

  useEffect(() => {
    if (typeof value === "string") setInputValue(value);
  }, [value, isModalOpen]);

  if (isModal)
    return (
      <>
        <TextFieldModal isOpen={isModalOpen} onClose={closeModal}>
          <Input
            type="label"
            disabled={disabled}
            style={styles.input}
            label={label}
            value={inputValue}
            onChange={onInputChange}
            keyboardType={inputKeyboard}
            onFocus={onFocus}
            onBlur={onBlur}
            autoFocus
          />
          {isFocused &&
            filteredOptions &&
            children?.(filteredOptions, onSelectOption)}
        </TextFieldModal>
        <Pressable
          style={styles.wrapper}
          onPress={disabled ? undefined : openModal}
        >
          <Input
            type="label"
            editable={false}
            disabled={disabled}
            style={styles.input}
            label={label}
            value={value}
            multiline={true}
            error={error}
          />
        </Pressable>
      </>
    );

  return (
    <>
      <Input
        type="label"
        disabled={disabled}
        style={styles.input}
        label={label}
        value={inputValue}
        onChange={onInputChange}
        keyboardType={inputKeyboard}
        onFocus={onFocus}
        onBlur={onBlur}
        autoFocus
      />
      {isFocused &&
        filteredOptions &&
        children?.(filteredOptions, onSelectOption)}
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  input: {},
  options: {
    position: "absolute",
    borderWidth: 1,
    borderColor: COLORS.blackText,
    width: "100%",
    padding: 10,
    backgroundColor: COLORS.white,
    borderRadius: 6,
    top: "100%",
    marginTop: 7,
    zIndex: 999,
    gap: 8,
  },
});
