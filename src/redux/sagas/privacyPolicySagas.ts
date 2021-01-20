import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { GET_PRIVACY_POLICY_DETAILS } from "../constants";
import {
  getPrivacyPolicyDetailsSuccess,
  getPrivacyPolicyDetailsFailed,
} from "../actions";
import { FailedRestReturn, PrivacyPolicy } from "../../interfaces";
import axiosWrapper from "../../common/request";

export const getPrivacyPolicyDetailsRequest = (): Promise<
  PrivacyPolicy | FailedRestReturn
> =>
  axiosWrapper({
    requestMethod: "GET",
    endpoint: "privacyPolicy",
  }).then((privacyPolicy) => privacyPolicy.json());

export function* getPrivacyPolicyDetailsFn() {
  try {
    const privacyPolicyDetails: PrivacyPolicy = yield call(
      getPrivacyPolicyDetailsRequest
    );
    yield put(getPrivacyPolicyDetailsSuccess(privacyPolicyDetails));
  } catch (error) {
    console.warn(`error: ${JSON.stringify(error)}`);
    yield put(getPrivacyPolicyDetailsFailed(error));
  }
}

export function* watchGetPrivacyPolicyDetails() {
  yield takeEvery(GET_PRIVACY_POLICY_DETAILS, getPrivacyPolicyDetailsFn);
}

export default function* rootSaga() {
  yield all([fork(watchGetPrivacyPolicyDetails)]);
}
