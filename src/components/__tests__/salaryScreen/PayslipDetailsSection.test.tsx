import React from "react";
import PayslipDetailsSection from "../../salaryScreen/PayslipDetailsSection";
import { render, cleanup } from "@testing-library/react-native";
import payslips from "../../../../__mocks__/fake-data/payslips.json";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

describe("PayslipDetailsSection snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render correct ui when isDownloading is true  ", () => {
    const navigate = jest.fn();
    const mockedState = {
      payslipDetails: {
        isDownloading: true,
      },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <PayslipDetailsSection
          payslipRecordTable={payslips}
          navigate={navigate}
        />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui when isDownloading is false  ", () => {
    const navigate = jest.fn();
    const mockedState = {
      payslipDetails: {
        isDownloading: false,
        downloadingPayslipId: 4,
      },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <PayslipDetailsSection
          payslipRecordTable={payslips}
          navigate={navigate}
        />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
