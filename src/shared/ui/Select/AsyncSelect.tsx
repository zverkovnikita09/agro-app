import {
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  TextInputChangeEventData,
  TextInputProps,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { useDebounce } from "@shared/hooks/useDebounce";
import { COLORS } from "@shared/lib/styles";
import { useModalState } from "@shared/hooks/useModalState";
import { Input } from "../Input";
import { TextFieldModal } from "../TextFileldModal";

interface AsyncSelectProps<T> {
  searchFunction?: (query: string) => void;
  label: string;
  disabled?: boolean;
  onSearch?: (search: string) => Promise<T>;
  inputKeyboard?: TextInputProps["keyboardType"];
  value?: string;
  minLength?: number;
  setValue?: (value: T extends Array<any> ? T[number] : T) => void;
  children?: (
    elements: Awaited<T>,
    setSelectValue: (value: T extends Array<any> ? T[number] : T) => void
  ) => JSX.Element;
}

export const AsyncSelect = <T,>({
  label,
  disabled,
  onSearch,
  inputKeyboard,
  children,
  value,
  setValue,
  minLength = 3,
}: AsyncSelectProps<T>) => {
  const [options, setOptions] =
    useState<Awaited<ReturnType<Exclude<typeof onSearch, undefined>>>>();
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isModalOpen, openModal, closeModal] = useModalState(false);

  const debouncedSearch = useDebounce(async (query: string) => {
    if (query.length < minLength) return;
    const resp = await onSearch?.(query);
    if (resp) {
      setOptions(resp);
    }
  }, 700);

  const onInputChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setInputValue(e.nativeEvent.text);
    debouncedSearch(e.nativeEvent.text);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = () => {
    setIsFocused(false);
  };

  const onCloseModal = () => {
    closeModal();
    setOptions(undefined);
  };

  const onSelectOption = (
    optionValue: T extends Array<any> ? T[number] : T
  ) => {
    setValue?.(optionValue);
    onCloseModal();
  };

  useEffect(() => {
    if (typeof value === "string") setInputValue(value);
  }, [value, isModalOpen]);

  return (
    <>
      <TextFieldModal isOpen={isModalOpen} onClose={onCloseModal}>
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
        {isFocused && options && children?.(options, onSelectOption)}
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
        />
      </Pressable>
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
