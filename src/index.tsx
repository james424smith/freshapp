import "react-native-gesture-handler";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { Provider } from "react-redux";
import { ReduxNetworkProvider } from "react-native-offline";
import { PersistGate } from "redux-persist/lib/integration/react";
import Container from "./navigation/AppNavigator";
import createStore from "./redux";
import styles from "./styles/AppStyles";
import { View, LogBox, Alert, Platform, Linking } from "react-native";
import config from "./constants/config";
import NoInternetHeader from "./components/NoInternetHeader";
import Amplify, { Auth } from "aws-amplify";
import PushNotification from "@aws-amplify/pushnotification";
import awsExports from "../aws-exports.js";
import pushNotifications from "./common/pushNotifications";
import NewMessageAlert from "./components/NewMessageAlert";
import MyStorage from "./common/AwsCustomStorage";
import JailMonkey from "jail-monkey";
import RNExitApp from "react-native-exit-app";
import CodePush from "react-native-code-push";
import { AppearanceProvider } from "react-native-appearance";
import DeviceInfo from "react-native-device-info";
import request from "./common/request";
import { VersionCheck } from "./interfaces";

LogBox.ignoreLogs([
  "Remote debugger",
  "Warning: componentWillMount is deprecated",
  "Warning: componentWillMount has been renamed",
  "Warning: componentWillReceiveProps is deprecated",
  "Warning: componentWillReceiveProps has been renamed",
  "Setting a timer",
  "Animated: `useNativeDriver`",
]);

Amplify.configure(awsExports);
Auth.configure({
  ...awsExports,
  storage: MyStorage,
});

const { ENV, API_BASE_URL } = config();

// set the notification listener
pushNotifications();
const shouldUseJailbreak = false;

const App = () => {
  const store = createStore();

  useEffect(() => {
    // get the registration token
    // This will only be triggered when the token is generated or updated.
    PushNotification.onRegister(async (deviceToken: string) => {
      await AsyncStorage.setItem("deviceToken", deviceToken)
        .then(() => {})
        .catch(() => {});
    });
    AsyncStorage.getItem(`push_token${awsExports.aws_mobile_analytics_app_id}`)
      .then((deviceToken) => {
        deviceToken &&
          AsyncStorage.setItem("deviceToken", deviceToken)
            .then(() => {})
            .catch(() => {});
      })
      .catch(() => {});

    if (shouldUseJailbreak && !__DEV__ && JailMonkey.trustFall()) {
      Alert.alert(
        "You are running on a rooted/jailbroken device.",
        "You cannot proceed on using the app.",
        [
          {
            text: "OK",
            onPress: () => RNExitApp.exitApp(),
          },
        ]
      );
    }
  }, []);

  useEffect(() => {
    const fetcher = async () => {
      const playStoreURL = "market://details?id=com.marlowcrewcompanionapp";
      const appStoreURL =
        "itms-services://?action=download-manifest&url=https://rest2.marlow.com.cy:8443/assetsPDB/media/manifest.plist";

      const versions = (await request({
        endpoint: "versionCheck",
        requestMethod: "GET",
      }).then((res) => res.json())) as VersionCheck;
      if (Platform.OS === "ios" && DeviceInfo.getVersion() !== versions.ios) {
        appVersionAlert(appStoreURL);
      } else if (
        Platform.OS === "android" &&
        DeviceInfo.getVersion() !== versions.android
      ) {
        appVersionAlert(playStoreURL);
      }
    };

    fetcher();
  }, []);

  const appVersionAlert = (url: string) => {
    Alert.alert(
      "",
      "A new version of the app is now available for your device. Would you like to download it now?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => Linking.openURL(url),
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <AppearanceProvider>
      <Provider store={store.store}>
        <ReduxNetworkProvider
          pingServerUrl={`${API_BASE_URL}/heartbeat`}
          shouldPing={ENV !== "DUMMY"}
          pingInBackground={true}
          pingInterval={3000}
        >
          <PersistGate persistor={store.persistor}>
            <View style={styles.container}>
              <NoInternetHeader />
              <NewMessageAlert />
              <Container />
            </View>
          </PersistGate>
        </ReduxNetworkProvider>
      </Provider>
    </AppearanceProvider>
  );
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export default CodePush({
  updateDialog: {
    title: "Update",
  },
  installMode: CodePush.InstallMode.ON_NEXT_RESTART,
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
})(App);
