import {
  CLEAR_ALL_STATE,
  GET_PRIVACY_POLICY_DETAILS_SUCCESS,
} from "../constants/";
import {
  PrivacyPolicy,
  SuccessAction,
  FailedAction,
  InitialisedSagaCall,
} from "../../interfaces";

export interface PrivacyPolicyState {
  privacyPolicyDetails: PrivacyPolicy;
  loader: boolean;
}

export const defaultState: PrivacyPolicyState = {
  privacyPolicyDetails: { document: "" },
  loader: false,
};

export default (
  state: PrivacyPolicyState = defaultState,
  action:
    | InitialisedSagaCall
    | FailedAction
    | SuccessAction<PrivacyPolicy | boolean>
) => {
  switch (action.type) {
    case GET_PRIVACY_POLICY_DETAILS_SUCCESS:
      return {
        ...state,
        loader: false,
        privacyPolicyDetails: action.payload,
      };
    case CLEAR_ALL_STATE:
      return defaultState;
    default:
      return state;
  }
};
