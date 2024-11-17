import { PRIMITIVE } from './primitive-colors'

// Color
const colorText = {
  white: PRIMITIVE.neutral['100'],
  black: PRIMITIVE.neutral['500'],
  primary: PRIMITIVE.orange['400'],
  secondary: PRIMITIVE.aqua['400'],
  grayLight: PRIMITIVE.neutral['300'],
  grayDark: PRIMITIVE.neutral['300'],
}
const colorButton = {
  primary: PRIMITIVE.orange['300'],
  secondary: PRIMITIVE.aqua['400'],
}

// Style
export const textStyle = {
  light: {
    base: colorText.black,
    primary: colorText.primary,
    secondary: colorText.secondary,
    gray: colorText.grayLight,
  },
  dark: {
    base: colorText.white,
    primary: colorText.primary,
    secondary: colorText.secondary,
    gray: colorText.grayDark,
  },
}
export const buttonStyle = {
  primary: {
    text: colorText.white,
    bg: colorButton.primary,
  },
  secondary: {
    text: colorText.black,
    bg: colorButton.secondary,
  },
}
