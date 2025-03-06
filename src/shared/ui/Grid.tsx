import {
  Children,
  cloneElement,
  isValidElement,
  PropsWithChildren,
  ReactNode,
  useState,
} from "react";
import { View, ViewProps } from "react-native";

interface GridProps {
  style?: ViewProps["style"];
  columnsCount?: number;
  gap?: number;
  children?: ReactNode | ((style: ViewProps["style"]) => ReactNode);
}

export const Grid = ({
  style,
  children,
  columnsCount = 2,
  gap = 0,
}: GridProps) => {
  const [blockWidth, setBlockWidth] = useState(0);

  const childsStyle = { width: blockWidth / columnsCount - gap / 2 };

  const childrenWithProps =
    typeof children === "function"
      ? null
      : Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement(child, {
              //@ts-ignore
              style: childsStyle,
            });
          }
          return child;
        });

  return (
    <View
      style={[{ flexDirection: "row", flexWrap: "wrap", gap }, style]}
      onLayout={(event) => {
        setBlockWidth(event.nativeEvent.layout.width);
      }}
    >
      {typeof children === "function"
        ? children(childsStyle)
        : childrenWithProps}
    </View>
  );
};
