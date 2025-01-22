import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  StyleSheet,
  TextProps,
  View,
  ViewProps,
} from "react-native";
import { GilroyText, GilroyTextProps } from "./GilroyText";
import { forwardRef, ReactNode, useMemo, useState } from "react";
import { Color, COLORS } from "@shared/lib/styles";
import { getButtonColor } from "@shared/lib/getButtonColor";
import { Spinner, SpinnerTheme } from "./Spinner";
import { ConfirmPopup, ConfirmPopupProps } from "./ConfirmPopup";
import { useModalState } from "@shared/hooks/useModalState";

export enum ButtonSize {
  PRIMARY = "",
  S = "size_s",
  M = "size_m",
  L = "size_l",
}

export enum ButtonTheme {
  PRIMARY = "",
  ACCENT = "accent",
  ACCENT_WITH_BLACK_TEXT = "accent_with_black_text",
  OUTLINE = "outline",
  OUTLINE_ACCENT = "outline_accent",
  OUTLINE_ALERT = "outline_alert",
  GREY = "grey",
}

interface SizeStyle {
  paddingHorizontal?: number;
  paddingVertical?: number;
  fontSize?: number;
}

interface ThemeStyle {
  backgroundColor: string;
  clickedColor: string;
  disabledColor: string;
  color?: Color;
  borderColor?: Color;
  borderWidth?: number;
  borderRadius?: number;
}

export interface ButtonProps extends PressableProps {
  theme?: ButtonTheme;
  size?: ButtonSize;
  children?: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  textStyle?: TextProps["style"];
  fontWeight?: GilroyTextProps["fontWeight"];
  style?: ViewProps["style"];
  color?: Color;
  withConfirm?: boolean;
  confirmProps?: Omit<ConfirmPopupProps, "onClose" | "isOpen">;
}

export const Button = forwardRef<View, ButtonProps>(
  (
    {
      children,
      theme = ButtonTheme.PRIMARY,
      size = ButtonSize.PRIMARY,
      style,
      fullWidth,
      isLoading,
      loadingText,
      textStyle,
      fontWeight = "bold",
      disabled,
      color,
      onPressIn,
      onPressOut,
      onPress,
      withConfirm,
      confirmProps,
      ...props
    },
    ref
  ) => {
    const [isClicked, setIsClicked] = useState(false);
    const [isConfirmOpen, openConfirm, closeConfirm] = useModalState(false);

    const themeStyles = useMemo<ThemeStyle>(() => {
      const styles: ThemeStyle = {
        backgroundColor: COLORS.primaryYellow,
        borderRadius: 12,
        color: COLORS.white,
        clickedColor: COLORS.accentHover,
        disabledColor: COLORS.disabled,
      };
      if (theme === ButtonTheme.PRIMARY) {
        return {} as ThemeStyle;
      }
      if (theme === ButtonTheme.OUTLINE) {
        return {
          color: COLORS.blackText,
          borderColor: COLORS.blackText,
          backgroundColor: COLORS.white,
          borderRadius: 10,
          borderWidth: 1,
          clickedColor: COLORS.outlineActive,
          disabledColor: COLORS.disabled,
        };
      }
      if (theme === ButtonTheme.ACCENT) {
      }
      if (theme === ButtonTheme.ACCENT_WITH_BLACK_TEXT) {
        styles.color = COLORS.blackText;
      }
      return styles;
    }, [theme]);

    const sizeStyles = useMemo<SizeStyle>(() => {
      if (size === ButtonSize.S) {
        return {
          paddingHorizontal: 10,
          paddingVertical: 10,
          fontSize: 12,
        };
      }
      if (size === ButtonSize.M) {
        return {
          paddingHorizontal: 12,
          paddingVertical: 12,
          fontSize: 14,
        };
      }
      if (size === ButtonSize.L) {
        return {
          paddingHorizontal: 28,
          paddingVertical: 16,
          fontSize: 16,
        };
      }
      return {};
    }, [size]);

    const Content =
      typeof children === "string" ? (
        <GilroyText
          fontSize={sizeStyles.fontSize}
          color={color || themeStyles?.color}
          style={textStyle}
          fontWeight={fontWeight}
        >
          {children}
        </GilroyText>
      ) : (
        children
      );

    const onButtonPressIn = (event: GestureResponderEvent) => {
      setIsClicked(true);
      onPressIn?.(event);
    };

    const onButtonPressOut = (event: GestureResponderEvent) => {
      setIsClicked(false);
      onPressOut?.(event);
    };

    return (
      <>
        {withConfirm && (
          <ConfirmPopup
            isOpen={isConfirmOpen}
            onClose={closeConfirm}
            {...confirmProps}
          />
        )}
        <Pressable
          ref={ref}
          {...props}
          style={[
            styles.wrapper,
            {
              ...themeStyles,
              backgroundColor: getButtonColor({
                styles: themeStyles,
                isClicked,
              }),
            },
            sizeStyles,
            style,
          ]}
          onPressIn={onButtonPressIn}
          onPressOut={onButtonPressOut}
          onPress={withConfirm ? openConfirm : onPress}
          disabled={disabled || isLoading}
        >
          {isLoading && (
            <View
              style={[
                styles.loadingBlock,
                {
                  backgroundColor: themeStyles.disabledColor,
                  borderRadius: themeStyles.borderRadius,
                },
              ]}
            >
              <Spinner theme={SpinnerTheme.SECONDARY} />
              <GilroyText fontWeight="medium" style={{ color: COLORS.white }}>
                {loadingText || "Загрузка"}
              </GilroyText>
            </View>
          )}
          {Content}
        </Pressable>
      </>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    justifyContent: "center",
  },
});
