import { PropsWithChildren } from "react";
import { CheckBoxProps, ControlCheckBoxStatus } from ".";
import { Button } from "../Button";
import { View, ViewProps } from "react-native";
import { COLORS } from "@shared/lib/styles";
import { GilroyText } from "../GilroyText";
import { CheckBoxIcon } from "@images/svg/CheckBoxIcon";
import { MinusIcon } from "@images/svg/MinusIcon";

interface ControlCheckBoxProps {
  status: ControlCheckBoxStatus;
  onChange?: () => void;
  style?: ViewProps["style"];
}

export const ControlCheckBox = ({
  children,
  onChange,
  style,
  status,
}: PropsWithChildren<ControlCheckBoxProps>) => {
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
            backgroundColor:
              status === "none" ? COLORS.white : COLORS.primaryYellow,
          }}
        >
          {status === "all" && <CheckBoxIcon width={11} height={8} />}
          {status === "some" && <MinusIcon width={10} height={2} />}
        </View>
        <GilroyText>{children}</GilroyText>
      </Button>
    </>
  );
};
