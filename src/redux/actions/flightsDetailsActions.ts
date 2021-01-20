import {
  GET_FLIGHTS_DETAILS,
  GET_FLIGHTS_DETAILS_FAIL,
  GET_FLIGHTS_DETAILS_SUCCESS,
  SET_REFRESHING_FLIGHT_DETAILS,
} from "../constants";

import {
  InitialisedSagaCall,
  SuccessAction,
  FailedAction,
  FlightData,
} from "../../interfaces";

export function getFlightsDetails(): InitialisedSagaCall {
  return { type: GET_FLIGHTS_DETAILS };
}

export const setRefreshingFlightDetails = (
  isLoading: boolean
): SuccessAction<boolean> => ({
  type: SET_REFRESHING_FLIGHT_DETAILS,
  payload: isLoading,
});

export const getFlightsDetailsSuccess = (
  flightData: FlightData
): SuccessAction<FlightData> => ({
  type: GET_FLIGHTS_DETAILS_SUCCESS,
  payload: flightData,
});

export const getFlightsDetailsFailed = (error: any): FailedAction => ({
  type: GET_FLIGHTS_DETAILS_FAIL,
  error,
});
