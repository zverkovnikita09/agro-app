import { Modal, View } from "react-native";
import { Button } from "./Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PropsWithChildren } from "react";
import { GilroyText } from "./GilroyText";
import { ArrowLeftIcon } from "@images/svg/ArrowLeftIcon";

interface TextFieldModalProps {
  onClose?: () => void;
  isOpen?: boolean;
}

export const TextFieldModal = ({
  isOpen,
  onClose,
  children,
}: PropsWithChildren<TextFieldModalProps>) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={isOpen}
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <Button
            onPress={onClose}
            style={{
              flexDirection: "row",
              gap: 6,
              paddingVertical: 11,
              paddingRight: 11,
            }}
          >
            <ArrowLeftIcon width={8} height={16} />
            <GilroyText fontWeight="semi-bold">Назад</GilroyText>
          </Button>
        </View>
        {children}
      </View>
    </Modal>
  );
};
