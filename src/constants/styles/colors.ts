import { DefaultTheme, DarkTheme } from "@react-navigation/native";
// Primary colours:
const marlowBlue = "#005AA5";
const aquamarine = "#0093BB";
// Secondary colours:
const darkBlue = "#090DB3";
const activityIndicatorBlue = "#0000ff";
const blue = "#093DBD";
const green = "#09B3A5";
const darkNavy = "#2A2E43";
const grey = "#78849E";
const white = "#FFFFFF";
const lightGrey = "#f6f6f6";
const inactiveGrey = "#C5C5C5";
const marlowBlueOp = "#005AA520";
const bubbleLeft = "#099BBD";
const darkModeMain = "#101D25";
const darkModeBlueBackground = "#232D36";
const darkInputText = "#8E9397";
const turquoise = "#83E1FA";
const inactiveDocumentContainer = "#DCDCDC";
const black = "#000";
const offlineSalaryDarkColor = "#0E3142";
const moreScreenLines = "#d6d7da";
const FAQTextColor = "#555252";
const FAQInactiveColor = "#8FAABF";
const inputSearchBackgroundColor = "#00264633";
const modalColor = "#444444";
const darkModeModalColorText = "#222222";
const darkModeModalContentItem = "#333333";
const FAQSearchBarColor = "#545C63";
const lightModeBlueBackground = "#00659B";
const authDisabledButton = "#F6F6F699";
const authDarkDisableButton = "#3F494F";
const lightInputText = "#93BFD8";

export default {
  marlowBlue,
  aquamarine,
  darkBlue,
  blue,
  green,
  darkNavy,
  grey,
  white,
  lightGrey,
  inactiveGrey,
  marlowBlueOp,
  bubbleLeft,
  darkModeMain,
  darkModeBlueBackground,
  darkInputText,
  turquoise,
  inactiveDocumentContainer,
  black,
  offlineSalaryDarkColor,
  moreScreenLines,
  activityIndicatorBlue,
  FAQTextColor,
  FAQInactiveColor,
  inputSearchBackgroundColor,
  modalColor,
  darkModeModalColorText,
  darkModeModalContentItem,
  FAQSearchBarColor,
  lightModeBlueBackground,
  authDisabledButton,
  authDarkDisableButton,
  lightInputText,
};

export const dark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    newsText: white,
    accountVerificationID: darkInputText,
    turquoiseToWhite: turquoise,
    activityIndicatorBlue: white,
    flightColorToDarkMode: turquoise,
    newsAndMarlowBottomLinksColor: darkInputText,
    createNewAccountColorText: turquoise,
    rememberPasswordBoxText: darkInputText,
    newAquaMarineColor: turquoise,
    forgotPasswordLink: white,
    signInButtonColor: aquamarine,
    DisableSignInButtonColor: authDarkDisableButton,
    colorInputText: darkModeBlueBackground,
    chatInputText: darkModeBlueBackground,
    primary: darkModeBlueBackground,
    background: darkModeMain,
    text: white,
    fromBlackToBlue: darkModeMain,
    darkColorOfTable: turquoise,
    border: aquamarine,
    newBackgroundColor: darkModeMain,
    signInPageBackground: darkModeMain,
    greenToDark: turquoise,
    fadedText: white,
    greyBorderToDark: darkModeBlueBackground,
    inactiveTouchableOpacityStyle: white,
    darkNavyToWhite: white,
    WhiteBackgroundToDarkBlue: darkModeBlueBackground,
    isOfflineSalaryColor: offlineSalaryDarkColor,
    blackAndWhite: white,
    whiteAndBlack: black,
    tabNavigatorBlueToDark: turquoise,
    chatMessageDarkMode: darkModeMain,
    chatHistoryBackground: darkModeBlueBackground,
    whiteToDarkNavy: darkNavy,
    marlowBlueToDarkMode: darkModeBlueBackground,
    FAQQuestionToDark: white,
    searchBarFAQBackground: FAQSearchBarColor,
  },
};
export const light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    newsText: white,
    accountVerificationID: lightInputText,
    turquoiseToWhite: white,
    flightColorToDarkMode: grey,
    newsAndMarlowBottomLinksColor: lightGrey,
    rememberPasswordBoxText: grey,
    forgotPasswordLink: FAQInactiveColor,
    createNewAccountColorText: marlowBlue,
    signInButtonColor: aquamarine,
    DisableSignInButtonColor: authDisabledButton,
    primary: lightGrey,
    background: white,
    signInPageBackground: lightGrey,
    colorInputText: inputSearchBackgroundColor,
    chatInputText: white,
    newAquaMarineColor: aquamarine,
    fromBlackToBlue: marlowBlue,
    darkColorOfTable: marlowBlue,
    newBackgroundColor: marlowBlue,
    greenToDark: green,
    fadedText: grey,
    greyBorderToDark: lightGrey,
    inactiveTouchableOpacityStyle: darkNavy,
    WhiteBackgroundToDarkBlue: white,
    isOfflineSalaryColor: marlowBlueOp,
    blackAndWhite: black,
    whiteAndBlack: white,
    tabNavigatorBlueToDark: blue,
    darkNavyToWhite: darkNavy,
    activityIndicatorBlue: activityIndicatorBlue,
    chatMessageDarkMode: lightGrey,
    chatHistoryBackground: white,
    whiteToDarkNavy: white,
    forgotPasswordEmplyoeeText: grey,
    marlowBlueToDarkMode: marlowBlue,
    FAQQuestionToDark: FAQTextColor,
    searchBarFAQBackground: inputSearchBackgroundColor,
  },
};
