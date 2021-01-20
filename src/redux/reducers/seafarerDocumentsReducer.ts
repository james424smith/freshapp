import {
  GET_SEAFARER_DOCUMENTS_SUCCESS,
  GET_SEAFARER_DOCUMENTS_FILE_SUCCESS,
  CLEAR_ALL_STATE,
  SET_IS_DOWNLOADING_DOCUMENT_SUCCESS,
  SET_LOADING_NEW_DOCUMENT,
  SET_REFRESHING_SEAFARER_DOCUMENTS,
  GET_SEAFARER_DOCUMENTS_FAIL,
} from "../constants";
import {
  SeafarerDocuments,
  SeafarerDocumentsFile,
  SuccessAction,
  InitialisedSagaCall,
  FailedAction,
  SeafarerDocumentsAndCategories,
} from "../../interfaces";

export interface DocumentsDetailsState {
  seafarerDocuments?: SeafarerDocumentsAndCategories;
  seafarerDocumentsFile?: SeafarerDocumentsFile;
  isDownloading: boolean;
  isLoadingNew: boolean;
  downloadingDocId: number;
  downloadingDocCounter: number;
  loader: boolean;
}

export const defaultState: DocumentsDetailsState = {
  isDownloading: false,
  isLoadingNew: false,
  downloadingDocId: 0,
  downloadingDocCounter: 0,
  loader: false,
};

type SuccessReturnTypes =
  | SeafarerDocuments
  | SeafarerDocumentsFile
  | boolean
  | number;

export default (
  state: DocumentsDetailsState = defaultState,
  action: InitialisedSagaCall | FailedAction | SuccessAction<SuccessReturnTypes>
) => {
  switch (action.type) {
    case GET_SEAFARER_DOCUMENTS_SUCCESS:
      return {
        ...state,
        loader: false,
        seafarerDocuments: action.payload,
      };
    case GET_SEAFARER_DOCUMENTS_FILE_SUCCESS:
      return {
        ...state,
        loader: false,
        seafarerDocumentsFile: action.payload,
      };
    case SET_IS_DOWNLOADING_DOCUMENT_SUCCESS:
      return {
        ...state,
        isDownloading: action.payload.isDownloading,
        downloadingDocId: action.payload.documentId,
        downloadingDocCounter: action.payload.documentCounter,
      };
    case SET_LOADING_NEW_DOCUMENT:
      return {
        ...state,
        isLoadingNew: action.payload,
      };
    case SET_REFRESHING_SEAFARER_DOCUMENTS:
      return {
        ...state,
        loader: action.payload,
      };
    case GET_SEAFARER_DOCUMENTS_FAIL:
      return {
        ...state,
        loader: false,
      };
    case CLEAR_ALL_STATE:
      return defaultState;
    default:
      return state;
  }
};
