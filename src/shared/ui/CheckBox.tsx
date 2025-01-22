import { View, ViewProps } from "react-native";
import { GilroyText } from "./GilroyText";
import { PropsWithChildren } from "react";
import { Button } from "./Button";
import { ErrorText } from "./ErrorText";
import { COLORS } from "@shared/lib/styles";
import { CheckBoxIcon } from "@images/svg/CheckBoxIcon";

interface CheckBoxProps {
  onChange?: () => void;
  isChecked?: boolean;
  error?: string;
  style?: ViewProps["style"];
}

export const CheckBox = ({
  isChecked,
  children,
  error,
  onChange,
  style,
}: PropsWithChildren<CheckBoxProps>) => {
  return (
    <>
      <Button
        onPress={onChange}
        style={[
          {
            flexDirection: "row",
            gap: 8,
            alignItems: "flex-start",
            alignSelf: "baseline",
          },
          style,
        ]}
      >
        <View
          style={{
            marginTop: 2,
            justifyContent: "center",
            alignItems: "center",
            width: 20,
            height: 20,
            borderWidth: 1,
            borderColor: COLORS.blackText,
            borderRadius: 6,
            backgroundColor: isChecked ? COLORS.primaryYellow : COLORS.white,
          }}
        >
          {isChecked && <CheckBoxIcon />}
        </View>
        <GilroyText>{children}</GilroyText>
      </Button>
      {error && <ErrorText>{error}</ErrorText>}
    </>
  );
};
