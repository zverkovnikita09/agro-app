import { StyleSheet, View } from "react-native";
import { COLORS, SHADOWS } from "@shared/lib/styles";
import { Button, ButtonSize, ButtonTheme } from "./Button";
import { Grid } from "./Grid";
import { InfoBlock } from "./InfoBlock";
import { InfoCircleIcon } from "@images/svg/InfoCircleIcon";
import { Popup } from "./Popup";

export interface ConfirmPopupProps {
  onClose: () => void;
  isOpen?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  title?: string;
  additionalText?: string;
  buttonThemes?: {
    confirm?: ButtonTheme;
    cancel?: ButtonTheme;
  };
  hideConfirm?: boolean;
  confrimText?: string;
  cancelText?: string;
}

export const ConfirmPopup = ({
  isOpen,
  onClose,
  onCancel,
  onConfirm,
  additionalText,
  hideConfirm,
  title = "Подтвердите действие",
  buttonThemes,
  cancelText = "Вернуться",
  confrimText = "Очистить",
}: ConfirmPopupProps) => {
  const handleCancel = () => {
    onClose();
    onCancel?.();
  };

  return (
    <Popup closePopup={onClose} isOpen={isOpen}>
      <InfoBlock
        title={title}
        style={{
          main: styles.container,
          additionalText: styles.additionalText,
        }}
        additionalText={additionalText}
        icon={<InfoCircleIcon width={46} height={46} />}
      >
        <View
          style={{ width: "100%", marginTop: 16, flexDirection: "row", gap: 8 }}
        >
          {!hideConfirm && (
            <Button
              theme={ButtonTheme.OUTLINE}
              size={ButtonSize.M}
              onPress={onConfirm}
              style={{ flex: 1 }}
            >
              {confrimText}
            </Button>
          )}
          <Button
            onPress={handleCancel}
            theme={ButtonTheme.ACCENT_WITH_BLACK_TEXT}
            size={ButtonSize.M}
            style={{ flex: 1 }}
          >
            {cancelText}
          </Button>
        </View>
      </InfoBlock>
    </Popup>
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
});
