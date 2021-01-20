import {
  CLEAR_ALL_STATE,
  GET_TERMS_AND_CONDITIONS_DETAILS_SUCCESS,
} from "../constants/";
import {
  TermsAndConditions,
  SuccessAction,
  InitialisedSagaCall,
  FailedAction,
} from "../../interfaces";

export interface TermsAndConditionsState {
  termsAndConditionsDetails: TermsAndConditions;
  loader: boolean;
}

export const defaultState: TermsAndConditionsState = {
  termsAndConditionsDetails: { document: "" },
  loader: false,
};

export default (
  state: TermsAndConditionsState = defaultState,
  action:
    | InitialisedSagaCall
    | FailedAction
    | SuccessAction<TermsAndConditions | boolean>
) => {
  switch (action.type) {
    case GET_TERMS_AND_CONDITIONS_DETAILS_SUCCESS:
      return {
        ...state,
        loader: false,
        termsAndConditionsDetails: action.payload,
      };
    case CLEAR_ALL_STATE:
      return defaultState;
    default:
      return state;
  }
};
