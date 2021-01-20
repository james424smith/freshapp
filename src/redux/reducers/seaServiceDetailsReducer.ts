import {
  CLEAR_ALL_STATE,
  GET_SEA_SERVICE_DETAILS_SUCCESS,
  GET_SEA_SERVICE_DETAILS_FAIL,
  SET_REFRESHING_SEA_SERVICE_DETAILS,
} from "../constants/";
import {
  SeaService,
  SuccessAction,
  InitialisedSagaCall,
  FailedAction,
} from "../../interfaces";

export interface SeaServiceRecordsState {
  seaServiceDetails: SeaService;
  loader: boolean;
}

export const defaultState: SeaServiceRecordsState = {
  seaServiceDetails: {},
  loader: false,
};

export default (
  state: SeaServiceRecordsState = defaultState,
  action:
    | InitialisedSagaCall
    | FailedAction
    | SuccessAction<SeaService | boolean>
) => {
  switch (action.type) {
    case GET_SEA_SERVICE_DETAILS_SUCCESS:
      return {
        ...state,
        loader: false,
        seaServiceDetails: action.payload,
      };
    case GET_SEA_SERVICE_DETAILS_FAIL:
      return {
        ...state,
        loader: false,
      };
    case SET_REFRESHING_SEA_SERVICE_DETAILS:
      return {
        ...state,
        loader: action.payload,
      };
    case CLEAR_ALL_STATE:
      return defaultState;
    default:
      return state;
  }
};
