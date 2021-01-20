import React, { useEffect, useCallback } from "react";
import { View, StyleSheet, Platform, Alert } from "react-native";
import { Analytics, Auth } from "aws-amplify";
import {
  FORCE_UPDATE_PASSWORD_ROUTE,
  MAIN_APP_SCREEN_ROUTE,
  SIGN_IN_ROUTE,
  PASSCODE_ROUTE,
  SIGN_UP_ROUTE,
} from "../../constants/routes";
import { getNotificationsDetails } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import AsyncStorage from "@react-native-community/async-storage";
import { logoHeightSize, logoWidthSize } from "../../styles/AuthStyles";
import LoadingScreen from "../../components/LoadingScreen";
import {
  StackActions,
  useTheme,
  useNavigation,
} from "@react-navigation/native";
import { IOS } from "../../constants/Platforms";
import { IRootReducerType } from "../../redux/reducers";
import { SeafarerDetails } from "../../interfaces/";
import FingerprintScanner from "react-native-fingerprint-scanner";
import { Appearance } from "react-native-appearance";

const NEW_PASSWORD_CHALLENGE = "NEW_PASSWORD_REQUIRED";

const AuthLoadingScreen = () => {
  const theme = useTheme();
  const inFileStyles = StyleSheet.create({
    root: { flex: 1, backgroundColor: theme.colors.background },
  });
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const seafarer = useSelector<IRootReducerType, SeafarerDetails | undefined>(
    ({ seafarerDetails }) => seafarerDetails.seafarerDetails
  );

  const networkIsConnected = useSelector<IRootReducerType, boolean>(
    ({ network }) => network.isConnected ?? true
  );

  async function getSchemeMode() {
    const getSchemeModeFromStore =
      (await AsyncStorage.getItem("colorScheme")) || "";

    if (!getSchemeModeFromStore || getSchemeModeFromStore === "system") {
      await AsyncStorage.setItem("colorScheme", "system");
      Appearance.set({ colorScheme: Appearance.getColorScheme() });
    } else {
      Appearance.set({ colorScheme: JSON.parse(getSchemeModeFromStore) });
    }
  }

  const findAppropriatePath = useCallback(
    async (userToken: any): Promise<{ stack: string; screen: string }> => {
      const currentUser = await Auth.currentUserInfo();
      const path = await AsyncStorage.getItem("SIGN_IN_PATH");
      const screen = path === "SIGN_IN" ? SIGN_IN_ROUTE : SIGN_UP_ROUTE;
      getSchemeMode();
      if (userToken) {
        if (userToken.challengeName === NEW_PASSWORD_CHALLENGE) {
          return { stack: "Auth", screen: FORCE_UPDATE_PASSWORD_ROUTE };
        }
        if (_.isEmpty(currentUser)) {
          return { stack: "Auth", screen };
        }
        // initial call to get the unread count for the icon badge
        dispatch(getNotificationsDetails());
        /**
         * updates the endpoint in order to associate a pinpoint endpoint with the username
         * instead of the identityId
         */
        await Analytics.updateEndpoint({
          userId: currentUser.username,
          address: await AsyncStorage.getItem("deviceToken"),
          ChannelType: Platform.OS === IOS ? "APNS" : "GCM",
        }).catch((e) => {
          console.log("error", e);
        });

        const biometric = await returnBiometricValue();
        const passcode = await returnPassCode();
        if (biometric) {
          const isBiometricSuccessful = await asyncBiometricLogin();
          if (isBiometricSuccessful) {
            return { stack: "App", screen: MAIN_APP_SCREEN_ROUTE };
          }
          return { stack: "Auth", screen: PASSCODE_ROUTE };
        } else if (passcode) {
          return { stack: "Auth", screen: PASSCODE_ROUTE };
        }
        return { stack: "Auth", screen: PASSCODE_ROUTE };
      } else if (!_.isEmpty(currentUser)) {
        return { stack: "App", screen: MAIN_APP_SCREEN_ROUTE };
      }
      return { stack: "Auth", screen };
    },
    [dispatch]
  );

  async function asyncBiometricLogin() {
    //TODO change let to const
    let isAuthSuccessful = false;

    await FingerprintScanner.isSensorAvailable()
      .then(async (type) => {
        await FingerprintScanner.authenticate({
          description: `Please Log In with ${type}`,
        })
          .then(() => {
            isAuthSuccessful = true;
          })
          .catch(async (error) => {
            const customAlert = () =>
              Alert.alert(
                "Authentication was cancelled",
                "Please try again",
                [
                  {
                    text: "OK",
                    style: "default",
                  },
                ],
                { cancelable: false }
              );
            if (error) {
              customAlert();
              isAuthSuccessful = false;
            }
          });
      })
      .catch((error) => {
        console.log("error", error);
      });

    return isAuthSuccessful;
  }

  // Fetch the token from storage then navigate to our appropriate place
  const _bootstrapAsync = useCallback(async () => {
    const user = await Auth.currentAuthenticatedUser().catch(async () => {
      const path = await AsyncStorage.getItem("SIGN_IN_PATH");
      const authScreen = path === "SIGN_IN" ? SIGN_IN_ROUTE : SIGN_UP_ROUTE;

      navigation.dispatch(StackActions.replace("Auth", { screen: authScreen }));
    });
    const { stack, screen } = await findAppropriatePath(user);

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    navigation.dispatch(StackActions.replace(stack, { screen }));
  }, [navigation, findAppropriatePath]);

  const returnBiometricValue = async () => {
    const isBiometricEnabled =
      (await AsyncStorage.getItem("isBiometricEnabled")) || "";

    return isBiometricEnabled ? JSON.parse(isBiometricEnabled) : false;
  };

  const returnPassCode = async () => {
    const getUserPasscodeEnable =
      (await AsyncStorage.getItem("isUserSetPasscode")) || "";

    return getUserPasscodeEnable ? JSON.parse(getUserPasscodeEnable) : false;
  };

  const loginWithoutInternet = useCallback(async () => {
    const biometric = await returnBiometricValue();
    const passcode = await returnPassCode();
    if (biometric) {
      const isBiometricSuccessful = await asyncBiometricLogin();
      if (isBiometricSuccessful) {
        navigation.dispatch(
          StackActions.replace("App", { screen: MAIN_APP_SCREEN_ROUTE })
        );
      }
    } else if (passcode) {
      navigation.dispatch(
        StackActions.replace("Auth", { screen: PASSCODE_ROUTE })
      );
    } else {
      const path = await AsyncStorage.getItem("SIGN_IN_PATH");
      if (path === "SIGN_IN") {
        navigation.dispatch(
          StackActions.replace("Auth", { screen: SIGN_IN_ROUTE })
        );
      } else {
        navigation.dispatch(
          StackActions.replace("Auth", { screen: SIGN_UP_ROUTE })
        );
      }
    }
  }, [navigation]);

  useEffect(() => {
    if (!_.isEmpty(seafarer) && !networkIsConnected) {
      loginWithoutInternet();
    } else {
      _bootstrapAsync().catch((error: any) => console.log(error));
    }
    return () => {
      FingerprintScanner.release();
    };
  }, [
    _bootstrapAsync,
    navigation,
    networkIsConnected,
    seafarer,
    loginWithoutInternet,
  ]);

  // Render any loading content that you like here

  return (
    <View style={inFileStyles.root}>
      <LoadingScreen
        logoHeightSize={logoHeightSize}
        logoWidthSize={logoWidthSize}
      />
    </View>
  );
};

export default AuthLoadingScreen;
