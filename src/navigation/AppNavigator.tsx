import React, { useEffect } from "react";
import {
  NavigationContainer,
  useLinking,
  useTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainTabNavigator from "./MainTabNavigator";
import ImprintScreen from "../screens/more_screens/ImprintScreen";
import AuthLoadingScreen from "../screens/authentication/AuthLoadingScreen";
import SignInScreen from "../screens/authentication/SignInScreen";
import SignUpScreen from "../screens/authentication/SignUpScreen";
import ForgotPasswordScreen from "../screens/authentication/ForgotPasswordScreen";
import PassCodeScreen from "../screens/authentication/PassCodeScreen";
import AccountVerificationScreen from "../screens/authentication/AccountVerificationScreen";
import ResetPasswordScreen from "../screens/authentication/ResetPasswordScreen";
import ForceUpdatePasswordScreen from "../screens/authentication/ForceUpdatePasswordScreen";
import TermsAndConditionsScreen from "../screens/authentication/TermsAndConditionsScreen";
import PrivacyPolicyScreen from "../screens/authentication/PrivacyPolicyScreen";
import FAQScreen from "../screens/FAQScreen";
import SwipeNavigator from "../screens/more_screens/SwipeNavigatorScreen";
import styles from "../styles/AppStyles";
import { Platform, StatusBar, View } from "react-native";
import { newsStack } from "./MoreScreenNavigation";
import Back from "../components/BackIcon";
import { light, dark } from "../constants/styles/colors";
import { Appearance, ColorSchemeName } from "react-native-appearance";
import AsyncStorage from "@react-native-community/async-storage";
import { useSelector } from "react-redux";
import { IRootReducerType } from "../redux/reducers";
import { IOS } from "../constants/Platforms";
import { CognitoUser } from "amazon-cognito-identity-js";
import valueOrDefault from "../common/valueOrDefault";

// You could add another route here for authentication.
// Read more at https://reactnavigation.org/docs/en/auth-flow.html

export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  ResetPassword: { employeeId: string; verificationCode: string };
  AccountVerification: { verificationError?: string };
  ForceUpdatePassword: { user: CognitoUser };
  TermsAndConditionsAuth: undefined;
  PrivacyPolicyAuth: undefined;
  PassCode: undefined;
  News: undefined;
  Imprint: undefined;
  FAQ: undefined;
  SwipeNavigator: undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();

export const AuthenticationStack = () => {
  const theme = useTheme();
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <AuthStack.Screen
        component={SignInScreen}
        name="SignIn"
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        component={SignUpScreen}
        name="SignUp"
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        component={ForgotPasswordScreen}
        name="ForgotPassword"
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        component={ResetPasswordScreen}
        name="ResetPassword"
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        component={AccountVerificationScreen}
        name="AccountVerification"
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        component={ForceUpdatePasswordScreen}
        name="ForceUpdatePassword"
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        component={PassCodeScreen}
        name="PassCode"
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        component={TermsAndConditionsScreen}
        name="TermsAndConditionsAuth"
        options={{
          headerTitleStyle: styles.headerTitleStyle,
          headerRight: () => <View />,
          headerLeft: () => <Back goBack={true} />,
          title: "Terms and Conditions",
        }}
      />
      <AuthStack.Screen
        component={PrivacyPolicyScreen}
        name="PrivacyPolicyAuth"
        options={{
          headerTitleStyle: styles.headerTitleStyle,
          headerLeft: () => <Back goBack={true} />,
          headerRight: () => <View />,
          title: "Privacy Policy",
        }}
      />
      <AuthStack.Screen
        component={FAQScreen}
        name="FAQ"
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        component={SwipeNavigator}
        name="SwipeNavigator"
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        component={newsStack}
        name="News"
        options={{
          headerShown: false,
        }}
      />
      <AuthStack.Screen
        component={ImprintScreen}
        name="Imprint"
        options={{
          headerTitleStyle: styles.headerTitleStyle,
          headerRight: () => <View />,
          headerLeft: () => <Back goBack={true} />,
          title: "Marlow",
        }}
      />
    </AuthStack.Navigator>
  );
};

type TabStackParamList = {
  Main: undefined;
};
const TabStack = createStackNavigator<TabStackParamList>();

export const MainStack = () => (
  <TabStack.Navigator
    screenOptions={{
      headerShown: false,
      headerStyle: {},
    }}
  >
    <TabStack.Screen
      component={MainTabNavigator}
      name={"Main"}
      options={{ headerShown: false }}
    />
  </TabStack.Navigator>
);

type RootStackParamList = {
  AuthLoading: undefined;
  Auth: undefined;
  App: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

const Container = () => {
  const ref = React.useRef<any>();
  const { getInitialState } = useLinking(ref, {
    prefixes: ["crewcompanion://"],
    config: {
      screens: {
        AuthLoading: "auth/loading",
        Auth: {
          screens: {
            SignIn: "auth/signin",
            SignUp: "auth/signup",
            ForgotPassword: "auth/forgot-password",
            ResetPassword: "auth/reset-password",
            AccountVerification: "auth/account-verification",
            ForceUpdatePassword: "auth/force-update-password",
            TermsAndConditionsAuth: "auth/terms-and-condition",
            PrivacyPolicyAuth: "auth/privacy-policy",
            PassCode: "auth/passcode",
            SwipeNavigatorStack: {
              screens: {
                SwipeNavigator: "auth/SwipeNavigator",
                NewsScreen: "auth/news",
                ReadMoreNews: "auth/news/:newItem",
                FAQ: "auth/FAQ",
                Imprint: "auth/imprint",
                AppSupport: "auth/support",
              },
            },
          },
        },
        App: {
          screens: {
            Main: {
              screens: {
                AssignmentStack: {
                  screens: {
                    Assignment: "assignment",
                    EmploymentOffer: "assignment/employmentOffer",
                    AssignmentSeafarerProfile: "assignment/profile",
                    LatestReleases: "assignment/latest-releases",
                    VesselTracker: "assignment/vessel-tracker",
                  },
                },
                FlightsStack: {
                  screens: {
                    Flights: "flights",
                  },
                },
                ChatStack: {
                  screens: {
                    MainChat: "chat/whos-around",
                    ChatHistory: "chat/history",
                    ChatRoom: "chat/:recipient",
                  },
                },
                NotificationsStack: {
                  screens: {
                    Notifications: "notifications",
                  },
                },
                MoreStack: {
                  screens: {
                    More: "more",
                    Salary: {
                      screens: {
                        SalaryScreen: "salaries",
                        ReadMorePayslip: "salaries/:payslipDocument",
                      },
                    },
                    News: {
                      screens: {
                        NewsScreen: "news",
                        ReadMoreNews: "news/:newItem",
                      },
                    },

                    Documents: {
                      screens: {
                        SeafarerDocuments: "documents",
                        SeafarerDocumentsFile: "documents/:documentDetails",
                        SeafarerDocumentsExcelFile:
                          "documents/excel/:documentDetails",
                      },
                    },
                    SeafarerDetails: "profile",
                    Imprint: "imprint",
                    SeaServiceRecords: "sea-service-records",
                    WorkingClothes: "working-clothes",
                    Contact: "contact",
                    AppSupport: "support",
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  const selectedIndex = useSelector<IRootReducerType, string>(
    ({ darkModeOptionsReducer }) => darkModeOptionsReducer.darkModeOptionsValue
  );

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  const [schemeMode, setSchemeMode] = React.useState<ColorSchemeName>();
  const [systemScheme, setSystemScheme] = React.useState<ColorSchemeName>();
  const appearance = Appearance.getColorScheme();
  useEffect(() => {
    Promise.race([
      getInitialState(),
      new Promise((resolve) =>
        // Timeout in 150ms if `getInitialState` doesn't resolve
        // Workaround for https://github.com/facebook/react-native/issues/25675
        setTimeout(resolve, 150)
      ),
    ])
      .catch((e) => {
        console.error(e);
      })
      .then((state: any) => {
        if (state !== undefined) {
          setInitialState(state);
        }

        setIsReady(true);
      });
  }, [getInitialState]);

  useEffect(() => {
    Appearance.addChangeListener(({ colorScheme }) => {
      setSystemScheme(colorScheme);
    });
    if (selectedIndex) {
      AsyncStorage.setItem("colorScheme", selectedIndex).then(() => {
        checkScheme();
      });
    } else {
      checkScheme();
    }
  }, [appearance, selectedIndex]); //eslint-disable-line react-hooks/exhaustive-deps

  const checkScheme = async () => {
    const getSchemeModeFromStore = valueOrDefault(
      await AsyncStorage.getItem("colorScheme"),
      ""
    ) as string;
    if (getSchemeModeFromStore === "system") {
      const systemMode: ColorSchemeName | undefined = systemScheme
        ? systemScheme
        : Appearance.getColorScheme();
      setSchemeMode(systemMode);
    } else {
      const userMode: ColorSchemeName | undefined = getSchemeModeFromStore as
        | "dark"
        | "light";
      setSchemeMode(userMode);
    }
  };

  const theme = useTheme();

  if (!isReady) {
    return null;
  }

  const themeData =
    schemeMode === "dark"
      ? {
          theme: dark,
          barStyle: "light-content" as "light-content",
        }
      : {
          theme: light,
          barStyle: "dark-content" as "dark-content",
        };

  return (
    <NavigationContainer
      initialState={initialState}
      ref={ref}
      theme={themeData.theme}
    >
      {Platform.OS === IOS && <StatusBar barStyle={themeData.barStyle} />}
      <RootStack.Navigator
        screenOptions={{
          cardShadowEnabled: false,
          cardStyle: {
            shadowColor: "transparent",
            elevation: 0,
            borderBottomWidth: 0,
          },
          headerStyle: {
            borderBottomWidth: 0,
            backgroundColor: theme.colors.background,
            elevation: 0,
          },
          headerShown: false,
        }}
      >
        <RootStack.Screen component={AuthLoadingScreen} name="AuthLoading" />
        <RootStack.Screen component={AuthenticationStack} name="Auth" />
        <RootStack.Screen component={MainStack} name="App" />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Container;
