import { Auth } from "aws-amplify";
import * as RNFS from "react-native-fs";
import AsyncStorage from "@react-native-community/async-storage";
import { SIGN_IN_ROUTE } from "../constants/routes";
import { AppState, Platform, Vibration, PushNotification } from "react-native";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { ANDROID, IOS } from "../constants/Platforms";
import {
  ASSIGNMENT,
  CHAT,
  FLIGHT,
  GENERAL,
  NEWSLETTER,
  PAYSLIP,
  PERSONAL,
  DELETE_USER,
  LOGOUT,
} from "../constants/notificationsConstants";
import * as PushNotificationsHelper from "./pushNotifications";
import PushNotificationAmplify from "@aws-amplify/pushnotification";

import {
  SET_NEW_CHAT_NOTIFICATION,
  PushNotificationType,
  InitialisedSagaCall,
  WebsocketEvent,
} from "../interfaces";
import { handleLink } from "./handleLink";

const errorMessage = "error while redirecting to screen";

export const handleSignOut = async (shouldBeGlobal: boolean) => {
  const currentEmployeeId = await AsyncStorage.getItem("employeeId");
  const shouldSaveEmployeeId = await AsyncStorage.getItem(
    "shouldSaveEmployeeId"
  );

  await Auth.signOut({ global: shouldBeGlobal });
  const documentPath = `${RNFS.DocumentDirectoryPath}/document`;
  const documentFolder = await RNFS.exists(documentPath);
  documentFolder && (await RNFS.unlink(documentPath));
  const payslipPath = `${RNFS.DocumentDirectoryPath}/payslip`;
  const payslipFolder = await RNFS.exists(payslipPath);
  payslipFolder && (await RNFS.unlink(payslipPath));
  const asyncStorageKeys = await AsyncStorage.getAllKeys();
  if (asyncStorageKeys.length > 0) {
    Promise.all(
      asyncStorageKeys.map(async (key: string) => {
        if (key !== "colorScheme" && key !== "SIGN_IN_PATH") {
          await AsyncStorage.removeItem(key);
        }
      })
    );
  }

  currentEmployeeId &&
    (await AsyncStorage.setItem("employeeId", currentEmployeeId));
  shouldSaveEmployeeId &&
    (await AsyncStorage.setItem("shouldSaveEmployeeId", shouldSaveEmployeeId));
};

type Props = {
  getNotificationsDetails: () => InitialisedSagaCall;
  dispatch: (arg?: unknown) => void;
  navigation: any;
  setWebsocketData: (event: WebsocketEvent) => InitialisedSagaCall;
};

export const extractNotificationData = (notification: PushNotificationType) => {
  if (Platform.OS === ANDROID) {
    return notification.data
      ? JSON.parse(notification.data["pinpoint.jsonBody"])
      : JSON.parse(notification["pinpoint.jsonBody"]);
  } else {
    return notification._data.data.jsonBody;
  }
};

export const extractNotificationBody = (notification: PushNotificationType) => {
  if (notification.body) {
    return notification.body;
  } else {
    return notification._alert?.body;
  }
};

export const handlePushNotificationRedirection = async ({
  notificationCategory,
}: {
  notificationCategory: string;
}) => {
  switch (notificationCategory) {
    case DELETE_USER:
      await PushNotificationsHelper.handleSignOut(true);
      break;
    case LOGOUT:
      await PushNotificationsHelper.handleSignOut(false);
      break;
    case ASSIGNMENT:
      await handleLink("crewcompanion", "assignment");
      break;
    case PAYSLIP:
      await handleLink("crewcompanion", "salaries");
      break;
    case FLIGHT:
      await handleLink("crewcompanion", "flights");
      break;
    case CHAT:
      await handleLink("crewcompanion", "chat/history");
      break;
    case PERSONAL:
      await handleLink("crewcompanion", "documents");
      break;
    case NEWSLETTER:
      await handleLink("crewcompanion", "news");
      break;
    case GENERAL:
      await handleLink("crewcompanion", "notifications");
      break;
    default:
      await handleLink("crewcompanion", "notifications");
      break;
  }
};

export default async () => {
  // // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
  if (Platform.OS === IOS) {
    PushNotificationIOS.getInitialNotification().then(
      (notification: PushNotification | null) => {
        if (notification !== null) {
          const notificationData = PushNotificationsHelper.extractNotificationData(
            (notification as unknown) as PushNotificationType
          );
          PushNotificationsHelper.handlePushNotificationRedirection(
            notificationData
          )
            .then(() => {})
            .catch((error) => console.log(errorMessage, error));
          // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      }
    );
  }
  // get the notification data when notification is received
  PushNotificationAmplify.onNotification(
    async (notification: PushNotification | null) => {
      Vibration.vibrate([0, 500, 100, 200]);
      const notificationData = PushNotificationsHelper.extractNotificationData(
        (notification as unknown) as PushNotificationType
      );
      if (Platform.OS === ANDROID) {
        if (notificationData.notificationCategory === "DeleteUser") {
          PushNotificationsHelper.handlePushNotificationRedirection(
            notificationData
          ).catch((error) => console.log(errorMessage, error));
        }
      } else {
        if (AppState.currentState === "background" && notification) {
          PushNotificationsHelper.handlePushNotificationRedirection(
            notificationData
          ).catch((error) => console.log(errorMessage, error));
          // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      }
    }
  );

  // get the notification data when notification is opened
  PushNotificationAmplify.onNotificationOpened(
    async (notification: PushNotification | null) => {
      const notificationData = PushNotificationsHelper.extractNotificationData(
        (notification as unknown) as PushNotificationType
      );
      await PushNotificationsHelper.handlePushNotificationRedirection(
        notificationData
      ).catch((error) => console.log(errorMessage, error));
    }
  );
};

export const getNotificationOnForeground = async (props: Props) =>
  PushNotificationAmplify.onNotification(
    async (notification: PushNotification | null) => {
      Vibration.vibrate([0, 500, 100]);
      console.log("in app notification", notification);
      props.getNotificationsDetails();
      const notificationData = PushNotificationsHelper.extractNotificationData(
        (notification as unknown) as PushNotificationType
      );
      if (notificationData.notificationCategory === DELETE_USER) {
        await PushNotificationsHelper.handleSignOut(true).then(() => {
          props.navigation.navigate("Auth", { screen: SIGN_IN_ROUTE });
        });
      }
      if (notificationData.notificationCategory === LOGOUT) {
        await PushNotificationsHelper.handleSignOut(false).then(() =>
          props.navigation.navigate("Auth", { screen: SIGN_IN_ROUTE })
        );
      }
      if (notificationData.notificationCategory === CHAT) {
        const event = {
          messageType: SET_NEW_CHAT_NOTIFICATION,
          payload: {
            ...notificationData,
            notificationBody: PushNotificationsHelper.extractNotificationBody(
              (notification as unknown) as PushNotificationType
            ),
          },
        };
        props.dispatch(props.setWebsocketData(event as WebsocketEvent));
      }
    }
  );
