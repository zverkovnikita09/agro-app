import { StyleSheet, View } from "react-native";
import { Title } from "@shared/ui/Title";
import { useFormContext } from "react-hook-form";
import { File, FilePicker } from "@shared/ui/FilePicker";
import { DocPicker } from "./DocPicker";
import { FilesToSendType, ProfileForm } from "../model/ProfileForm.model";

const FILE_NAMES = ["Реквизиты", "ПСФЛ", "ЕФС", "Патент", "УСН", "НДС"];

export const StepThree = () => {
  const { setValue, watch } = useFormContext<ProfileForm>();

  const files = watch("files");

  const handleFilesChange = (name: string, file: File | null) => {
    if (!file) return;

    const existingFile = files?.find((item) => item.file_type === name);

    const newFiles: FilesToSendType[] =
      files
        ?.filter((item) => item.file_type !== existingFile?.file_type)
        .concat([
          {
            file_type: name,
            file,
            file_id: existingFile?.file_id,
          },
        ]) ?? [];

    setValue("files", newFiles);
  };

  const handleFileDelete = (name: string) => {
    const newFiles = files?.filter((item) => item.file_type !== name);
    setValue("files", newFiles);
  };

  return (
    <>
      <Title fontWeight="bold" fontSize={16} style={{ marginTop: 24 }}>
        Документы
      </Title>
      <View style={styles.inputsContainer}>
        {FILE_NAMES.map((item) => (
          <FilePicker
            key={item}
            onPress={(file) => handleFilesChange(item, file)}
            type={[
              "image/*",
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ]}
          >
            {(onDownload) => (
              <DocPicker
                hasImage={!!files?.find((file) => file.file_type === item)}
                onDelete={() => handleFileDelete(item)}
                onDownload={onDownload}
                text={item}
              />
            )}
          </FilePicker>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  inputsContainer: {
    gap: 16,
    marginTop: 16,
  },
});
