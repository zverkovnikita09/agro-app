import { SHADOWS } from "@shared/lib/styles";
import { View, ViewProps } from "react-native";

export const CardContainer = ({ style, children, ...props }: ViewProps) => {
  return (
    <View
      style={[{ boxShadow: SHADOWS.bottom, borderRadius: 12 }, style]}
      {...props}
    >
      {children}
    </View>
  );
};
