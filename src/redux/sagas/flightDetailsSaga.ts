import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import { GET_FLIGHTS_DETAILS } from "../constants";
import { getFlightsDetailsSuccess, getFlightsDetailsFailed } from "../actions";
import { FlightData, FailedRestReturn } from "../../interfaces";
import axiosWrapper from "../../common/request";

export const getFlightDetailsRequest = async (): Promise<
  FlightData | FailedRestReturn
> =>
  axiosWrapper({
    requestMethod: "GET",
    endpoint: "flights",
  }).then((flights) => flights.json());

export function* getFlightDetailsFn() {
  try {
    const flightDetails: FlightData = yield call(getFlightDetailsRequest);
    yield put(getFlightsDetailsSuccess(flightDetails));
  } catch (error) {
    console.warn(`error: ${JSON.stringify(error)}`);
    yield put(getFlightsDetailsFailed(error));
  }
}

export function* watchGetFlightDetails() {
  yield takeEvery(GET_FLIGHTS_DETAILS, getFlightDetailsFn);
}

export default function* rootSaga() {
  yield all([fork(watchGetFlightDetails)]);
}
