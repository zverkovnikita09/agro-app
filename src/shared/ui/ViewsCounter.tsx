import { View } from "react-native";
import { GilroyText } from "./GilroyText";
import { EyeIcon } from "@images/svg/EyeIcon";
import { COLORS } from "@shared/lib/styles";

interface ViewsCounterProps {
  views?: number;
}

export const ViewsCounter = ({ views }: ViewsCounterProps) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignContent: "center",
        gap: 4,
      }}
    >
      <GilroyText>
        <EyeIcon width={18} height={18} />
      </GilroyText>
      <GilroyText color={COLORS.disabled} fontSize={15}>
        {views}
      </GilroyText>
    </View>
  );
};
