import { useMemo, useState } from "react";
import { View } from "react-native";
import { Input } from "../Input";
import { ControlCheckBox } from "./ControlCheckBox";
import { ControlCheckBoxStatus } from ".";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { DefaultCheckBox } from "./DefaultCheckBox";

interface CheckBoxGroupProps<T extends FieldValues, OptionType> {
  withSearch?: boolean;
  controlCheckBoxText?: string;
  withControlCheckbox?: boolean;
  control: Control<T, any>;
  name: keyof T;
  options?: OptionType[];
  getOptionsValue?: (item: OptionType) => string;
  getOptionsLabel?: (item: OptionType) => string;
}

export const CheckBoxGroup = <T extends FieldValues, OptionType>({
  withSearch,
  control,
  getOptionsLabel,
  getOptionsValue,
  name,
  options,
  controlCheckBoxText = "Любой",
  withControlCheckbox,
}: CheckBoxGroupProps<T, OptionType>) => {
  const [searchString, setSearchString] = useState("");

  const { setValue } = useFormContext<T>();
  const controlValue = useWatch({
    control,
    //@ts-ignore
    name,
  });
  const renderOptions = useMemo(() => {
    if (!options?.length) return null;

    const controllers = options.map((item, index) => (
      <Controller
        //@ts-ignore
        name={`${name}.${index}`}
        control={control}
        render={({ field: { value, onChange } }) => {
          return (
            <DefaultCheckBox
              key={index}
              isChecked={!!value}
              onChange={(checked) => {
                onChange(checked ? getOptionsValue?.(item) : "");
              }}
              style={{
                marginLeft: withControlCheckbox ? 20 : 0,
                display: searchString
                  ? getOptionsLabel?.(item)
                      .toUpperCase()
                      .includes(searchString.toLocaleUpperCase())
                    ? "flex"
                    : "none"
                  : "flex",
              }}
            >
              {getOptionsLabel?.(item)}
            </DefaultCheckBox>
          );
        }}
      />
    ));
    return controllers;
  }, [options, searchString]);

  const getControlStatus = (value: unknown): ControlCheckBoxStatus => {
    if (!Array.isArray(value)) return "none";
    const valueLength = value?.filter(Boolean).length;
    if (!valueLength) return "none";
    if (valueLength === options?.length) return "all";

    return "some";
  };

  return (
    <View style={{ gap: 8 }}>
      {withSearch && (
        <Input
          value={searchString}
          onChangeText={setSearchString}
          placeholder="Поиск..."
          style={{
            paddingVertical: 13,
          }}
        />
      )}
      {withControlCheckbox && (
        <ControlCheckBox
          status={getControlStatus(controlValue)}
          onChange={() => {
            const isStatusNone = getControlStatus(controlValue) === "none";
            options?.forEach((item, index) => {
              setValue(
                //@ts-ignore
                `${name}.${index}`,
                isStatusNone ? getOptionsValue?.(item) : ""
              );
            });
          }}
        >
          {controlCheckBoxText}
        </ControlCheckBox>
      )}
      {renderOptions}
    </View>
  );
};
