import { removeFileFromLocalStorage } from "../removeFileFromLocalStorage";
import AsyncStorage from "@react-native-community/async-storage";
import * as RNFS from "react-native-fs";
import {
  mockAsyncStorageGetItem,
  mockAsyncStorageSetItem,
} from "./testUtilitiesCommon";

describe("testing offline functionality", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("test removeFileFromLocal when the type is payslip and it succeeds", async () => {
    const parsedOfflinePayslip = [
      {
        vesselName: "CMA CGM POINTE DES COLIBRIS",
        vesselCode: "5338",
        rank: "CAPT",
        dateMonth: "May 2019",
        payslipId: 1954027,
        fileType: "pdf",
      },
    ];
    const params = { fileId: 1954027, fileType: "pdf" };

    mockAsyncStorageGetItem(parsedOfflinePayslip);
    mockAsyncStorageSetItem([]);

    await removeFileFromLocalStorage(params);
    expect(AsyncStorage.setItem).toBeCalledWith(
      "offlinePayslips",
      JSON.stringify([])
    );
    expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
    expect(RNFS.unlink).toHaveBeenCalledTimes(1);
  });

  it("test removeFileFromLocal when the type is document and it succeeds", async () => {
    const parsedOfflineDocuments = {
      "1": [
        {
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
      ],
    };

    const params = {
      fileCounter: 9,
      fileId: 106,
      fileType: "jpg",
      categoryNumber: "1",
    };
    mockAsyncStorageGetItem(parsedOfflineDocuments);

    mockAsyncStorageSetItem({ "1": [] });

    await removeFileFromLocalStorage(params);

    expect(AsyncStorage.setItem).toBeCalledWith(
      "offlineDocuments",
      JSON.stringify({ "1": [] })
    );
    expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
    expect(RNFS.unlink).toHaveBeenCalledTimes(1);
  });

  it("test removeFileFromLocal when the type is document and there is not categoryNumber", async () => {
    const parsedOfflineDocuments = {
      "1": [],
    };

    const params = {
      fileCounter: 9,
      fileId: 106,
      fileType: "jpg",
    };
    mockAsyncStorageGetItem(parsedOfflineDocuments);
    await removeFileFromLocalStorage(params);
    expect(AsyncStorage.getItem).toHaveBeenCalledTimes(1);
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
    expect(RNFS.unlink).toHaveBeenCalledTimes(1);
  });
});
