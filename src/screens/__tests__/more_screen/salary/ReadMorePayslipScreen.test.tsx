import React from "react";
import ReadMorePayslipScreen from "../../../more_screens/salary/ReadMorePayslipScreen";
import { render, cleanup, waitFor } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

describe("ReadMorePayslipScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render correct ui for ReadMorePayslipScreen when payslip is present and downloaded and loading is false", async () => {
    jest.useRealTimers();
    const route = {
      key: "ReadMorePayslip-wPFrEJG5kjiOrE_Qk2kVs",
      name: "ReadMorePayslip" as "ReadMorePayslip",
      params: {
        payslipDocument: {
          vesselName: "1234",
          vesselCode: "1234",
          rank: "COFF",
          dateMonth: "October",
          payslipId: "1234",
          isOffline: true,
          payslip: "1234",
          docFileSize: "1mb",
          fileType: "pdf",
        },
      },
    };
    const mockedState = {
      payslipDetails: {
        payslipDocumentsFile: "1234",
        isLoadingNew: false,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <ReadMorePayslipScreen route={route} />
      </Provider>
    );
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it("should render correct ui for ReadMorePayslipScreen when payslip is present and not downloaded and loading is false", () => {
    const route = {
      key: "ReadMorePayslip-wPFrEJG5kjiOrE_Qk2kVs",
      name: "ReadMorePayslip" as "ReadMorePayslip",
      params: {
        payslipDocument: {
          vesselName: "1234",
          vesselCode: "1234",
          rank: "COFF",
          dateMonth: "October",
          payslipId: "1234",
          isOffline: false,
          payslip: "1234",
          docFileSize: "1mb",
          fileType: "pdf",
        },
      },
    };
    const mockedState = {
      payslipDetails: {
        payslipDocumentsFile: "1234",
        isLoadingNew: false,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <ReadMorePayslipScreen route={route} />
      </Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it("should render correct ui for ReadMorePayslipScreen when payslip is undefined and loading is false", () => {
    const route = {
      key: "ReadMorePayslip-wPFrEJG5kjiOrE_Qk2kVs",
      name: "ReadMorePayslip" as "ReadMorePayslip",
      params: {
        payslipDocument: {
          vesselName: "1234",
          vesselCode: "1234",
          rank: "COFF",
          dateMonth: "October",
          payslipId: "1234",
          isOffline: false,
          payslip: "1234",
          docFileSize: "1mb",
          fileType: "pdf",
        },
      },
    };
    const mockedState = {
      payslipDetails: {
        payslipDocumentsFile: undefined,
        isLoadingNew: false,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <ReadMorePayslipScreen route={route} />
      </Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui for ReadMorePayslipScreen when payslip is present and loading is true", () => {
    const route = {
      key: "ReadMorePayslip-wPFrEJG5kjiOrE_Qk2kVs",
      name: "ReadMorePayslip" as "ReadMorePayslip",
      params: {
        payslipDocument: {
          vesselName: "1234",
          vesselCode: "1234",
          rank: "COFF",
          dateMonth: "October",
          payslipId: "1234",
          isOffline: false,
          payslip: "1234",
          docFileSize: "1mb",
          fileType: "pdf",
        },
      },
    };
    const mockedState = {
      payslipDetails: {
        payslipDocumentsFile: "1234",
        isLoadingNew: true,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <ReadMorePayslipScreen route={route} />
      </Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
