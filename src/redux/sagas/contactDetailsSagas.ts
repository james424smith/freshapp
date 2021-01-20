import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { GET_CONTACT_DETAILS } from "../constants";
import { getContactDetailsSuccess, getContactDetailsFailed } from "../actions";
import { Contact, FailedRestReturn } from "../../interfaces";
import axiosWrapper from "../../common/request";

export const getContactDetailsRequest = async (): Promise<
  Contact | FailedRestReturn
> =>
  axiosWrapper({
    requestMethod: "GET",
    endpoint: "contact",
  }).then((contact) => contact.json());

export function* getContactDetailsFn() {
  try {
    const contactDetails: Contact = yield call(getContactDetailsRequest);

    yield put(getContactDetailsSuccess(contactDetails));
  } catch (error) {
    yield put(getContactDetailsFailed(error));
  }
}

export function* watchGetContactDetails() {
  yield takeEvery(GET_CONTACT_DETAILS, getContactDetailsFn);
}

export default function* rootSaga() {
  yield all([fork(watchGetContactDetails)]);
}
