import { css } from "styled-components";

const colors = {
  white: "#FFFFFF",
  lightestGrey: "#F7F8F8",
  lighterGrey: "#EAECEE",
  lightGrey: "#C9CFD3",
  grey: "#73777b",
  darkGrey: "#51575D",
  black: "#272930",
  darkRed: "#a03f2c",
  red: "#EA725B",
  lightRed: "#E98D5A",
  orange: "#FFC461",
  yellow: "#FFCD7B",
  lightGreen: "#6AD08D",
  green: "#06C392",
  darkGreen: "#03926d",
  lightBlue: "#00A3C0",
  blue: "#0075A3",
  darkBlue: "#00578a",
  lightPurple: "#7AB6FF",
  purple: "#5367CB",
  darkPurple: "#9C55A4"
};

const light = {
  white: colors.white,
  text: colors.darkGrey,
  success: colors.green,
  successHover: colors.darkGreen,
  neutral: colors.blue,
  neutralHover: colors.darkBlue,
  failure: colors.darkRed,
  mainAccent: colors.red,
  danger: colors.red,
  monotoneAccent: colors.lightGrey,
  mainBackground: colors.lighterGrey,
  backgroundAccent: colors.white,
  easyDifficulty: colors.blue,
  mediumDifficulty: colors.blue,
  highDifficulty: colors.lighterGrey,
  cardHover: colors.lighterGrey,
  headerBackground: colors.darkGrey,
  cardButtonHover: colors.darkGrey,
  grey: colors.grey,
  negativeText: colors.white,
  negativeBackground: colors.darkGrey,

  transparentBlack: "rgba(0, 0, 0, 0.2)",
  transparentWhite: "rgba(255, 255, 255, 0.4)",

  listWidth: "300px",
  borderRadius: "3px",
  mainMargin: 40,
  boardWidth: 260,
  boardHeight: 140,
  boardMargin: 5,

  bs: "0 5px 18px 0 rgba(0, 0, 0, 0.03)",
  bsDragging: "0 7px 15px 0 rgba(0, 0, 0, 0.08)"
};

const dark = {
  white: colors.white,
  text: colors.white,
  success: colors.green,
  successHover: colors.darkGreen,
  neutral: colors.blue,
  neutralHover: colors.darkBlue,
  failure: colors.darkRed,
  mainAccent: colors.red,
  danger: colors.red,
  monotoneAccent: colors.lightGrey,
  mainBackground: colors.darkGrey,
  backgroundAccent: colors.grey,
  easyDifficulty: colors.lighterGrey,
  mediumDifficulty: colors.blue,
  highDifficulty: colors.lighterGrey,
  cardHover: colors.lighterGrey,
  headerBackground: colors.black,
  cardButtonHover: colors.darkGrey,
  grey: colors.grey,
  negativeText: colors.darkGrey,
  negativeBackground: colors.white,

  transparentBlack: "rgba(0, 0, 0, 0.2)",
  transparentWhite: "rgba(255, 255, 255, 0.4)",

  listWidth: "300px",
  borderRadius: "3px",
  mainMargin: 40,
  boardWidth: 260,
  boardHeight: 140,
  boardMargin: 5,

  bs: "0 5px 18px 0 rgba(0, 0, 0, 0.03)",
  bsDragging: "0 7px 15px 0 rgba(0, 0, 0, 0.08)"
};

const sizes = {
  desktop: 992,
  tablet: 768,
  phone: 376
};

const media = Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

export { light, dark, media };
