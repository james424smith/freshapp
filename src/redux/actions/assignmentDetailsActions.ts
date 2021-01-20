import {
  GET_ASSIGNMENT_DETAILS,
  GET_ASSIGNMENT_DETAILS_SUCCESS,
  GET_ASSIGNMENT_DETAILS_FAIL,
  SET_REFRESHING_ASSIGNMENT_DETAILS,
} from "../constants";

import {
  InitialisedSagaCall,
  SuccessAction,
  FailedAction,
  Assignment,
} from "../../interfaces/";

export function getAssignmentDetails(): InitialisedSagaCall {
  return { type: GET_ASSIGNMENT_DETAILS };
}

export const getAssignmentDetailsSuccess = (
  assignmentDetails: Assignment[]
): SuccessAction<Assignment[]> => ({
  type: GET_ASSIGNMENT_DETAILS_SUCCESS,
  payload: assignmentDetails,
});

export const setRefreshingAssignmentDetails = (
  isLoading: boolean
): SuccessAction<boolean> => ({
  type: SET_REFRESHING_ASSIGNMENT_DETAILS,
  payload: isLoading,
});

export const getAssignmentDetailsFailed = (error: any): FailedAction => ({
  type: GET_ASSIGNMENT_DETAILS_FAIL,
  error,
});
