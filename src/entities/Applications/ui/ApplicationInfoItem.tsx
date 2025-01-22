import { COLORS } from "@shared/lib/styles";
import { GilroyText } from "@shared/ui/GilroyText";
import { PropsWithChildren } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

interface ApplicationInfoItemProps {
  title?: string;
  style?: ViewProps["style"];
}

export const ApplicationInfoItem = ({
  title,
  style,
  children,
}: PropsWithChildren<ApplicationInfoItemProps>) => {
  return (
    <View style={[styles.wrapper, style]}>
      {title && (
        <GilroyText fontWeight="medium" fontSize={14} color={COLORS.blackGrey}>
          {title}
        </GilroyText>
      )}
      <GilroyText fontSize={14} fontWeight="medium">
        {children}
      </GilroyText>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    gap: 4,
    backgroundColor: COLORS.specialGrey2,
    borderRadius: 12,
    padding: 12,
  },
});
