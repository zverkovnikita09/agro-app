import { CloseIcon } from "@images/svg/CloseIcon";
import { Button, ButtonProps } from "./Button";
import { COLORS } from "@shared/lib/styles";

export const CloseButton = ({ style, ...props }: ButtonProps) => {
  return (
    <Button
      style={[
        {
          width: 24,
          height: 24,
        },
        style,
      ]}
      {...props}
    >
      <CloseIcon width={16} height={16} color={COLORS.disabled} />
    </Button>
  );
};
