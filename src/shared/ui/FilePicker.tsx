import { getDocumentAsync } from "expo-document-picker";
import { useState } from "react";
import {} from "expo-file-system";

interface FilePickerProps {
  children?: (pickFile: () => void) => JSX.Element;
}

export const FilePicker = ({ children }: FilePickerProps) => {
  const [file, setFile] = useState(null);

  const pickFile = async () => {
    const result = await getDocumentAsync({ multiple: false });
    console.log(result.assets);
  };

  return children?.(pickFile);
};
