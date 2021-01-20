import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { GET_WORKING_CLOTHES_DETAILS } from "../constants";
import {
  getWorkingClothesDetailsSuccess,
  getWorkingClothesDetailsFailed,
} from "../actions";
import { WorkingClothes, FailedRestReturn } from "../../interfaces";
import axiosWrapper from "../../common/request";

export const getWorkingClothesDetailsRequest = async (): Promise<
  WorkingClothes | FailedRestReturn
> =>
  axiosWrapper({
    requestMethod: "GET",
    endpoint: "workingClothes",
  }).then((workingClothes) => workingClothes.json());

export function* getWorkingClothesDetailsFn() {
  try {
    const workingClothesDetails: WorkingClothes = yield call(
      getWorkingClothesDetailsRequest
    );

    yield put(getWorkingClothesDetailsSuccess(workingClothesDetails));
  } catch (error) {
    yield put(getWorkingClothesDetailsFailed(error));
  }
}

export function* watchGetWorkingClothesDetails() {
  yield takeEvery(GET_WORKING_CLOTHES_DETAILS, getWorkingClothesDetailsFn);
}

export default function* rootSaga() {
  yield all([fork(watchGetWorkingClothesDetails)]);
}
