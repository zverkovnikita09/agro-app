import { Animated, Modal, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS, SHADOWS } from "@shared/lib/styles";
import { Button, ButtonSize, ButtonTheme } from "./Button";
import { Grid } from "./Grid";
import { CloseButton } from "./CloseButton";
import { InfoBlock } from "./InfoBlock";
import { InfoCircleIcon } from "@images/svg/InfoCircleIcon";

export interface ConfirmPopupProps {
  onClose?: () => void;
  isOpen?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  title?: string;
  additionalText?: string;
  buttonThemes?: {
    confirm?: ButtonTheme;
    cancel?: ButtonTheme;
  };
}

export const ConfirmPopup = ({
  isOpen,
  onClose,
  onCancel,
  onConfirm,
  additionalText,
  title = "Подтвердите действие",
}: ConfirmPopupProps) => {
  const insets = useSafeAreaInsets();
  const opacity = new Animated.Value(0);
  const transformY = new Animated.Value(-100);

  const closePopup = () => {
    onClose?.();
  };

  return (
    <Modal
      animationType="none"
      visible={isOpen}
      onRequestClose={closePopup}
      transparent={true}
      statusBarTranslucent
    >
      <View
        style={[
          styles.overlay,
          { paddingTop: insets.top, paddingBottom: insets.bottom },
        ]}
      >
        <InfoBlock
          title={title}
          style={{
            main: styles.container,
            additionalText: styles.additionalText,
          }}
          additionalText={additionalText}
          icon={<InfoCircleIcon width={46} height={46} />}
        >
          <CloseButton style={styles.close} onPress={closePopup} />
          <Grid gap={8} style={{ width: "100%", marginTop: 16 }}>
            <Button
              theme={ButtonTheme.OUTLINE}
              size={ButtonSize.M}
              onPress={onConfirm}
            >
              Очистить
            </Button>
            <Button
              onPress={onCancel}
              theme={ButtonTheme.ACCENT_WITH_BLACK_TEXT}
              size={ButtonSize.M}
            >
              Вернуться
            </Button>
          </Grid>
        </InfoBlock>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: COLORS.white,
    width: 360,
    boxShadow: SHADOWS.bottom,
    borderRadius: 12,
  },
  overlay: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: "#000000bf",
    alignItems: "center",
    justifyContent: "center",
  },
  additionalText: {
    color: COLORS.blackGrey,
  },
  close: {
    position: "absolute",
    top: 15,
    right: 15,
  },
});
