import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { GET_COVID_DOCUMENT } from "../constants";
import {
  getCovidDocumentSuccess,
  getCovidDocumentFailed,
  setIsLoadingCovid,
} from "../actions";
import { FailedRestReturn } from "../../interfaces";
import axiosWrapper from "../../common/request";

export const getCovidDocumentRequest = (): Promise<string | FailedRestReturn> =>
  axiosWrapper({
    requestMethod: "GET",
    endpoint: "covid",
  }).then((covidDocument) => {
    return covidDocument.text();
  });

export function* getCovidDocumentFn() {
  try {
    yield put(setIsLoadingCovid(true));
    const covidDocument: string = yield call(getCovidDocumentRequest);
    yield put(getCovidDocumentSuccess(covidDocument));
  } catch (error) {
    console.warn(`error: ${JSON.stringify(error)}`);
    yield put(getCovidDocumentFailed(error));
  }
}

export function* watchGetCovidDocument() {
  yield takeEvery(GET_COVID_DOCUMENT, getCovidDocumentFn);
}

export default function* rootSaga() {
  yield all([fork(watchGetCovidDocument)]);
}
