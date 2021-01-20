import {
  GET_WORKING_CLOTHES_DETAILS,
  GET_WORKING_CLOTHES_DETAILS_FAIL,
  GET_WORKING_CLOTHES_DETAILS_SUCCESS,
  SET_REFRESHING_WORKING_CLOTHES_DETAILS,
} from "../constants";

import {
  InitialisedSagaCall,
  WorkingClothes,
  SuccessAction,
  FailedAction,
} from "../../interfaces/";

export const getWorkingClothesDetails = (): InitialisedSagaCall => ({
  type: GET_WORKING_CLOTHES_DETAILS,
});

export const setRefreshingWorkingClothesDetails = (
  isLoading: boolean
): InitialisedSagaCall => ({
  type: SET_REFRESHING_WORKING_CLOTHES_DETAILS,
  payload: isLoading,
});

export const getWorkingClothesDetailsSuccess = (
  workingClothesDetails: WorkingClothes
): SuccessAction<WorkingClothes> => ({
  type: GET_WORKING_CLOTHES_DETAILS_SUCCESS,
  payload: workingClothesDetails,
});

export const getWorkingClothesDetailsFailed = (error: any): FailedAction => ({
  type: GET_WORKING_CLOTHES_DETAILS_FAIL,
  error,
});
