import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  GET_NOTIFICATIONS_DETAILS,
  SEND_NOTIFICATIONS_DETAILS,
  SET_RING_BELL,
} from "../constants";
import {
  getNotificationsDetails,
  getNotificationsDetailsSuccess,
  getNotificationsDetailsFailed,
  sendNotificationsDetailsSuccess,
  sendNotificationsDetailsFailed,
  setShouldRingBellSuccess,
  setShouldRingBellFailed,
} from "../actions";
import {
  Notification,
  FailedRestReturn,
  InitialisedSagaCall,
  ReadNotification,
} from "../../interfaces";
import axiosWrapper from "../../common/request";

export const getNotificationsDetailsRequest = async (): Promise<
  Notification | FailedRestReturn
> =>
  axiosWrapper({
    requestMethod: "GET",
    endpoint: "notifications",
  }).then((notifications) => notifications.json());

export function* getNotificationsDetailsFn() {
  try {
    const notificationsDetails: Notification = yield call(
      getNotificationsDetailsRequest
    );

    yield put(getNotificationsDetailsSuccess(notificationsDetails));
  } catch (error) {
    yield put(getNotificationsDetailsFailed(error));
  }
}

export function* watchGetNotificationsDetails() {
  yield takeEvery(GET_NOTIFICATIONS_DETAILS, getNotificationsDetailsFn);
}

export const sendNotificationsDetailsRequest = async (
  payload: ReadNotification
): Promise<Record<string, unknown> | FailedRestReturn> =>
  axiosWrapper({
    requestMethod: "POST",
    payload,
    endpoint: "notificationRead",
  }).then((notifications) => notifications.json());

export function* sendNotificationsDetailsFn({ payload }: InitialisedSagaCall) {
  try {
    yield call(sendNotificationsDetailsRequest, payload);
    yield put(sendNotificationsDetailsSuccess());
    yield put(getNotificationsDetails());
  } catch (error) {
    yield put(sendNotificationsDetailsFailed(error));
  }
}

export function* watchSetNotificationsDetails() {
  yield takeEvery(SEND_NOTIFICATIONS_DETAILS, sendNotificationsDetailsFn);
}

export function* setShouldRingBellFn({ payload }: InitialisedSagaCall) {
  try {
    const shouldRing = payload.shouldRing;
    yield put(setShouldRingBellSuccess(shouldRing));
  } catch (error) {
    yield put(setShouldRingBellFailed(error));
  }
}

export function* watchSetShouldRingBell() {
  yield takeEvery(SET_RING_BELL, setShouldRingBellFn);
}

export default function* rootSaga() {
  yield all([
    fork(watchGetNotificationsDetails),
    fork(watchSetNotificationsDetails),
    fork(watchSetShouldRingBell),
  ]);
}
