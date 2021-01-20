import React from "react";
import PayslipDetailsComponent from "../../salaryScreen/PayslipDetailsComponent";
import {
  render,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import payslips from "../../../../__mocks__/fake-data/payslips.json";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { READ_MORE_PAYSLIP } from "../../../constants/routes";
import * as ShareFileHelper from "../../../common/offline_utilities/ShareFiles";
import { Alert } from "react-native";

describe("PayslipDetailsComponent snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it("should render correct ui when allotmentTypeText and isDownloading is false", async () => {
    const navigation = jest.fn();

    const mockedState = {
      payslipDetails: {
        isDownloading: false,
      },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <PayslipDetailsComponent
          payslipDocument={payslips[0]}
          navigate={navigation}
        />
      </Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui when allotmentTypeText and isDownloading is true", () => {
    const navigation = jest.fn();

    const mockedState = {
      payslipDetails: {
        isDownloading: true,
        downloadingPayslipId: payslips[0].payslipId,
      },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <PayslipDetailsComponent
          payslipDocument={payslips[0]}
          navigate={navigation}
        />
      </Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui when allotmentTypeText and isDownloading is true and is offline", () => {
    const navigation = jest.fn();

    const mockedState = {
      payslipDetails: {
        isDownloading: true,
        downloadingPayslipId: payslips[0].payslipId,
      },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <PayslipDetailsComponent
          payslipDocument={{ ...payslips[0], isOffline: true }}
          navigate={navigation}
        />
      </Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui when allotmentTypeText and isDownloading is false and the document is downloaded", () => {
    const navigation = jest.fn();

    const mockedState = {
      payslipDetails: {
        isDownloading: false,
      },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <PayslipDetailsComponent
          payslipDocument={{ ...payslips[0], isOffline: true }}
          navigate={navigation}
        />
      </Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});

describe("test fireEvents", () => {
  it("should call appropriate navigation when read-more-payslip-button is pressed", () => {
    const navigation = jest.fn();

    const mockedState = {
      payslipDetails: {
        isDownloading: false,
      },
    };
    const mockedStore = configureMockStore();

    const { getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <PayslipDetailsComponent
          payslipDocument={payslips[0]}
          navigate={navigation}
        />
      </Provider>
    );
    fireEvent.press(getByTestId("read-more-payslip-button"));
    expect(navigation).toBeCalledWith(READ_MORE_PAYSLIP, {
      payslipDocument: payslips[0],
    });
  });
  it("should call appropriate navigation when share-payslip-button is pressed", () => {
    const navigation = jest.fn();

    const spy = jest.spyOn(ShareFileHelper, "sharePDF");

    const mockedState = {
      payslipDetails: {
        isDownloading: false,
      },
    };
    const mockedStore = configureMockStore();

    const { getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <PayslipDetailsComponent
          payslipDocument={payslips[0]}
          navigate={navigation}
        />
      </Provider>
    );

    fireEvent.press(getByTestId("share-payslip-button"));
    expect(ShareFileHelper.sharePDF).toBeCalledWith(
      payslips[0].payslipId,
      undefined,
      payslips[0].vesselCode
    );
    spy.mockRestore();
  });
  it("should call appropriate navigation when toggle-button is pressed and is downloading is false", () => {
    const navigation = jest.fn();
    const spy = jest.spyOn(Alert, "alert");
    const mockedState = {
      payslipDetails: {
        isDownloading: false,
        downloadingPayslipId: payslips[0].payslipId,
      },
    };
    const mockedStore = configureMockStore();

    const { getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <PayslipDetailsComponent
          payslipDocument={payslips[0]}
          navigate={navigation}
        />
      </Provider>
    );

    fireEvent.press(getByTestId("toggle-button"));
    const button = spy.mock.calls[0][2] || [];
    if (button[0].onPress) {
      button[0].onPress();
    }
    spy.mockRestore();
  });
  it("should call appropriate navigation when toggle-button is pressed and is downloading is true", async () => {
    const navigation = jest.fn();
    const mockedState = {
      payslipDetails: {
        isDownloading: false,
      },
    };
    const mockedStore = configureMockStore();

    const { getByTestId } = await waitFor(() =>
      render(
        <Provider store={mockedStore(mockedState)}>
          <PayslipDetailsComponent
            payslipDocument={{ ...payslips[0], isOffline: true }}
            navigate={navigation}
          />
        </Provider>
      )
    );

    fireEvent.press(getByTestId("toggle-button"));
  });
});
