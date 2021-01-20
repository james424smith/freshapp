import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react-native";
import SeaServiceRecordsScreen from "../../more_screens/SeaServiceRecordsScreen";
import seaServices from "../../../../__mocks__/fake-data/seaServices.json";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

describe("SeaServiceRecordsScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render SeaServiceRecordsScreen when loader is false ", () => {
    const mockedState = {
      seaServiceDetails: {
        seaServiceDetails: seaServices,
        loader: false,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <SeaServiceRecordsScreen />
      </Provider>
    );

    fireEvent.press(getByTestId("first-option-button"));
    fireEvent.press(getByTestId("second-option-button"));

    getByTestId("scrollview").props.refreshControl.props.onRefresh();

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render SeaServiceRecordsScreen when loader is true ", () => {
    const mockedState = {
      seaServiceDetails: {
        seaServiceDetails: seaServices,
        loader: true,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <SeaServiceRecordsScreen />
      </Provider>
    );

    fireEvent.press(getByTestId("first-option-button"));
    fireEvent.press(getByTestId("second-option-button"));

    getByTestId("scrollview").props.refreshControl.props.onRefresh();

    expect(toJSON()).toMatchSnapshot();
  });
});
