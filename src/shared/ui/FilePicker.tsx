import { DocumentPickerAsset, getDocumentAsync } from "expo-document-picker";
import { ReactNode } from "react";
import { Button } from "./Button";

interface FilePickerProps {
  children?: ReactNode | ((pickFile: () => void) => JSX.Element);
  onPress?: (file: DocumentPickerAsset | null) => void;
  type?: string | string[];
}

export const FilePicker = ({
  children,
  onPress,
  type = "image/*",
}: FilePickerProps) => {
  const pickFile = async () => {
    const result = await getDocumentAsync({
      multiple: false,
      type,
      copyToCacheDirectory: true,
    });
    if (result.canceled) return;
    if (result.assets?.[0]) {
      onPress?.(result.assets[0]);
    }
  };

  return typeof children === "function" ? (
    children(pickFile)
  ) : (
    <Button onPress={pickFile}>{children}</Button>
  );
};
