import { StyleSheet, View } from "react-native";
import { Title } from "@shared/ui/Title";
import { useFormContext } from "react-hook-form";
import { UserInfo } from "@entities/User";
import { FilePicker } from "@shared/ui/FilePicker";
import { DocPicker } from "./DocPicker";

export const StepThree = () => {
  const { setValue, control, watch } = useFormContext<UserInfo>();

  return (
    <>
      <Title fontWeight="bold" fontSize={16} style={{ marginTop: 24 }}>
        Документы
      </Title>
      <View style={styles.inputsContainer}>
        <FilePicker>
          {(onDownload) => (
            <DocPicker
              onDelete={() => {}}
              onDownload={onDownload}
              text="Реквизиты"
            />
          )}
        </FilePicker>
        <FilePicker>
          {(onDownload) => (
            <DocPicker
              onDelete={() => {}}
              onDownload={onDownload}
              text="ПСФЛ"
            />
          )}
        </FilePicker>
        <FilePicker>
          {(onDownload) => (
            <DocPicker onDelete={() => {}} onDownload={onDownload} text="ЕФС" />
          )}
        </FilePicker>
        <FilePicker>
          {(onDownload) => (
            <DocPicker
              onDelete={() => {}}
              onDownload={onDownload}
              text="Налоговая тайна"
            />
          )}
        </FilePicker>
        <FilePicker>
          {(onDownload) => (
            <DocPicker
              onDelete={() => {}}
              onDownload={onDownload}
              text="Патент"
            />
          )}
        </FilePicker>
        <FilePicker>
          {(onDownload) => (
            <DocPicker onDelete={() => {}} onDownload={onDownload} text="УСН" />
          )}
        </FilePicker>
        <FilePicker>
          {(onDownload) => (
            <DocPicker onDelete={() => {}} onDownload={onDownload} text="НДС" />
          )}
        </FilePicker>
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
