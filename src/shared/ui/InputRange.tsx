import { RangeSlider } from "@react-native-assets/slider";
import { COLORS } from "@shared/lib/styles";
import { StyleSheet, View } from "react-native";
import { GilroyText } from "./GilroyText";
import { useEffect, useState } from "react";
import { Button } from "./Button";

interface InputRangeProps {
  from?: number;
  to?: number;
  getFromText?: (value: number) => string;
  getToText?: (value: number) => string;
  value: [number, number];
  setValue: (value: [number, number]) => void;
  step?: number;
  onChangeStart?: () => void;
  onChangeEnd?: () => void;
}

const Thumb = ({ thumb }: { value: number; thumb: "min" | "max" }) => {
  return (
    <Button style={styles.thumb}>
      {thumb === "max" && <View style={styles.thumbInner} />}
    </Button>
  );
};

export const InputRange = ({
  from = 0,
  to = 1,
  getFromText,
  getToText,
  value,
  setValue,
  step = 1,
  onChangeEnd,
  onChangeStart,
}: InputRangeProps) => {
  const [previewValue, setPreviewValue] = useState([from, to]);
  const handleChangeStart = () => {
    onChangeStart?.();
  };
  const handleChangeEnd = (value: [number, number]) => {
    setValue(value);
    onChangeEnd?.();
  };

  useEffect(() => {
    setPreviewValue(value);
  }, [value]);

  return (
    <View style={styles.wrapper}>
      <RangeSlider
        style={styles.slider}
        range={value}
        step={step}
        minimumValue={from}
        maximumValue={to}
        crossingAllowed={false}
        outboundColor={COLORS.blackGrey}
        inboundColor={COLORS.primaryYellow}
        trackHeight={4}
        slideOnTap={false}
        onValueChange={setPreviewValue}
        onSlidingComplete={handleChangeEnd}
        // onSlidingStart={handleChangeStart}
        CustomThumb={Thumb}
      />
      <View style={styles.values}>
        <GilroyText fontWeight="medium">
          {getFromText?.(previewValue[0])}
        </GilroyText>
        <GilroyText fontWeight="medium">
          {getToText?.(previewValue[1])}
        </GilroyText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 5,
    paddingHorizontal: 12,
  },
  slider: {
    width: "100%",
  },
  values: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  thumbWrapper: {
    borderWidth: 1,
  },
  thumb: {
    backgroundColor: COLORS.primaryYellow,
    width: 19,
    height: 19,
    borderRadius: 19,
  },
  thumbInner: {
    width: 11,
    backgroundColor: COLORS.white,
    height: 12,
    borderRadius: 12,
    position: "absolute",
    top: 19 / 2 - 12 / 2,
    left: 19 / 2 - 12 / 2,
  },
});
