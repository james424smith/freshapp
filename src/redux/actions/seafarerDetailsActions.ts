import {
  GET_ALL_SEAFARER_DETAILS,
  GET_ALL_SEAFARER_DETAILS_FAIL,
  GET_ALL_SEAFARER_DETAILS_SUCCESS,
  SET_REFRESHING_SEAFARER_DETAILS,
  SET_IS_LOADING_DATA,
} from "../constants";

import {
  InitialisedSagaCall,
  SeafarerDetails,
  SuccessAction,
  FailedAction,
  Badges,
} from "../../interfaces/";

export const getAllSeafarerDetails = (): InitialisedSagaCall => ({
  type: GET_ALL_SEAFARER_DETAILS,
});

export const setRefreshingSeafarerDetails = (
  isLoading: boolean
): InitialisedSagaCall => ({
  type: SET_REFRESHING_SEAFARER_DETAILS,
  payload: isLoading,
});

export const setIsLoadingData = (isLoading: boolean): InitialisedSagaCall => ({
  type: SET_IS_LOADING_DATA,
  payload: isLoading,
});

export const getAllSeafarerDetailsSuccess = (
  seafarerDetails: SeafarerDetails,
  seafarerBadgesDetails: Badges
): SuccessAction<any> => ({
  type: GET_ALL_SEAFARER_DETAILS_SUCCESS,
  payload: { seafarerDetails, seafarerBadgesDetails },
});

export const getAllSeafarerDetailsFailed = (error: any): FailedAction => ({
  type: GET_ALL_SEAFARER_DETAILS_FAIL,
  error,
});
