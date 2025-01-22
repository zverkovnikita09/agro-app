import { CameraIcon } from "@images/svg/CameraIcon";
import { TrashIcon } from "@images/svg/TrashIcon";
import { COLORS } from "@shared/lib/styles";
import { Button } from "@shared/ui/Button";
import { GilroyText } from "@shared/ui/GilroyText";
import { StyleSheet, View } from "react-native";

interface DocPickerProps {
  text: string;
  onDownload: () => void;
  onDelete: (id: string) => void;
}

export const DocPicker = ({ text, onDownload }: DocPickerProps) => {
  return (
    <View style={styles.wrapper}>
      <Button style={styles.cameraBlock} onPress={onDownload}>
        <CameraIcon width={24} height={24} />
      </Button>
      <GilroyText fontSize={14}>{text}</GilroyText>
      <Button style={styles.deleteButton}>
        <TrashIcon width={24} height={24} />
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
    backgroundColor: COLORS.specialGrey,
  },
  deleteButton: {
    marginLeft: "auto",
  },
});
