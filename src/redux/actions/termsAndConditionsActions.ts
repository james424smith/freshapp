import {
  GET_TERMS_AND_CONDITIONS_DETAILS,
  GET_TERMS_AND_CONDITIONS_DETAILS_SUCCESS,
  GET_TERMS_AND_CONDITIONS_DETAILS_FAIL,
} from "../constants";

import {
  InitialisedSagaCall,
  SuccessAction,
  FailedAction,
  TermsAndConditions,
} from "../../interfaces/";

export function getTermsAndConditionsDetails(): InitialisedSagaCall {
  return { type: GET_TERMS_AND_CONDITIONS_DETAILS };
}

export const getTermsAndConditionsDetailsSuccess = (
  termsAndConditionsDetails: TermsAndConditions
): SuccessAction<TermsAndConditions> => ({
  type: GET_TERMS_AND_CONDITIONS_DETAILS_SUCCESS,
  payload: termsAndConditionsDetails,
});

export const getTermsAndConditionsDetailsFailed = (
  error: any
): FailedAction => ({
  type: GET_TERMS_AND_CONDITIONS_DETAILS_FAIL,
  error,
});
