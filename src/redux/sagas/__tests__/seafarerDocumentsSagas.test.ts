import { put, takeEvery, CallEffect, all, fork } from "redux-saga/effects";
import {
  getSeafarerDocumentsFailed,
  getSeafarerDocumentsFileFailed,
  getSeafarerDocumentsFileSuccess,
  getSeafarerDocumentsSuccess,
  removeDocumentFromLocalFailed,
  removeDocumentFromLocalSuccess,
  setIsDownloadingDocumentSuccess,
  setIsLoadingNewDocument,
} from "../../actions";
import * as functions from "../seafarerDocumentsSagas";
import getSeafarerDocuments from "../../../api/seafarerDocumentsApi";
import {
  GET_SEAFARER_DOCUMENTS,
  GET_SEAFARER_DOCUMENTS_FILE,
} from "../../constants";
import { SeafarerDocuments, SeafarerDocumentsFile } from "../../../interfaces";
import * as apiRequest from "../../../common/request";
import * as RemoveOfflineUtils from "../../../common/offline_utilities/removeFileFromLocalStorage";
import * as SaveOfflineUtils from "../../../common/offline_utilities/saveFileOffline";

describe("Test Seafarer documents details", () => {
  it("should return appopriate data when calling getSeafarerDocumentsFileRequest", async () => {
    const seafarerDocument = (await getSeafarerDocuments()).json()
      .documents[4][0];
    const spy = jest.spyOn(apiRequest, "default").mockResolvedValue({
      json: () => ({ fileType: "pdf", document: "1234" }),
    });

    const res = await functions.getSeafarerDocumentsFileRequest(
      seafarerDocument
    );

    expect(apiRequest.default).toHaveBeenCalledWith({
      requestMethod: "GET",
      endpoint: "seafarerDocumentsFile",
      documentId: seafarerDocument.documentId,
      documentCounter: seafarerDocument.documentCounter,
    });
    expect(res).toStrictEqual({ fileType: "pdf", document: "1234" });

    spy.mockRestore();
  });
  it("should throw error when payslip details is undefined", async () => {
    const seafarerDocument = (await getSeafarerDocuments()).json()
      .documents[4][0];
    const generator = functions.getSeafarerDocumentsFileFn({
      type: "",
      documentDetails: seafarerDocument,
    });
    generator.next();

    // calls the function to get the file from the API
    expect(generator.throw({ error: "Some error" }).value).toEqual(
      put(getSeafarerDocumentsFileFailed({ error: "Some error" }))
    );
    expect(generator.next().value).toEqual(
      put(setIsDownloadingDocumentSuccess(false, 525, 50))
    );

    expect(generator.next().done).toBeTruthy();
  });

  it("should dispatch action GET_SEAFARER_DOCUMENTS", () => {
    const generator = functions.watchGetSeafarerDocuments();
    expect(generator.next().value).toEqual(
      takeEvery(GET_SEAFARER_DOCUMENTS, functions.getSeafarerDocumentsFn)
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should return data from Seafarer Documents details API", async () => {
    const seafarerDocument = {
      "4": [(await getSeafarerDocuments()).json().documents[4][0]],
    };
    const generator = functions.getSeafarerDocumentsFn();
    expect(generator.next()).toBeTruthy();
    expect(generator.next(seafarerDocument).value).toEqual(
      put(getSeafarerDocumentsSuccess(seafarerDocument))
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should call getSeafarerDocumentsFailed when calling getSeafarerDocumentsFn and fails", async () => {
    const generator = functions.getSeafarerDocumentsFn();
    expect(generator.next()).toBeTruthy();
    expect(generator.throw({ code: "Some Error" }).value).toEqual(
      put(getSeafarerDocumentsFailed({ code: "Some Error" }))
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should dispatch action default function", () => {
    const generator = functions.default();
    expect(generator.next().value).toEqual(
      all([
        fork(functions.watchGetSeafarerDocuments),
        fork(functions.watchGetSeafarerDocumentsFile),
        fork(functions.watchRemoveDocumentFromLocalFile),
      ])
    );
    expect(generator.next().done).toBeTruthy();
  });
});

describe("Test Seafarer document file", () => {
  it("should dispatch action GET_SEAFARER_DOCUMENTS_FILE", () => {
    const generator = functions.watchGetSeafarerDocumentsFile();
    expect(generator.next().value).toEqual(
      takeEvery(
        GET_SEAFARER_DOCUMENTS_FILE,
        functions.getSeafarerDocumentsFileFn
      )
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should return data from Seafarer Documents File API for offline use", async () => {
    // const seafarerDocumentsFile = "The file in a base64 format";
    const seafarerDocumentsPromise = await getSeafarerDocuments();
    const seafarerDocuments = seafarerDocumentsPromise.json().documents["1"][0];

    const generator = functions.getSeafarerDocumentsFileFn({
      type: "",
      documentDetails: seafarerDocuments,
      isOffline: true,
    });

    // calls the function to update the loading state to true

    expect(generator.next().value).toEqual(
      put(
        setIsDownloadingDocumentSuccess(
          true,
          seafarerDocuments.documentId,
          seafarerDocuments.documentCounter
        )
      )
    );

    // calls the function to get the file from the API
    expect(
      (generator.next().value as CallEffect).payload.fn
        .toString()
        .includes("getSeafarerDocumentsFileRequest")
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
        .includes("getSeafarerDocumentsRequest")
    ).toBeTruthy();

    expect(
      generator.next(
        seafarerDocumentsPromise.json().documents as SeafarerDocumentsFile &
          SeafarerDocuments
      ).value
    ).toEqual(
      put(
        getSeafarerDocumentsSuccess(seafarerDocumentsPromise.json().documents)
      )
    );

    // calls the function to update the loading state to false

    expect(generator.next().value).toEqual(
      put(
        setIsDownloadingDocumentSuccess(
          false,
          seafarerDocuments.documentId,
          seafarerDocuments.documentCounter
        )
      )
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("should return data from Seafarer Documents File API for online use", async () => {
    const seafarerDocumentsFile = {
      document: "The file in a base64 format",
      fileType: "jpg",
    };
    const seafarerDocumentsPromise = await getSeafarerDocuments();
    const seafarerDocuments = seafarerDocumentsPromise.json().documents["1"][0];

    const generator = functions.getSeafarerDocumentsFileFn({
      type: "",
      documentDetails: seafarerDocuments,
      isOffline: false,
    });

    // calls the function to update the loading state to true

    expect(generator.next().value).toEqual(put(setIsLoadingNewDocument(true)));

    // calls the function to get the file from the API
    expect(
      (generator.next().value as CallEffect).payload.fn
        .toString()
        .includes("getSeafarerDocumentsFileRequest")
    ).toBeTruthy();

    expect(
      generator.next(
        seafarerDocumentsFile as SeafarerDocumentsFile & SeafarerDocuments
      ).value
    ).toEqual(put(getSeafarerDocumentsFileSuccess(seafarerDocumentsFile)));

    expect(generator.next().value).toEqual(put(setIsLoadingNewDocument(false)));

    expect(generator.next().done).toBeTruthy();
  });
});

describe("test getSeafarerDocumentsRequest", () => {
  it("should return appropriate data when getSeafarerDocumentsRequest is a success", async () => {
    const spy = jest
      .spyOn(apiRequest, "default")
      .mockReturnValue(getSeafarerDocuments());

    const res = await functions.getSeafarerDocumentsRequest();
    const docs = (await getSeafarerDocuments()).json().documents;
    const expectedDocuments = Object.keys(docs).reduce((c, a) => {
      return { ...c, [a]: docs[a].map((o) => ({ ...o, isOffline: false })) };
    }, {});

    const expected = {
      categories: (await getSeafarerDocuments()).json().categories,
      documents: expectedDocuments,
    };

    expect(res).toEqual(expected);

    spy.mockRestore();
  });
  it("should return appropriate data when getSeafarerDocumentsRequest is 404", async () => {
    const spy = jest
      .spyOn(apiRequest, "default")
      .mockRejectedValue({ status: 404 });

    const res = await functions.getSeafarerDocumentsRequest();

    expect(res).toEqual({ categories: [], documents: {} });

    spy.mockRestore();
  });
});

describe("removeSalaryFromLocalRequest tests", () => {
  it("should dispatch action REMOVE_SEAFARER_DOCUMENT", () => {
    const generator = functions.watchRemoveDocumentFromLocalFile();
    expect(generator.next().value).toEqual(
      takeEvery("REMOVE_SEAFARER_DOCUMENT", functions.removeDocumentFromLocalFn)
    );
    expect(generator.next().done).toBeTruthy();
  });
  it("should call the the removeDocumentFromLocalRequest function with the appropriate params", async () => {
    const spy = jest.spyOn(RemoveOfflineUtils, "removeFileFromLocalStorage");
    const seafarerDocument = {
      ...(await getSeafarerDocuments()).json().documents[4][0],
      fileType: "pdf",
    };
    await functions.removeDocumentFromLocalRequest(seafarerDocument);

    expect(
      RemoveOfflineUtils.removeFileFromLocalStorage
    ).toHaveBeenLastCalledWith({
      categoryNumber: "4",
      fileCounter: 50,
      fileId: seafarerDocument.documentId,
      fileType: "pdf",
    });

    spy.mockRestore();
  });
});

describe("saveDocumentOffline tests", () => {
  it("should call the the saveFileOffline function with the appropriate params", async () => {
    const spy = jest.spyOn(SaveOfflineUtils, "saveFileOffline");
    const seafarerDocument = (await getSeafarerDocuments()).json()
      .documents[4][0];
    await functions.saveDocumentOffline(seafarerDocument, {
      fileType: "pdf",
      document: "123455",
    });

    expect(SaveOfflineUtils.saveFileOffline).toHaveBeenLastCalledWith({
      fileId: seafarerDocument.documentId,
      fileType: "pdf",
      document: "123455",
      fileCounter: 50,
      categoryNumber: "4",
      documentDetails: seafarerDocument,
    });

    spy.mockRestore();
  });
});

describe("removeDocumentFromLocalFn test", () => {
  it("test removePayslipDocumentFromLocalFn with success outcome", async () => {
    const seafarerDocument = (await getSeafarerDocuments()).json()
      .documents[4][0];
    const generator = functions.removeDocumentFromLocalFn({
      type: "",
      documentDetails: seafarerDocument,
    });

    expect(generator.next().value).toEqual(
      put(
        setIsDownloadingDocumentSuccess(
          true,
          seafarerDocument.documentId,
          seafarerDocument.documentCounter
        )
      )
    );

    expect(
      (generator.next().value as CallEffect).payload.fn
        .toString()
        .includes("removeDocumentFromLocalRequest")
    ).toBeTruthy();

    expect(generator.next().value).toEqual(
      put(removeDocumentFromLocalSuccess())
    );

    expect(
      (generator.next().value as CallEffect).payload.fn
        .toString()
        .includes("getSeafarerDocumentsRequest")
    ).toBeTruthy();

    expect(
      generator.next({
        "4": [(await getSeafarerDocuments()).json().documents[4][0]],
      }).value
    ).toEqual(
      put(
        getSeafarerDocumentsSuccess({
          "4": [(await getSeafarerDocuments()).json().documents[4][0]],
        })
      )
    );

    expect(generator.next().value).toEqual(
      put(
        setIsDownloadingDocumentSuccess(
          false,
          seafarerDocument.documentId,
          seafarerDocument.documentCounter
        )
      )
    );
    expect(generator.next().done).toBeTruthy();
  });

  it("test removeDocumentFromLocalFn with fail outcome and payslipId is presnt", async () => {
    const seafarerDocument = (await getSeafarerDocuments()).json()
      .documents[4][0];
    const generator = functions.removeDocumentFromLocalFn({
      type: "",
      documentDetails: seafarerDocument,
    });
    expect(generator.next()).toBeTruthy();

    expect(generator.throw({ code: "Some Error" }).value).toEqual(
      put(removeDocumentFromLocalFailed({ code: "Some Error" }))
    );
    expect(generator.next().value).toEqual(
      put(
        setIsDownloadingDocumentSuccess(
          false,
          seafarerDocument.documentId,
          seafarerDocument.documentCounter
        )
      )
    );

    expect(generator.next().done).toBeTruthy();
  });
});
