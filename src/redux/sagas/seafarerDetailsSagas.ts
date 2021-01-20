import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { GET_ALL_SEAFARER_DETAILS } from "../constants";
import {
  getAllSeafarerDetailsSuccess,
  getAllSeafarerDetailsFailed,
  setIsLoadingData,
} from "../actions";
import { SeafarerDetails, FailedRestReturn, Badges } from "../../interfaces";
import axiosWrapper from "../../common/request";
import { checkResponseStatus } from "../../common/checkResponseStatus";

export const getAllSeafarerDetailsRequest = async (): Promise<
  SeafarerDetails | FailedRestReturn
> => {
  return axiosWrapper({
    requestMethod: "GET",
    endpoint: "seafarer",
  }).then((seafarer) => seafarer.json());
};

export const getSeafarerBadgesDetailsRequest = async (): Promise<
  Badges | FailedRestReturn
> => {
  return axiosWrapper({
    requestMethod: "GET",
    endpoint: "seafarerBadges",
  })
    .then((seafarerBadges) => seafarerBadges.json())
    .catch((error) => checkResponseStatus(error));
};

export function* getAllSeafarerDetailsFn(): any {
  try {
    yield put(setIsLoadingData(true));
    const seafarerDetails: SeafarerDetails = yield call(
      getAllSeafarerDetailsRequest
    );
    const seafarerBadgesDetails: Badges = yield call(
      getSeafarerBadgesDetailsRequest
    );

    yield put(
      getAllSeafarerDetailsSuccess(seafarerDetails, seafarerBadgesDetails)
    );
  } catch (error) {
    console.warn(`error: ${JSON.stringify(error)}`);
    yield put(getAllSeafarerDetailsFailed(error));
  }
}

export function* watchGetSeafarerDetails() {
  yield takeEvery(GET_ALL_SEAFARER_DETAILS, getAllSeafarerDetailsFn);
}

export default function* rootSaga() {
  yield all([fork(watchGetSeafarerDetails)]);
}
