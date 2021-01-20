import React from "react";
import {
  render,
  cleanup,
  waitFor,
  fireEvent,
} from "@testing-library/react-native";
import AssignmentScreen from "../AssignmentScreen";
import news from "../../../__mocks__/fake-data/news.json";
import assignmentDetails from "../../../__mocks__/fake-data/assignmentDetails.json";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import AsyncStorage from "@react-native-community/async-storage";
import { Alert } from "react-native";
import FingerprintScanner from "react-native-fingerprint-scanner";

describe("AssignmentScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render AssignmentScreen when loader is false and photoSmall is defined and hasBoth is true", async () => {
    jest.useRealTimers();
    const mockedState = {
      seafarerDetails: {
        seafarerDetails: {
          photoSmall: "",
        },
        loader: false,
      },
      assignmentDetails: {
        assignmentDetails: [assignmentDetails, assignmentDetails],
      },
      newsDetails: {
        news,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <AssignmentScreen />
      </Provider>
    );
    await waitFor(() => {
      fireEvent.press(getByTestId("first-option-button"));
      fireEvent.press(getByTestId("second-option-button"));
      fireEvent.press(getByTestId("employment-offer-button"));

      getByTestId("scrollview").props.refreshControl.props.onRefresh();
      expect(toJSON()).toMatchSnapshot();
    });
  });
  it("should render AssignmentScreen when loader is false and photoSmall is defined and hasBoth is false", async () => {
    jest.useRealTimers();
    const mockedState = {
      seafarerDetails: {
        seafarerDetails: {
          photoSmall: "",
        },
        loader: false,
      },
      assignmentDetails: {
        assignmentDetails: [{ ...assignmentDetails, employment: undefined }],
      },
      newsDetails: {
        news,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <AssignmentScreen />
      </Provider>
    );

    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
});

describe("test enable biometrics popup", () => {
  it("should show the biometrics popup when the sensor is available and biometrics login not in place", async () => {
    AsyncStorage.getItem = jest.fn().mockResolvedValue("");
    FingerprintScanner.isSensorAvailable = jest
      .fn()
      .mockResolvedValue("touchId");

    const spy = jest.spyOn(Alert, "alert");

    jest.useRealTimers();
    const mockedState = {
      seafarerDetails: {
        seafarerDetails: {
          photoSmall: "",
        },
        loader: false,
      },
      assignmentDetails: {
        assignmentDetails: [{ ...assignmentDetails, employment: undefined }],
      },
      newsDetails: {
        news,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    render(
      <Provider store={mockedStore(mockedState)}>
        <AssignmentScreen />
      </Provider>
    );

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledTimes(1);
      const button = spy.mock.calls[0][2] || [];
      if (button[0].onPress) {
        button[0].onPress();
      }
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "isBiometricEnabled",
        "false"
      );

      const button2 = spy.mock.calls[0][2] || [];
      if (button2[1].onPress) {
        button2[1].onPress();
      }
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        "isBiometricEnabled",
        "true"
      );
    });

    spy.mockRestore();
  });
  it("should show the biometrics popup when the sensor is available and biometrics login is in place", async () => {
    AsyncStorage.getItem = jest
      .fn()
      .mockResolvedValue(JSON.stringify({ touchId: true }));

    FingerprintScanner.isSensorAvailable = jest
      .fn()
      .mockResolvedValue("touchId");

    const spy = jest.spyOn(Alert, "alert");

    jest.useRealTimers();
    const mockedState = {
      seafarerDetails: {
        seafarerDetails: {
          photoSmall: "",
        },
        loader: false,
      },
      assignmentDetails: {
        assignmentDetails: [{ ...assignmentDetails, employment: undefined }],
      },
      newsDetails: {
        news,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    render(
      <Provider store={mockedStore(mockedState)}>
        <AssignmentScreen />
      </Provider>
    );

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledTimes(0);
    });

    spy.mockRestore();
  });
  it("should show the biometrics popup when the sensor is not available", async () => {
    AsyncStorage.getItem = jest.fn().mockResolvedValue("");
    FingerprintScanner.isSensorAvailable = jest.fn().mockRejectedValue("");

    const spy = jest.spyOn(Alert, "alert");

    jest.useRealTimers();
    const mockedState = {
      seafarerDetails: {
        seafarerDetails: {
          photoSmall: "",
        },
        loader: false,
      },
      assignmentDetails: {
        assignmentDetails: [{ ...assignmentDetails, employment: undefined }],
      },
      newsDetails: {
        news,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    render(
      <Provider store={mockedStore(mockedState)}>
        <AssignmentScreen />
      </Provider>
    );

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledTimes(0);
    });

    spy.mockRestore();
  });
});
