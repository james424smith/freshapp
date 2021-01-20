import * as reactNavigation from "@react-navigation/native";

declare module "@react-navigation/native" {
  export interface Theme extends reactNavigation.Theme {
    dark: boolean;
    colors: reactNavigation.Theme.colors & {
      newsText: string;
      flightColorToDarkMode: string;
      newsAndMarlowBottomLinksColor: string;
      rememberPasswordBoxText: string;
      forgotPasswordLink: string;
      createNewAccountColorText: string;
      signInButtonColor: string;
      primary: string;
      background: string;
      signInPageBackground: string;
      colorInputText: string;
      newAquaMarineColor: string;
      fromBlackToBlue: string;
      darkColorOfTable: string;
      newBackgroundColor: string;
      greenToDark: string;
      fadedText: string;
      greyBorderToDark: string;
      inactiveTouchableOpacityStyle: string;
      WhiteBackgroundToDarkBlue: string;
      isOfflineSalaryColor: string;
      blackAndWhite: string;
      whiteAndBlack: string;
      tabNavigatorBlueToDark: string;
      darkNavyToWhite: string;
      activityIndicatorBlue: string;
      chatMessageDarkMode: string;
      chatHistoryBackground: string;
      whiteToDarkNavy: string;
      marlowBlueToDarkMode: string;
      FAQQuestionToDark: string;
      searchBarFAQBackground: string;
    };
  }
}
