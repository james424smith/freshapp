import AsyncStorage from "@react-native-community/async-storage";
import { Auth } from "aws-amplify";
import PushNotification, {
  extractNotificationBody,
  extractNotificationData,
  handlePushNotificationRedirection,
  handleSignOut,
} from "./pushNotifications";
import * as RN from "react-native";
import * as RNPN from "@react-native-community/push-notification-ios";
import AmplifyPN from "@aws-amplify/pushnotification";
import * as handleLinkHelper from "./handleLink";
import * as PushNotificationsHelper from "./pushNotifications";
import RNFS from "react-native-fs";
import {
  InitialisedSagaCall,
  PushNotificationType,
  WebsocketEvent,
} from "../interfaces";
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
import { Platform, Vibration } from "react-native";

describe("test handleSignOut", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should signout with global and getAllKeys is not empty", async () => {
    AsyncStorage.getItem = jest.fn().mockImplementation((x) => {
      if (x === "employeeId") {
        return Promise.resolve("12345");
      } else {
        return Promise.resolve(true);
      }
    });

    AsyncStorage.getAllKeys = jest.fn().mockImplementation(() => {
      return Promise.resolve(["1234", "123", "dark"]);
    });

    Auth.signOut = jest.fn();

    const spy = jest
      .spyOn(RNFS, "exists")
      .mockImplementation(() => Promise.resolve(true));

    await handleSignOut(true);

    expect(Auth.signOut).toBeCalledWith({ global: true });
    expect(RNFS.unlink).toHaveBeenCalledTimes(2);
    spy.mockRestore();
  });
  it("should signout with global and getAllKeys is  empty", async () => {
    AsyncStorage.getItem = jest.fn().mockImplementation((x) => {
      if (x === "employeeId") {
        return Promise.resolve("12345");
      } else {
        return Promise.resolve(true);
      }
    });

    AsyncStorage.getAllKeys = jest.fn().mockImplementation(() => {
      return Promise.resolve([]);
    });

    Auth.signOut = jest.fn();

    const spy = jest
      .spyOn(RNFS, "exists")
      .mockImplementation(() => Promise.resolve(true));

    await handleSignOut(true);

    expect(Auth.signOut).toBeCalledWith({ global: true });
    expect(RNFS.unlink).toHaveBeenCalledTimes(2);
    spy.mockRestore();
  });
});

describe("test extractNotificationData", () => {
  it("should return correct object when platform is Adnroid and data is defined", () => {
    Platform.OS = "android";
    const data = {
      data: {
        ["pinpoint.jsonBody"]: JSON.stringify({ someKey: "someValue" }),
      },
    };

    const result = extractNotificationData(data as PushNotificationType);
    expect(result).toStrictEqual({ someKey: "someValue" });
  });
  it("should return correct object when platform is Adnroid and data is not defined", () => {
    Platform.OS = "android";
    const data = {
      ["pinpoint.jsonBody"]: JSON.stringify({ someKey: "someValue" }),
    };

    const result = extractNotificationData(data as PushNotificationType);
    expect(result).toStrictEqual({ someKey: "someValue" });
  });
  it("should return correct object when platform is iOS", () => {
    Platform.OS = "ios";
    const data = {
      _data: {
        data: {
          jsonBody: { notificationCategory: "someValue" },
        },
      },
    };

    const result = extractNotificationData(data as PushNotificationType);
    expect(result).toStrictEqual({ notificationCategory: "someValue" });
  });
});

describe("test extractNotificationBody", () => {
  it("should return body if it is defined", () => {
    const data = {
      body: "some value",
    };

    const result = extractNotificationBody(data as PushNotificationType);
    expect(result).toBe("some value");
  });
  it("should return correct object when _alert is defined", () => {
    const data = {
      _alert: {
        body: "some value",
      },
    };

    const result = extractNotificationBody(data as PushNotificationType);
    expect(result).toBe("some value");
  });
});

describe("test handlePushNotificationRedirection", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should call handleSignOut with true parameter when notificationCategory is DELETE_USER", async () => {
    const spy = jest
      .spyOn(PushNotificationsHelper, "handleSignOut")
      .mockImplementation(async (shouldBeGlobal: boolean) => {
        Promise.resolve(shouldBeGlobal);
      });
    await handlePushNotificationRedirection({
      notificationCategory: DELETE_USER,
    });

    expect(handleSignOut).toHaveBeenCalledWith(true);
    spy.mockRestore();
  });
  it("should call handleSignOut with true parameter when notificationCategory is LOGOUT", async () => {
    const spy = jest
      .spyOn(PushNotificationsHelper, "handleSignOut")
      .mockImplementation(async (shouldBeGlobal: boolean) => {
        Promise.resolve(shouldBeGlobal);
      });
    await handlePushNotificationRedirection({
      notificationCategory: LOGOUT,
    });

    expect(handleSignOut).toHaveBeenCalledWith(false);
    spy.mockRestore();
  });
  it("should call handleSignOut with true parameter when notificationCategory is ASSIGNMENT", async () => {
    const spy = jest
      .spyOn(handleLinkHelper, "handleLink")
      .mockImplementation(
        async (redirectType: string, destination?: string) => {
          Promise.resolve({ redirectType, destination });
        }
      );
    await handlePushNotificationRedirection({
      notificationCategory: ASSIGNMENT,
    });

    expect(handleLinkHelper.handleLink).toHaveBeenCalledWith(
      "crewcompanion",
      "assignment"
    );
    spy.mockRestore();
  });

  it("should call handleSignOut with true parameter when notificationCategory is PAYSLIP", async () => {
    const spy = jest
      .spyOn(handleLinkHelper, "handleLink")
      .mockImplementation(
        async (redirectType: string, destination?: string) => {
          Promise.resolve({ redirectType, destination });
        }
      );
    await handlePushNotificationRedirection({
      notificationCategory: PAYSLIP,
    });

    expect(handleLinkHelper.handleLink).toHaveBeenCalledWith(
      "crewcompanion",
      "salaries"
    );
    spy.mockRestore();
  });
  it("should call handleSignOut with true parameter when notificationCategory is FLIGHT", async () => {
    const spy = jest
      .spyOn(handleLinkHelper, "handleLink")
      .mockImplementation(
        async (redirectType: string, destination?: string) => {
          Promise.resolve({ redirectType, destination });
        }
      );
    await handlePushNotificationRedirection({
      notificationCategory: FLIGHT,
    });

    expect(handleLinkHelper.handleLink).toHaveBeenCalledWith(
      "crewcompanion",
      "flights"
    );
    spy.mockRestore();
  });
  it("should call handleSignOut with true parameter when notificationCategory is CHAT", async () => {
    const spy = jest
      .spyOn(handleLinkHelper, "handleLink")
      .mockImplementation(
        async (redirectType: string, destination?: string) => {
          Promise.resolve({ redirectType, destination });
        }
      );
    await handlePushNotificationRedirection({
      notificationCategory: CHAT,
    });

    expect(handleLinkHelper.handleLink).toHaveBeenCalledWith(
      "crewcompanion",
      "chat/history"
    );
    spy.mockRestore();
  });
  it("should call handleSignOut with true parameter when notificationCategory is PERSONAL", async () => {
    const spy = jest
      .spyOn(handleLinkHelper, "handleLink")
      .mockImplementation(
        async (redirectType: string, destination?: string) => {
          Promise.resolve({ redirectType, destination });
        }
      );
    await handlePushNotificationRedirection({
      notificationCategory: PERSONAL,
    });

    expect(handleLinkHelper.handleLink).toHaveBeenCalledWith(
      "crewcompanion",
      "documents"
    );
    spy.mockRestore();
  });
  it("should call handleSignOut with true parameter when notificationCategory is NEWSLETTER", async () => {
    const spy = jest
      .spyOn(handleLinkHelper, "handleLink")
      .mockImplementation(
        async (redirectType: string, destination?: string) => {
          Promise.resolve({ redirectType, destination });
        }
      );
    await handlePushNotificationRedirection({
      notificationCategory: NEWSLETTER,
    });

    expect(handleLinkHelper.handleLink).toHaveBeenCalledWith(
      "crewcompanion",
      "news"
    );
    spy.mockRestore();
  });
  it("should call handleSignOut with true parameter when notificationCategory is GENERAL", async () => {
    const spy = jest
      .spyOn(handleLinkHelper, "handleLink")
      .mockImplementation(
        async (redirectType: string, destination?: string) => {
          Promise.resolve({ redirectType, destination });
        }
      );
    await handlePushNotificationRedirection({
      notificationCategory: GENERAL,
    });

    expect(handleLinkHelper.handleLink).toHaveBeenCalledWith(
      "crewcompanion",
      "notifications"
    );
    spy.mockRestore();
  });
  it("should call handleSignOut with true parameter when notificationCategory is not in the options", async () => {
    const spy = jest
      .spyOn(handleLinkHelper, "handleLink")
      .mockImplementation(
        async (redirectType: string, destination?: string) => {
          Promise.resolve({ redirectType, destination });
        }
      );
    await handlePushNotificationRedirection({
      notificationCategory: "SOMETHING_ELSE",
    });

    expect(handleLinkHelper.handleLink).toHaveBeenCalledWith(
      "crewcompanion",
      "notifications"
    );
    spy.mockRestore();
  });
});

describe("test the dfault function based on the parameters", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  it("should call the appropriate functions when the platform is ios", async () => {
    Platform.OS = "ios";

    const notification = {
      _data: {
        data: {
          jsonBody: { notificationCategory: "someValue" },
        },
      },
      finish: jest.fn(),
    };

    RNPN.default.getInitialNotification = async () => notification;

    RNPN.default.FetchResult = jest.fn();

    const spy = jest
      .spyOn(PushNotificationsHelper, "handlePushNotificationRedirection")
      .mockImplementation(async ({ notificationCategory }) => {
        Promise.resolve(notificationCategory);
      });

    const spy2 = jest
      .spyOn(PushNotificationsHelper, "extractNotificationData")
      .mockImplementation(() => {
        return "123";
      });

    AmplifyPN.onNotification = jest.fn(async (fn) => {
      await fn(notification);
    });

    RN.Vibration.vibrate = jest.fn();
    RN.AppState.currentState = "background";

    await PushNotification();

    expect(
      PushNotificationsHelper.handlePushNotificationRedirection
    ).toHaveBeenCalledTimes(2);
    expect(
      PushNotificationsHelper.extractNotificationData
    ).toHaveBeenCalledTimes(2);

    expect(notification.finish).toHaveBeenCalledTimes(2);

    expect(Vibration.vibrate).toHaveBeenCalledWith([0, 500, 100, 200]);

    spy.mockRestore();
    spy2.mockRestore();
  });

  it("should call the appropriate functions when the platform is ios and notification is null", async () => {
    Platform.OS = "ios";

    const notification = null;

    RNPN.default.getInitialNotification = async () => notification;

    RNPN.default.FetchResult = jest.fn();

    const spy = jest
      .spyOn(PushNotificationsHelper, "handlePushNotificationRedirection")
      .mockImplementation(async ({ notificationCategory }) => {
        Promise.resolve(notificationCategory);
      });

    const spy2 = jest
      .spyOn(PushNotificationsHelper, "extractNotificationData")
      .mockImplementation(() => {
        return "123";
      });

    AmplifyPN.onNotification = jest.fn(async (fn) => {
      await fn(notification);
    });

    RN.Vibration.vibrate = jest.fn();
    RN.AppState.currentState = "background";

    await PushNotification();

    expect(
      PushNotificationsHelper.handlePushNotificationRedirection
    ).toHaveBeenCalledTimes(0);
    expect(
      PushNotificationsHelper.extractNotificationData
    ).toHaveBeenCalledTimes(1);

    spy.mockRestore();
    spy2.mockRestore();
  });
  it("should call the appropriate functions when the platform is ios and handlePushNotificationRedirection retrns an error", async () => {
    Platform.OS = "ios";

    const notification = {
      _data: {
        data: {
          jsonBody: { notificationCategory: "someValue" },
        },
      },
      finish: jest.fn(),
    };

    RNPN.default.getInitialNotification = async () => notification;

    RNPN.default.FetchResult = jest.fn();

    const spy = jest
      .spyOn(PushNotificationsHelper, "handlePushNotificationRedirection")
      .mockRejectedValue("error");

    const spy2 = jest
      .spyOn(PushNotificationsHelper, "extractNotificationData")
      .mockImplementation(() => {
        return "123";
      });

    AmplifyPN.onNotification = jest.fn(async (fn) => {
      await fn(notification);
    });

    RN.Vibration.vibrate = jest.fn();
    RN.AppState.currentState = "background";

    await PushNotification();

    expect(
      PushNotificationsHelper.handlePushNotificationRedirection
    ).toHaveBeenCalledTimes(2);
    expect(
      PushNotificationsHelper.extractNotificationData
    ).toHaveBeenCalledTimes(2);

    expect(notification.finish).toHaveBeenCalledTimes(2);

    expect(Vibration.vibrate).toHaveBeenCalledWith([0, 500, 100, 200]);

    spy.mockRestore();
    spy2.mockRestore();
  });

  it("should call the appropriate functions when the platform is andoird", async () => {
    Platform.OS = "android";

    const notification = {
      data: {
        ["pinpoint.jsonBody"]: JSON.stringify({
          notificationCategory: "someValue",
        }),
      },
    };

    RNPN.default.getInitialNotification = async () => notification;

    const spy = jest
      .spyOn(PushNotificationsHelper, "handlePushNotificationRedirection")
      .mockImplementation(async ({ notificationCategory }) => {
        Promise.resolve(notificationCategory);
      });

    const spy2 = jest
      .spyOn(PushNotificationsHelper, "extractNotificationData")
      .mockImplementation(() => {
        return "123";
      });

    AmplifyPN.onNotification = jest.fn(async (fn) => {
      await fn(notification);
    });
    AmplifyPN.onNotificationOpened = jest.fn(async (fn) => {
      await fn(notification);
    });

    RN.Vibration.vibrate = jest.fn();
    RN.AppState.currentState = "background";

    await PushNotification();

    expect(Vibration.vibrate).toHaveBeenCalledWith([0, 500, 100, 200]);

    expect(
      PushNotificationsHelper.handlePushNotificationRedirection
    ).toHaveBeenCalledTimes(1);
    expect(
      PushNotificationsHelper.extractNotificationData
    ).toHaveBeenCalledTimes(2);

    spy.mockRestore();
    spy2.mockRestore();
  });
  it("should call the appropriate functions when the platform is android and notification is null", async () => {
    Platform.OS = "android";

    const notification = null;

    RNPN.default.getInitialNotification = async () => notification;
    AmplifyPN.onNotificationOpened = jest.fn(async (fn) => {
      await fn(notification);
    });
    RNPN.default.FetchResult = jest.fn();

    const spy = jest
      .spyOn(PushNotificationsHelper, "handlePushNotificationRedirection")
      .mockImplementation(async ({ notificationCategory }) => {
        Promise.resolve(notificationCategory);
      });

    const spy2 = jest
      .spyOn(PushNotificationsHelper, "extractNotificationData")
      .mockImplementation(() => {
        return "123";
      });

    AmplifyPN.onNotification = jest.fn(async (fn) => {
      await fn(notification);
    });

    RN.Vibration.vibrate = jest.fn();
    RN.AppState.currentState = "background";

    await PushNotification();

    expect(
      PushNotificationsHelper.handlePushNotificationRedirection
    ).toHaveBeenCalledTimes(1);
    expect(
      PushNotificationsHelper.extractNotificationData
    ).toHaveBeenCalledTimes(2);

    spy.mockRestore();
    spy2.mockRestore();
  });

  it("should call the appropriate functions when the platform is android and handlePushNotificationRedirection retrns an error", async () => {
    Platform.OS = "android";

    const notification = {
      data: {
        ["pinpoint.jsonBody"]: JSON.stringify({
          notificationCategory: "someValue",
        }),
      },
    };

    RNPN.default.getInitialNotification = async () => notification;

    RNPN.default.FetchResult = jest.fn();

    const spy = jest
      .spyOn(PushNotificationsHelper, "handlePushNotificationRedirection")
      .mockRejectedValue("error");

    const spy2 = jest
      .spyOn(PushNotificationsHelper, "extractNotificationData")
      .mockImplementation(() => {
        return "123";
      });

    AmplifyPN.onNotification = jest.fn(async (fn) => {
      await fn(notification);
    });
    AmplifyPN.onNotificationOpened = jest.fn(async (fn) => {
      await fn(notification);
    });
    RN.Vibration.vibrate = jest.fn();
    RN.AppState.currentState = "background";

    await PushNotification();

    expect(
      PushNotificationsHelper.handlePushNotificationRedirection
    ).toHaveBeenCalledTimes(1);
    expect(
      PushNotificationsHelper.extractNotificationData
    ).toHaveBeenCalledTimes(2);

    expect(Vibration.vibrate).toHaveBeenCalledWith([0, 500, 100, 200]);

    spy.mockRestore();
    spy2.mockRestore();
  });
  it("should call the appropriate functions when the platform is andoird and the categoryName is DeleteUser", async () => {
    Platform.OS = "android";

    const notification = {
      data: {
        ["pinpoint.jsonBody"]: JSON.stringify({
          notificationCategory: "DeleteUser",
        }),
      },
    };

    RNPN.default.getInitialNotification = async () => notification;

    const spy = jest
      .spyOn(PushNotificationsHelper, "handlePushNotificationRedirection")
      .mockImplementation(async ({ notificationCategory }) => {
        Promise.resolve(notificationCategory);
      });

    const spy2 = jest
      .spyOn(PushNotificationsHelper, "extractNotificationData")
      .mockImplementation(() => {
        return "123";
      });

    AmplifyPN.onNotification = jest.fn(async (fn) => {
      await fn(notification);
    });
    AmplifyPN.onNotificationOpened = jest.fn(async (fn) => {
      await fn(notification);
    });

    RN.Vibration.vibrate = jest.fn();
    RN.AppState.currentState = "background";

    await PushNotification();

    expect(Vibration.vibrate).toHaveBeenCalledWith([0, 500, 100, 200]);

    expect(
      PushNotificationsHelper.handlePushNotificationRedirection
    ).toHaveBeenCalledTimes(1);
    expect(
      PushNotificationsHelper.extractNotificationData
    ).toHaveBeenCalledTimes(2);

    spy.mockRestore();
    spy2.mockRestore();
  });
  it("should call the appropriate functions when the platform is andoird and the categoryName is DeleteUser and handlePushNotificationRedirection throws an error", async () => {
    Platform.OS = "android";

    const notification = {
      data: {
        ["pinpoint.jsonBody"]: JSON.stringify({
          notificationCategory: "DeleteUser",
        }),
      },
    };

    RNPN.default.getInitialNotification = async () => notification;

    RNPN.default.FetchResult = jest.fn();

    const spy = jest
      .spyOn(PushNotificationsHelper, "handlePushNotificationRedirection")
      .mockRejectedValue("error");

    const spy2 = jest
      .spyOn(PushNotificationsHelper, "extractNotificationData")
      .mockImplementation(() => {
        return { notificationCategory: "DeleteUser" };
      });

    AmplifyPN.onNotification = jest.fn(async (fn) => {
      await fn(notification);
    });
    AmplifyPN.onNotificationOpened = jest.fn(async (fn) => {
      await fn(notification);
    });
    RN.Vibration.vibrate = jest.fn();
    RN.AppState.currentState = "background";

    await PushNotification();

    expect(
      PushNotificationsHelper.handlePushNotificationRedirection
    ).toHaveBeenCalledTimes(2);
    expect(
      PushNotificationsHelper.extractNotificationData
    ).toHaveBeenCalledTimes(2);

    expect(Vibration.vibrate).toHaveBeenCalledWith([0, 500, 100, 200]);

    spy.mockRestore();
    spy2.mockRestore();
  });
});

describe("test getNotificationOnForeground", () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  const props = ({
    getNotificationsDetails: jest.fn(),
    dispatch: jest.fn(),
    navigation: {
      navigate: jest.fn(),
    },
    setWebsocketData: jest.fn(),
  } as unknown) as {
    getNotificationsDetails: () => InitialisedSagaCall;
    dispatch: (arg?: unknown) => void;
    navigation: any;
    setWebsocketData: (event: WebsocketEvent) => InitialisedSagaCall;
  };

  it("should call navigate when notificationCategory is DeleteUser", async () => {
    const notification = {
      data: {
        ["pinpoint.jsonBody"]: JSON.stringify({
          notificationCategory: "DeleteUser",
        }),
      },
    };

    const spy = jest
      .spyOn(PushNotificationsHelper, "extractNotificationData")
      .mockImplementation(() => {
        return { notificationCategory: DELETE_USER };
      });
    const spy2 = jest
      .spyOn(PushNotificationsHelper, "handleSignOut")
      .mockImplementation(async (shouldBeGlobal: boolean) => {
        Promise.resolve(shouldBeGlobal);
      });

    AmplifyPN.onNotification = jest.fn((fn) => {
      fn(notification);
    });
    RN.Vibration.vibrate = jest.fn();

    await PushNotificationsHelper.getNotificationOnForeground(props);

    expect(RN.Vibration.vibrate).toBeCalledWith([0, 500, 100]);
    expect(props.getNotificationsDetails).toHaveBeenCalledTimes(1);
    expect(
      PushNotificationsHelper.extractNotificationData
    ).toHaveBeenCalledTimes(1);

    expect(PushNotificationsHelper.handleSignOut).toBeCalledWith(true);
    expect(props.navigation.navigate).toHaveBeenCalledTimes(1);
    spy.mockRestore();
    spy2.mockRestore();
  });
  it("should call navigate when notificationCategory is LOGOUT", async () => {
    const notification = {
      data: {
        ["pinpoint.jsonBody"]: JSON.stringify({
          notificationCategory: "LOGOUT",
        }),
      },
    };

    const spy = jest
      .spyOn(PushNotificationsHelper, "extractNotificationData")
      .mockImplementation(() => {
        return { notificationCategory: LOGOUT };
      });
    const spy2 = jest
      .spyOn(PushNotificationsHelper, "handleSignOut")
      .mockImplementation(async (shouldBeGlobal: boolean) => {
        Promise.resolve(shouldBeGlobal);
      });

    AmplifyPN.onNotification = jest.fn((fn) => {
      fn(notification);
    });
    RN.Vibration.vibrate = jest.fn();

    await PushNotificationsHelper.getNotificationOnForeground(props);

    expect(RN.Vibration.vibrate).toBeCalledWith([0, 500, 100]);
    expect(props.getNotificationsDetails).toHaveBeenCalledTimes(1);
    expect(
      PushNotificationsHelper.extractNotificationData
    ).toHaveBeenCalledTimes(1);

    expect(PushNotificationsHelper.handleSignOut).toBeCalledWith(false);
    expect(props.navigation.navigate).toHaveBeenCalledTimes(1);
    spy.mockRestore();
    spy2.mockRestore();
  });
  it("should call navigate when notificationCategory is CHAT", async () => {
    const notification = {
      data: {
        ["pinpoint.jsonBody"]: JSON.stringify({
          notificationCategory: "CHAT",
        }),
      },
    };

    const spy = jest
      .spyOn(PushNotificationsHelper, "extractNotificationData")
      .mockImplementation(() => {
        return { notificationCategory: CHAT };
      });
    const spy2 = jest
      .spyOn(PushNotificationsHelper, "handleSignOut")
      .mockImplementation(async (shouldBeGlobal: boolean) => {
        Promise.resolve(shouldBeGlobal);
      });

    AmplifyPN.onNotification = jest.fn((fn) => {
      fn(notification);
    });
    RN.Vibration.vibrate = jest.fn();

    await PushNotificationsHelper.getNotificationOnForeground(props);

    expect(RN.Vibration.vibrate).toBeCalledWith([0, 500, 100]);
    expect(props.getNotificationsDetails).toHaveBeenCalledTimes(1);
    expect(
      PushNotificationsHelper.extractNotificationData
    ).toHaveBeenCalledTimes(1);

    expect(props.navigation.navigate).toHaveBeenCalledTimes(0);
    expect(props.dispatch).toHaveBeenCalledTimes(1);
    expect(props.setWebsocketData).toHaveBeenCalledTimes(1);
    spy.mockRestore();
    spy2.mockRestore();
  });
});
