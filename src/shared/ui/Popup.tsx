import { COLORS, SHADOWS } from "@shared/lib/styles";
import { PropsWithChildren, useEffect } from "react";
import { Modal, StyleSheet, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CloseButton } from "./CloseButton";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

interface PopupProps {
  isOpen?: boolean;
  closePopup: () => void;
  animationDuration?: number;
  contentStyle?: ViewProps["style"];
  disableAnimation?: "all" | "content" | "layout";
  closeStyles?: ViewProps["style"];
}

export const Popup = ({
  children,
  closePopup,
  isOpen,
  animationDuration = 150,
  contentStyle,
  disableAnimation,
  closeStyles,
}: PropsWithChildren<PopupProps>) => {
  const insets = useSafeAreaInsets();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-20);

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
    translateY.value = withTiming(-20, {
      duration: 200,
      easing: Easing.inOut(Easing.ease),
    });
    setTimeout(() => {
      closePopup();
    }, 200);
  };

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

  return (
    <Modal
      animationType="none"
      visible={isOpen}
      onRequestClose={onClose}
      transparent={true}
      statusBarTranslucent
    >
      <Animated.View
        style={[styles.overlay, { paddingTop: insets.top }, overlayStyle]}
      >
        <Animated.View
          style={[
            styles.content,
            { transform: [{ translateY }], marginTop: insets.bottom },
            contentStyle,
            contentAnimatedStyle,
          ]}
        >
          <CloseButton style={[styles.close, closeStyles]} onPress={onClose} />
          {children}
        </Animated.View>
      </Animated.View>
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
  close: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 2,
  },
  content: {
    position: "relative",
  },
});
