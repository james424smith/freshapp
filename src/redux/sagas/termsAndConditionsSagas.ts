import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { GET_TERMS_AND_CONDITIONS_DETAILS } from "../constants";
import {
  getTermsAndConditionsDetailsSuccess,
  getTermsAndConditionsDetailsFailed,
} from "../actions";
import { FailedRestReturn, TermsAndConditions } from "../../interfaces";
import axiosWrapper from "../../common/request";

export const getTermsAndConditionsDetailsRequest = (): Promise<
  TermsAndConditions | FailedRestReturn
> =>
  axiosWrapper({
    requestMethod: "GET",
    endpoint: "termsAndConditions",
  }).then((termsAndConditions) => termsAndConditions.json());

export function* getTermsAndConditionsDetailsFn() {
  try {
    const termsAndConditionsDetails: TermsAndConditions = yield call(
      getTermsAndConditionsDetailsRequest
    );
    yield put(getTermsAndConditionsDetailsSuccess(termsAndConditionsDetails));
  } catch (error) {
    console.warn(`error: ${JSON.stringify(error)}`);
    yield put(getTermsAndConditionsDetailsFailed(error));
  }
}

export function* watchGetTermsAndConditionsDetails() {
  yield takeEvery(
    GET_TERMS_AND_CONDITIONS_DETAILS,
    getTermsAndConditionsDetailsFn
  );
}

export default function* rootSaga() {
  yield all([fork(watchGetTermsAndConditionsDetails)]);
}
