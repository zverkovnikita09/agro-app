import { COLORS } from "@shared/lib/styles";
import { Pressable, StyleSheet } from "react-native";
import { ArrowDownIcon } from "@images/svg/ArrowDownIcon";
import { useModalState } from "@shared/hooks/useModalState";
import { TextFieldModal } from "../TextFileldModal";
import { Input } from "../Input";
import { MainSelectProps } from ".";

interface DefaultSelectProps<T> extends MainSelectProps<T> {
  options?: T[];
  isModal?: boolean;
  value?: string;
  children?: (
    elements: T[],
    setSelectValue: (value: T extends Array<any> ? T[number] : T) => void
  ) => JSX.Element;
  searchByKey?: keyof T;
}

export const DefaultSelect = <T,>({
  label,
  disabled,
  children,
  value,
  setValue,
  options,
  isModal = true,
}: DefaultSelectProps<T>) => {
  const [isModalOpen, openModal, closeModal] = useModalState(false);

  const onSelectOption = (
    optionValue: T extends Array<any> ? T[number] : T
  ) => {
    setValue?.(optionValue);
    closeModal();
  };

  if (isModal)
    return (
      <>
        <TextFieldModal isOpen={isModalOpen} onClose={closeModal}>
          {options && children?.(options, onSelectOption)}
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

  return (
    <>
      <Input
        type="label"
        disabled={disabled}
        style={styles.input}
        label={label}
        editable={false}
      />
      {options && children?.(options, onSelectOption)}
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
