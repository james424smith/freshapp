import React from "react";
import { render, cleanup } from "@testing-library/react-native";
import WorkingClothesScreen from "../../more_screens/WorkingClothesScreen";
import workingClothes from "../../../../__mocks__/fake-data/workingClothes.json";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

describe("WorkingClothesScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render WorkingClothesScreen when loader is false ", () => {
    const mockedState = {
      workingClothesDetails: {
        workingClothesDetails: workingClothes,
        loader: false,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <WorkingClothesScreen />
      </Provider>
    );

    getByTestId("scrollview").props.refreshControl.props.onRefresh();

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render WorkingClothesScreen when loader is true ", () => {
    const mockedState = {
      workingClothesDetails: {
        workingClothesDetails: workingClothes,
        loader: true,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <WorkingClothesScreen />
      </Provider>
    );

    getByTestId("scrollview").props.refreshControl.props.onRefresh();

    expect(toJSON()).toMatchSnapshot();
  });
});
