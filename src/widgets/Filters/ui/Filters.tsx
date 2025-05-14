import { COLORS } from "@shared/lib/styles";
import { Button, ButtonSize, ButtonTheme } from "@shared/ui/Button";
import { Title } from "@shared/ui/Title";
import { StyleSheet, View } from "react-native";
import {
  ScrollView,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { FilterAccordion } from "./FilterAccordion";
import { GilroyText } from "@shared/ui/GilroyText";
import { Grid } from "@shared/ui/Grid";
import { Input } from "@shared/ui/Input";
import { useDispatch, useSelector } from "react-redux";
import { FiltersSelectors } from "../model/Filters.selectors";
import { setFilters } from "../model/Filters.slice";
import { useEffect, useRef } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { FiltersType } from "../model/Filters.model";
import { useGetOptionsQuery, useGetRegionsQuery } from "../model/Filters.api";
import { RadioButtonGroup } from "@shared/ui/RadioButton";
import { CheckBoxGroup } from "@shared/ui/CheckBox/CheckBoxGroup";
import { router } from "expo-router";
import { ArrowLeftIcon } from "@images/svg/ArrowLeftIcon";
import { LoadingBlock } from "@shared/ui/LoadingBlock";
import { addNotification, NotificationType } from "@entities/Notifications";

const minDistance = 0;
const maxDistance = 3000;

const WEEKEND_OPTIONS = [
  { label: "СБ", value: "суббота" },
  { label: "ВС", value: "воскресенье" },
];

export const Filters = () => {
  const dispatch = useDispatch();
  const savedFilters = useSelector(FiltersSelectors.selectFilters);
  const scrollRef = useRef<ScrollView>(null);

  const methods = useForm<FiltersType>({
    defaultValues: {
      tariff_from: "",
      tariff_to: "",
    },
  });

  const { control, setValue, reset, handleSubmit } = methods;

  const { data: options, isLoading: isOptionsLoading } = useGetOptionsQuery();
  const { data: regions, isLoading: isRegionsLoading } = useGetRegionsQuery();

  const isLoading = isOptionsLoading || isRegionsLoading;

  useEffect(() => {
    if (!savedFilters || isLoading) return;
    (Object.entries(savedFilters) as [keyof FiltersType, any][]).forEach(
      ([key, value]) => {
        if (!value && typeof value !== "number") {
          return;
        }
        if (Array.isArray(value) && value.length) {
          if (key === "crop") {
            options?.crop.forEach((item, index) => {
              setValue(`crop.${index}`, value.includes(item) ? item : "");
            });
          }
          if (key === "load_region") {
            regions?.load_regions.forEach((item, index) => {
              setValue(
                `load_region.${index}`,
                value.includes(item) ? item : ""
              );
            });
          }
          if (key === "load_types") {
            options?.load_types.forEach(({ id }, index) => {
              setValue(`load_types.${index}`, value.includes(id) ? id : "");
            });
          }
          if (key === "timeslot") {
            options?.timeslot.forEach((item, index) => {
              setValue(`timeslot.${index}`, value.includes(item) ? item : "");
            });
          }
          if (key === "unload_methods") {
            options?.unload_methods.forEach(({ id }, index) => {
              setValue(`unload_methods.${index}`, value.includes(id) ? id : "");
            });
          }
          if (key === "unload_region") {
            regions?.unload_regions.forEach((item, index) => {
              setValue(
                `unload_region.${index}`,
                value.includes(item) ? item : ""
              );
            });
          }
          return;
        }
        if (key === "clarification_of_the_weekend") {
          setValue(
            "weekend_state.0",
            value.includes("суббота") ? "суббота" : ""
          );
          setValue(
            "weekend_state.1",
            value.includes("воскресенье") ? "воскресенье" : ""
          );
          return;
        }
        setValue(key, value);
      }
    );
  }, [savedFilters, isLoading]);

  const onSubmit = (data: FiltersType) => {
    const optimizedData = (
      Object.entries(data) as [
        keyof FiltersType,
        FiltersType[keyof FiltersType]
      ][]
    ).reduce<FiltersType>((acc, [key, value]) => {
      if (key === "weekend_state") {
        const weekend_value = (value as string[]).filter(Boolean);
        if (weekend_value.length) {
          return {
            ...acc,
            clarification_of_the_weekend: weekend_value.join(" и "),
          };
        }
        return acc;
      }
      if (key === "distance_from" && value === minDistance) {
        return acc;
      }
      if (key === "distance_to" && value === maxDistance) {
        return acc;
      }
      if (Array.isArray(value)) {
        return { ...acc, [key]: value.filter(Boolean) };
      }
      if (!value && typeof value !== "number") return acc;
      return { ...acc, [key]: value };
    }, {});

    if (
      data.tariff_from &&
      data.tariff_to &&
      +data.tariff_from > +data.tariff_to
    ) {
      optimizedData.tariff_to = data.tariff_from;
      optimizedData.tariff_from = data.tariff_to;
    }
    dispatch(setFilters(optimizedData));
    router.back();
  };

  const handleReset = () => {
    reset();
    dispatch(
      addNotification({
        id: performance.now.toString(),
        type: NotificationType.SUCCESS,
        message: "Фильтры очищены",
      })
    );
  };

  return (
    <GestureHandlerRootView>
      <FormProvider {...methods}>
        <Button onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeftIcon width={8} height={16} />
          <GilroyText fontWeight="semi-bold">Назад</GilroyText>
        </Button>
        <View style={styles.header}>
          <Title fontSize={17} fontWeight="semi-bold">
            Фильтры
          </Title>
          <Button
            fontWeight="medium"
            fontSize={13}
            color={COLORS.primaryYellow}
            onPress={handleReset}
          >
            Очистить все
          </Button>
        </View>
        {isLoading ? (
          <LoadingBlock style={styles.loading} />
        ) : (
          <ScrollView
            ref={scrollRef}
            keyboardShouldPersistTaps={"handled"}
            // onContentSizeChange={handleContentChange}
            contentContainerStyle={{
              paddingHorizontal: 16,
            }}
          >
            <FilterAccordion title="Расстояние">
              <Grid gap={12}>
                {(columnStyle) => (
                  <>
                    <Controller
                      control={control}
                      name="distance_from"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          placeholder="От"
                          value={value?.toString()}
                          onChangeText={onChange}
                          keyboardType="number-pad"
                          style={columnStyle}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="distance_to"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          placeholder="До"
                          value={value?.toString()}
                          onChangeText={onChange}
                          keyboardType="number-pad"
                          style={columnStyle}
                        />
                      )}
                    />
                  </>
                )}
              </Grid>
            </FilterAccordion>
            {!!regions?.load_regions?.length && (
              <FilterAccordion title="Регион погрузки">
                <CheckBoxGroup
                  options={regions.load_regions}
                  control={control}
                  name="load_region"
                  withSearch
                  getOptionsLabel={(item) => item}
                  getOptionsValue={(item) => item}
                />
              </FilterAccordion>
            )}
            {!!regions?.unload_regions?.length && (
              <FilterAccordion title="Регион выгрузки">
                <CheckBoxGroup
                  options={regions.unload_regions}
                  control={control}
                  name="unload_region"
                  withSearch
                  getOptionsLabel={(item) => item}
                  getOptionsValue={(item) => item}
                />
              </FilterAccordion>
            )}
            {!!options?.crop?.length && (
              <FilterAccordion title="Культура">
                <CheckBoxGroup
                  options={options.crop}
                  control={control}
                  name="crop"
                  getOptionsLabel={(item) => item}
                  getOptionsValue={(item) => item}
                />
              </FilterAccordion>
            )}
            <FilterAccordion title="Стоимость перевозки ₽">
              <Grid gap={12}>
                {(columnStyle) => (
                  <>
                    <Controller
                      control={control}
                      name="tariff_from"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          placeholder="От"
                          value={value}
                          onChangeText={onChange}
                          keyboardType="number-pad"
                          style={columnStyle}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="tariff_to"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          placeholder="До"
                          value={value}
                          onChangeText={onChange}
                          keyboardType="number-pad"
                          style={columnStyle}
                        />
                      )}
                    />
                  </>
                )}
              </Grid>
            </FilterAccordion>
            {!!options?.timeslot?.length && (
              <FilterAccordion title="Таймслот">
                <CheckBoxGroup
                  options={options.timeslot}
                  control={control}
                  name="timeslot"
                  withControlCheckbox
                  getOptionsLabel={(item) => item}
                  getOptionsValue={(item) => item}
                />
              </FilterAccordion>
            )}
            {!!options?.load_types?.length && (
              <FilterAccordion title="Тип транспорта">
                <CheckBoxGroup
                  options={options.load_types}
                  control={control}
                  name="load_types"
                  getOptionsLabel={(item) => item.title}
                  getOptionsValue={(item) => item.id}
                  withControlCheckbox
                />
              </FilterAccordion>
            )}
            <FilterAccordion title="Возможность перегруза">
              <Controller
                name="is_overload"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <RadioButtonGroup
                    buttons={[
                      { value: undefined, text: "Не указано" },
                      { value: 1, text: "Да" },
                      { value: 0, text: "Нет" },
                    ]}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </FilterAccordion>
            <FilterAccordion title="Длина весов (не менее) м">
              <Controller
                control={control}
                name="scale_length"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Укажите длину"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="number-pad"
                  />
                )}
              />
            </FilterAccordion>
            <FilterAccordion title="Ограничение по высоте (не менее) м">
              <Controller
                control={control}
                name="height_limit"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Укажите ограничение по высоте"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="number-pad"
                  />
                )}
              />
            </FilterAccordion>
            <FilterAccordion title="Грузят в выходные">
              <CheckBoxGroup
                options={WEEKEND_OPTIONS}
                control={control}
                name="weekend_state"
                getOptionsLabel={(item) => item.label}
                getOptionsValue={(item) => item.value}
                withControlCheckbox
                controlCheckBoxText="Грузят в выходные"
              />
            </FilterAccordion>
            {!!options?.unload_methods.length && (
              <FilterAccordion title="Тип выгрузки">
                <CheckBoxGroup
                  options={options.unload_methods}
                  control={control}
                  name="unload_methods"
                  getOptionsLabel={(item) => item.title}
                  getOptionsValue={(item) => item.id}
                />
              </FilterAccordion>
            )}
            <FilterAccordion title="Хартия">
              <Controller
                name="is_full_charter"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <RadioButtonGroup
                    buttons={[
                      { value: undefined, text: "Не указано" },
                      { value: 1, text: "Полная" },
                      { value: 0, text: "Не полная" },
                    ]}
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </FilterAccordion>
          </ScrollView>
        )}
        <View style={styles.footer}>
          {/* <Toggle
            isChecked={isSaveFilters}
            setChecked={(value) => dispatch(setSaveFilters(value))}
            title="Сохранить фильтры"
            fontSize={16}
            fontWeight="semi-bold"
            style={{ paddingVertical: 12 }}
          /> */}
          <Button
            size={ButtonSize.M}
            theme={ButtonTheme.ACCENT_WITH_BLACK_TEXT}
            onPress={handleSubmit(onSubmit)}
          >
            Применить фильтры
          </Button>
        </View>
      </FormProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  footer: {
    padding: 4,
  },
  backButton: {
    flexDirection: "row",
    gap: 6,
    alignSelf: "baseline",
    paddingVertical: 11,
    paddingRight: 11,
    marginBottom: 8,
    marginLeft: 16,
  },
  loading: {
    flex: 1,
    zIndex: 1,
    backgroundColor: COLORS.white,
  },
});
