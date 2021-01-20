import { getDocumentsPerCategory, getPayslips } from "../getOfflineFiles";
import { mockAsyncStorageGetItem } from "./testUtilitiesCommon";
describe("testing offline functionality", () => {
  it("test getDocumentsPerCategory to check if Documents are offline", () => {
    const params = {
      categories: [
        {
          id: "1",
          label: "STCW National",
          orderNo: "1",
        },
        {
          id: "2",
          label: "Non STCW",
          orderNo: "2",
        },
      ],
      documents: {
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
          },
        ],
        "2": [
          {
            nation: "UKR",
            description: "HAZMAT Course Certificate (CFR 49)",
            expiryDate: "04-01-2021",
            issueDate: "04-01-2021",
            documentId: 114,
            docFileSize: "87.73 KB",
            documentCounter: 42,
            isDeactivated: false,
            categoryNumber: "2",
            isExpired: false,
          },
        ],
      },

      offlineDocuments: JSON.stringify({
        "2": [
          {
            nation: "UKR",
            description: "HAZMAT Course Certificate (CFR 49)",
            expiryDate: "04-01-2021",
            issueDate: "04-01-2021",
            documentId: 114,
            docFileSize: "87.73 KB",
            documentCounter: 42,
            isDeactivated: false,
            categoryNumber: "2",
            isExpired: false,
          },
        ],
      }),
    };
    const expected = {
      "1": [
        {
          categoryNumber: "1",
          description: "Verification of CoC (ETO)",
          docFileSize: "1.16 MB",
          docLicNumber: "16/1324",
          documentCounter: 9,
          documentId: 106,
          expiryDate: "24-06-2021",
          isDeactivated: false,
          isExpired: false,
          isOffline: false,
          issueDate: "24-06-2021",
          nation: "UKR",
        },
      ],
      "2": [
        {
          nation: "UKR",
          description: "HAZMAT Course Certificate (CFR 49)",
          expiryDate: "04-01-2021",
          issueDate: "04-01-2021",
          documentId: 114,
          docFileSize: "87.73 KB",
          documentCounter: 42,
          isDeactivated: false,
          categoryNumber: "2",
          isExpired: false,
          isOffline: true,
        },
      ],
    };
    const result = getDocumentsPerCategory({ ...params, type: "" });
    expect(result).toStrictEqual(expected);
  });

  it("test getPayslips to check if payslips are offline", async () => {
    const params = {
      documents: [
        {
          vesselName: "CMA CGM POINTE DES COLIBRIS",
          vesselCode: "5338",
          rank: "CAPT",
          dateMonth: "May 2019",
          payslipId: "1954027",
        },
        {
          vesselName: "CMA CGM POINTE DES COLIBRIS",
          vesselCode: "5338",
          rank: "CAPT",
          dateMonth: "April 2019",
          payslipId: "1949246",
        },
      ],
    };

    const offlinePayslipsParsed = [
      {
        vesselName: "CMA CGM POINTE DES COLIBRIS",
        vesselCode: "5338",
        rank: "CAPT",
        dateMonth: "May 2019",
        payslipId: "1954027",
      },
    ];

    const ExpectedOfflineFiles = [
      {
        vesselName: "CMA CGM POINTE DES COLIBRIS",
        vesselCode: "5338",
        rank: "CAPT",
        dateMonth: "May 2019",
        payslipId: "1954027",
        isOffline: true,
      },
      {
        vesselName: "CMA CGM POINTE DES COLIBRIS",
        vesselCode: "5338",
        rank: "CAPT",
        dateMonth: "April 2019",
        payslipId: "1949246",
        isOffline: false,
      },
    ];

    mockAsyncStorageGetItem(offlinePayslipsParsed);

    const result = await getPayslips(params);
    expect(result).toStrictEqual(ExpectedOfflineFiles);
  });
});
