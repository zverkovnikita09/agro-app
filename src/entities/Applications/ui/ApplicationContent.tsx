import { StyleSheet, View } from "react-native";
import { Button } from "@shared/ui/Button";
import { COLORS } from "@shared/lib/styles";
import { Title } from "@shared/ui/Title";
import { GilroyText } from "@shared/ui/GilroyText";
import { Application } from "../model/Applications.model";
import { useState } from "react";

export const ApplicationContent = ({
  order_number,
  load_place_name,
  unload_place_name,
  toggleIsExpanded,
}: Application & { toggleIsExpanded: () => void }) => {
  const [isExpandFocused, setIsExpandFocused] = useState(false);

  const onExpandPressIn = () => {
    setIsExpandFocused(true);
  };

  const onExpandPressOut = () => {
    setIsExpandFocused(false);
  };
  return (
    <Button
      style={styles.wrapper}
      onPress={toggleIsExpanded}
      onPressIn={onExpandPressIn}
      onPressOut={onExpandPressOut}
    >
      <View
        style={{
          backgroundColor: isExpandFocused ? COLORS.primaryYellow : "#CCCECF",
          position: "absolute",
          top: 2,
          height: 4,
          width: 32,
          borderRadius: 2,
          left: "50%",
          transform: [{ translateX: "-30%" }],
        }}
      />
      <View style={styles.title}>
        <Title fontSize={15}>Заявка №{order_number}</Title>
      </View>
      <View style={styles.places}>
        <GilroyText style={styles.place} fontSize={12} fontWeight="medium">
          {load_place_name}
        </GilroyText>
        <GilroyText style={styles.place} fontSize={12} fontWeight="medium">
          {unload_place_name}
        </GilroyText>
      </View>
      <View style={styles.route}>
        <View
          style={[
            styles.circle,
            { top: -10 / 2, left: 0, backgroundColor: COLORS.primaryYellow },
          ]}
        />
        <View
          style={[
            styles.circle,
            { top: -10 / 2, right: 0, backgroundColor: COLORS.white },
          ]}
        />
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 8,
    alignItems: "stretch",
  },
  title: {
    justifyContent: "flex-start",
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  places: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  place: {
    maxWidth: "47%",
  },
  route: {
    borderBottomWidth: 1,
    borderColor: COLORS.blackGrey,
    borderStyle: "dashed",
    marginTop: 6,
    position: "relative",
    marginBottom: 3,
  },
  circle: {
    width: 10,
    height: 10,
    position: "absolute",
    borderWidth: 1,
    borderColor: COLORS.blackText,
    borderRadius: 8,
  },
  arrow: {},
});
