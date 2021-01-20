import reducer, { defaultState } from "../seafarerDocumentsReducer";
import {
  GET_SEAFARER_DOCUMENTS_SUCCESS,
  GET_SEAFARER_DOCUMENTS_FILE_SUCCESS,
  CLEAR_ALL_STATE,
  SET_IS_DOWNLOADING_DOCUMENT_SUCCESS,
  SET_LOADING_NEW_DOCUMENT,
  SET_REFRESHING_SEAFARER_DOCUMENTS,
  GET_SEAFARER_DOCUMENTS_FAIL,
} from "../../constants";
import getSeafarerDocuments from "../../../api/seafarerDocumentsApi";

describe("Test Seafarer Documents Reducer", () => {
  it("should return the current state when unknown type of action", () =>
    expect(reducer({ ...defaultState }, { type: "blah" })).toEqual({
      ...defaultState,
    }));
  it("should return the current state when unknown type of action and state is undefined", () =>
    expect(reducer(undefined, { type: "blah" })).toEqual({
      ...defaultState,
    }));

  it("should handle CLEAR ALL STATE type of action", () =>
    expect(
      reducer({ ...defaultState, loader: true }, { type: CLEAR_ALL_STATE })
    ).toEqual({ ...defaultState }));

  it("should handle GET_SEAFARER_DOCUMENTS_SUCCESS action", () => {
    const mockContactDetails = getSeafarerDocuments();

    expect(
      reducer(
        { ...defaultState },
        {
          type: GET_SEAFARER_DOCUMENTS_SUCCESS,
          payload: mockContactDetails,
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      seafarerDocuments: mockContactDetails,
    });
  });

  it("should handle GET_SEAFARER_DOCUMENTS_FILE_SUCCESS action", () => {
    const mockContactDetails = getSeafarerDocuments();

    expect(
      reducer(
        { ...defaultState },
        {
          type: GET_SEAFARER_DOCUMENTS_FILE_SUCCESS,
          payload: mockContactDetails,
        }
      )
    ).toEqual({
      ...defaultState,
      loader: false,
      seafarerDocumentsFile: mockContactDetails,
    });
  });

  it("should handle SET_IS_DOWNLOADING_DOCUMENT_SUCCESS action", () => {
    const mockSetDownloadDocuments = {
      isDownloading: true,
      documentId: 12,
      documentCounter: 1,
    };
    expect(
      reducer(
        { ...defaultState },
        {
          type: SET_IS_DOWNLOADING_DOCUMENT_SUCCESS,
          payload: mockSetDownloadDocuments,
        }
      )
    ).toEqual({
      ...defaultState,
      isDownloading: true,
      downloadingDocId: 12,
      downloadingDocCounter: 1,
    });
  });

  it("should handle GET_SEAFARER_DOCUMENTS_FAIL action", () => {
    expect(
      reducer(
        { ...defaultState },
        {
          type: GET_SEAFARER_DOCUMENTS_FAIL,
          payload: {},
        }
      )
    ).toEqual({ ...defaultState });
  });

  it("should handle SET_LOADING_NEW_DOCUMENT action", () => {
    expect(
      reducer(
        { ...defaultState },
        {
          type: SET_LOADING_NEW_DOCUMENT,
          payload: true,
        }
      )
    ).toEqual({ ...defaultState, isLoadingNew: true });
  });
  it("should handle SET_REFRESHING_SEAFARER_DOCUMENTS action", () => {
    expect(
      reducer(
        { ...defaultState },
        {
          type: SET_REFRESHING_SEAFARER_DOCUMENTS,
          payload: true,
        }
      )
    ).toEqual({ ...defaultState, loader: true });
  });
});
