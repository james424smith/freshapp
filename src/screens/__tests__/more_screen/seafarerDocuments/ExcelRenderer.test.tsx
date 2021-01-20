import React from "react";
import ExcelRenderer from "../../../more_screens/seafarerDocuments/ExcelRenderer";
import { render, cleanup, waitFor } from "@testing-library/react-native";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { Platform } from "react-native";
import * as OpenFile from "@quinaryio/react-native-doc-viewer";

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
  fileType: "pdf",
  isExpired: false,
  isOffline: false,
  documentExtension: "pdf",
  marked: false,
  hasAttachment: true,
};

describe("ExcelRenderer snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  it("should render correct ui for ExcelRenderer when document is present and downloaded and loading is false and platform is IOS", async () => {
    Platform.OS = "ios";
    jest.useRealTimers();
    const route = {
      key: "SeafarerDocumentsExcelFile-wPFrEJG5kjiOrE_Qk2kVs",
      name: "SeafarerDocumentsExcelFile" as "SeafarerDocumentsExcelFile",
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
        <ExcelRenderer route={route} />
      </Provider>
    );
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });
  it("should render correct ui for ExcelRenderer when document is present and downloaded and loading is false and platform is IOS and OpenDoc throws an error", async () => {
    Platform.OS = "ios";
    jest.useRealTimers();
    const route = {
      key: "SeafarerDocumentsExcelFile-wPFrEJG5kjiOrE_Qk2kVs",
      name: "SeafarerDocumentsExcelFile" as "SeafarerDocumentsExcelFile",
      params: {
        documentDetails: { ...document, isOffline: true },
      },
    };

    const spy = jest
      .spyOn(OpenFile, "openDocb64")
      .mockImplementation((_a, e) => {
        return e("e", "");
      });

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
        <ExcelRenderer route={route} />
      </Provider>
    );
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
    spy.mockRestore();
  });
  it("should render correct ui for ExcelRenderer when document is present and downloaded and loading is false and platform is android and OpenDoc throws an error", async () => {
    Platform.OS = "android";
    jest.useRealTimers();
    const route = {
      key: "SeafarerDocumentsExcelFile-wPFrEJG5kjiOrE_Qk2kVs",
      name: "SeafarerDocumentsExcelFile" as "SeafarerDocumentsExcelFile",
      params: {
        documentDetails: { ...document, isOffline: true },
      },
    };

    const spy = jest
      .spyOn(OpenFile, "openDocb64")
      .mockImplementation((_a, e) => {
        return e("", "");
      });
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
        <ExcelRenderer route={route} />
      </Provider>
    );
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
    spy.mockRestore();
  });
  it("should render correct ui for ExcelRenderer when document is present and downloaded and loading is false and platform is android", async () => {
    Platform.OS = "android";
    jest.useRealTimers();
    const route = {
      key: "SeafarerDocumentsExcelFile-wPFrEJG5kjiOrE_Qk2kVs",
      name: "SeafarerDocumentsExcelFile" as "SeafarerDocumentsExcelFile",
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
        <ExcelRenderer route={route} />
      </Provider>
    );
    await waitFor(() => {
      expect(toJSON()).toMatchSnapshot();
    });
  });

  it("should render correct ui for ExcelRenderer when document is present and not downloaded and loading is false", () => {
    const route = {
      key: "SeafarerDocumentsExcelFile-wPFrEJG5kjiOrE_Qk2kVs",
      name: "SeafarerDocumentsExcelFile" as "SeafarerDocumentsExcelFile",
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
        <ExcelRenderer route={route} />
      </Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it("should render correct ui for ExcelRenderer when document is undefined and loading is false", () => {
    const route = {
      key: "SeafarerDocumentsExcelFile-wPFrEJG5kjiOrE_Qk2kVs",
      name: "SeafarerDocumentsExcelFile" as "SeafarerDocumentsExcelFile",
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
        <ExcelRenderer route={route} />
      </Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui for ExcelRenderer when document is present and loading is true", () => {
    const route = {
      key: "SeafarerDocumentsExcelFile-wPFrEJG5kjiOrE_Qk2kVs",
      name: "SeafarerDocumentsExcelFile" as "SeafarerDocumentsExcelFile",
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
        <ExcelRenderer route={route} />
      </Provider>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
