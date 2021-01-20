import React from "react";
import {
  render,
  cleanup,
  waitFor,
  fireEvent,
} from "@testing-library/react-native";
import NotificationsScreen from "../NotificationsScreen";
import notifications from "../../../__mocks__/fake-data/notifications.json";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

describe("NotificationsScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render NotificationsScreen when loader is false and photoSmall is defined and hasBoth is true", async () => {
    const mockedState = {
      notificationsDetails: {
        notificationsDetails: notifications,
        loader: false,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getAllByTestId, getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <NotificationsScreen />
      </Provider>
    );
    fireEvent.press(getAllByTestId("notification-button")[0]);

    getByTestId("scrollview").props.refreshControl.props.onRefresh();
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
  it("should render NotificationsScreen when loader is false and photoSmall is defined and hasBoth is false", async () => {
    jest.useRealTimers();
    const mockedState = {
      notificationsDetails: {
        notificationsDetails: notifications,
        loader: true,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <NotificationsScreen />
      </Provider>
    );

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
