import MainTabNavigator from "./MainTabNavigator";
import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { defaultState } from "../redux/reducers";
import configureMockStore from "redux-mock-store";
import Amplify, { Analytics, Auth } from "aws-amplify";
import { Alert } from "react-native";
import * as WebsocketFunctionsHelper from "../common/websocketFunctions";
import * as ReconnectingWebSocket from "reconnecting-websocket";

jest.mock("../screens/BottomTabMainScreen", () => {
  const MockTest = jest.requireActual("../screens/BottomTabMainScreen").default;
  return (props: any) => (
    <MockTest
      {...props}
      navigation={{ ...props.navigation, navigate: jest.fn() }}
    />
  );
});

describe("MainTabNavigator snapshot tests", () => {
  afterEach((done) => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
    done();
  });

  beforeEach(() => {
    jest.useFakeTimers();
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
  });

  it("should return correct ui", async () => {
    jest.useRealTimers();
    const mockedStore = configureMockStore();

    const spy = jest
      .spyOn(WebsocketFunctionsHelper, "initializeWs")
      .mockResolvedValue(
        new ReconnectingWebSocket.default(() => "ws://localhost1234")
      );

    const { toJSON } = await waitFor(() =>
      render(
        <Provider store={mockedStore(defaultState)}>
          <NavigationContainer>
            <MainTabNavigator />
          </NavigationContainer>
        </Provider>
      )
    );

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
    spy.mockRestore();
  });
});
describe("MainTabNavigator fireEvent tests", () => {
  afterEach((done) => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
    done();
  });

  beforeEach(() => {
    jest.useFakeTimers();
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
    Auth.currentAuthenticatedUser = jest
      .fn()
      .mockResolvedValue({ challengeName: "auth" });
  });

  it("should return correct ui when clicking vessel-tracker-button", async () => {
    jest.useRealTimers();
    const mockedStore = configureMockStore();
    const spy = jest.spyOn(Alert, "alert");
    const spy2 = jest
      .spyOn(WebsocketFunctionsHelper, "initializeWs")
      .mockResolvedValue(
        new ReconnectingWebSocket.default(() => "ws://localhost1234")
      );
    const { toJSON, getAllByTestId } = render(
      <Provider store={mockedStore(defaultState)}>
        <NavigationContainer>
          <MainTabNavigator />
        </NavigationContainer>
      </Provider>
    );

    await waitFor(() => {
      fireEvent.press(getAllByTestId("vessel-tracker-button")[0]);
      expect(Alert.alert).toHaveBeenCalledTimes(1);
      const button = spy.mock.calls[0][2] || [];
      if (button[0].onPress) {
        button[0].onPress();
      }
      expect(toJSON()).toMatchSnapshot();
    });

    spy.mockRestore();
    spy2.mockRestore();
  });
  it("should return correct ui when clicking assignments-icon-button", async () => {
    jest.useRealTimers();
    const mockedStore = configureMockStore();
    const spy = jest
      .spyOn(WebsocketFunctionsHelper, "initializeWs")
      .mockResolvedValue(
        new ReconnectingWebSocket.default(() => "ws://localhost1234")
      );

    const { toJSON, getAllByTestId } = await waitFor(() =>
      render(
        <Provider store={mockedStore(defaultState)}>
          <NavigationContainer>
            <MainTabNavigator />
          </NavigationContainer>
        </Provider>
      )
    );

    fireEvent.press(getAllByTestId("assignments-icon-button")[0]);
    expect(toJSON()).toMatchSnapshot();
    spy.mockRestore();
  });
  it("should return correct ui when clicking flights-icon-button", async () => {
    jest.useRealTimers();
    const mockedStore = configureMockStore();

    const spy = jest
      .spyOn(WebsocketFunctionsHelper, "initializeWs")
      .mockResolvedValue(
        new ReconnectingWebSocket.default(() => "ws://localhost1234")
      );

    const { toJSON, getAllByTestId } = await waitFor(() =>
      render(
        <Provider store={mockedStore(defaultState)}>
          <NavigationContainer>
            <MainTabNavigator />
          </NavigationContainer>
        </Provider>
      )
    );

    fireEvent.press(getAllByTestId("flights-icon-button")[0]);
    expect(toJSON()).toMatchSnapshot();
    spy.mockRestore();
  });
  it("should return correct ui when clicking chat-icon-button", async () => {
    jest.useRealTimers();
    const mockedStore = configureMockStore();
    const spy = jest
      .spyOn(WebsocketFunctionsHelper, "initializeWs")
      .mockResolvedValue(
        new ReconnectingWebSocket.default(() => "ws://localhost1234")
      );

    const { toJSON, getAllByTestId } = await waitFor(() =>
      render(
        <Provider store={mockedStore(defaultState)}>
          <NavigationContainer>
            <MainTabNavigator />
          </NavigationContainer>
        </Provider>
      )
    );

    fireEvent.press(getAllByTestId("chat-icon-button")[0]);
    expect(toJSON()).toMatchSnapshot();
    spy.mockRestore();
  });
  it("should return correct ui when clicking notification-icon-button", async () => {
    jest.useRealTimers();
    const mockedStore = configureMockStore();
    const spy = jest
      .spyOn(WebsocketFunctionsHelper, "initializeWs")
      .mockResolvedValue(
        new ReconnectingWebSocket.default(() => "ws://localhost1234")
      );

    const { toJSON, getAllByTestId } = await waitFor(() =>
      render(
        <Provider store={mockedStore(defaultState)}>
          <NavigationContainer>
            <MainTabNavigator />
          </NavigationContainer>
        </Provider>
      )
    );

    fireEvent.press(getAllByTestId("notification-icon-button")[0]);
    expect(toJSON()).toMatchSnapshot();
    spy.mockRestore();
  });
  it("should return correct ui when clicking more-icon-button", async () => {
    jest.useRealTimers();
    const mockedStore = configureMockStore();
    const spy = jest
      .spyOn(WebsocketFunctionsHelper, "initializeWs")
      .mockResolvedValue(
        new ReconnectingWebSocket.default(() => "ws://localhost1234")
      );

    const { toJSON, getAllByTestId } = await waitFor(() =>
      render(
        <Provider store={mockedStore(defaultState)}>
          <NavigationContainer>
            <MainTabNavigator />
          </NavigationContainer>
        </Provider>
      )
    );

    fireEvent.press(getAllByTestId("more-icon-button")[0]);
    expect(toJSON()).toMatchSnapshot();
    spy.mockRestore();
  });
});
