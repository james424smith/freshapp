import React from "react";
import "react-native";
import "@testing-library/jest-native/extend-expect";
import AsyncStorage from "@react-native-community/async-storage";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { render, cleanup, waitFor } from "@testing-library/react-native";
import AuthLoadingScreen from "../../authentication/AuthLoadingScreen";
import Amplify, { Analytics, Auth } from "aws-amplify";
import { StackActions } from "@react-navigation/native";
import {
  FORCE_UPDATE_PASSWORD_ROUTE,
  MAIN_APP_SCREEN_ROUTE,
  PASSCODE_ROUTE,
  SIGN_IN_ROUTE,
  SIGN_UP_ROUTE,
} from "../../../constants/routes";
import * as RN from "react-native";
import FingerprintScanner from "react-native-fingerprint-scanner";

Analytics.updateEndpoint = jest.fn().mockResolvedValue({});
Amplify.configure({
  aws_project_region: "eu-west-1",
  aws_cognito_identity_pool_id:
    "eu-west-1:0700dd4d-d3f1-47e8-aeca-c03a916aba97",
  aws_cognito_region: "eu-west-1",
  aws_user_pools_id: "eu-west-1_VdCn6sWLK",
  aws_user_pools_web_client_id: "3uc4kul2beqktthivc578jutfm",
  oauth: {},
  aws_mobile_analytics_app_id: "33c953d8b8a04972904e65148ea64665",
  aws_mobile_analytics_app_region: "eu-west-1",
});
describe("AuthLoadingScreen test", () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render correctly as per the ui made ", () => {
    const mockedState = {
      seafarerDetails: {
        type: "SET_IS_LOADING_DATA",
        payload: { loader: false },
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();
    const MockComponent = () => (
      <Provider store={mockedStore(mockedState)}>
        <AuthLoadingScreen />
      </Provider>
    );

    const { toJSON } = render(<MockComponent />);
    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correctly as per the ui made and network.isConnected is undefined", () => {
    const mockedState = {
      seafarerDetails: {
        type: "SET_IS_LOADING_DATA",
        payload: { loader: false },
      },
      network: { isConnected: undefined },
    };
    const mockedStore = configureMockStore();
    const MockComponent = () => (
      <Provider store={mockedStore(mockedState)}>
        <AuthLoadingScreen />
      </Provider>
    );

    const { toJSON } = render(<MockComponent />);
    expect(toJSON()).toMatchSnapshot();
  });

  it("If biometrics is enabled then we must have value stored in AsyncStorage Corresponding to That.And user will navigate to MAIN_APP_SCREEN_ROUTE ", async () => {
    AsyncStorage.setItem("isBiometricEnabled", "true");
    const result = await AsyncStorage.getItem("isBiometricEnabled");
    expect(result?.toString()).toBe("true");
  });

  it("If PassCode is enabled then we must have value stored in AsyncStorage Corresponding to That.And user will navigate to PASSCODE_ROUTE ", async () => {
    AsyncStorage.setItem("isUserSetPasscode", "true");
    const result = await AsyncStorage.getItem("isUserSetPasscode");
    expect(result?.toString()).toBe("true");
  });

  it("If Neither PassCode nor biometrics is enabled then we must not have value stored in AsyncStorage Corresponding to That. And user will navigate to SIGN_IN_ROUTE ", async () => {
    AsyncStorage.setItem("isUserSetPasscode", "false");
    AsyncStorage.setItem("isBiometricEnabled", "false");
    const result1 = await AsyncStorage.getItem("isUserSetPasscode");
    const result2 = await AsyncStorage.getItem("isBiometricEnabled");

    expect(result1?.toString()).toBe("false");
    expect(result2?.toString()).toBe("false");
  });
});

describe("test findAppropriatePath", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should call the appropriate navigation when userToken.challengeName is NEW_PASSWORD_CHALLENGE", async () => {
    Auth.currentAuthenticatedUser = jest.fn().mockResolvedValue({
      challengeName: "NEW_PASSWORD_REQUIRED",
    });

    const mockedState = {
      seafarerDetails: {
        type: "SET_IS_LOADING_DATA",
        payload: { loader: false },
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();
    const MockComponent = () => (
      <Provider store={mockedStore(mockedState)}>
        <AuthLoadingScreen />
      </Provider>
    );

    const { toJSON } = await waitFor(() => render(<MockComponent />));
    expect(StackActions.replace).toBeCalledWith("Auth", {
      screen: FORCE_UPDATE_PASSWORD_ROUTE,
    });
    expect(toJSON()).toMatchSnapshot();
  });

  it("should call the appropriate navigation when currentUserInfo returns empty object and user opens the app for the first time", async () => {
    Auth.currentAuthenticatedUser = jest
      .fn()
      .mockResolvedValue({ userName: "1234" });
    Auth.currentUserInfo = jest.fn().mockResolvedValue({});

    const mockedState = {
      seafarerDetails: {
        type: "SET_IS_LOADING_DATA",
        payload: { loader: false },
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();
    const MockComponent = () => (
      <Provider store={mockedStore(mockedState)}>
        <AuthLoadingScreen />
      </Provider>
    );

    const { toJSON } = await waitFor(() => render(<MockComponent />));
    expect(StackActions.replace).toBeCalledWith("Auth", {
      screen: SIGN_UP_ROUTE,
    });
    expect(toJSON()).toMatchSnapshot();
  });
  it("should call the appropriate navigation when currentUserInfo returns empty object and user opens the app after a successful signup", async () => {
    Auth.currentAuthenticatedUser = jest
      .fn()
      .mockResolvedValue({ userName: "1234" });
    Auth.currentUserInfo = jest.fn().mockResolvedValue({});
    AsyncStorage.getItem = jest.fn().mockImplementation(async (x) => {
      if (x === "SIGN_IN_PATH") {
        return "SIGN_IN";
      }
    });

    const mockedState = {
      seafarerDetails: {
        type: "SET_IS_LOADING_DATA",
        payload: { loader: false },
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();
    const MockComponent = () => (
      <Provider store={mockedStore(mockedState)}>
        <AuthLoadingScreen />
      </Provider>
    );

    const { toJSON } = await waitFor(() => render(<MockComponent />));
    expect(StackActions.replace).toBeCalledWith("Auth", {
      screen: SIGN_IN_ROUTE,
    });
    expect(toJSON()).toMatchSnapshot();
  });

  it("should call the appropriate navigation when platform is android and updateEndpoint fails.", async () => {
    RN.Platform.OS = "android";
    Auth.currentUserInfo = jest.fn().mockResolvedValue({ userName: "1234" });
    Auth.currentAuthenticatedUser = jest
      .fn()
      .mockResolvedValue({ userName: "1234" });
    Analytics.updateEndpoint = jest.fn().mockRejectedValue({});

    const mockedState = {
      seafarerDetails: {
        type: "SET_IS_LOADING_DATA",
        payload: { loader: false },
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();
    const MockComponent = () => (
      <Provider store={mockedStore(mockedState)}>
        <AuthLoadingScreen />
      </Provider>
    );

    const { toJSON } = await waitFor(() => render(<MockComponent />));
    expect(StackActions.replace).toBeCalledWith("Auth", {
      screen: PASSCODE_ROUTE,
    });
    expect(toJSON()).toMatchSnapshot();
  });

  it("should call the appropriate navigation when biometric is defined but asyncBiometricLogin fails", async () => {
    Auth.currentUserInfo = jest.fn().mockResolvedValue({ userName: "1234" });
    Auth.currentAuthenticatedUser = jest
      .fn()
      .mockResolvedValue({ userName: "1234" });

    AsyncStorage.getItem = jest
      .fn()
      .mockImplementation(async (x) =>
        x === "isUserSetPasscode"
          ? undefined
          : JSON.stringify({ some: "touchId" })
      );
    FingerprintScanner.isSensorAvailable = jest
      .fn()
      .mockResolvedValue("touchId");
    FingerprintScanner.authenticate = jest.fn().mockRejectedValue({});
    const mockedState = {
      seafarerDetails: {
        type: "SET_IS_LOADING_DATA",
        payload: { loader: false },
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();
    const MockComponent = () => (
      <Provider store={mockedStore(mockedState)}>
        <AuthLoadingScreen />
      </Provider>
    );

    const { toJSON } = await waitFor(() => render(<MockComponent />));
    expect(StackActions.replace).toBeCalledWith("Auth", {
      screen: PASSCODE_ROUTE,
    });
    expect(toJSON()).toMatchSnapshot();
  });
  it("should call the appropriate navigation when biometric is defined but isSensorAvailable fails", async () => {
    Auth.currentUserInfo = jest.fn().mockResolvedValue({ userName: "1234" });
    Auth.currentAuthenticatedUser = jest
      .fn()
      .mockResolvedValue({ userName: "1234" });

    AsyncStorage.getItem = jest
      .fn()
      .mockResolvedValue(JSON.stringify({ some: "touchId" }));
    FingerprintScanner.isSensorAvailable = jest.fn().mockRejectedValue({});
    const mockedState = {
      seafarerDetails: {
        type: "SET_IS_LOADING_DATA",
        payload: { loader: false },
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();
    const MockComponent = () => (
      <Provider store={mockedStore(mockedState)}>
        <AuthLoadingScreen />
      </Provider>
    );

    const { toJSON } = await waitFor(() => render(<MockComponent />));
    expect(StackActions.replace).toBeCalledWith("Auth", {
      screen: PASSCODE_ROUTE,
    });
    expect(toJSON()).toMatchSnapshot();
  });
  it("should call the appropriate navigation when isUserSetPasscode is true", async () => {
    Auth.currentUserInfo = jest.fn().mockResolvedValue({ userName: "1234" });
    Auth.currentAuthenticatedUser = jest
      .fn()
      .mockResolvedValue({ userName: "1234" });

    FingerprintScanner.isSensorAvailable = jest.fn().mockRejectedValue({});

    AsyncStorage.getItem = jest
      .fn()
      .mockImplementation(async (x) =>
        x === "isBiometricEnabled" ? "" : "true"
      );

    const mockedState = {
      seafarerDetails: {
        seafarerDetails: { user: "1234" },
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();
    const MockComponent = () => (
      <Provider store={mockedStore(mockedState)}>
        <AuthLoadingScreen />
      </Provider>
    );

    const { toJSON } = await waitFor(() => render(<MockComponent />));
    expect(StackActions.replace).toBeCalledWith("Auth", {
      screen: PASSCODE_ROUTE,
    });
    expect(toJSON()).toMatchSnapshot();
  });
});

describe("test loginWithoutInternet", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should call the appropriate navigation when biometric is available", async () => {
    const mockedState = {
      seafarerDetails: {
        seafarerDetails: { user: "1234" },
      },
      network: { isConnected: false },
    };

    AsyncStorage.getItem = jest
      .fn()
      .mockResolvedValue(JSON.stringify({ some: "touchId" }));

    FingerprintScanner.isSensorAvailable = jest
      .fn()
      .mockResolvedValue("touchId");
    FingerprintScanner.authenticate = jest.fn().mockResolvedValue("touchId");

    const mockedStore = configureMockStore();
    const MockComponent = () => (
      <Provider store={mockedStore(mockedState)}>
        <AuthLoadingScreen />
      </Provider>
    );

    const { toJSON } = await waitFor(() => render(<MockComponent />));
    expect(StackActions.replace).toBeCalledWith("App", {
      screen: MAIN_APP_SCREEN_ROUTE,
    });
    expect(toJSON()).toMatchSnapshot();
  });
  it("should call the appropriate navigation when passcode is available", async () => {
    const mockedState = {
      seafarerDetails: {
        seafarerDetails: { user: "1234" },
      },
      network: { isConnected: false },
    };
    AsyncStorage.getItem = jest
      .fn()
      .mockImplementation(async (x) =>
        x === "isBiometricEnabled" ? "" : "true"
      );

    const mockedStore = configureMockStore();
    const MockComponent = () => (
      <Provider store={mockedStore(mockedState)}>
        <AuthLoadingScreen />
      </Provider>
    );

    const { toJSON } = await waitFor(() => render(<MockComponent />));
    expect(StackActions.replace).toBeCalledWith("Auth", {
      screen: PASSCODE_ROUTE,
    });
    expect(toJSON()).toMatchSnapshot();
  });
  it("should call the appropriate navigation when both biometrics and passcode are undefined and user opens the app for the first time", async () => {
    const mockedState = {
      seafarerDetails: {
        seafarerDetails: { user: "1234" },
      },
      network: { isConnected: false },
    };

    AsyncStorage.getItem = jest.fn().mockResolvedValue("");

    const mockedStore = configureMockStore();
    const MockComponent = () => (
      <Provider store={mockedStore(mockedState)}>
        <AuthLoadingScreen />
      </Provider>
    );

    const { toJSON } = await waitFor(() => render(<MockComponent />));
    expect(StackActions.replace).toBeCalledWith("Auth", {
      screen: SIGN_UP_ROUTE,
    });
    expect(toJSON()).toMatchSnapshot();
  });
  it("should call the appropriate navigation when both biometrics and passcode are undefined after a successful sign up process", async () => {
    const mockedState = {
      seafarerDetails: {
        seafarerDetails: { user: "1234" },
      },
      network: { isConnected: false },
    };
    AsyncStorage.getItem = jest.fn().mockImplementation(async (x) => {
      if (x === "SIGN_IN_PATH") {
        return "SIGN_IN";
      } else {
        return "";
      }
    });

    const mockedStore = configureMockStore();
    const MockComponent = () => (
      <Provider store={mockedStore(mockedState)}>
        <AuthLoadingScreen />
      </Provider>
    );

    const { toJSON } = await waitFor(() => render(<MockComponent />));
    expect(StackActions.replace).toBeCalledWith("Auth", {
      screen: SIGN_IN_ROUTE,
    });
    expect(toJSON()).toMatchSnapshot();
  });
});
