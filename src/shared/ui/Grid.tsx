import {
  Children,
  cloneElement,
  isValidElement,
  PropsWithChildren,
  useState,
} from "react";
import { View, ViewProps } from "react-native";

interface GridProps {
  style?: ViewProps["style"];
  columnsCount?: number;
  gap?: number;
}

export const Grid = ({
  style,
  children,
  columnsCount = 2,
  gap = 0,
}: PropsWithChildren<GridProps>) => {
  const [docsBlockWidth, setDocsBlockWidth] = useState(0);

  const childrenWithProps = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        //@ts-ignore
        style: { width: docsBlockWidth / columnsCount - gap / 2 },
      });
    }
    return child;
  });

  return (
    <View
      style={[{ flexDirection: "row", flexWrap: "wrap", gap }, style]}
      onLayout={(event) => {
        setDocsBlockWidth(event.nativeEvent.layout.width);
      }}
    >
      {childrenWithProps}
    </View>
  );
};
