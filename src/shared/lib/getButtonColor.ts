interface GetButtonColor {
  styles: {
    clickedColor: string; 
    backgroundColor: string;
  }; 
  isClicked?: boolean;
}

export const getButtonColor = ({styles, isClicked }:GetButtonColor): string => {
  if(!styles) return ""
  if(isClicked) return styles.clickedColor;
  return styles.backgroundColor
}