import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { GET_IMPRINT_DETAILS } from "../constants";
import { getImprintDetailsSuccess, getImprintDetailsFailed } from "../actions";
import { FailedRestReturn, Imprint } from "../../interfaces";
import axiosWrapper from "../../common/request";

export const getImprintDetailsRequest = (): Promise<
  Imprint | FailedRestReturn
> =>
  axiosWrapper({ requestMethod: "GET", endpoint: "imprint" }).then((imprint) =>
    imprint.json()
  );

export function* getImprintDetailsFn() {
  try {
    const imprintDetails: Imprint = yield call(getImprintDetailsRequest);
    yield put(getImprintDetailsSuccess(imprintDetails));
  } catch (error) {
    console.warn(`error: ${JSON.stringify(error)}`);
    yield put(getImprintDetailsFailed(error));
  }
}

export function* watchGetImprintDetails() {
  yield takeEvery(GET_IMPRINT_DETAILS, getImprintDetailsFn);
}

export default function* rootSaga() {
  yield all([fork(watchGetImprintDetails)]);
}
