export const COLORS = {
  error: "#E94C4C",
  white: "#FFF",
  blackText: "#0A0A0A",
  primaryYellow: "#F2B430",
  accentHover: "#ECAE2A",
  disabled: "#CCC",
  specialGreen: "#11A929",
  specialGreenLight: "#E2F5E5",
  specialRedLight: "#FCE4E4",
  specialYellow: "#FDF4E2",
  outlineActive: "#CED2D5",
  specialGrey2: "#F9F9F9",
  specialGrey: "#F4F4F4",
  blackGrey: "#B6B6B6",
} as const;

export type Color = (typeof COLORS)[keyof typeof COLORS];

export const SHADOWS = {
  bottom: "0 4 25 0 #00000026",
  top: "3 4 37 0 rgba(0, 0, 0, 0.15)",
} as const;
