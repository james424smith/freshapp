import { saveFileOffline } from "../saveFileOffline";
import AsyncStorage from "@react-native-community/async-storage";
import * as RNFS from "react-native-fs";
import {
  mockAsyncStorageGetItem,
  mockAsyncStorageSetItem,
} from "./testUtilitiesCommon";

describe("testing - process saving file offline ", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("test the process to save offline documents with saveFileOffline function", async () => {
    const spy = jest.spyOn(RNFS, "exists").mockResolvedValue(true);

    const parsedOfflineDocuments = {
      "1": [
        {
          documentDetails: {
            nation: "UKR",
            description: "Verification of CoC (ETO)",
            docLicNumber: "16/1324",
            expiryDate: "24-06-2021",
            issueDate: "24-06-2021",
            documentId: 106,
            docFileSize: "1.16 MB",
            documentCounter: 9,
            isDeactivated: false,
            categoryNumber: "1",
            isExpired: false,
            fileType: "jpg",
          },
        },
      ],
    };

    const newDocumentToBeSaved = {
      "1": [
        {
          documentDetails: {
            nation: "UKR",
            description: "Verification of CoC (ETO)",
            docLicNumber: "16/1324",
            expiryDate: "24-06-2021",
            issueDate: "24-06-2021",
            documentId: 106,
            docFileSize: "1.16 MB",
            documentCounter: 9,
            isDeactivated: false,
            categoryNumber: "1",
            isExpired: false,
            fileType: "jpg",
          },
        },
        {
          nation: "UKR",
          description: "Verification of CoC (ETO)",
          docLicNumber: "16/1324",
          expiryDate: "24-06-2021",
          issueDate: "24-06-2021",
          documentId: 101,
          docFileSize: "1.16 MB",
          documentCounter: 10,
          isDeactivated: false,
          categoryNumber: "1",
          isExpired: false,
          fileType: "jpg",
        },
      ],
    };

    const offlineParams = {
      fileCounter: 10,
      fileId: 101,
      fileType: "jpg",
      categoryNumber: "1",
      documentDetails: {
        nation: "UKR",
        description: "Verification of CoC (ETO)",
        docLicNumber: "16/1324",
        expiryDate: "24-06-2021",
        issueDate: "24-06-2021",
        documentId: 101,
        docFileSize: "1.16 MB",
        documentCounter: 10,
        isDeactivated: false,
        categoryNumber: "1",
        isExpired: false,
        fileType: "jpg",
      },
      document: "jlkfdjflkjdsaflkdsj",
    };

    mockAsyncStorageGetItem(parsedOfflineDocuments);
    mockAsyncStorageSetItem(newDocumentToBeSaved);

    await saveFileOffline(offlineParams);

    expect(AsyncStorage.setItem).toBeCalledWith(
      "offlineDocuments",
      JSON.stringify(newDocumentToBeSaved)
    );
    expect(RNFS.exists).toHaveBeenCalledTimes(1);
    expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
    expect(RNFS.writeFile).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it("test the process to save offline documents with saveFileOffline function and categoryNumber is undefined", async () => {
    const parsedOfflineDocuments = {
      "1": [
        {
          documentDetails: {
            nation: "UKR",
            description: "Verification of CoC (ETO)",
            docLicNumber: "16/1324",
            expiryDate: "24-06-2021",
            issueDate: "24-06-2021",
            documentId: 106,
            docFileSize: "1.16 MB",
            documentCounter: 9,
            isDeactivated: false,
            categoryNumber: "1",
            isExpired: false,
            fileType: "jpg",
          },
        },
      ],
    };

    const newDocumentToBeSaved = {
      "1": [
        {
          documentDetails: {
            nation: "UKR",
            description: "Verification of CoC (ETO)",
            docLicNumber: "16/1324",
            expiryDate: "24-06-2021",
            issueDate: "24-06-2021",
            documentId: 106,
            docFileSize: "1.16 MB",
            documentCounter: 9,
            isDeactivated: false,
            categoryNumber: "1",
            isExpired: false,
            fileType: "jpg",
          },
        },
        {
          nation: "UKR",
          description: "Verification of CoC (ETO)",
          docLicNumber: "16/1324",
          expiryDate: "24-06-2021",
          issueDate: "24-06-2021",
          documentId: 101,
          docFileSize: "1.16 MB",
          documentCounter: 10,
          isDeactivated: false,
          categoryNumber: "1",
          isExpired: false,
          fileType: "jpg",
        },
      ],
    };

    const offlineParams = {
      fileCounter: 10,
      fileId: 101,
      fileType: "jpg",
      categoryNumber: undefined,
      documentDetails: {
        nation: "UKR",
        description: "Verification of CoC (ETO)",
        docLicNumber: "16/1324",
        expiryDate: "24-06-2021",
        issueDate: "24-06-2021",
        documentId: 101,
        docFileSize: "1.16 MB",
        documentCounter: 10,
        isDeactivated: false,
        categoryNumber: "1",
        isExpired: false,
        fileType: "jpg",
      },
      document: "jlkfdjflkjdsaflkdsj",
    };

    mockAsyncStorageGetItem(parsedOfflineDocuments);
    mockAsyncStorageSetItem(newDocumentToBeSaved);

    await saveFileOffline(offlineParams);
    expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
    expect(RNFS.writeFile).toHaveBeenCalledTimes(1);
  });

  it("test the process to save offline payslips with saveFileOffline function", async () => {
    const parsedOfflinePayslips = [
      {
        vesselName: "CMA CGM POINTE DES COLIBRIS",
        vesselCode: "5338",
        rank: "CAPT",
        dateMonth: "May 2019",
        payslipId: "1954027",
        fileType: "pdf",
      },
    ];

    const offlineParams = {
      document: "sadasda",
      fileId: 1,
      documentDetails: {
        vesselName: "CMA CGM POINTE DES COLIBRIS",
        vesselCode: "5338",
        rank: "CAPT",
        dateMonth: "May 2019",
        payslipId: "1949230",
        documents: "dsadsa",
      },
      fileType: "pdf",
    };

    const newPayslipsToBeSaved = [
      ...parsedOfflinePayslips,
      {
        ...offlineParams.documentDetails,
        fileType: offlineParams.fileType,
      },
    ];

    mockAsyncStorageGetItem(parsedOfflinePayslips);
    mockAsyncStorageSetItem(offlineParams);

    await saveFileOffline(offlineParams);

    expect(AsyncStorage.setItem).toBeCalledWith(
      "offlinePayslips",
      JSON.stringify(newPayslipsToBeSaved)
    );

    expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
    expect(RNFS.writeFile).toHaveBeenCalledTimes(1);
  });

  it("test that if directory doesnt exist, rnfs will create it", async () => {
    const parsedOfflinePayslips = [
      {
        vesselName: "CMA CGM POINTE DES COLIBRIS",
        vesselCode: "5338",
        rank: "CAPT",
        dateMonth: "May 2019",
        payslipId: "1954027",
        fileType: "pdf",
      },
    ];

    const offlineParams = {
      document: "sadasda",
      fileId: 1,
      documentDetails: {
        vesselName: "CMA CGM POINTE DES COLIBRIS",
        vesselCode: "5338",
        rank: "CAPT",
        dateMonth: "May 2019",
        payslipId: "1949230",
        documents: "dsadsa",
      },
      fileType: "pdf",
    };

    const newPayslipsToBeSaved = [
      ...parsedOfflinePayslips,
      {
        ...offlineParams.documentDetails,
        fileType: offlineParams.fileType,
      },
    ];

    const spy = jest.spyOn(RNFS, "exists").mockResolvedValue(true);

    mockAsyncStorageGetItem(parsedOfflinePayslips);
    mockAsyncStorageSetItem(offlineParams);

    await saveFileOffline(offlineParams);

    expect(AsyncStorage.setItem).toBeCalledWith(
      "offlinePayslips",
      JSON.stringify(newPayslipsToBeSaved)
    );
    expect(RNFS.mkdir).toHaveBeenCalledTimes(0);
    expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
    expect(RNFS.writeFile).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it("catch error when something failed", async () => {
    console.log = jest.fn();
    const offlineParams = {
      document: "sadasda",
      fileId: 1,
      documentDetails: {
        vesselName: "CMA CGM POINTE DES COLIBRIS",
        vesselCode: "5338",
        rank: "CAPT",
        dateMonth: "May 2019",
        payslipId: "1949230",
        documents: "dsadsa",
      },
      fileType: "pdf",
    };

    AsyncStorage.getItem = jest.fn().mockRejectedValue(() => {
      throw Error("Some error");
    });
    await saveFileOffline(offlineParams);
    expect(console.log).toHaveBeenCalledTimes(1);
  });
});
