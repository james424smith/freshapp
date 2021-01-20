import React from "react";
import ChatHistoryScreen from "../../chat/ChatHistoryScreen";
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { useNavigation } from "@react-navigation/native";
import { CHAT_ROOM_ROUTE, CHAT_ROUTE } from "../../../constants/routes";
import { Settings } from "luxon";
import MockDate from "mockdate";

const history = [
  {
    blob: "1234",
    lastMessage: "hello",
    lastMessageTs: 1606471168000,
    recipientId: "12345",
    familyName: "Family",
    firstName: "Name",
    middleName: "",
    unreadCount: 2,
  },
  {
    blob: "1234",
    lastMessage: "hello",
    lastMessageTs: 1606471168000,
    recipientId: "1234",
    familyName: "Family",
    firstName: "Name",
    middleName: "",
    unreadCount: 0,
  },
];

const whoIsAround = [
  {
    blob: "1234",
    familyName: "Family",
    firstName: "Name",
    middleName: "",
    onlineUntil: 1606471168000,
    oracleId: "1234",
  },
  {
    blob: "12345",
    familyName: "Family",
    firstName: "Name",
    middleName: "",
    onlineUntil: 1606471168000,
    oracleId: "12345",
  },
];

describe("ChatHistoryScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render correct ui when isOnline is true and isLoadingNewHistory is false", async () => {
    MockDate.set(1574237559000);

    Settings.now = () => new Date().valueOf();

    const mockedState = {
      websocketReducer: {
        history,
        whoIsAround,
        onlineUntil: 1574237659000,
        isOnline: true,
        isLoadingNewHistory: false,
        network: { isConnected: true },
      },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <ChatHistoryScreen />
      </Provider>
    );

    getByTestId("scrollview").props.refreshControl.props.onRefresh();

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
    MockDate.reset();
  });
  it("should render correct ui when isOnline is false and isLoadingNewHistory is false", async () => {
    MockDate.set(1574237559000);

    Settings.now = () => new Date().valueOf();

    const mockedState = {
      websocketReducer: {
        history,
        whoIsAround,
        onlineUntil: 0,
        isOnline: false,
        isLoadingNewHistory: false,
        network: { isConnected: true },
      },
    };

    const mockedStore = configureMockStore();

    const { toJSON, getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <ChatHistoryScreen />
      </Provider>
    );

    getByTestId("scrollview").props.refreshControl.props.onRefresh();
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
    MockDate.reset();
  });
});

describe("test fireevents", () => {
  it("should navigate to CHAT_ROOM_ROUTE when clicking the go-to-chat-button", async () => {
    MockDate.set(1574237559000);

    Settings.now = () => new Date().valueOf();

    const mockedState = {
      websocketReducer: {
        history,
        whoIsAround,
        onlineUntil: 1574237659000,
        isOnline: true,
        isLoadingNewHistory: false,
        network: { isConnected: true },
      },
    };
    const mockedStore = configureMockStore();

    const { getAllByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <ChatHistoryScreen />
      </Provider>
    );
    await waitFor(() => {
      fireEvent.press(getAllByTestId("go-to-chat-button")[0]);
      expect(useNavigation().navigate).toHaveBeenCalledWith(CHAT_ROOM_ROUTE, {
        recipient: {
          recipientId: history[0].recipientId,
          blob: history[0].blob,
          firstName: history[0].firstName,
          familyName: history[0].familyName,
        },
      });
    });
    MockDate.reset();
  });
  it("should navigate to CHAT_ROOM_ROUTE when clicking the go-to-chat-user", async () => {
    MockDate.set(1574237559000);

    Settings.now = () => new Date().valueOf();

    const mockedState = {
      websocketReducer: {
        history,
        whoIsAround,
        onlineUntil: 1574237659000,
        isOnline: true,
        isLoadingNewHistory: false,
        network: { isConnected: true },
      },
    };
    const mockedStore = configureMockStore();

    const { getAllByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <ChatHistoryScreen />
      </Provider>
    );
    fireEvent.press(getAllByTestId("go-to-chat-user")[0]);
    await waitFor(() => {
      expect(useNavigation().navigate).toHaveBeenCalledWith(CHAT_ROOM_ROUTE, {
        recipient: {
          recipientId: history[0].recipientId,
          blob: history[0].blob,
          firstName: history[0].firstName,
          familyName: history[0].familyName,
        },
      });
    });
    MockDate.reset();
  });
  it("should navigate to CHAT_ROOM_ROUTE when clicking the go-to-main-chat", async () => {
    MockDate.set(1574237559000);

    Settings.now = () => new Date().valueOf();

    const mockedState = {
      websocketReducer: {
        history,
        whoIsAround,
        onlineUntil: 1574237659000,
        isOnline: true,
        isLoadingNewHistory: false,
        network: { isConnected: true },
      },
    };
    const mockedStore = configureMockStore();

    const { getAllByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <ChatHistoryScreen />
      </Provider>
    );
    await waitFor(() => {
      fireEvent.press(getAllByTestId("go-to-main-chat")[0]);
      expect(useNavigation().navigate).toHaveBeenCalledWith(CHAT_ROUTE);
    });
    MockDate.reset();
  });
});
