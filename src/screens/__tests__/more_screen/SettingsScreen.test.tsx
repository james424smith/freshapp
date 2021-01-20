import React from "react";
import {
  render,
  cleanup,
  waitFor,
  fireEvent,
} from "@testing-library/react-native";
import SettingsScreen from "../../more_screens/SettingsScreen";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import FingerprintScanner from "react-native-fingerprint-scanner";
import AsyncStorage from "@react-native-community/async-storage";

describe("SettingsScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render SettingsScreen when loader is false when biometrics is unavalable ", () => {
    const mockedState = {
      darkModeOptionsReducer: {
        darkModeOptionsValue: "dark",
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <SettingsScreen />
      </Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render SettingsScreen when loader is false when biometrics is unavalable and change theme ", () => {
    const mockedState = {
      darkModeOptionsReducer: {
        darkModeOptionsValue: "dark",
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <SettingsScreen />
      </Provider>
    );

    fireEvent.press(getByTestId("change-theme"));
    fireEvent.press(getByTestId("change-color-light-button"));

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render SettingsScreen when loader is false when biometrics is thorwing an error ", () => {
    FingerprintScanner.isSensorAvailable = jest.fn().mockRejectedValue({});
    const mockedState = {
      darkModeOptionsReducer: {
        darkModeOptionsValue: "dark",
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <SettingsScreen />
      </Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render SettingsScreen when loader is true is available but not setup ", async () => {
    FingerprintScanner.isSensorAvailable = jest
      .fn()
      .mockResolvedValue("touchId");
    AsyncStorage.getItem = jest.fn().mockResolvedValue("");
    const mockedState = {
      darkModeOptionsReducer: {
        darkModeOptionsValue: "dark",
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <SettingsScreen />
      </Provider>
    );
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
  it("should render SettingsScreen when loader is true is available and setup ", async () => {
    FingerprintScanner.isSensorAvailable = jest
      .fn()
      .mockResolvedValue("touchId");
    AsyncStorage.getItem = jest.fn().mockResolvedValue("true");
    const mockedState = {
      darkModeOptionsReducer: {
        darkModeOptionsValue: "dark",
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <SettingsScreen />
      </Provider>
    );

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
});
