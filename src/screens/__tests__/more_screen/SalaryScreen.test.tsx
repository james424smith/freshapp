import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react-native";
import SalaryScreen from "../../more_screens/SalaryScreen";
import payslips from "../../../../__mocks__/fake-data/payslips.json";
import allotments from "../../../../__mocks__/fake-data/allotments.json";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

describe("SalaryScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render SalaryScreen when loader is false ", () => {
    const mockedState = {
      payslipDetails: {
        payslipDetails: payslips,
        allotmentsDetails: allotments,
        loader: false,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON, getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <SalaryScreen />
      </Provider>
    );

    fireEvent.press(getByTestId("first-option-button"));
    fireEvent.press(getByTestId("second-option-button"));

    getByTestId("scrollview").props.refreshControl.props.onRefresh();

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render SalaryScreen when loader is true ", () => {
    const mockedState = {
      payslipDetails: {
        payslipDetails: payslips,
        allotmentsDetails: allotments,
        loader: true,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <SalaryScreen />
      </Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
