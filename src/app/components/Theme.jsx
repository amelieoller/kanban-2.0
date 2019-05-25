const colors = {
  lightestGrey: '#F6F6F8',
  lightGrey: '#C6C7C6',
  grey: '#73777b',
  darkGrey: '#51575D',
  black: '#272930',
  darkerBlack: '#161615',
  green: '#06C392',
  darkGreen: '#03926d',
  blue: '#0075A3',
  darkBlue: '#00578a'
};

const lightColors = {
  // Main Background
  background: '#EEEEEE',
  surface: '#EEEEEE',
  // Main Text
  text: 'rgba(0, 0, 0, 0.87)',
  textSecondary: 'rgba(0, 0, 0, 0.60)',
  textDisabled: 'rgba(0, 0, 0, 0.38)',

  // Elevated Background
  elevated: '#e6e6e6',

  elevatedOne: '#f2f2f2',
  elevatedTwo: '#fafafa',
  elevatedThree: '#fcfcfc',
  elevatedFour: '#fff',

  // Primary Background
  primary: '#ef5351',
  primaryLight: '#ff867d',
  primaryDark: '#b61828',
  // Primary Text
  onPrimary: 'rgba(0, 0, 0, 0.87)',
  onPrimaryLight: 'rgba(0, 0, 0, 0.87)',
  onPrimaryDark: 'rgba(255, 255, 255, 0.87)',

  // Secondary Background
  secondary: '#3caaa0',
  secondaryLight: '#73dcd1',
  secondaryDark: '#007a72',
  // Secondary Text
  onSecondary: 'rgba(0, 0, 0, 0.87)',
  onSecondaryLight: 'rgba(0, 0, 0, 0.87)',
  onSecondaryDark: 'rgba(0, 0, 0, 0.87)',

  // Special
  headerBackground: 'rgba(0, 0, 0, 0.7)',
  headerText: '#EEEEEE',
  toolTipBackground: 'rgba(0, 0, 0, 0.7)',
  toolTipText: '#EEEEEE',
  white: '#FFF',
  lightestGrey: colors.lightestGrey,
  success: colors.green,
  successHover: colors.darkGreen,
  neutral: colors.blue,
  neutralHover: colors.darkBlue,
  monotoneAccent: colors.lightGrey,
  backgroundAccent: '#FFF',
  mediumDifficulty: colors.blue,
  cardButtonHover: colors.darkGrey,
  grey: colors.grey,
  negativeText: '#FFF',
  listBackground: '#FFF',
  scrollbarBackground: colors.lightGrey,
  scrollbarForeground: colors.darkGrey,
  transparentBlack: 'rgba(0, 0, 0, 0.2)',
  transparentWhite: 'rgba(255, 255, 255, 0.4)'
};

const darkColors = {
  // Main Background
  background: '#121212',
  surface: '#1E1E1E',
  // Main Text
  text: 'rgba(255, 255, 255, 0.87)',
  textSecondary: 'rgba(255, 255, 255, 0.60)',
  textDisabled: 'rgba(255, 255, 255, 0.38)',

  // Elevated Background
  elevated: '#1E1E1E',

  elevatedOne: '#1E1E1E',
  elevatedTwo: '#252325',
  elevatedThree: '#272727',
  elevatedFour: '#2C2C2C',
  elevatedFive: '#2E2E2E',
  elevatedSix: '#333333',
  elevatedSeven: '#363636',
  elevatedEight: '#515151',

  // Primary Background
  primary: '#ea6371',
  primaryLight: '#ff959f',
  primaryDark: '#b33146',
  // Primary Text
  onPrimary: 'rgba(0, 0, 0, 0.87)',
  onPrimaryLight: 'rgba(0, 0, 0, 0.87)',
  onPrimaryDark: 'rgba(0, 0, 0, 0.87)',

  // Secondary Background
  secondary: '#80cbc4',
  secondaryLight: '#b2fef7',
  secondaryDark: '#4f9a94',
  // Secondary Text
  onSecondary: 'rgba(0, 0, 0, 0.87)',
  onSecondaryLight: 'rgba(0, 0, 0, 0.87)',
  onSecondaryDark: 'rgba(0, 0, 0, 0.87)',

  // Special
  headerBackground: '#ef5350',
  headerText: '#121212',
  toolTipBackground: 'rgba(255, 255, 255, 0.60)',
  toolTipText: '#121212',
  white: '#FFF',
  lightestGrey: colors.lightestGrey,
  success: colors.green,
  successHover: colors.darkGreen,
  neutral: colors.blue,
  neutralHover: colors.darkBlue,
  monotoneAccent: colors.lightGrey,
  backgroundAccent: colors.black,
  mediumDifficulty: colors.blue,
  cardButtonHover: colors.darkGrey,
  grey: colors.grey,
  negativeText: colors.darkerBlack,
  listBackground: colors.darkerBlack,
  scrollbarBackground: colors.darkGrey,
  scrollbarForeground: colors.black,
  transparentBlack: 'rgba(0, 0, 0, 0.2)',
  transparentWhite: 'rgba(255, 255, 255, 0.4)'
};

const common = {
  boxShadowOne:
    'rgba(0, 0, 0, 0.2) 0px 1px 3px 0px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 2px 1px -1px',
  boxShadowTwo:
    'rgba(0, 0, 0, 0.2) 0px 1px 5px 0px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 3px 1px -2px',
  boxShadowThree:
    'rgba(0, 0, 0, 0.2) 0px 1px 8px 0px, rgba(0, 0, 0, 0.14) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 3px 3px -2px',
  boxShadowButton:
    '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
  boxShadowButtonActive:
    '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)'
};

const sizes = {
  listWidth: '300px',
  borderRadius: '3px',
  mainMargin: 40,
  boardWidth: 260,
  boardHeight: 140,
  boardMargin: 5,
  headerHeight: 40,
  headerHeightMobile: 50,
  footerHeight: 210,
  sidebarWidth: 210
};

const media = {
  desktop: `(max-width: 992px)`,
  tablet: `(max-width: 768px)`,
  phone: `(max-width: 480px)`,
  phoneSmall: `(max-width: 376px)`
};

const light = { colors: lightColors, sizes, media, common };
const dark = { colors: darkColors, sizes, media, common };

export { light, dark };
