import { View, ViewProps } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface PageContainerProps extends ViewProps {}

export const PageContainer = ({
  children,
  style,
  ...props
}: PageContainerProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[{ paddingTop: insets.top, paddingBottom: insets.bottom }, style]}
      {...props}
    >
      {children}
    </View>
  );
};
