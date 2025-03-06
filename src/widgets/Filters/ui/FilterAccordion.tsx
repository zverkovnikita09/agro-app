import { MinusIcon } from "@images/svg/MinusIcon";
import { PlusIcon } from "@images/svg/Plus";
import { COLORS } from "@shared/lib/styles";
import { GilroyText } from "@shared/ui/GilroyText";
import React, {
  Children,
  isValidElement,
  PropsWithChildren,
  useMemo,
  useState,
} from "react";
import { StyleSheet, View, Pressable, LayoutChangeEvent } from "react-native";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface FilterAccordionProps {
  title?: string;
  withNested?: boolean;
}

export const FilterAccordion = ({
  children,
  title,
}: PropsWithChildren<FilterAccordionProps>) => {
  const height = useSharedValue(0);
  const open = useSharedValue(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const hasNestedAccordions = useMemo<boolean>(() => {
    let result = false;
    Children.forEach(children, (child) => {
      //@ts-ignore
      if (isValidElement(child) && child.type.name === "FilterAccordion") {
        result = true;
      }
    });
    return result;
  }, [children]);

  const onPress = () => {
    setIsExpanded(!isExpanded);
    open.value = !open.value;
  };

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(open.value), {
      duration: 100,
    })
  );
  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  const onContentLayout = (e: LayoutChangeEvent) => {
    height.value = e.nativeEvent.layout.height;
  };

  return (
    <View
      style={[
        styles.wrapper,
        {
          borderBottomWidth: hasNestedAccordions ? 0 : 1,
          paddingBottom: hasNestedAccordions ? 0 : 16,
        },
      ]}
    >
      <Pressable
        style={[
          styles.header,
          {
            borderBottomWidth: hasNestedAccordions ? 1 : 0,
            paddingBottom: hasNestedAccordions ? 16 : 0,
          },
        ]}
        onPress={onPress}
      >
        <GilroyText fontSize={15} fontWeight="medium">
          {title}
        </GilroyText>
        {isExpanded ? (
          <MinusIcon height={2} width={14} />
        ) : (
          <PlusIcon width={14} height={14} />
        )}
      </Pressable>
      <Animated.View style={[styles.content, bodyStyle]}>
        <View
          onLayout={onContentLayout}
          style={[
            styles.contentWrapper,
            { paddingTop: hasNestedAccordions ? 0 : 12 },
          ]}
        >
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderBottomColor: COLORS.specialGrey,
    overflow: "hidden",
  },
  header: {
    paddingTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomColor: COLORS.specialGrey,
  },
  content: {
    overflow: "hidden",
  },
  contentWrapper: {
    width: "100%",
    position: "absolute",
    paddingBottom: 2,
  },
});
