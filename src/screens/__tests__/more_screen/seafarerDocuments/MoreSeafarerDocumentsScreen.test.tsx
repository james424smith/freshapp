import React from "react";
import MoreSeafarerDocumentsScreen from "../../../more_screens/seafarerDocuments/MoreSeafarerDocumentsScreen";
import { render, cleanup, waitFor } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import RNFS from "react-native-fs";
const document = {
  documentId: 1234,
  documentCounter: 12,
  docLicNumber: "1234",
  nation: "CY",
  description: "description",
  expiryDate: "01-01-2021",
  issueDate: "01-01-2019",
  docFileSize: "1mb",
  isDeactivated: false,
  categoryNumber: "4",
  fileType: "PDF",
  isExpired: false,
  isOffline: false,
  documentExtension: "pdf",
  marked: false,
  hasAttachment: true,
};

describe("MoreSeafarerDocumentsScreen snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render correct ui for MoreSeafarerDocumentsScreen when payslip is present and downloaded and loading is false", async () => {
    jest.useRealTimers();
    const route = {
      key: "SeafarerDocumentsFile-wPFrEJG5kjiOrE_Qk2kVs",
      name: "SeafarerDocumentsFile" as "SeafarerDocumentsFile",
      params: {
        documentDetails: { ...document, isOffline: true },
      },
    };
    const mockedState = {
      seafarerDocuments: {
        seafarerDocumentsFile: {
          document: "1234",
          fileType: "pdf",
        },
        isLoadingNew: false,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <MoreSeafarerDocumentsScreen route={route} />
      </Provider>
    );
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it("should render correct ui for MoreSeafarerDocumentsScreen when payslip is present and downloaded and loading is false and filetype is image", async () => {
    jest.useRealTimers();
    const route = {
      key: "SeafarerDocumentsFile-wPFrEJG5kjiOrE_Qk2kVs",
      name: "SeafarerDocumentsFile" as "SeafarerDocumentsFile",
      params: {
        documentDetails: { ...document, isOffline: true, fileType: "image" },
      },
    };
    const mockedState = {
      seafarerDocuments: {
        seafarerDocumentsFile: {
          document: "1234",
          fileType: "pdf",
        },
        isLoadingNew: false,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <MoreSeafarerDocumentsScreen route={route} />
      </Provider>
    );
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it("should render correct ui for MoreSeafarerDocumentsScreen when payslip is present and downloaded and loading is false and readFile fails", async () => {
    jest.useRealTimers();
    const spy = jest.spyOn(RNFS, "readFile").mockRejectedValue({});
    const route = {
      key: "SeafarerDocumentsFile-wPFrEJG5kjiOrE_Qk2kVs",
      name: "SeafarerDocumentsFile" as "SeafarerDocumentsFile",
      params: {
        documentDetails: { ...document, isOffline: true },
      },
    };
    const mockedState = {
      seafarerDocuments: {
        seafarerDocumentsFile: {
          document: "1234",
          fileType: "pdf",
        },
        isLoadingNew: false,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <MoreSeafarerDocumentsScreen route={route} />
      </Provider>
    );
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
    spy.mockRestore();
  });

  it("should render correct ui for MoreSeafarerDocumentsScreen when payslip is present and not downloaded and loading is false", () => {
    const route = {
      key: "SeafarerDocumentsFile-wPFrEJG5kjiOrE_Qk2kVs",
      name: "SeafarerDocumentsFile" as "SeafarerDocumentsFile",
      params: {
        documentDetails: document,
      },
    };
    const mockedState = {
      seafarerDocuments: {
        seafarerDocumentsFile: {
          document: "1234",
          fileType: "pdf",
        },
        isLoadingNew: false,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <MoreSeafarerDocumentsScreen route={route} />
      </Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it("should render correct ui for MoreSeafarerDocumentsScreen when payslip is undefined and loading is false", () => {
    const route = {
      key: "SeafarerDocumentsFile-wPFrEJG5kjiOrE_Qk2kVs",
      name: "SeafarerDocumentsFile" as "SeafarerDocumentsFile",
      params: {
        documentDetails: document,
      },
    };
    const mockedState = {
      seafarerDocuments: {
        seafarerDocumentsFile: undefined,
        isLoadingNew: false,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <MoreSeafarerDocumentsScreen route={route} />
      </Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui for MoreSeafarerDocumentsScreen when payslip is present and loading is true", () => {
    const route = {
      key: "SeafarerDocumentsFile-wPFrEJG5kjiOrE_Qk2kVs",
      name: "SeafarerDocumentsFile" as "SeafarerDocumentsFile",
      params: {
        documentDetails: document,
      },
    };
    const mockedState = {
      seafarerDocuments: {
        seafarerDocumentsFile: { document: "1234", fileType: "pdf" },
        isLoadingNew: true,
      },
      network: { isConnected: true },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <MoreSeafarerDocumentsScreen route={route} />
      </Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
