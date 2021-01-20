import React from "react";
import ChatRoomScreen from "../../chat/ChatRoomScreen";
import { render, cleanup, waitFor } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { Settings } from "luxon";
import MockDate from "mockdate";
import { Recipient } from "../../../interfaces/";
import Amplify, { Analytics, Auth } from "aws-amplify";
import { Platform } from "react-native";

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

const messages = [
  {
    _id: "1234",
    text: "hellow",
    createdAt: 1606471168000,
    unread: false,
    user: {
      _id: "1234",
      name: "Name",
    },
  },
  {
    _id: "12342",
    text: "hello d",
    createdAt: 1606471178000,
    unread: false,
    user: {
      _id: "12345",
      name: "Name",
    },
  },
];

const profile = {
  blob: "1234",
  familyName: "Family",
  firstName: "Name",
  middleName: "",
  onlineUntil: 1606471168000,
  oracleId: "12345",
};

const whoIsAround = [
  {
    blob: "1234",
    familyName: "Family",
    firstName: "Name",
    middleName: "",
    onlineUntil: 1606471168000,
    oracleId: "1234",
  },
];

const route = {
  state: {},
  key: "ChatRoom-E0ArYKZZNpvIFYMFIEyaQ",
  name: "ChatRoom" as "ChatRoom",
  params: {
    recipient: {
      recipientId: "12345",
      blob: "1234",
      firstName: "Name",
      familyName: "Family",
    } as Recipient,
  },
  getState: jest.fn(),
};

describe("ChatRoomScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render correct ui when isOnline is true and isLoadingNewHistory is false", async () => {
    Auth.currentAuthenticatedUser = jest.fn().mockResolvedValue("12345");
    Analytics.updateEndpoint = jest.fn().mockResolvedValue("12345");
    MockDate.set(1574237559000);

    Settings.now = () => new Date().valueOf();

    const mockedState = {
      websocketReducer: {
        messages,
        profile,
        whoIsAround,
        isOnline: true,
        network: { isConnected: true },
      },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <ChatRoomScreen route={route} />
      </Provider>
    );

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
    MockDate.reset();
  });
  it("should render correct ui when isOnline is true and whoIsAround is empty", async () => {
    Auth.currentAuthenticatedUser = jest.fn().mockResolvedValue("12345");
    Analytics.updateEndpoint = jest.fn().mockResolvedValue("12345");
    MockDate.set(1574237559000);
    Platform.OS = "android";

    Settings.now = () => new Date().valueOf();

    const mockedState = {
      websocketReducer: {
        messages,
        profile,
        whoIsAround: [],
        isOnline: true,
        network: { isConnected: true },
      },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <ChatRoomScreen route={route} />
      </Provider>
    );

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
    MockDate.reset();
  });
  it("should render correct ui when isOnline is false and isLoadingNewHistory is false", async () => {
    Auth.currentAuthenticatedUser = jest.fn().mockResolvedValue("12345");
    Analytics.updateEndpoint = jest.fn().mockResolvedValue("12345");

    MockDate.set(1574237559000);

    Settings.now = () => new Date().valueOf();

    const mockedState = {
      websocketReducer: {
        messages,
        profile,
        whoIsAround,
        isOnline: false,
        network: { isConnected: true },
      },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <ChatRoomScreen route={route} />
      </Provider>
    );

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
    MockDate.reset();
  });
});
