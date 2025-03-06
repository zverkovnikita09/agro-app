import { CameraIcon } from "@images/svg/CameraIcon";
import { DockCheckIcon } from "@images/svg/DockCheckIcon";
import { TrashIcon } from "@images/svg/TrashIcon";
import { COLORS } from "@shared/lib/styles";
import { Button } from "@shared/ui/Button";
import { GilroyText } from "@shared/ui/GilroyText";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

interface DocPickerProps {
  text: string;
  onDownload: () => void;
  onDelete: () => void;
  hasImage?: boolean;
}

export const DocPicker = ({
  text,
  onDownload,
  hasImage,
  onDelete,
}: DocPickerProps) => {
  const [isDownloadPressed, setIsDownloadPressed] = useState(false);
  const [isDeletePressed, setIsDeletePressed] = useState(false);

  const onDownloadPressIn = () => {
    setIsDownloadPressed(true);
  };

  const onDeletePressIn = () => {
    setIsDeletePressed(true);
  };

  const onDownloadPressOut = () => {
    setIsDownloadPressed(false);
  };

  const onDeletePressOut = () => {
    setIsDeletePressed(false);
  };

  return (
    <View style={styles.wrapper}>
      <Button
        onPressIn={onDownloadPressIn}
        onPressOut={onDownloadPressOut}
        style={[
          styles.cameraBlock,
          {
            backgroundColor: isDownloadPressed
              ? "#5b5b5b99"
              : COLORS.specialGrey,
          },
        ]}
        onPress={onDownload}
      >
        {hasImage ? (
          <DockCheckIcon width={30} height={30} />
        ) : (
          <CameraIcon
            width={24}
            height={24}
            color={isDownloadPressed ? COLORS.white : COLORS.blackGrey}
          />
        )}
      </Button>
      <GilroyText fontSize={14}>{text}</GilroyText>
      <Button
        onPressIn={onDeletePressIn}
        onPressOut={onDeletePressOut}
        style={styles.deleteButton}
        onPress={onDelete}
      >
        <TrashIcon
          width={24}
          height={24}
          color={isDeletePressed ? COLORS.error : COLORS.blackGrey}
        />
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: COLORS.blackText,
    paddingVertical: 4,
    borderRadius: 12,
    paddingLeft: 4,
    paddingRight: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cameraBlock: {
    width: 46,
    height: 46,
    borderRadius: 12,
  },
  deleteButton: {
    marginLeft: "auto",
  },
});
