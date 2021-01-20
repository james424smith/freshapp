import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { GET_SEA_SERVICE_DETAILS } from "../constants/";
import {
  getSeaServiceDetailsSuccess,
  getSeaServiceDetailsFailed,
} from "../actions";
import { SeaService, FailedRestReturn } from "../../interfaces";
import axiosWrapper from "../../common/request";

export const getSeaServiceDetailsRequest = async (): Promise<
  SeaService | FailedRestReturn
> =>
  axiosWrapper({
    requestMethod: "GET",
    endpoint: "seaService",
  }).then((seaService) => seaService.json());

export function* getSeaServiceDetailsFn() {
  try {
    const seaServiceDetails: SeaService = yield call(
      getSeaServiceDetailsRequest
    );

    yield put(getSeaServiceDetailsSuccess(seaServiceDetails));
  } catch (error) {
    yield put(getSeaServiceDetailsFailed(error));
  }
}

export function* watchGetSeaServiceDetails() {
  yield takeEvery(GET_SEA_SERVICE_DETAILS, getSeaServiceDetailsFn);
}

export default function* rootSaga() {
  yield all([fork(watchGetSeaServiceDetails)]);
}
