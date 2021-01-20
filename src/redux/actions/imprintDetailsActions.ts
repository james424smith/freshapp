import {
  GET_IMPRINT_DETAILS,
  GET_IMPRINT_DETAILS_SUCCESS,
  GET_IMPRINT_DETAILS_FAIL,
} from "../constants";

import {
  InitialisedSagaCall,
  SuccessAction,
  FailedAction,
  Imprint,
} from "../../interfaces/";

export function getImprintDetails(): InitialisedSagaCall {
  return { type: GET_IMPRINT_DETAILS };
}

export const getImprintDetailsSuccess = (
  imprintDetails: Imprint
): SuccessAction<Imprint> => ({
  type: GET_IMPRINT_DETAILS_SUCCESS,
  payload: imprintDetails,
});

export const getImprintDetailsFailed = (error: any): FailedAction => ({
  type: GET_IMPRINT_DETAILS_FAIL,
  error,
});
