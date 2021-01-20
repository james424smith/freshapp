import { put, takeEvery, CallEffect, all, fork } from "redux-saga/effects";
import {
  getPayslipDetailsFailed,
  getPayslipDetailsSuccess,
  getPayslipDocumentsFileFailed,
  getPayslipDocumentsFileSuccess,
  removePayslipDocumentsFileFromLocalFailed,
  removePayslipDocumentsFileFromLocalSuccess,
  setIsDownloadingPayslipSuccess,
  setIsLoadingNewPayslip,
} from "../../actions";
import * as functions from "../salaryDetailsSagas";
import {
  getAllotmentsDetails,
  getPayslipDetails,
} from "../../../api/salaryApi";
import {
  GET_PAYSLIP_DETAILS,
  GET_PAYSLIP_DOCUMENTS_FILE,
} from "../../constants";
import { PayslipDocumentsFile } from "../../../interfaces";
import * as apiRequest from "../../../common/request";
import * as SaveOfflineUtils from "../../../common/offline_utilities/saveFileOffline";
import * as RemoveOfflineUtils from "../../../common/offline_utilities/removeFileFromLocalStorage";

const payslip = {
  vesselName: "CMA CGM POINTE DES COLIBRIS",
  vesselCode: "5338",
  rank: "CAPT",
  dateMonth: "May 2019",
  payslipId: "1954027",
};

describe("Test Seafarer documents details", () => {
  it("should dispatch action GET_PAYSLIP_DETAILS", () => {
    const generator = functions.watchGetPayslipDetails();
    expect(generator.next().value).toEqual(
      takeEvery(GET_PAYSLIP_DETAILS, functions.getPayslipDetailsFn)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should return appropriate data when calling getPayslipDetailsRequest", async () => {
    const spy = jest
      .spyOn(apiRequest, "default")
      .mockReturnValue(getPayslipDetails());

    expect(await functions.getPayslipDetailsRequest()).toStrictEqual([
      {
        dateMonth: "May 2019",
        isOffline: false,
        payslipId: "1954027",
        rank: "CAPT",
        vesselCode: "5338",
        vesselName: "CMA CGM POINTE DES COLIBRIS",
      },
      {
        dateMonth: "April 2019",
        isOffline: false,
        payslipId: "1949246",
        rank: "CAPT",
        vesselCode: "5338",
        vesselName: "CMA CGM POINTE DES COLIBRIS",
      },
    ]);
    spy.mockRestore();
  });

  it("should return empty array when the calling getPayslipDetailsRequest and statusCode is 404", async () => {
    const spy = jest
      .spyOn(apiRequest, "default")
      .mockRejectedValue({ status: 404 });

    expect(await functions.getPayslipDetailsRequest()).toStrictEqual([]);
    spy.mockRestore();
  });

  it("should return appropriate data when calling getAllotmentsDetailsRequest", async () => {
    const spy = jest
      .spyOn(apiRequest, "default")
      .mockReturnValue(getAllotmentsDetails());

    expect(await functions.getAllotmentsDetailsRequest()).toStrictEqual(
      (await getAllotmentsDetails()).json()
    );
    spy.mockRestore();
  });

  it("should return empty array when calling getAllotmentsDetailsRequest and the statusCode is 404", async () => {
    const spy = jest
      .spyOn(apiRequest, "default")
      .mockRejectedValue({ status: 404 });

    expect(await functions.getAllotmentsDetailsRequest()).toStrictEqual([]);
    spy.mockRestore();
  });

  it("should return data from Seafarer Documents details API", async () => {
    const generator = functions.getPayslipDetailsFn();

    expect(
      (generator.next().value as CallEffect).payload.fn
        .toString()
        .includes("getPayslipDetailsRequest")
    ).toBeTruthy();

    expect(
      (generator.next().value as CallEffect).payload.fn
        .toString()
        .includes("getAllotmentsDetailsRequest")
    ).toBeTruthy();

    generator.next();

    expect(generator.next().done).toBeTruthy();
  });
  it("should return data from Seafarer Documents details API and", async () => {
    const generator = functions.getPayslipDetailsFn();

    expect(
      (generator.next().value as CallEffect).payload.fn
        .toString()
        .includes("getPayslipDetailsRequest")
    ).toBeTruthy();

    expect(
      (generator.next().value as CallEffect).payload.fn
        .toString()
        .includes("getAllotmentsDetailsRequest")
    ).toBeTruthy();

    expect(generator.throw({ error: "Some error" }).value).toEqual(
      put(getPayslipDetailsFailed({ error: "Some error" }))
    );

    expect(generator.next().done).toBeTruthy();
  });
});

describe("Test Seafarer payslip file", () => {
  it("should dispatch action GET_PAYSLIP_DOCUMENTS_FILE", () => {
    const generator = functions.watchGetPayslipDocumentsFile();
    expect(generator.next().value).toEqual(
      takeEvery(GET_PAYSLIP_DOCUMENTS_FILE, functions.getPayslipDocumentsFileFn)
    );
    expect(generator.next().done).toBeTruthy();
  });
  it("should return appopriate data when calling getPayslipDocumentsFileRequest", async () => {
    const seafarerPayslips = (await getPayslipDetails()).json()[0];
    const spy = jest.spyOn(apiRequest, "default").mockResolvedValue({
      json: () => ({ fileType: "pdf", payslip: "1234" }),
    });

    const res = await functions.getPayslipDocumentsFileRequest(
      seafarerPayslips
    );

    expect(apiRequest.default).toHaveBeenCalledWith({
      requestMethod: "GET",
      endpoint: "payslipDocumentsFile",
      vesselCode: payslip.vesselCode,
      payslipId: payslip.payslipId.toString(),
    });
    expect(res).toStrictEqual({ fileType: "pdf", payslip: "1234" });

    spy.mockRestore();
  });

  it("should return data from Payslip File API for offline use", async () => {
    const seafarerPayslips = (await getPayslipDetails()).json()[0];

    const generator = functions.getPayslipDocumentsFileFn({
      type: "",
      payslipDetails: seafarerPayslips,
      isOffline: true,
    });

    // calls the function to update the loading state to true
    generator.next();

    // calls the function to get the file from the API
    expect(
      (generator.next().value as CallEffect).payload.fn
        .toString()
        .includes("getPayslipDocumentsFileRequest")
    ).toBeTruthy();

    // calls the function to save the file for offline use
    expect(
      (generator.next().value as CallEffect).payload.fn
        .toString()
        .includes("saveDocumentOffline")
    ).toBeTruthy();

    expect(
      (generator.next().value as CallEffect).payload.fn
        .toString()
        .includes("getPayslipDetailsRequest")
    ).toBeTruthy();

    generator.next();

    // calls the function to update the loading state to false
    generator.next();

    expect(generator.next().done).toBeTruthy();
  });
  it("should throw error when payslip details is undefined", async () => {
    const generator = functions.getPayslipDocumentsFileFn({
      type: "",
      payslipDetails: undefined,
    });

    // calls the function to get the file from the API
    expect(generator.next().value).toEqual(
      put(
        getPayslipDocumentsFileFailed(
          Error("payslip details is not present in the call")
        )
      )
    );
    expect(generator.next().value).toEqual(
      put(setIsDownloadingPayslipSuccess(false, ""))
    );

    expect(generator.next().done).toBeTruthy();
  });

  it("should return data from Seafarer Payslip File API for online use", async () => {
    const seafarerPayslipFile: PayslipDocumentsFile = {
      payslip: "The file in a base64 format",
      documentType: "pdf",
    };
    const seafarerPayslips = (await getPayslipDetails()).json();
    const seafarerPayslip = seafarerPayslips[0];

    const generator = functions.getPayslipDocumentsFileFn({
      type: "",
      payslipDetails: seafarerPayslip,
      isOffline: false,
    });

    // calls the function to update the loading state to true
    expect(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      generator.next(seafarerPayslipFile, seafarerPayslips).value
    ).toEqual(put(setIsLoadingNewPayslip(true)));

    // calls the function to get the file from the API
    expect(
      (generator.next().value as CallEffect).payload.fn
        .toString()
        .includes("getPayslipDocumentsFileRequest")
    ).toBeTruthy();
    expect(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      generator.next(seafarerPayslipFile, seafarerPayslips).value
    ).toEqual(put(getPayslipDocumentsFileSuccess(seafarerPayslipFile)));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    expect(generator.next(false).value).toEqual(
      put(setIsLoadingNewPayslip(false))
    );

    expect(generator.next().done).toBeTruthy();
  });
  it("should dispatch action default function", () => {
    const generator = functions.default();
    expect(generator.next().value).toEqual(
      all([
        fork(functions.watchGetPayslipDetails),
        fork(functions.watchGetPayslipDocumentsFile),
        fork(functions.watchRemovePayslipDocumentsFileFromLocal),
      ])
    );
    expect(generator.next().done).toBeTruthy();
  });
});

describe("test REMOVE_PAYSLIP_DOCUMENTS_FILE", () => {
  it("should dispatch action REMOVE_PAYSLIP_DOCUMENTS_FILE", () => {
    const generator = functions.watchRemovePayslipDocumentsFileFromLocal();
    expect(generator.next().value).toEqual(
      takeEvery(
        "REMOVE_PAYSLIP_DOCUMENTS_FILE",
        functions.removePayslipDocumentFromLocalFn
      )
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("test removePayslipDocumentFromLocalFn with success outcome", async () => {
    const generator = functions.removePayslipDocumentFromLocalFn({
      type: "",
      payslipDetails: payslip,
    });

    const seafarerPayslips = (await getPayslipDetails()).json();

    expect(generator.next().value).toEqual(
      put(setIsDownloadingPayslipSuccess(true, payslip.payslipId))
    );

    expect(
      (generator.next().value as CallEffect).payload.fn
        .toString()
        .includes("removeSalaryFromLocalRequest")
    ).toBeTruthy();

    expect(generator.next().value).toEqual(
      put(removePayslipDocumentsFileFromLocalSuccess())
    );

    expect(
      (generator.next().value as CallEffect).payload.fn
        .toString()
        .includes("getPayslipDetailsRequest")
    ).toBeTruthy();

    expect(generator.next(seafarerPayslips).value).toEqual(
      put(getPayslipDetailsSuccess(seafarerPayslips))
    );

    expect(generator.next().value).toEqual(
      put(setIsDownloadingPayslipSuccess(false, payslip.payslipId))
    );
    expect(generator.next().done).toBeTruthy();
  });
  it("test removePayslipDocumentFromLocalFn with fail outcome and payslipId is presnt", async () => {
    const generator = functions.removePayslipDocumentFromLocalFn({
      type: "",
      payslipDetails: payslip,
    });
    expect(generator.next()).toBeTruthy();

    expect(generator.throw({ code: "Some Error" }).value).toEqual(
      put(removePayslipDocumentsFileFromLocalFailed({ code: "Some Error" }))
    );
    expect(generator.next().value).toEqual(
      put(setIsDownloadingPayslipSuccess(false, payslip.payslipId))
    );

    expect(generator.next().done).toBeTruthy();
  });
  it("test removePayslipDocumentFromLocalFn with fail outcome and payslip is undefined", async () => {
    const generator = functions.removePayslipDocumentFromLocalFn({
      type: "",
      payslipDetails: undefined,
    });

    expect(generator.next().value).toEqual(
      put(
        removePayslipDocumentsFileFromLocalFailed(
          Error("payslip details is not present in the call")
        )
      )
    );
    expect(generator.next().value).toEqual(
      put(setIsDownloadingPayslipSuccess(false, ""))
    );

    expect(generator.next().done).toBeTruthy();
  });
});

describe("saveDocumentOffline tests", () => {
  it("should call the the saveFileOffline function with the appropriate params", async () => {
    const spy = jest.spyOn(SaveOfflineUtils, "saveFileOffline");
    const seafarerPayslips = (await getPayslipDetails()).json()[0];
    await functions.saveDocumentOffline(seafarerPayslips, {
      documentType: "pdf",
      payslip: "123455",
    });

    expect(SaveOfflineUtils.saveFileOffline).toHaveBeenLastCalledWith({
      fileId: seafarerPayslips.payslipId,
      fileType: "pdf",
      document: "123455",
      documentDetails: seafarerPayslips,
    });

    spy.mockRestore();
  });
});
describe("removeSalaryFromLocalRequest tests", () => {
  it("should call the the removeFileFromLocalStorage function with the appropriate params", async () => {
    const spy = jest.spyOn(RemoveOfflineUtils, "removeFileFromLocalStorage");
    const seafarerPayslips = {
      ...(await getPayslipDetails()).json()[0],
      fileType: "pdf",
    };
    await functions.removeSalaryFromLocalRequest(seafarerPayslips);

    expect(
      RemoveOfflineUtils.removeFileFromLocalStorage
    ).toHaveBeenLastCalledWith({
      fileId: seafarerPayslips.payslipId,
      fileType: "pdf",
    });

    spy.mockRestore();
  });
});
