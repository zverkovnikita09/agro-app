export * from "./SelectOptions";

import { Optional } from "@shared/lib/types";
import { AsyncSelect } from "./AsyncSelect";
import { SelectWithSearch } from "./SelectWithSearch";
import { TextInputProps } from "react-native";

export interface MainSelectProps<T> {
  label: string;
  disabled?: boolean;
  inputKeyboard?: TextInputProps["keyboardType"];
  value?: string;
  setValue?: (value: T extends Array<any> ? T[number] : T) => void;
}

interface AdditionalSelectProps<T> {
  onSearch: (search: string) => Promise<T>;
  minLength?: number;
  options: T[];
  isModal?: boolean;
  searchByKey?: keyof T;
  children?: (
    elements: T[],
    setSelectValue: (value: T extends Array<any> ? T[number] : T) => void
  ) => JSX.Element;
}

type SelectProps<T> = MainSelectProps<T> &
  (
    | ({ type: "async" } & Optional<
        Omit<AdditionalSelectProps<T>, "children">,
        "options"
      > & {
          children?: (
            elements: Awaited<T>,
            setSelectValue: (
              value: T extends Array<any> ? T[number] : T
            ) => void
          ) => JSX.Element;
        })
    | ({ type: "search" } & Optional<
        AdditionalSelectProps<T>,
        "minLength" | "onSearch"
      >)
    | ({ type?: "default" } & Optional<
        AdditionalSelectProps<T>,
        "minLength" | "onSearch"
      >)
  );

export const Select = <T,>({
  type = "default",
  isModal,
  ...props
}: SelectProps<T>) => {
  const Component = () => {
    switch (type) {
      case "async":
        return <AsyncSelect {...props} />;
      case "search": {
        //@ts-ignore
        return <SelectWithSearch isModal={isModal} {...props} />;
      }
      case "default":
        return <></>;
      default:
        return <></>;
    }
  };

  return Component();
};
