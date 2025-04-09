import { getDocumentAsync } from "expo-document-picker";
import { ReactNode, useEffect } from "react";
import { Button } from "./Button";
import {
  launchImageLibraryAsync,
  requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { Modal, StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useModalState } from "@shared/hooks/useModalState";
import { COLORS, SHADOWS } from "@shared/lib/styles";
import { PictureIcon } from "@images/svg/PictureIcon";
import { PaperIcon } from "@images/svg/PaperIcon";
import { GilroyText } from "./GilroyText";

export interface File {
  name: string;
  type: string;
  uri: string;
}

interface FilePickerProps {
  children?: ReactNode | ((pickFile: () => void) => JSX.Element);
  onPress?: (file: File | null) => void;
  type?: string | string[];
}

export const FilePicker = ({
  children,
  onPress,
  type = "image/*",
}: FilePickerProps) => {
  const [isOpen, openModal, closeModal] = useModalState();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);

  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const contentAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  useEffect(() => {
    if (isOpen) {
      opacity.value = withTiming(1, {
        duration: 100,
        easing: Easing.inOut(Easing.ease),
      });
      translateY.value = withTiming(0, {
        duration: 200,
        easing: Easing.inOut(Easing.ease),
      });
    }
  }, [isOpen]);

  const onClose = () => {
    opacity.value = withTiming(0, {
      duration: 100,
      easing: Easing.inOut(Easing.ease),
    });
    translateY.value = withTiming(30, {
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    });
    setTimeout(() => {
      closeModal();
    }, 200);
  };

  const pickImage = async () => {
    closeModal();
    const permissionResult = await requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) return;

    const result = await launchImageLibraryAsync({
      mediaTypes: "images",
    });
    if (result.canceled) return;

    const { fileName, uri, mimeType } = result.assets[0];
    onPress?.({
      name: fileName ?? "",
      type: mimeType ?? "",
      uri,
    });
  };
  const pickFile = async () => {
    closeModal();
    const result = await getDocumentAsync({
      multiple: false,
      type,
      copyToCacheDirectory: true,
    });
    if (result.canceled) return;
    const { uri, file, mimeType } = result.assets[0];
    onPress?.({
      name: file?.name ?? "",
      uri,
      type: mimeType ?? "",
    });
  };

  if (type !== "image/*") {
    return (
      <>
        <Modal
          animationType="none"
          visible={isOpen}
          onRequestClose={onClose}
          transparent={true}
          statusBarTranslucent
        >
          <Animated.View style={[styles.overlay, overlayStyle]}>
            <Animated.View
              style={[
                styles.container,
                { transform: [{ translateY }] },
                contentAnimatedStyle,
              ]}
            >
              <Button style={styles.button} onPress={pickImage}>
                <PictureIcon width={20} height={20} />
                <GilroyText fontSize={14} fontWeight="medium">
                  Выбрать из галереи
                </GilroyText>
              </Button>
              <Button style={styles.button} onPress={pickFile}>
                <PaperIcon width={20} height={20} />
                <GilroyText fontSize={14} fontWeight="medium">
                  Выбрать из файлов
                </GilroyText>
              </Button>
            </Animated.View>
          </Animated.View>
        </Modal>
        {typeof children === "function" ? (
          children(openModal)
        ) : (
          <Button onPress={openModal}>{children}</Button>
        )}
      </>
    );
  }

  return typeof children === "function" ? (
    children(pickImage)
  ) : (
    <Button onPress={pickImage}>{children}</Button>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    boxShadow: SHADOWS.bottom,
    borderRadius: 12,
    marginBottom: 50,
  },
  overlay: {
    flex: 1,
    paddingHorizontal: 12,
    backgroundColor: "#000000bf",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  button: {
    paddingHorizontal: 14,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
