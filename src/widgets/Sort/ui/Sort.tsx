import { SelectOptions } from "@shared/ui/Select";
import { StyleSheet, View } from "react-native";
import { SORT_OPTIONS } from "../model/Sort.model";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../model/Sort.slice";
import { SortSelectors } from "../model/Sort.selectors";
import { Title } from "@shared/ui/Title";
import { router } from "expo-router";
import { Button } from "@shared/ui/Button";
import { ArrowLeftIcon } from "@images/svg/ArrowLeftIcon";
import { GilroyText } from "@shared/ui/GilroyText";

export const Sort = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector(SortSelectors.selectSort);

  const onSelect = (item: (typeof SORT_OPTIONS)[number]) => {
    dispatch(setSort(item.value));
    router.back();
  };

  return (
    <View style={styles.wrapper}>
      <Button onPress={() => router.back()} style={styles.backButton}>
        <ArrowLeftIcon width={8} height={16} />
        <GilroyText fontWeight="semi-bold">Назад</GilroyText>
      </Button>
      <Title fontSize={17} style={{ marginBottom: 16 }} fontWeight="semi-bold">
        Сортировка
      </Title>
      <SelectOptions
        noPadding
        optionText={(item) => item.name}
        options={SORT_OPTIONS}
        keyExtractor={(item) => item.name}
        onSelect={onSelect}
        selectedOption={(item) => item.value === sortBy}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
  },
  backButton: {
    flexDirection: "row",
    gap: 6,
    alignSelf: "baseline",
    paddingVertical: 11,
    paddingRight: 11,
    marginBottom: 8,
  },
});
