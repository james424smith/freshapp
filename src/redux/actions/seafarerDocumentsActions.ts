import {
  GET_SEAFARER_DOCUMENTS,
  GET_SEAFARER_DOCUMENTS_SUCCESS,
  GET_SEAFARER_DOCUMENTS_FAIL,
  GET_SEAFARER_DOCUMENTS_FILE,
  GET_SEAFARER_DOCUMENTS_FILE_SUCCESS,
  GET_SEAFARER_DOCUMENTS_FILE_FAIL,
  REMOVE_SEAFARER_DOCUMENT,
  REMOVE_SEAFARER_DOCUMENT_SUCCESS,
  REMOVE_SEAFARER_DOCUMENT_FAILED,
  SET_IS_DOWNLOADING_DOCUMENT_SUCCESS,
  SET_LOADING_NEW_DOCUMENT,
  SET_REFRESHING_SEAFARER_DOCUMENTS,
} from "../constants";

import {
  InitialisedSagaCall,
  SuccessAction,
  FailedAction,
  SeafarerDocuments,
  SeafarerDocumentsFile,
  Document,
} from "../../interfaces/";

export function getSeafarerDocuments(): InitialisedSagaCall {
  return { type: GET_SEAFARER_DOCUMENTS };
}

export function setRefreshingSeafarerDocuments(
  isLoading: boolean
): InitialisedSagaCall {
  return { type: SET_REFRESHING_SEAFARER_DOCUMENTS, payload: isLoading };
}

export const setIsDownloadingDocumentSuccess = (
  isDownloading: boolean,
  documentId: number,
  documentCounter: number
): SuccessAction<{
  isDownloading: boolean;
  documentId: number;
  documentCounter: number;
}> => {
  return {
    type: SET_IS_DOWNLOADING_DOCUMENT_SUCCESS,
    payload: { isDownloading, documentId, documentCounter },
  };
};

export function setIsLoadingNewDocument(
  loadingNew: boolean
): InitialisedSagaCall {
  return { type: SET_LOADING_NEW_DOCUMENT, payload: loadingNew };
}

export function removeDocumentFromLocal(documentDetails: Document): any {
  return { type: REMOVE_SEAFARER_DOCUMENT, documentDetails };
}

export const removeDocumentFromLocalSuccess = (): InitialisedSagaCall => ({
  type: REMOVE_SEAFARER_DOCUMENT_SUCCESS,
});

export const removeDocumentFromLocalFailed = (error: any): FailedAction => ({
  type: REMOVE_SEAFARER_DOCUMENT_FAILED,
  error,
});

export function getSeafarerDocumentsFile(
  documentDetails: Document,
  isOffline: boolean
): any {
  return {
    type: GET_SEAFARER_DOCUMENTS_FILE,
    documentDetails,
    isOffline,
  };
}

export const getSeafarerDocumentsSuccess = (
  seafarerDocuments: SeafarerDocuments
): SuccessAction<SeafarerDocuments> => ({
  type: GET_SEAFARER_DOCUMENTS_SUCCESS,
  payload: seafarerDocuments,
});

export const getSeafarerDocumentsFileSuccess = (
  seafarerDocumentsFile: SeafarerDocumentsFile
): SuccessAction<SeafarerDocumentsFile> => ({
  type: GET_SEAFARER_DOCUMENTS_FILE_SUCCESS,
  payload: seafarerDocumentsFile,
});

export const getSeafarerDocumentsFailed = (error: any): FailedAction => {
  return {
    type: GET_SEAFARER_DOCUMENTS_FAIL,
    error,
  };
};
export const getSeafarerDocumentsFileFailed = (error: any): FailedAction => ({
  type: GET_SEAFARER_DOCUMENTS_FILE_FAIL,
  error,
});
