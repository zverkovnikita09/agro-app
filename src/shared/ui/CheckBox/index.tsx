import { ViewProps } from "react-native";
import { PropsWithChildren, useContext } from "react";
import { DefaultCheckBox } from "./DefaultCheckBox";

export type ControlCheckBoxStatus = "all" | "none" | "some";

export interface CheckBoxProps {
  onChange?: (checked?: boolean) => void;
  isChecked?: boolean;
  error?: string;
  style?: ViewProps["style"];
  isControl?: boolean;
}

export const CheckBox = (props: PropsWithChildren<CheckBoxProps>) => {
  return <DefaultCheckBox {...props} />;
};
