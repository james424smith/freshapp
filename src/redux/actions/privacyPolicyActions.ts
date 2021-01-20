import {
  GET_PRIVACY_POLICY_DETAILS,
  GET_PRIVACY_POLICY_DETAILS_FAIL,
  GET_PRIVACY_POLICY_DETAILS_SUCCESS,
} from "../constants";

import {
  InitialisedSagaCall,
  PrivacyPolicy,
  SuccessAction,
  FailedAction,
} from "../../interfaces/";

export function getPrivacyPolicyDetails(): InitialisedSagaCall {
  return { type: GET_PRIVACY_POLICY_DETAILS };
}

export const getPrivacyPolicyDetailsSuccess = (
  privacyPolicyDetails: PrivacyPolicy
): SuccessAction<PrivacyPolicy> => ({
  type: GET_PRIVACY_POLICY_DETAILS_SUCCESS,
  payload: privacyPolicyDetails,
});

export const getPrivacyPolicyDetailsFailed = (error: any): FailedAction => ({
  type: GET_PRIVACY_POLICY_DETAILS_FAIL,
  error,
});
