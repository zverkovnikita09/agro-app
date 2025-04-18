import { COLORS } from "@shared/lib/styles";
import { FlatList, StyleSheet } from "react-native";
import { useState } from "react";
import { Button, ButtonSize } from "../Button";
import { GilroyText } from "../GilroyText";

interface SelectOption<T extends unknown[]> {
  keyExtractor?: (item: T[number], index: number) => string;
  options?: T;
  optionText: (item: T[number]) => string;
  onSelect?: (item: T[number]) => void;
  noElementsText?: string;
  noPadding?: boolean;
  selectedOption?: (item: T[number]) => boolean;
}

export const SelectOptions = <T extends unknown[]>({
  options,
  keyExtractor,
  optionText,
  onSelect,
  noElementsText,
  noPadding,
  selectedOption,
}: SelectOption<T>) => {
  const [clickedItem, setClickedItem] = useState(-1);

  const renderOptions = ({
    item,
    index,
  }: {
    item: T[number];
    index: number;
  }) => {
    return (
      <Button
        fontWeight="regular"
        fontSize={14}
        onPressIn={() => setClickedItem(index)}
        onPressOut={() => setClickedItem(-1)}
        onPress={() => onSelect?.(item)}
        textStyle={{
          color:
            clickedItem === index || selectedOption?.(item)
              ? COLORS.primaryYellow
              : COLORS.blackText,
        }}
        style={[
          styles.option,
          {
            marginTop: !index ? 0 : 6,
          },
        ]}
      >
        {optionText(item)}
      </Button>
    );
  };

  if (Array.isArray(options) && !options.length) {
    return (
      <GilroyText fontSize={14} style={{ paddingHorizontal: 8, marginTop: 12 }}>
        {noElementsText ?? "Нет доступных элементов"}
      </GilroyText>
    );
  }

  return (
    <FlatList
      style={{
        paddingHorizontal: noPadding ? 0 : 8,
        marginTop: noPadding ? 0 : 12,
      }}
      data={options}
      keyExtractor={keyExtractor}
      renderItem={renderOptions}
      keyboardShouldPersistTaps="handled"
    />
  );
};

const styles = StyleSheet.create({
  option: {
    paddingVertical: 12,
    alignItems: "flex-start",
    borderRadius: 6,
    borderBottomWidth: 1,
    borderColor: COLORS.specialGrey,
  },
});
