import React from "react";
import AppNavigator, { AuthenticationStack, MainStack } from "./AppNavigator";
import { render, cleanup, waitFor } from "@testing-library/react-native";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { Appearance } from "react-native-appearance";
import Amplify, { Auth, Analytics } from "aws-amplify";
import FingerprintScanner from "react-native-fingerprint-scanner";
import AsyncStorage from "@react-native-community/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { defaultState } from "../redux/reducers";
import * as WebsocketFunctionsHelper from "../common/websocketFunctions";
import * as ReconnectingWebSocket from "reconnecting-websocket";
import * as RN from "@react-navigation/native";
import { SIGN_IN_ROUTE, SIGN_UP_ROUTE } from "../constants/routes";

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

jest.mock("../screens/BottomTabMainScreen", () => {
  const MockTest = jest.requireActual("../screens/BottomTabMainScreen").default;
  return (props: any) => (
    <MockTest
      {...props}
      navigation={{ ...props.navigation, navigate: jest.fn() }}
    />
  );
});

describe("test AppNavigator snapshots", () => {
  afterEach((done) => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
    done();
  });

  it("should return appropriate ui when user is not authenticated for light mode", async () => {
    jest.useRealTimers();
    const mockedState = {
      ...defaultState,
      darkModeOptionsReducer: { darkModeOptionsValue: "light" },
      network: { isConnected: true },
    };

    Analytics.updateEndpoint = jest.fn().mockResolvedValue({});

    Auth.currentAuthenticatedUser = jest.fn().mockRejectedValue({});

    Appearance.getColorScheme = jest.fn().mockReturnValue("light");

    const mockedStore = configureMockStore();

    const { toJSON } = await waitFor(() =>
      render(
        <Provider store={mockedStore(mockedState)}>
          <AppNavigator />
        </Provider>
      )
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it("should return appropriate ui when user is authenticated for light mode", async () => {
    const mockedState = {
      darkModeOptionsReducer: { darkModeOptionsValue: "light" },
      seafarerDetails: {},
      network: { isConnected: true },
    };
    Analytics.updateEndpoint = jest.fn().mockResolvedValue({});
    const spy = jest
      .spyOn(WebsocketFunctionsHelper, "initializeWs")
      .mockResolvedValue(
        new ReconnectingWebSocket.default(() => "ws://localhost1234")
      );

    AsyncStorage.getItem = jest
      .fn()
      .mockResolvedValue(JSON.stringify({ some: "value" }));

    Auth.currentAuthenticatedUser = jest
      .fn()
      .mockResolvedValue({ challengeName: "login" });

    Auth.currentUserInfo = jest.fn().mockResolvedValue({ username: "12345" });

    Analytics.updateEndpoint = jest.fn().mockResolvedValue({});

    Appearance.getColorScheme = jest.fn().mockReturnValue("light");

    FingerprintScanner.isSensorAvailable = jest.fn().mockResolvedValue("1234");
    FingerprintScanner.authenticate = jest.fn().mockResolvedValue({});

    const mockedStore = configureMockStore();

    const { toJSON } = await waitFor(() =>
      render(
        <Provider store={mockedStore(mockedState)}>
          <AppNavigator />
        </Provider>
      )
    );
    expect(toJSON()).toMatchSnapshot();
    spy.mockRestore();
  });
  it("should return appropriate ui when user is not authenticated for dark mode", async () => {
    const mockedState = {
      darkModeOptionsReducer: { darkModeOptionsValue: "dark" },
      seafarerDetails: {},
      network: { isConnected: true },
    };
    Analytics.updateEndpoint = jest.fn().mockResolvedValue({});
    Appearance.getColorScheme = jest.fn().mockReturnValue("dark");

    const mockedStore = configureMockStore();

    const { toJSON } = await waitFor(() =>
      render(
        <Provider store={mockedStore(mockedState)}>
          <AppNavigator />
        </Provider>
      )
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it("should return appropriate ui when user is not authenticated for dark mode and selectedIndex is undefined and user opens the app for the first time", async () => {
    const mockedState = {
      darkModeOptionsReducer: { darkModeOptionsValue: undefined },
      seafarerDetails: {},
      network: { isConnected: true },
    };
    Analytics.updateEndpoint = jest.fn().mockResolvedValue({});
    Appearance.getColorScheme = jest.fn().mockReturnValue("dark");

    const mockedStore = configureMockStore();
    const store = mockedStore(mockedState);
    Auth.currentAuthenticatedUser = jest.fn().mockRejectedValue({});
    const { toJSON } = await waitFor(() =>
      render(
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      )
    );
    expect(toJSON()).toMatchSnapshot();
    expect(RN.StackActions.replace).toBeCalledWith("Auth", {
      screen: SIGN_UP_ROUTE,
    });
  });
  it("should return appropriate ui when user is not authenticated for dark mode and selectedIndex is undefined after a successful sign up process", async () => {
    const mockedState = {
      darkModeOptionsReducer: { darkModeOptionsValue: undefined },
      seafarerDetails: {},
      network: { isConnected: true },
    };
    AsyncStorage.getItem = jest.fn().mockImplementation(async (x) => {
      if (x === "SIGN_IN_PATH") {
        return "SIGN_IN";
      }
    });

    Analytics.updateEndpoint = jest.fn().mockResolvedValue({});
    Appearance.getColorScheme = jest.fn().mockReturnValue("dark");

    const mockedStore = configureMockStore();
    const store = mockedStore(mockedState);
    Auth.currentAuthenticatedUser = jest.fn().mockRejectedValue({});
    const { toJSON } = await waitFor(() =>
      render(
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      )
    );
    expect(toJSON()).toMatchSnapshot();
    expect(RN.StackActions.replace).toBeCalledWith("Auth", {
      screen: SIGN_IN_ROUTE,
    });
  });
  it("should return appropriate ui when user is not authenticated for dark mode and await AsyncStorage.getItem(colorScheme) is system", async () => {
    const mockedState = {
      darkModeOptionsReducer: { darkModeOptionsValue: undefined },
      seafarerDetails: {},
      network: { isConnected: true },
    };
    Analytics.updateEndpoint = jest.fn().mockResolvedValue({});
    AsyncStorage.getItem = jest.fn().mockResolvedValue("system");

    Appearance.getColorScheme = jest.fn().mockReturnValue("dark");

    const mockedStore = configureMockStore();
    const store = mockedStore(mockedState);
    const { toJSON } = await waitFor(() =>
      render(
        <Provider store={store}>
          <AppNavigator />
        </Provider>
      )
    );

    expect(toJSON()).toMatchSnapshot();
  });
  it("should return appropriate ui when user is authenticated for dark mode", async () => {
    const mockedState = {
      darkModeOptionsReducer: { darkModeOptionsValue: "dark" },
      seafarerDetails: {},
      network: { isConnected: true },
    };
    AsyncStorage.getItem = jest
      .fn()
      .mockResolvedValue(JSON.stringify({ some: "value" }));

    Auth.currentAuthenticatedUser = jest
      .fn()
      .mockResolvedValue({ challengeName: "login" });

    const spy = jest
      .spyOn(WebsocketFunctionsHelper, "initializeWs")
      .mockResolvedValue(
        new ReconnectingWebSocket.default(() => "ws://localhost1234")
      );

    Auth.currentUserInfo = jest.fn().mockResolvedValue({ username: "12345" });

    Analytics.updateEndpoint = jest.fn().mockResolvedValue({});

    Appearance.getColorScheme = jest.fn().mockReturnValue("dark");

    FingerprintScanner.isSensorAvailable = jest.fn().mockResolvedValue("1234");
    FingerprintScanner.authenticate = jest
      .fn()
      .mockImplementation(async () => {});

    const mockedStore = configureMockStore();

    const { toJSON } = await waitFor(() =>
      render(
        <Provider store={mockedStore(mockedState)}>
          <AppNavigator />
        </Provider>
      )
    );
    expect(toJSON()).toMatchSnapshot();
    spy.mockRestore();
  });
});

describe("test AuthenticationStack", () => {
  afterEach((done) => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.useRealTimers();
    done();
  });

  it("should return appropriate ui when user is not authenticated in sign up screen and click the back icon", async () => {
    const mockedState = {
      darkModeOptionsReducer: { darkModeOptionsValue: "light" },
      seafarerDetails: {},
      network: { isConnected: true },
    };
    Analytics.updateEndpoint = jest.fn().mockResolvedValue({});
    Appearance.getColorScheme = jest.fn().mockReturnValue("light");
    Auth.currentAuthenticatedUser = jest.fn().mockRejectedValue({});
    const mockedStore = configureMockStore();

    const { toJSON } = await waitFor(() =>
      render(
        <Provider store={mockedStore(mockedState)}>
          <NavigationContainer>
            <AuthenticationStack />
          </NavigationContainer>
        </Provider>
      )
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
describe("test MainStack", () => {
  afterEach((done) => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
    jest.useFakeTimers();
    done();
  });

  it("should return appropriate ui when user is not authenticated in sign up screen and click the back icon", async () => {
    const mockedState = {
      ...defaultState,
      darkModeOptionsReducer: { darkModeOptionsValue: "light" },
    };
    Analytics.updateEndpoint = jest.fn().mockResolvedValue({});
    const spy = jest
      .spyOn(WebsocketFunctionsHelper, "initializeWs")
      .mockResolvedValue(
        new ReconnectingWebSocket.default(() => "ws://localhost1234")
      );

    Appearance.getColorScheme = jest.fn().mockReturnValue("light");
    Auth.currentUserInfo = jest.fn().mockResolvedValue({ username: "1234" });
    const mockedStore = configureMockStore();

    const { toJSON } = await waitFor(() =>
      render(
        <Provider store={mockedStore(mockedState)}>
          <NavigationContainer>
            <MainStack />
          </NavigationContainer>
        </Provider>
      )
    );
    expect(toJSON()).toMatchSnapshot();
    spy.mockRestore();
  });
});
