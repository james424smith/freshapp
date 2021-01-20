import { CLEAR_ALL_STATE, GET_IMPRINT_DETAILS_SUCCESS } from "../constants/";
import {
  Imprint,
  SuccessAction,
  InitialisedSagaCall,
  FailedAction,
} from "../../interfaces";

export interface ImprintState {
  imprintDetails?: Imprint;
  loader: boolean;
}

export const defaultState: ImprintState = {
  loader: false,
};

export default (
  state: ImprintState = defaultState,
  action: InitialisedSagaCall | SuccessAction<Imprint> | FailedAction
) => {
  switch (action.type) {
    case GET_IMPRINT_DETAILS_SUCCESS:
      return {
        ...state,
        loader: false,
        imprintDetails: action.payload,
      };
    case CLEAR_ALL_STATE:
      return defaultState;
    default:
      return state;
  }
};
