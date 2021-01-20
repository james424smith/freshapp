import {
  GET_SEA_SERVICE_DETAILS,
  GET_SEA_SERVICE_DETAILS_FAIL,
  GET_SEA_SERVICE_DETAILS_SUCCESS,
  SET_REFRESHING_SEA_SERVICE_DETAILS,
} from "../constants";

import {
  InitialisedSagaCall,
  SeaService,
  SuccessAction,
  FailedAction,
} from "../../interfaces";

export function getSeaServiceDetails(): InitialisedSagaCall {
  return { type: GET_SEA_SERVICE_DETAILS };
}

export function setRefreshingSeaServiceDetails(
  isLoading: boolean
): InitialisedSagaCall {
  return { type: SET_REFRESHING_SEA_SERVICE_DETAILS, payload: isLoading };
}

export const getSeaServiceDetailsSuccess = (
  seaServiceDetails: SeaService
): SuccessAction<SeaService> => ({
  type: GET_SEA_SERVICE_DETAILS_SUCCESS,
  payload: seaServiceDetails,
});

export const getSeaServiceDetailsFailed = (error: any): FailedAction => ({
  type: GET_SEA_SERVICE_DETAILS_FAIL,
  error,
});
