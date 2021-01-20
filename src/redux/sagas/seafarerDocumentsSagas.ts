import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_SEAFARER_DOCUMENTS,
  GET_SEAFARER_DOCUMENTS_FILE,
  REMOVE_SEAFARER_DOCUMENT,
} from "../constants";
import {
  getSeafarerDocumentsFailed,
  getSeafarerDocumentsFileFailed,
  getSeafarerDocumentsFileSuccess,
  getSeafarerDocumentsSuccess,
  removeDocumentFromLocalFailed,
  removeDocumentFromLocalSuccess,
  setIsDownloadingDocumentSuccess,
  setIsLoadingNewDocument,
} from "../actions";
import {
  FailedRestReturn,
  SeafarerDocuments,
  SeafarerDocumentsFile,
  Document,
  InitialisedSagaCall,
} from "../../interfaces";
import axiosWrapper from "../../common/request";
import AsyncStorage from "@react-native-community/async-storage";
import { removeFileFromLocalStorage } from "../../common/offline_utilities/removeFileFromLocalStorage";
import { saveFileOffline } from "../../common/offline_utilities/saveFileOffline";
import { getDocumentsPerCategory } from "../../common/offline_utilities/getOfflineFiles";
import { checkResponseStatus } from "../../common/checkResponseStatus";
import valueOrDefault from "../../common/valueOrDefault";

export const getSeafarerDocumentsRequest = async (): Promise<
  SeafarerDocuments | FailedRestReturn
> => {
  const res = await axiosWrapper({
    requestMethod: "GET",
    endpoint: "seafarerDocuments",
  })
    .then((seafarerDocuments) => seafarerDocuments.json())
    .catch((error) => {
      checkResponseStatus(error);
    });

  const categories = valueOrDefault(res?.categories, []) as {
    id: string;
    label: string;
    orderNo: string;
  }[];
  const documentsFromApi = valueOrDefault(
    res?.documents,
    []
  ) as SeafarerDocuments;
  const offlineDocuments = valueOrDefault(
    await AsyncStorage.getItem("offlineDocuments"),
    "{}"
  ) as string;
  const documents = getDocumentsPerCategory({
    categories,
    documents: documentsFromApi,
    offlineDocuments,
  });
  return {
    categories,
    documents: documents,
  };
};

export const removeDocumentFromLocalRequest = async (
  documentDetails: Document
) => {
  const {
    documentId,
    documentCounter,
    categoryNumber,
    fileType,
  } = documentDetails;
  await removeFileFromLocalStorage({
    fileId: documentId,
    fileCounter: documentCounter,
    fileType,
    categoryNumber,
  });
};

export const saveDocumentOffline = async (
  documentDetails: Document,
  seafarerDocumentFile: SeafarerDocumentsFile
) => {
  const { documentId, documentCounter, categoryNumber } = documentDetails;
  const { fileType, document } = seafarerDocumentFile;
  await saveFileOffline({
    fileId: documentId,
    fileCounter: documentCounter,
    fileType,
    categoryNumber,
    document,
    documentDetails,
  });
};

export const getSeafarerDocumentsFileRequest = async (
  documentDetails: Document
): Promise<SeafarerDocumentsFile | FailedRestReturn> => {
  const { documentId, documentCounter } = documentDetails;
  const res = await axiosWrapper({
    requestMethod: "GET",
    endpoint: "seafarerDocumentsFile",
    documentId,
    documentCounter,
  });
  return res.json();
};

export function* getSeafarerDocumentsFn() {
  try {
    const seafarerDocuments: SeafarerDocuments = yield call(
      getSeafarerDocumentsRequest
    );
    yield put(getSeafarerDocumentsSuccess(seafarerDocuments));
  } catch (error) {
    console.warn(`error: ${JSON.stringify(error)}`);
    yield put(getSeafarerDocumentsFailed(error));
  }
}

export function* removeDocumentFromLocalFn({
  documentDetails,
}: InitialisedSagaCall) {
  const document = documentDetails as Document;
  try {
    yield put(
      setIsDownloadingDocumentSuccess(
        true,
        document.documentId,
        document.documentCounter
      )
    );
    yield call(removeDocumentFromLocalRequest, document);
    yield put(removeDocumentFromLocalSuccess());
    const seafarerDocuments: SeafarerDocuments = yield call(
      getSeafarerDocumentsRequest
    );
    yield put(getSeafarerDocumentsSuccess(seafarerDocuments));
    yield put(
      setIsDownloadingDocumentSuccess(
        false,
        document.documentId,
        document.documentCounter
      )
    );
  } catch (error) {
    console.warn(`error: ${JSON.stringify(error)}`);
    yield put(removeDocumentFromLocalFailed(error));
    yield put(
      setIsDownloadingDocumentSuccess(
        false,
        document.documentId,
        document.documentCounter
      )
    );
  }
}

export function* getSeafarerDocumentsFileFn({
  documentDetails,
  isOffline,
}: InitialisedSagaCall) {
  const document = documentDetails as Document;
  try {
    if (isOffline) {
      yield put(
        setIsDownloadingDocumentSuccess(
          true,
          document.documentId,
          document.documentCounter
        )
      );
      const seafarerDocumentsFile: SeafarerDocumentsFile = yield call(
        getSeafarerDocumentsFileRequest,
        document
      );
      yield call(saveDocumentOffline, document, seafarerDocumentsFile);
      const seafarerDocuments: SeafarerDocuments = yield call(
        getSeafarerDocumentsRequest
      );
      yield put(getSeafarerDocumentsSuccess(seafarerDocuments));
      yield put(
        setIsDownloadingDocumentSuccess(
          false,
          document.documentId,
          document.documentCounter
        )
      );
    } else {
      yield put(setIsLoadingNewDocument(true));
      const seafarerDocumentsFile: SeafarerDocumentsFile = yield call(
        getSeafarerDocumentsFileRequest,
        document
      );
      yield put(getSeafarerDocumentsFileSuccess(seafarerDocumentsFile));
      yield put(setIsLoadingNewDocument(false));
    }
  } catch (error) {
    console.warn(`error: ${JSON.stringify(error)}`);
    yield put(getSeafarerDocumentsFileFailed(error));
    yield put(
      setIsDownloadingDocumentSuccess(
        false,
        document.documentId,
        document.documentCounter
      )
    );
  }
}

export function* watchGetSeafarerDocuments() {
  yield takeEvery(GET_SEAFARER_DOCUMENTS, getSeafarerDocumentsFn);
}

export function* watchRemoveDocumentFromLocalFile() {
  yield takeEvery(REMOVE_SEAFARER_DOCUMENT, removeDocumentFromLocalFn);
}

export function* watchGetSeafarerDocumentsFile() {
  yield takeEvery(GET_SEAFARER_DOCUMENTS_FILE, getSeafarerDocumentsFileFn);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetSeafarerDocuments),
    fork(watchGetSeafarerDocumentsFile),
    fork(watchRemoveDocumentFromLocalFile),
  ]);
}
