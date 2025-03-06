interface GetButtonColor {
  styles: {
    clickedColor: string; 
    backgroundColor: string;
    disabledColor: string;
  }; 
  isClicked?: boolean;
  disabled?: boolean | null;
}

export const getButtonColor = ({styles, isClicked, disabled }:GetButtonColor): string => {
  if(!styles) return ""
  if(disabled) return styles.disabledColor;
  if(isClicked) return styles.clickedColor;
  return styles.backgroundColor
}