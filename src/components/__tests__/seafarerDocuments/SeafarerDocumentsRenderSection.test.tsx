import React from "react";
import SeafarerDocumentsRenderSection from "../../seafarerDocuments/SeafarerDocumentsRenderSection";
import { render, cleanup, fireEvent } from "@testing-library/react-native";
import { Provider } from "react-redux";
import * as ShareFileHelper from "../../../common/offline_utilities/ShareFiles";
import configureMockStore from "redux-mock-store";
import { Alert } from "react-native";

describe("SeafarerDocumentsRenderSection snapshot test", () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  const document = {
    nation: "UKR",
    description: "PDB ver 5 - Attendance / Review Confirmation",
    docLicNumber: "MYCERTM00120XOJZRQ22V8",
    issueDate: "04-07-2019",
    documentId: 525,
    documentCounter: 50,
    isDeactivated: false,
    categoryNumber: "4",
    isExpired: false,
    marked: false,
    hasAttachment: true,
    documentExtension: "pdf",
  };

  it("should render correct ui when allotmentTypeText when isExpired is false and is Downloading is false", () => {
    const navigate = jest.fn();

    const mockedState = {
      seafarerDocuments: {
        isDownloading: false,
      },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <SeafarerDocumentsRenderSection
          documentDetails={document}
          navigate={navigate}
        />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui when allotmentTypeText when isExpired is true and is Downloading is false", () => {
    const navigate = jest.fn();

    const mockedState = {
      seafarerDocuments: {
        isDownloading: false,
      },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <SeafarerDocumentsRenderSection
          documentDetails={{ ...document, isExpired: true }}
          navigate={navigate}
        />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui when allotmentTypeText when isExpired is true and is offline is true", () => {
    const navigate = jest.fn();

    const mockedState = {
      seafarerDocuments: {
        isDownloading: false,
      },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <SeafarerDocumentsRenderSection
          documentDetails={{ ...document, isOffline: true }}
          navigate={navigate}
        />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui when allotmentTypeText when isDeactivated is true", () => {
    const navigate = jest.fn();

    const mockedState = {
      seafarerDocuments: {
        isDownloading: false,
      },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <SeafarerDocumentsRenderSection
          documentDetails={{ ...document, isDeactivated: true }}
          navigate={navigate}
        />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui when allotmentTypeText when isExpired is false and is Downloading is false and documentExtension is xls", () => {
    const navigate = jest.fn();

    const mockedState = {
      seafarerDocuments: {
        isDownloading: false,
      },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <SeafarerDocumentsRenderSection
          documentDetails={{ ...document, documentExtension: "xls" }}
          navigate={navigate}
        />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui when allotmentTypeText when isExpired is false and is Downloading is true", () => {
    const navigate = jest.fn();

    const mockedState = {
      seafarerDocuments: {
        isDownloading: true,
        downloadingDocId: document.documentId,
        downloadingDocCounter: document.documentCounter,
      },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <SeafarerDocumentsRenderSection
          documentDetails={document}
          navigate={navigate}
        />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it("should render correct ui when allotmentTypeText when isExpired is false and hasAttachment is false", () => {
    const navigate = jest.fn();

    const mockedState = {
      seafarerDocuments: {
        isDownloading: true,
        downloadingDocId: document.documentId,
        downloadingDocCounter: document.documentCounter,
      },
    };
    const mockedStore = configureMockStore();

    const { toJSON } = render(
      <Provider store={mockedStore(mockedState)}>
        <SeafarerDocumentsRenderSection
          documentDetails={{ ...document, hasAttachment: false }}
          navigate={navigate}
        />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});

describe("test fireEvents", () => {
  const document = {
    nation: "UKR",
    description: "PDB ver 5 - Attendance / Review Confirmation",
    docLicNumber: "MYCERTM00120XOJZRQ22V8",
    issueDate: "04-07-2019",
    documentId: 525,
    documentCounter: 50,
    isDeactivated: false,
    categoryNumber: "4",
    isExpired: false,
    marked: false,
    hasAttachment: true,
    documentExtension: "pdf",
    docFileSize: "1.2mb",
  };

  it("should call appropriate navigation when document-navigate-button is pressed and documentExtension is pdf", () => {
    const navigate = jest.fn();

    const mockedState = {
      seafarerDocuments: {
        isDownloading: false,
      },
    };
    const mockedStore = configureMockStore();

    const { getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <SeafarerDocumentsRenderSection
          documentDetails={document}
          navigate={navigate}
        />
      </Provider>
    );
    fireEvent.press(getByTestId("document-navigate-button"));
    expect(navigate).toBeCalledWith("SeafarerDocumentsFile", {
      documentDetails: document,
    });
  });
  it("should call appropriate navigation when document-navigate-button is pressed and documentExtension is xls", () => {
    const navigate = jest.fn();

    const mockedState = {
      seafarerDocuments: {
        isDownloading: false,
      },
    };
    const mockedStore = configureMockStore();

    const { getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <SeafarerDocumentsRenderSection
          documentDetails={{ ...document, documentExtension: "xls" }}
          navigate={navigate}
        />
      </Provider>
    );
    fireEvent.press(getByTestId("document-navigate-button"));
    expect(navigate).toBeCalledWith("SeafarerDocumentsExcelFile", {
      documentDetails: { ...document, documentExtension: "xls" },
    });
  });
  it("should call appropriate navigation when document-navigate-button is pressed and documentExtension is xlsx", () => {
    const navigate = jest.fn();

    const mockedState = {
      seafarerDocuments: {
        isDownloading: false,
      },
    };
    const mockedStore = configureMockStore();

    const { getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <SeafarerDocumentsRenderSection
          documentDetails={{ ...document, documentExtension: "xlsx" }}
          navigate={navigate}
        />
      </Provider>
    );
    fireEvent.press(getByTestId("document-navigate-button"));
    expect(navigate).toBeCalledWith("SeafarerDocumentsExcelFile", {
      documentDetails: { ...document, documentExtension: "xlsx" },
    });
  });
  it("should call appropriate navigation when share-document-button is pressed", () => {
    const spy = jest.spyOn(ShareFileHelper, "sharePDF");
    const navigate = jest.fn();

    const mockedState = {
      seafarerDocuments: {
        isDownloading: false,
      },
    };
    const mockedStore = configureMockStore();

    const { getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <SeafarerDocumentsRenderSection
          documentDetails={document}
          navigate={navigate}
        />
      </Provider>
    );
    fireEvent.press(getByTestId("share-document-button"));
    expect(ShareFileHelper.sharePDF).toBeCalledWith(
      document.documentId,
      document.documentCounter
    );
    spy.mockRestore();
  });
  it("should call appropriate navigation when share-document-button is pressed is xsl", () => {
    const spy = jest.spyOn(ShareFileHelper, "sharePDF");
    const navigate = jest.fn();

    const mockedState = {
      seafarerDocuments: {
        isDownloading: false,
      },
    };
    const mockedStore = configureMockStore();

    const { getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <SeafarerDocumentsRenderSection
          documentDetails={{ ...document, documentExtension: "xls" }}
          navigate={navigate}
        />
      </Provider>
    );
    fireEvent.press(getByTestId("share-document-button"));
    expect(ShareFileHelper.sharePDF).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it("should call appropriate navigation when toggle-button is pressed and is downloading is false", () => {
    const spy = jest.spyOn(Alert, "alert");
    const navigate = jest.fn();

    const mockedState = {
      seafarerDocuments: {
        isDownloading: false,
      },
    };
    const mockedStore = configureMockStore();

    const { getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <SeafarerDocumentsRenderSection
          documentDetails={document}
          navigate={navigate}
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
  it("should call appropriate navigation when toggle-button is pressed and is downloading is true", () => {
    const navigate = jest.fn();

    const mockedState = {
      seafarerDocuments: {
        isDownloading: false,
      },
    };
    const mockedStore = configureMockStore();

    const { getByTestId } = render(
      <Provider store={mockedStore(mockedState)}>
        <SeafarerDocumentsRenderSection
          documentDetails={{ ...document, isOffline: true }}
          navigate={navigate}
        />
      </Provider>
    );

    fireEvent.press(getByTestId("toggle-button"));
  });
});
