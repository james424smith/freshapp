import * as actions from "../seafarerDocumentsActions";
import { Document } from "../../../interfaces";
import {
  GET_SEAFARER_DOCUMENTS,
  SET_REFRESHING_SEAFARER_DOCUMENTS,
  REMOVE_SEAFARER_DOCUMENT,
  REMOVE_SEAFARER_DOCUMENT_SUCCESS,
  REMOVE_SEAFARER_DOCUMENT_FAILED,
  GET_SEAFARER_DOCUMENTS_FILE,
  GET_SEAFARER_DOCUMENTS_FAIL,
  GET_SEAFARER_DOCUMENTS_FILE_FAIL,
} from "../../constants";

const document: Document = {
  documentId: 1,
  documentCounter: 1,
  categoryNumber: "string",
  description: "string",
  nation: "string",
  isExpired: true,
  isDeactivated: false,
};

describe("test action documents", () => {
  it("should create an action to get documents", () => {
    const expectedAction = {
      type: GET_SEAFARER_DOCUMENTS,
    };

    expect(actions.getSeafarerDocuments()).toEqual(expectedAction);
  });

  it("should create an action to refresh documents list", () => {
    const expectedAction = {
      type: SET_REFRESHING_SEAFARER_DOCUMENTS,
      payload: true,
    };

    expect(actions.setRefreshingSeafarerDocuments(true)).toEqual(
      expectedAction
    );
  });

  it("should create an action for removeDocumentFromLocal", () => {
    const expectedAction = {
      type: REMOVE_SEAFARER_DOCUMENT,
      documentDetails: document,
    };

    expect(actions.removeDocumentFromLocal(document)).toEqual(expectedAction);
  });
  it("should create an action for removeDocumentFromLocalSuccess", () => {
    const expectedAction = {
      type: REMOVE_SEAFARER_DOCUMENT_SUCCESS,
    };

    expect(actions.removeDocumentFromLocalSuccess()).toEqual(expectedAction);
  });
  it("should create an action for removeDocumentFromLocalFailed", () => {
    const expectedAction = {
      type: REMOVE_SEAFARER_DOCUMENT_FAILED,
      error: {},
    };

    expect(actions.removeDocumentFromLocalFailed({})).toEqual(expectedAction);
  });
  it("should create an action for getSeafarerDocumentsFile", () => {
    const expectedAction = {
      type: GET_SEAFARER_DOCUMENTS_FILE,
      documentDetails: document,
      isOffline: false,
    };

    expect(actions.getSeafarerDocumentsFile(document, false)).toEqual(
      expectedAction
    );
  });
  it("should create an action for getSeafarerDocumentsFailed", () => {
    const expectedAction = {
      type: GET_SEAFARER_DOCUMENTS_FAIL,
      error: {},
    };

    expect(actions.getSeafarerDocumentsFailed({})).toEqual(expectedAction);
  });
  it("should create an action for getSeafarerDocumentsFileFailed", () => {
    const expectedAction = {
      type: GET_SEAFARER_DOCUMENTS_FILE_FAIL,
      error: {},
    };

    expect(actions.getSeafarerDocumentsFileFailed({})).toEqual(expectedAction);
  });
});
